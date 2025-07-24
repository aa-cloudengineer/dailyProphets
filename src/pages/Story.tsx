import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { storiesData } from "@/data/stories";
import magicalBook from "@/assets/magical-book.jpg";

export const Story = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const storyId = id ? parseInt(id) : 1;
  console.log("Story ID from URL param:", storyId);
  const storyContent = storiesData[storyId];
  console.log("Fetched story content:", storyContent);
  
  if (!storyContent) {
    console.warn(`Story with ID ${storyId} not found in storiesData.`);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Story Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested story could not be found.</p>
          <Button onClick={() => navigate("/")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stories
          </Button>
        </Card>
      </div>
    );
  }

  const story = storyContent[language];

  const handleComplete = () => {
    setIsCompleted(true);
    // In a real app, this would save progress to backend/localStorage
  };

  const speakText = async (text: string) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      setIsLoading(true);
      
      // Wait for voices to load if they haven't already
      const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
        return new Promise((resolve) => {
          let voices = window.speechSynthesis.getVoices();
          if (voices.length > 0) {
            resolve(voices);
          } else {
            const handleVoicesChanged = () => {
              voices = window.speechSynthesis.getVoices();
              window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
              resolve(voices);
            };
            window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
          }
        });
      };
      
      const voices = await getVoices();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utteranceRef.current = utterance;
      
      // Try to find an Arabic voice
      if (language === 'ar') {
        const arabicVoice = voices.find(voice => 
          voice.lang.startsWith('ar') || 
          voice.name.toLowerCase().includes('arabic')
        );
        
        if (arabicVoice) {
          utterance.voice = arabicVoice;
          utterance.lang = arabicVoice.lang;
        } else {
          utterance.lang = 'ar';
        }
      } else {
        utterance.lang = 'en-US';
      }
      
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      
      utterance.onstart = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };
      
      utterance.onend = () => {
        setIsPlaying(false);
        setIsLoading(false);
      };
      
      utterance.onerror = (event) => {
        setIsPlaying(false);
        setIsLoading(false);
        // Only show error if not intentionally cancelled
        if (event.error !== 'canceled' && !isCancelling) {
          toast({
            title: language === "en" ? "Audio Error" : "خطأ في الصوت",
            description: language === "en" ? "Unable to play audio" : "تعذر تشغيل الصوت",
            variant: "destructive",
          });
        }
        setIsCancelling(false);
      };
      
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: language === "en" ? "Not Supported" : "غير مدعوم",
        description: language === "en" ? "Audio is not supported in your browser" : "الصوت غير مدعوم في متصفحك",
        variant: "destructive",
      });
    }
  };

  const handleAudioToggle = () => {
    if (isPlaying) {
      setIsCancelling(true);
      if (utteranceRef.current) {
        utteranceRef.current.onend = null;
        utteranceRef.current.onerror = null;
      }
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsLoading(false);
      setTimeout(() => setIsCancelling(false), 100);
    } else {
      const fullText = `${story.title}. ${story.content}`;
      speakText(fullText);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup: stop speech when component unmounts
      window.speechSynthesis.cancel();
    };
  }, []);

  // Stop speech when language changes
  useEffect(() => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsLoading(false);
    }
  }, [language]);

  return (
    <div className="min-h-screen bg-background">
      <header className="flex items-center justify-between p-4 bg-gradient-primary shadow-soft">
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate("/")}
            className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-lg font-bold text-primary-foreground">
            {language === "en" ? "Story Time" : "وقت القصة"}
          </h1>
        </div>
        
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          className="bg-white/20 hover:bg-white/30 text-primary-foreground border-white/20"
        >
          {language === "en" ? "العربية" : "English"}
        </Button>
      </header>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Story Header */}
        <Card className="p-6 bg-gradient-warm shadow-golden">
          <div className="flex items-center space-x-4">
            <img 
              src={magicalBook} 
              alt="Story Book" 
              className="w-16 h-16 rounded-lg object-cover shadow-soft"
            />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-accent-foreground mb-2">
                {story.title}
              </h2>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={handleAudioToggle}
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : isPlaying ? (
                    <Pause className="w-4 h-4 mr-2" />
                  ) : (
                    <Play className="w-4 h-4 mr-2" fill="currentColor" />
                  )}
                  {language === "en" ? "Listen" : "استمع"}
                </Button>
                <span className="text-sm text-accent-foreground/80">
                  {language === "en" ? "~3 min read" : "~٣ دقائق قراءة"}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Story Content */}
        <Card className="p-6">
          <div className={`prose prose-lg max-w-none ${language === "ar" ? "text-right" : "text-left"}`}>
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-card-foreground leading-relaxed font-caslon text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </Card>

        {/* Moral Lesson */}
        <Card className="p-6 bg-gradient-primary text-primary-foreground">
          <h3 className="text-lg font-semibold mb-3">
            {language === "en" ? "💡 Lesson Learned" : "💡 الدرس المستفاد"}
          </h3>
          <p className="text-primary-foreground/90 leading-relaxed">
            {story.moral}
          </p>
        </Card>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {!isCompleted ? (
            <Button
              onClick={handleComplete}
              className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {language === "en" ? "Mark as Read" : "تحديد كمقروء"}
            </Button>
          ) : (
            <Card className="flex-1 p-4 bg-success/10 border-success">
              <div className="flex items-center justify-center space-x-2 text-success">
                <CheckCircle className="w-5 h-5" fill="currentColor" />
                <span className="font-medium">
                  {language === "en" ? "Story Completed!" : "القصة مكتملة!"}
                </span>
              </div>
            </Card>
          )}
          
          <Button
            variant="outline"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {language === "en" ? "Read Again" : "اقرأ مرة أخرى"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Story;