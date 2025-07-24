import { Star, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentStreak: number;
  language: "en" | "ar";
  onLanguageToggle: () => void;
}

export const Header = ({ currentStreak, language, onLanguageToggle }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gradient-primary shadow-soft">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
          <Star className="w-5 h-5 text-accent-foreground" fill="currentColor" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-primary-foreground">
            {language === "en" ? "QuranNarrative" : "قصص الأنبياء"}
          </h1>
          <p className="text-sm text-primary-foreground/80">
            {language === "en" ? `${currentStreak} day streak` : `${currentStreak} يوم متواصل`}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onLanguageToggle}
          className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20"
        >
          {language === "en" ? "العربية" : "English"}
        </Button>
        <Button 
          variant="secondary" 
          size="sm"
          className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};