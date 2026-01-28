import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Save, Trash2, Loader2, Baby, Dumbbell } from "lucide-react";

interface Program {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: string | null;
  color: string | null;
  sort_order: number;
}

const iconOptions = [
  "Activity", "Medal", "Heart", "Zap", "Music", "Dumbbell", "Target", "Moon", "Users", "Star"
];

export const ProgramsManager = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("kids");
  const { toast } = useToast();

  const fetchPrograms = async () => {
    const { data, error } = await supabase
      .from("programs")
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

    setPrograms(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const updateProgram = async (program: Program) => {
    setSavingId(program.id);
    const { error } = await supabase
      .from("programs")
      .update({
        title: program.title,
        description: program.description,
        icon: program.icon,
        color: program.color,
      })
      .eq("id", program.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } else {
      toast({
        title: "Сохранено",
        description: "Программа обновлена",
      });
    }
    setSavingId(null);
  };

  const addProgram = async (category: string) => {
    const maxOrder = Math.max(...programs.filter(p => p.category === category).map(p => p.sort_order), 0);
    
    const { error } = await supabase
      .from("programs")
      .insert({
        category,
        title: "Новая программа",
        description: "Описание программы",
        icon: category === "kids" ? "Activity" : "Heart",
        sort_order: maxOrder + 1,
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } else {
      toast({
        title: "Добавлено",
        description: "Новая программа создана",
      });
      fetchPrograms();
    }
  };

  const deleteProgram = async (id: string) => {
    const { error } = await supabase
      .from("programs")
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
        description: "Программа удалена",
      });
      fetchPrograms();
    }
  };

  const handleLocalChange = (id: string, field: keyof Program, value: string) => {
    setPrograms(prev => prev.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const kidsPrograms = programs.filter(p => p.category === "kids");
  const adultsPrograms = programs.filter(p => p.category === "adults");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-heading font-bold">Управление программами</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="kids" className="flex items-center gap-2">
            <Baby className="w-4 h-4" />
            Детские
          </TabsTrigger>
          <TabsTrigger value="adults" className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4" />
            Взрослые
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kids" className="space-y-4">
          <Button onClick={() => addProgram("kids")} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Добавить детскую программу
          </Button>
          <div className="grid gap-4">
            {kidsPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSave={updateProgram}
                onDelete={deleteProgram}
                onChange={handleLocalChange}
                isSaving={savingId === program.id}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="adults" className="space-y-4">
          <Button onClick={() => addProgram("adults")} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Добавить взрослую программу
          </Button>
          <div className="grid gap-4">
            {adultsPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onSave={updateProgram}
                onDelete={deleteProgram}
                onChange={handleLocalChange}
                isSaving={savingId === program.id}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProgramCardProps {
  program: Program;
  onSave: (program: Program) => void;
  onDelete: (id: string) => void;
  onChange: (id: string, field: keyof Program, value: string) => void;
  isSaving: boolean;
}

const ProgramCard = ({ program, onSave, onDelete, onChange, isSaving }: ProgramCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Название</Label>
            <Input
              value={program.title}
              onChange={(e) => onChange(program.id, "title", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Иконка</Label>
            <select
              value={program.icon || ""}
              onChange={(e) => onChange(program.id, "icon", e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2 space-y-2">
            <Label>Описание</Label>
            <Textarea
              value={program.description}
              onChange={(e) => onChange(program.id, "description", e.target.value)}
              rows={2}
            />
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(program.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Удалить
            </Button>
            <Button
              size="sm"
              onClick={() => onSave(program)}
              disabled={isSaving}
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Сохранить
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
