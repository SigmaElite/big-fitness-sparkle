import { z } from "zod";

// Phone validation for Belarus format
const phoneRegex = /^\+375\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Имя обязательно" })
    .max(100, { message: "Имя слишком длинное" })
    .regex(/^[а-яёА-ЯЁa-zA-Z\s\-]+$/, { 
      message: "Имя может содержать только буквы, пробелы и дефисы" 
    }),
  phone: z
    .string()
    .min(1, { message: "Телефон обязателен" })
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length === 12;
    }, { message: "Номер должен содержать 12 цифр" }),
  direction: z
    .string()
    .max(100, { message: "Направление слишком длинное" })
    .optional()
    .default(""),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Sanitize string to prevent HTML/script injection
export function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim()
    .substring(0, 500); // Limit length
}

// Escape HTML entities for safe display
export function escapeHtml(str: string): string {
  const htmlEntities: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return str.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

// Validate and sanitize contact form data
export function validateContactForm(data: unknown): { 
  success: boolean; 
  data?: ContactFormData; 
  error?: string 
} {
  try {
    const parsed = contactFormSchema.parse(data);
    return {
      success: true,
      data: {
        name: sanitizeString(parsed.name),
        phone: parsed.phone,
        direction: parsed.direction ? sanitizeString(parsed.direction) : "",
      },
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        success: false,
        error: err.errors[0]?.message || "Ошибка валидации",
      };
    }
    return {
      success: false,
      error: "Неверные данные",
    };
  }
}
