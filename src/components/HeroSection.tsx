import heroLantern from "@/assets/hero-lantern.jpg";

interface HeroSectionProps {
  language: "en" | "ar";
}

export const HeroSection = ({ language }: HeroSectionProps) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-celestial p-8 mb-6">
      <div className="absolute inset-0 opacity-30">
        <img 
          src={heroLantern} 
          alt="Islamic Lantern" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-10 text-center text-white">
        <h2 className="text-2xl font-bold mb-2 animate-fade-in">
          {language === "en" 
            ? "Discover Beautiful Stories" 
            : "اكتشف القصص الجميلة"
          }
        </h2>
        <p className="text-lg opacity-90 animate-fade-in">
          {language === "en"
            ? "Journey through the wisdom of the Prophets"
            : "رحلة عبر حكمة الأنبياء"
          }
        </p>
        
        {/* Floating decorative elements */}
        <div className="absolute top-4 right-4 w-4 h-4 bg-accent rounded-full opacity-60 animate-float" />
        <div className="absolute bottom-6 left-6 w-3 h-3 bg-white rounded-full opacity-40 animate-pulse-soft" />
        <div className="absolute top-1/2 right-8 w-2 h-2 bg-accent rounded-full opacity-50 animate-float" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  );
};