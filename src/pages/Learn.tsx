import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { 
  BookOpen, 
  RotateCw, 
  Zap, 
  BookMarked, 
  Briefcase,
  VolumeX,
  Volume2,
  CheckCircle,
  Clock,
  Flame
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Sample vocabulary data
const sampleVocabulary = [
  {
    id: 1,
    word: "diligent",
    phonetic_us: "/ˈdɪlɪdʒənt/",
    phonetic_uk: "/ˈdɪlɪdʒənt/",
    definition_vi: "chăm chỉ, cần cù, siêng năng",
    definition_en: "having or showing care and conscientiousness in one's work or duties",
    example_sentence: "He's very diligent about his homework.",
    mastery_level: "new",
  },
  {
    id: 2,
    word: "meticulous",
    phonetic_us: "/məˈtɪkjələs/",
    phonetic_uk: "/məˈtɪkjʊləs/",
    definition_vi: "tỉ mỉ, cẩn thận, kỹ lưỡng",
    definition_en: "showing great attention to detail; very careful and precise",
    example_sentence: "He is meticulous in keeping his financial records.",
    mastery_level: "new",
  },
  {
    id: 3,
    word: "perseverance",
    phonetic_us: "/ˌpɜːrsəˈvɪrəns/",
    phonetic_uk: "/ˌpɜːsɪˈvɪərəns/",
    definition_vi: "sự kiên trì, bền bỉ",
    definition_en: "persistence in doing something despite difficulty or delay in achieving success",
    example_sentence: "Her perseverance was rewarded when she finally passed the exam.",
    mastery_level: "new",
  },
  {
    id: 4,
    word: "ambiguous",
    phonetic_us: "/æmˈbɪɡjuəs/",
    phonetic_uk: "/æmˈbɪɡjuəs/",
    definition_vi: "mơ hồ, khó hiểu, không rõ ràng",
    definition_en: "open to more than one interpretation; not having one obvious meaning",
    example_sentence: "The results of the experiment were ambiguous.",
    mastery_level: "learning",
  },
  {
    id: 5,
    word: "benevolent",
    phonetic_us: "/bəˈnevələnt/",
    phonetic_uk: "/bəˈnevələnt/",
    definition_vi: "nhân từ, tốt bụng, hảo tâm",
    definition_en: "well meaning and kindly",
    example_sentence: "A benevolent smile spread across her face.",
    mastery_level: "learning",
  },
];

// Learning mode tabs
const modes = [
  { id: "new", label: "Từ Mới", icon: <BookOpen className="h-4 w-4" /> },
  { id: "review", label: "Ôn Tập", icon: <RotateCw className="h-4 w-4" /> },
  { id: "quick", label: "Luyện Nhanh", icon: <Zap className="h-4 w-4" /> },
  { id: "topic", label: "Chủ Đề", icon: <BookMarked className="h-4 w-4" /> },
  { id: "work", label: "Công Việc", icon: <Briefcase className="h-4 w-4" /> },
];

export default function Learn() {
  const { toast } = useToast();
  
  const [activeMode, setActiveMode] = useState("new");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsCompleted, setCardsCompleted] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(15); // Number of words per day
  const [streak, setStreak] = useState(3); // Current streak in days
  const [progress, setProgress] = useState(0);
  const [masteryLevels, setMasteryLevels] = useState<Record<number, string>>({});
  
  const currentWord = sampleVocabulary[currentWordIndex];
  
  // Initialize progress on component mount
  useEffect(() => {
    setProgress((cardsCompleted / dailyGoal) * 100);
  }, [cardsCompleted, dailyGoal]);
  
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handlePlayAudio = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card flip
    toast({
      title: "Phát âm",
      description: `Đang phát âm cho từ "${currentWord.word}"`,
    });
    // In a real app, this would play the actual audio file
  };
  
  const handleRating = (rating: string) => {
    // Update mastery level based on rating
    let newMastery = currentWord.mastery_level;
    
    switch(rating) {
      case "easy":
        newMastery = "familiar";
        break;
      case "medium":
        newMastery = "learning";
        break;
      case "hard":
        newMastery = "learning";
        break;
      case "forgot":
        newMastery = "new";
        break;
    }
    
    // Update mastery level state
    setMasteryLevels({
      ...masteryLevels,
      [currentWord.id]: newMastery,
    });
    
    // Move to next card
    if (currentWordIndex < sampleVocabulary.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      setCurrentWordIndex(0); // Loop back to the first card when reaching the end
    }
    
    // Reset card state
    setIsFlipped(false);
    
    // Update progress
    setCardsCompleted(prev => {
      const newCompleted = prev + 1;
      setProgress((newCompleted / dailyGoal) * 100);
      
      if (newCompleted >= dailyGoal) {
        toast({
          title: "Chúc mừng! 🎉",
          description: "Bạn đã đạt mục tiêu học tập hôm nay!",
        });
      }
      
      return newCompleted;
    });
  };
  
  // Render circular progress indicator
  const renderCircularProgress = () => {
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;
  
    return (
      <div className="relative inline-flex items-center justify-center">
        <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
          <circle
            stroke="#e2e8f0"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-vocab-primary transition-all duration-300 ease-in-out"
          />
        </svg>
        <div className="absolute flex flex-col justify-center items-center">
          <span className="text-2xl font-bold">{Math.min(cardsCompleted, dailyGoal)}</span>
          <span className="text-xs text-muted-foreground">{`/${dailyGoal}`}</span>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Overview */}
      <div className="bg-muted py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8">Học Từ Vựng</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-vocab-primary" />
                  Mục Tiêu Hôm Nay
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center pb-6">
                {renderCircularProgress()}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <Flame className="h-5 w-5 mr-2 text-vocab-accent" />
                  Chuỗi Ngày Học
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="flex justify-center items-center space-x-1">
                  {[...Array(streak)].map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-vocab-accent/10 text-vocab-accent rounded flex items-center justify-center">
                      <Flame className="h-4 w-4" />
                    </div>
                  ))}
                  <div className="w-8 h-8 border border-dashed border-muted-foreground rounded flex items-center justify-center">
                    <span className="text-muted-foreground">+1</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {streak} ngày liên tiếp
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 text-vocab-success" />
                  Tổng Kết
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold">
                      {Object.keys(masteryLevels).length}
                    </p>
                    <p className="text-sm text-muted-foreground">Từ đã học hôm nay</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold">
                      {Object.values(masteryLevels).filter(v => v === "familiar" || v === "mastered").length}
                    </p>
                    <p className="text-sm text-muted-foreground">Từ đã thuộc</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Learning Modes Selector */}
      <div className="py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {modes.map(mode => (
                <TabsTrigger key={mode.id} value={mode.id} className="flex items-center">
                  <span className="mr-2">{mode.icon}</span>
                  {mode.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {/* Learning Session Interface */}
            <TabsContent value="new" className="mt-8">
              <div className="flex flex-col items-center">
                <div 
                  className={`flashcard w-full max-w-md h-64 cursor-pointer ${isFlipped ? 'flipped' : ''}`}
                  onClick={handleCardClick}
                >
                  {/* Front side of the card */}
                  <div className="flashcard-front bg-white rounded-lg shadow-lg p-6 border border-border flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">Từ mới {currentWordIndex + 1}/{sampleVocabulary.length}</div>
                      <div className="text-xs text-muted-foreground">{masteryLevels[currentWord.id] || currentWord.mastery_level}</div>
                    </div>
                    
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-2">{currentWord.word}</h2>
                      <p className="text-muted-foreground">{currentWord.phonetic_us}</p>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full"
                        onClick={handlePlayAudio}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Back side of the card */}
                  <div className="flashcard-back bg-white rounded-lg shadow-lg p-6 border border-border flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">Từ mới {currentWordIndex + 1}/{sampleVocabulary.length}</div>
                      <div className="text-xs text-muted-foreground">{masteryLevels[currentWord.id] || currentWord.mastery_level}</div>
                    </div>
                    
                    <div className="text-center">
                      <h2 className="text-2xl font-bold mb-2">{currentWord.word}</h2>
                      <p className="text-lg font-medium mb-2">{currentWord.definition_vi}</p>
                      <p className="text-sm text-muted-foreground italic mb-4">{currentWord.definition_en}</p>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        "{currentWord.example_sentence}"
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-full"
                        onClick={handlePlayAudio}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Rating buttons */}
                <div className="flex justify-between w-full max-w-md mt-6 gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700"
                    onClick={() => handleRating("forgot")}
                  >
                    Quên
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-orange-300 hover:bg-orange-50 text-orange-600 hover:text-orange-700"
                    onClick={() => handleRating("hard")}
                  >
                    Khó
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-yellow-300 hover:bg-yellow-50 text-yellow-600 hover:text-yellow-700"
                    onClick={() => handleRating("medium")}
                  >
                    Vừa
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 border-green-300 hover:bg-green-50 text-green-600 hover:text-green-700"
                    onClick={() => handleRating("easy")}
                  >
                    Dễ
                  </Button>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-muted-foreground mb-2">Nhấn vào thẻ để lật</p>
                  <p className="text-sm text-muted-foreground">Đánh giá mức độ của bạn sau khi xem nghĩa</p>
                </div>
              </div>
            </TabsContent>
            
            {/* Other tabs (simplified content for now) */}
            <TabsContent value="review" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ôn Tập</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ôn lại các từ bạn đã học trước đó để củng cố ghi nhớ.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Bắt đầu ôn tập</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="quick" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Luyện Nhanh</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Phiên học nhanh 5 phút với các từ vựng ngẫu nhiên.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Bắt đầu luyện nhanh</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="topic" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Học theo Chủ đề</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {['Kinh doanh', 'Công nghệ', 'Du lịch', 'Y tế', 'Giáo dục', 'Thể thao'].map((topic, i) => (
                      <Button key={i} variant="outline" className="h-auto py-4 justify-start">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded bg-muted mr-3 flex items-center justify-center">
                            {i + 1}
                          </div>
                          <span>{topic}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="work" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Từ vựng Công việc</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {['Công nghệ thông tin', 'Marketing', 'Tài chính', 'Nhân sự', 'Quản lý dự án'].map((field, i) => (
                      <Button key={i} variant="outline" className="h-auto py-4 justify-start">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded bg-muted mr-3 flex items-center justify-center">
                            {i + 1}
                          </div>
                          <span>{field}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Progress Tracking Section */}
      <div className="bg-muted py-8">
        <div className="container px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-6">Tiến độ học tập</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Lịch ôn tập</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3">
                        <span className="font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Từ cần ôn hôm nay</p>
                        <p className="text-xs text-muted-foreground">Đã học 1 ngày trước</p>
                      </div>
                    </div>
                    <Button variant="outline">Ôn ngay</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-3">
                        <span className="font-medium">8</span>
                      </div>
                      <div>
                        <p className="font-medium">Từ cần ôn ngày mai</p>
                        <p className="text-xs text-muted-foreground">Đã học 3 ngày trước</p>
                      </div>
                    </div>
                    <Button variant="ghost">Lịch</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                        <span className="font-medium">12</span>
                      </div>
                      <div>
                        <p className="font-medium">Từ cần ôn tuần tới</p>
                        <p className="text-xs text-muted-foreground">Đã học 7 ngày trước</p>
                      </div>
                    </div>
                    <Button variant="ghost">Lịch</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mức độ thành thạo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Mới học</p>
                      <p className="text-sm text-muted-foreground">12</p>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Đang học</p>
                      <p className="text-sm text-muted-foreground">24</p>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Quen thuộc</p>
                      <p className="text-sm text-muted-foreground">10</p>
                    </div>
                    <Progress value={20} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium">Thành thạo</p>
                      <p className="text-sm text-muted-foreground">5</p>
                    </div>
                    <Progress value={5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
