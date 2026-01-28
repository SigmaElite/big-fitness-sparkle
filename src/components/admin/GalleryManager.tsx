import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Loader2, Image, Video, GripVertical } from "lucide-react";

interface GalleryItem {
  id: string;
  type: string;
  url: string;
  thumbnail_url: string | null;
  title: string | null;
  sort_order: number;
}

export const GalleryManager = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingType, setUploadingType] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchGallery = async () => {
    const { data, error } = await supabase
      .from("gallery")
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

    setItems(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleFileUpload = async (file: File, type: "image" | "video") => {
    setUploadingType(type);

    const fileExt = file.name.split(".").pop();
    const fileName = `gallery-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("admin-uploads")
      .upload(fileName, file);

    if (uploadError) {
      toast({
        variant: "destructive",
        title: "Ошибка загрузки",
        description: uploadError.message,
      });
      setUploadingType(null);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("admin-uploads")
      .getPublicUrl(fileName);

    const maxOrder = Math.max(...items.map(i => i.sort_order), 0);

    const { error: insertError } = await supabase
      .from("gallery")
      .insert({
        type,
        url: publicUrl.publicUrl,
        title: file.name.split(".")[0],
        sort_order: maxOrder + 1,
      });

    if (insertError) {
      toast({
        variant: "destructive",
        title: "Ошибка добавления",
        description: insertError.message,
      });
    } else {
      toast({
        title: "Успешно",
        description: `${type === "image" ? "Фото" : "Видео"} добавлено в галерею`,
      });
      fetchGallery();
    }

    setUploadingType(null);
  };

  const deleteItem = async (id: string) => {
    const { error } = await supabase
      .from("gallery")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } else {
      toast({
        title: "Удалено",
        description: "Элемент удалён из галереи",
      });
      fetchGallery();
    }
  };

  const updateTitle = async (id: string, title: string) => {
    const { error } = await supabase
      .from("gallery")
      .update({ title })
      .eq("id", id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
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
      <h2 className="text-2xl font-heading font-bold">Управление галереей</h2>

      <div className="flex flex-wrap gap-4">
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, "image");
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={uploadingType !== null}
          />
          <Button disabled={uploadingType !== null}>
            {uploadingType === "image" ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Image className="w-4 h-4 mr-2" />
            )}
            Добавить фото
          </Button>
        </div>
        <div className="relative">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file, "video");
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
            disabled={uploadingType !== null}
          />
          <Button variant="secondary" disabled={uploadingType !== null}>
            {uploadingType === "video" ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Video className="w-4 h-4 mr-2" />
            )}
            Добавить видео
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-[3/4] bg-muted relative">
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.title || "Gallery item"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={item.url}
                  poster={item.thumbnail_url || undefined}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                {item.type === "image" ? "Фото" : "Видео"}
              </div>
            </div>
            <CardContent className="p-3 space-y-2">
              <Input
                value={item.title || ""}
                onChange={(e) => {
                  setItems(prev => prev.map(i => 
                    i.id === item.id ? { ...i, title: e.target.value } : i
                  ));
                }}
                onBlur={(e) => updateTitle(item.id, e.target.value)}
                placeholder="Название"
                className="text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteItem(item.id)}
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Удалить
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
