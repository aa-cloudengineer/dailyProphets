import { Star, Calendar, Trophy, Book } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ProgressSectionProps {
  streak: number;
  storiesRead: number;
  totalStories: number;
  badges: string[];
  language: "en" | "ar";
}

export const ProgressSection = ({
  streak,
  storiesRead,
  totalStories,
  badges,
  language
}: ProgressSectionProps) => {
  const progressPercentage = (storiesRead / totalStories) * 100;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground mb-4">
        {language === "en" ? "Your Progress" : "تقدمك"}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-primary text-primary-foreground">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8" />
            <div>
              <p className="text-2xl font-bold">{streak}</p>
              <p className="text-sm opacity-90">
                {language === "en" ? "Day Streak" : "يوم متواصل"}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-warm text-accent-foreground">
          <div className="flex items-center space-x-3">
            <Book className="w-8 h-8" />
            <div>
              <p className="text-2xl font-bold">{storiesRead}</p>
              <p className="text-sm opacity-90">
                {language === "en" ? "Stories Read" : "قصص مقروءة"}
              </p>
            </div>
          </div>
        </Card>
      </div>
      
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-card-foreground">
            {language === "en" ? "Reading Progress" : "تقدم القراءة"}
          </h3>
          <span className="text-sm text-muted-foreground">
            {storiesRead}/{totalStories}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-primary h-3 rounded-full transition-all duration-500 shadow-soft"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </Card>
      
      <Card className="p-4">
        <h3 className="font-semibold text-card-foreground mb-3">
          {language === "en" ? "Earned Badges" : "الشارات المكتسبة"}
        </h3>
        <div className="flex space-x-2 overflow-x-auto">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center shadow-golden"
            >
              {badge === "star" && <Star className="w-6 h-6 text-accent-foreground" fill="currentColor" />}
              {badge === "trophy" && <Trophy className="w-6 h-6 text-accent-foreground" fill="currentColor" />}
              {badge === "book" && <Book className="w-6 h-6 text-accent-foreground" fill="currentColor" />}
            </div>
          ))}
          {badges.length === 0 && (
            <p className="text-sm text-muted-foreground py-4">
              {language === "en" 
                ? "Start reading stories to earn badges!" 
                : "ابدأ بقراءة القصص لكسب الشارات!"
              }
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};