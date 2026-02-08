import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Escape HTML entities to prevent injection in Telegram messages
function escapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return str.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

// Sanitize and validate input
function sanitizeInput(str: string, maxLength: number = 100): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim()
    .substring(0, maxLength);
}

// Validate phone number (Belarus format)
function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 12 && digits.startsWith("375");
}

// Validate name (only letters, spaces, hyphens)
function isValidName(name: string): boolean {
  const nameRegex = /^[а-яёА-ЯЁa-zA-Z\s\-]+$/;
  return nameRegex.test(name) && name.length >= 1 && name.length <= 100;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    
    // Extract and sanitize inputs
    const name = sanitizeInput(body.name || "", 100);
    const phone = sanitizeInput(body.phone || "", 20);
    const direction = sanitizeInput(body.direction || "", 100);

    // Validate required fields
    if (!name) {
      return new Response(
        JSON.stringify({ error: "Имя обязательно" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidName(name)) {
      return new Response(
        JSON.stringify({ error: "Имя содержит недопустимые символы" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!phone) {
      return new Response(
        JSON.stringify({ error: "Телефон обязателен" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidPhone(phone)) {
      return new Response(
        JSON.stringify({ error: "Неверный формат телефона" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
    const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Missing Telegram configuration");
      return new Response(
        JSON.stringify({ error: "Telegram не настроен" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Escape HTML in message to prevent injection
    const safeName = escapeHtml(name);
    const safePhone = escapeHtml(phone);
    const safeDirection = escapeHtml(direction || "Не указано");

    const message = `🏋️ <b>Новая заявка на пробное занятие!</b>\n\n👤 Имя: ${safeName}\n📱 Телефон: ${safePhone}\n📋 Направление: ${safeDirection}`;

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );

    const result = await response.json();

    if (!result.ok) {
      console.error("Telegram API error:", result);
      return new Response(
        JSON.stringify({ error: "Ошибка отправки в Telegram" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Внутренняя ошибка сервера" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});