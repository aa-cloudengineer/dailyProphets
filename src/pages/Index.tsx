import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { StoryCard } from "@/components/StoryCard";
import { ProgressSection } from "@/components/ProgressSection";

const mockStories = [
  { id: 1, title: "Prophet Adam (AS) - The First Man", titleAr: "النبي آدم عليه السلام - أول البشر", prophet: "Adam", prophetAr: "آدم", duration: "3 min", isCompleted: false, isToday: true },
  { id: 2, title: "Prophet Idris (AS) - The Truthful", titleAr: "النبي إدريس عليه السلام - الصدوق", prophet: "Idris", prophetAr: "إدريس", duration: "4 min", isCompleted: false, isToday: false },
  { id: 3, title: "Prophet Nuh (AS) - The Great Flood", titleAr: "النبي نوح عليه السلام - الطوفان العظيم", prophet: "Nuh", prophetAr: "نوح", duration: "4 min", isCompleted: false, isToday: false },
  { id: 4, title: "Prophet Hud (AS) - The Patient Caller", titleAr: "النبي هود عليه السلام - الداعي الصبور", prophet: "Hud", prophetAr: "هود", duration: "4 min", isCompleted: false, isToday: false },
  { id: 5, title: "Prophet Saleh (AS) - The Honest Messenger", titleAr: "النبي صالح عليه السلام - الرسول الأمين", prophet: "Saleh", prophetAr: "صالح", duration: "4 min", isCompleted: false, isToday: false },
  { id: 6, title: "Prophet Ibrahim (AS) - The Friend of Allah", titleAr: "النبي إبراهيم عليه السلام - خليل الله", prophet: "Ibrahim", prophetAr: "إبراهيم", duration: "5 min", isCompleted: false, isToday: false },
  { id: 7, title: "Prophet Lut (AS) - The Righteous", titleAr: "النبي لوط عليه السلام - الصالح", prophet: "Lut", prophetAr: "لوط", duration: "4 min", isCompleted: false, isToday: false },
  { id: 8, title: "Prophet Ismail (AS) - The Faithful Son", titleAr: "النبي إسماعيل عليه السلام - الابن الصالح", prophet: "Ismail", prophetAr: "إسماعيل", duration: "4 min", isCompleted: false, isToday: false },
  { id: 9, title: "Prophet Ishaq (AS) - The Blessed Son", titleAr: "النبي إسحاق عليه السلام - الابن المبارك", prophet: "Ishaq", prophetAr: "إسحاق", duration: "4 min", isCompleted: false, isToday: false },
  { id: 10, title: "Prophet Yaqub (AS) - The Patient Father", titleAr: "النبي يعقوب عليه السلام - الأب الصبور", prophet: "Yaqub", prophetAr: "يعقوب", duration: "4 min", isCompleted: false, isToday: false },
  { id: 11, title: "Prophet Yusuf (AS) - Dreams and Forgiveness", titleAr: "النبي يوسف عليه السلام - الأحلام والمغفرة", prophet: "Yusuf", prophetAr: "يوسف", duration: "5 min", isCompleted: false, isToday: false },
  { id: 12, title: "Prophet Ayyub (AS) - The Patient One", titleAr: "النبي أيوب عليه السلام - الصبور", prophet: "Ayyub", prophetAr: "أيوب", duration: "4 min", isCompleted: false, isToday: false },
  { id: 13, title: "Prophet Shuaib (AS) - The Honest Preacher", titleAr: "النبي شعيب عليه السلام - الواعظ الأمين", prophet: "Shuaib", prophetAr: "شعيب", duration: "4 min", isCompleted: false, isToday: false },
  { id: 14, title: "Prophet Musa (AS) - The Staff and the Sea", titleAr: "النبي موسى عليه السلام - العصا والبحر", prophet: "Musa", prophetAr: "موسى", duration: "4 min", isCompleted: false, isToday: false },
  { id: 15, title: "Prophet Harun (AS) - The Supportive Brother", titleAr: "النبي هارون عليه السلام - الأخ الداعم", prophet: "Harun", prophetAr: "هارون", duration: "4 min", isCompleted: false, isToday: false },
  { id: 16, title: "Prophet Dhul-Kifl (AS) - The Patient One", titleAr: "النبي ذو الكفل عليه السلام - الصبور", prophet: "Dhul-Kifl", prophetAr: "ذو الكفل", duration: "4 min", isCompleted: false, isToday: false },
  { id: 17, title: "Prophet Dawud (AS) - The Brave Warrior", titleAr: "النبي داود عليه السلام - المحارب الشجاع", prophet: "Dawud", prophetAr: "داود", duration: "4 min", isCompleted: false, isToday: false },
  { id: 18, title: "Prophet Sulaiman (AS) - The Wise King", titleAr: "النبي سليمان عليه السلام - الملك الحكيم", prophet: "Sulaiman", prophetAr: "سليمان", duration: "4 min", isCompleted: false, isToday: false },
  { id: 19, title: "Prophet Ilyas (AS) - The Devout Prophet", titleAr: "النبي إلياس عليه السلام - النبي الورع", prophet: "Ilyas", prophetAr: "إلياس", duration: "4 min", isCompleted: false, isToday: false },
  { id: 20, title: "Prophet Al-Yasa (AS) - The Successor", titleAr: "النبي اليسع عليه السلام - الخليفة", prophet: "Al-Yasa", prophetAr: "اليسع", duration: "4 min", isCompleted: false, isToday: false },
  { id: 21, title: "Prophet Yunus (AS) - The Patient One", titleAr: "النبي يونس عليه السلام - الصبور", prophet: "Yunus", prophetAr: "يونس", duration: "4 min", isCompleted: false, isToday: false },
  { id: 22, title: "Prophet Zakariyya (AS) - The Faithful Servant", titleAr: "النبي زكريا عليه السلام - العبد الصالح", prophet: "Zakariyya", prophetAr: "زكريا", duration: "4 min", isCompleted: false, isToday: false },
  { id: 23, title: "Prophet Yahya (AS) - The Righteous", titleAr: "النبي يحيى عليه السلام - الصالح", prophet: "Yahya", prophetAr: "يحيى", duration: "4 min", isCompleted: false, isToday: false },
  { id: 24, title: "Prophet Isa (AS) - The Messenger of Allah", titleAr: "النبي عيسى عليه السلام - رسول الله", prophet: "Isa", prophetAr: "عيسى", duration: "4 min", isCompleted: false, isToday: false },
  { id: 25, title: "Prophet Muhammad (PBUH) - The Final Messenger", titleAr: "النبي محمد صلى الله عليه وسلم - الرسول الأخير", prophet: "Muhammad", prophetAr: "محمد", duration: "4 min", isCompleted: false, isToday: false }
];

const Index = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [currentStreak] = useState(7);
  const [storiesRead, setStoriesRead] = useState(0);
  const [badges] = useState(["star", "book"]);
  const [showAllStories, setShowAllStories] = useState(false);
  const [todayStoryId, setTodayStoryId] = useState<number | null>(null);

  useEffect(() => {
    // Load last read story ID from localStorage
    const lastReadIdStr = localStorage.getItem("lastReadStoryId");
    let nextStoryId = 1;
    if (lastReadIdStr) {
      const lastReadId = parseInt(lastReadIdStr, 10);
      nextStoryId = lastReadId < mockStories.length ? lastReadId + 1 : 1;
    }
    setTodayStoryId(nextStoryId);
    setStoriesRead(lastReadIdStr ? parseInt(lastReadIdStr, 10) : 0);
  }, []);

  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  const handleReadStory = (storyId: number) => {
    localStorage.setItem("lastReadStoryId", storyId.toString());
    setTodayStoryId(storyId < mockStories.length ? storyId + 1 : 1);
    setStoriesRead(storyId);
    navigate(`/story/${storyId}`);
  };

  const storiesToShow = showAllStories ? mockStories : mockStories.filter(story => story.id === todayStoryId);

  return (
    <div className="min-h-screen bg-background">
      <Header currentStreak={currentStreak} language={language} onLanguageToggle={handleLanguageToggle} />
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        <HeroSection language={language} />
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">{language === "en" ? "Stories" : "القصص"}</h2>
          {storiesToShow.map(story => (
            <StoryCard
              key={story.id}
              title={story.title}
              titleAr={story.titleAr}
              prophet={story.prophet}
              prophetAr={story.prophetAr}
              duration={story.duration}
              isCompleted={story.isCompleted}
              isToday={story.id === todayStoryId}
              language={language}
              onRead={() => handleReadStory(story.id)}
            />
          ))}
          <button
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition"
            onClick={() => setShowAllStories(!showAllStories)}
          >
            {showAllStories
              ? language === "en"
                ? "Show Today's Story Only"
                : "عرض قصة اليوم فقط"
              : language === "en"
              ? `Show All Stories (${mockStories.length})`
              : `عرض كل القصص (${mockStories.length})`}
          </button>
        </div>
        <ProgressSection
          streak={currentStreak}
          storiesRead={storiesRead}
          totalStories={mockStories.length}
          badges={badges}
          language={language}
        />
      </div>
    </div>
  );
};

export default Index;
