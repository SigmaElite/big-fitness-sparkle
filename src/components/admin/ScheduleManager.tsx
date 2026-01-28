import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Save, Loader2 } from "lucide-react";

interface Schedule {
  id: string;
  hall_id: string;
  hall_name: string;
  image_url: string;
  sort_order: number;
}

export const ScheduleManager = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchSchedules = async () => {
    const { data, error } = await supabase
      .from("schedules")
      .select("*")
      .order("sort_order");

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: error.message,
      });
      return;
    }

    setSchedules(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleImageUpload = async (scheduleId: string, file: File) => {
    setUploadingId(scheduleId);

    const fileExt = file.name.split(".").pop();
    const fileName = `schedule-${scheduleId}-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("admin-uploads")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: uploadError.message,
      });
      setUploadingId(null);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("admin-uploads")
      .getPublicUrl(fileName);

    const { error: updateError } = await supabase
      .from("schedules")
      .update({ image_url: publicUrl.publicUrl })
      .eq("id", scheduleId);

    if (updateError) {
      toast({
        variant: "destructive",
        title: "Ошибка обновления",
        description: updateError.message,
      });
    } else {
      toast({
        title: "Успешно",
        description: "Расписание обновлено",
      });
      fetchSchedules();
    }

    setUploadingId(null);
  };

  const handleNameChange = async (scheduleId: string, newName: string) => {
    const { error } = await supabase
      .from("schedules")
      .update({ hall_name: newName })
      .eq("id", scheduleId);

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } else {
      fetchSchedules();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold">Управление расписанием</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {schedules.map((schedule) => (
          <Card key={schedule.id}>
            <CardHeader>
              <CardTitle className="text-lg">{schedule.hall_name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                <img
                  src={schedule.image_url}
                  alt={schedule.hall_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <Label>Название зала</Label>
                <Input
                  value={schedule.hall_name}
                  onChange={(e) => handleNameChange(schedule.id, e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Изображение расписания</Label>
                <div className="flex gap-2">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(schedule.id, file);
                    }}
                    disabled={uploadingId === schedule.id}
                  />
                  {uploadingId === schedule.id && (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
