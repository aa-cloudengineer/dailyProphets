import { Play, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StoryCardProps {
  title: string;
  titleAr: string;
  prophet: string;
  prophetAr: string;
  duration: string;
  isCompleted: boolean;
  isToday: boolean;
  language: "en" | "ar";
  onRead: () => void;
}

export const StoryCard = ({
  title,
  titleAr,
  prophet,
  prophetAr,
  duration,
  isCompleted,
  isToday,
  language,
  onRead
}: StoryCardProps) => {
  return (
    <Card className={`p-6 transition-all duration-300 hover:shadow-golden ${
      isToday 
        ? "ring-2 ring-accent bg-gradient-warm shadow-golden" 
        : "bg-card hover:shadow-soft"
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-1">
            {language === "en" ? title : titleAr}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === "en" ? `Prophet ${prophet}` : `النبي ${prophetAr}`}
          </p>
        </div>
        
        {isCompleted && (
          <CheckCircle className="w-6 h-6 text-success" fill="currentColor" />
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
        
        <Button
          onClick={onRead}
          className={`${
            isToday 
              ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-deep" 
              : ""
          } transition-all duration-300`}
          variant={isToday ? "default" : "outline"}
        >
          <Play className="w-4 h-4 mr-2" fill="currentColor" />
          {language === "en" ? "Read Story" : "اقرأ القصة"}
        </Button>
      </div>
      
      {isToday && (
        <div className="mt-4 p-3 bg-white/50 rounded-lg">
          <p className="text-sm font-medium text-card-foreground">
            {language === "en" ? "📖 Today's Story" : "📖 قصة اليوم"}
          </p>
        </div>
      )}
    </Card>
  );
};