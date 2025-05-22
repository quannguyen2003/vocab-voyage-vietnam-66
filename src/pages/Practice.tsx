
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Timer, Trophy, XCircle, Check, Zap, BookOpen } from "lucide-react";

// Word Race game sample words
const sampleWords = [
  {
    word: "diligent",
    options: [
      "chăm chỉ, cần cù",
      "lười biếng, chậm chạp",
      "thông minh, sáng dạ",
      "mạnh mẽ, dũng cảm"
    ],
    correctIndex: 0
  },
  {
    word: "ambitious",
    options: [
      "vui vẻ, hạnh phúc",
      "tham vọng, nhiều hoài bão",
      "cẩn thận, thận trọng",
      "giận dữ, tức giận"
    ],
    correctIndex: 1
  },
  {
    word: "confident",
    options: [
      "lo lắng, bồn chồn",
      "buồn bã, chán nản",
      "tự tin, chắc chắn",
      "sợ hãi, e ngại"
    ],
    correctIndex: 2
  },
  {
    word: "curious",
    options: [
      "điềm tĩnh, trầm lặng",
      "tò mò, hiếu kỳ",
      "lịch sự, nhã nhặn",
      "khó chịu, bực bội"
    ],
    correctIndex: 1
  },
  {
    word: "generous",
    options: [
      "keo kiệt, bủn xỉn",
      "hào phóng, rộng rãi",
      "kiêu ngạo, tự phụ",
      "thẳng thắn, bộc trực"
    ],
    correctIndex: 1
  },
  {
    word: "cautious",
    options: [
      "cẩn trọng, thận trọng",
      "liều lĩnh, táo bạo",
      "thông minh, sáng dạ",
      "lười biếng, chậm chạp"
    ],
    correctIndex: 0
  },
  {
    word: "persistent",
    options: [
      "tức giận, giận dữ",
      "kiên nhẫn, kiên trì",
      "dễ dàng từ bỏ",
      "dễ bị tổn thương"
    ],
    correctIndex: 1
  },
  {
    word: "efficient",
    options: [
      "cẩu thả, lơ đãng",
      "chậm chạp, kém hiệu quả",
      "hiệu quả, có năng suất",
      "bảo thủ, khó thay đổi"
    ],
    correctIndex: 2
  },
  {
    word: "humble",
    options: [
      "kiêu ngạo, tự phụ",
      "khiêm tốn, giản dị",
      "thẳng thắn, bộc trực",
      "giận dữ, tức giận"
    ],
    correctIndex: 1
  },
  {
    word: "creative",
    options: [
      "sáng tạo, giàu trí tưởng tượng",
      "đơn điệu, nhàm chán",
      "tuân thủ, nghe lời",
      "lười biếng, chậm chạp"
    ],
    correctIndex: 0
  }
];

// Available games
const games = [
  {
    id: "wordrace",
    title: "Đua từ vựng",
    description: "Chọn nghĩa đúng của từ càng nhanh càng tốt",
    icon: <Zap className="h-8 w-8 text-vocab-accent" />,
    difficulty: "Dễ",
    estimatedTime: "5 phút",
  },
  {
    id: "multiple-choice",
    title: "Trắc nghiệm từ vựng",
    description: "Kiểm tra kiến thức từ vựng của bạn qua các câu hỏi",
    icon: <BookOpen className="h-8 w-8 text-vocab-primary" />,
    difficulty: "Trung bình",
    estimatedTime: "10 phút",
  }
];

export default function Practice() {
  const { toast } = useToast();
  
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60); // 60 seconds for the game
  const [answered, setAnswered] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  
  // Timer effect
  useEffect(() => {
    let interval: number | undefined;
    
    if (gameStarted && !gameFinished && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setGameFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000) as unknown as number;
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameStarted, gameFinished, timer]);
  
  const handleGameSelect = (gameId: string) => {
    setSelectedGame(gameId);
  };
  
  const handleStartGame = () => {
    setGameStarted(true);
    setGameFinished(false);
    setCurrentWordIndex(0);
    setScore(0);
    setTimer(60);
    setAnswered(null);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    
    toast({
      title: "Trò chơi bắt đầu!",
      description: "Bạn có 60 giây để trả lời càng nhiều câu càng tốt.",
    });
  };
  
  const handleAnswer = (optionIndex: number) => {
    setAnswered(optionIndex);
    
    const currentWord = sampleWords[currentWordIndex];
    
    if (optionIndex === currentWord.correctIndex) {
      setScore(score + 10);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setWrongAnswers(wrongAnswers + 1);
    }
    
    // Move to next word after a short delay
    setTimeout(() => {
      setAnswered(null);
      
      if (currentWordIndex < sampleWords.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        // Loop back to the beginning if we've gone through all words
        setCurrentWordIndex(0);
      }
    }, 1000);
  };
  
  const handlePlayAgain = () => {
    setGameStarted(false);
    setGameFinished(false);
  };
  
  const handleBackToGames = () => {
    setSelectedGame(null);
    setGameStarted(false);
    setGameFinished(false);
  };
  
  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Render game selection screen
  const renderGameSelection = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card 
            key={game.id} 
            className={`cursor-pointer transition-all hover:border-vocab-primary ${
              selectedGame === game.id ? 'border-2 border-vocab-primary' : ''
            }`}
            onClick={() => handleGameSelect(game.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{game.title}</span>
                <div className="p-2 rounded-full bg-muted">
                  {game.icon}
                </div>
              </CardTitle>
              <CardDescription>{game.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <div>
                  <span className="text-muted-foreground mr-2">Độ khó:</span>
                  <span className="font-medium">{game.difficulty}</span>
                </div>
                <div>
                  <span className="text-muted-foreground mr-2">Thời gian:</span>
                  <span className="font-medium">{game.estimatedTime}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleGameSelect(game.id);
                  handleStartGame();
                }}
              >
                Bắt đầu
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };
  
  // Render Word Race game
  const renderWordRaceGame = () => {
    if (gameFinished) {
      return renderGameResults();
    }
    
    const currentWord = sampleWords[currentWordIndex];
    
    return (
      <div>
        {/* Game header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Timer className="h-5 w-5 text-vocab-accent mr-2" />
            <span className="font-bold">{formatTime(timer)}</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-1" />
              <span>{correctAnswers}</span>
            </div>
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-500 mr-1" />
              <span>{wrongAnswers}</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Trophy className="h-5 w-5 text-vocab-warning mr-2" />
            <span className="font-bold">{score}</span>
          </div>
        </div>
        
        {/* Progress bar */}
        <Progress 
          value={(timer / 60) * 100} 
          className={`h-2 mb-8 ${timer <= 10 ? 'bg-red-200' : ''}`} 
        />
        
        {/* Word to guess */}
        <div className="bg-vocab-primary/10 p-8 rounded-lg mb-8 text-center">
          <h2 className="text-3xl font-bold text-vocab-primary">{currentWord.word}</h2>
        </div>
        
        {/* Answer options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentWord.options.map((option, index) => (
            <Button
              key={index}
              variant={answered === null ? "outline" : 
                answered === index ? 
                  (index === currentWord.correctIndex ? "default" : "destructive") : 
                  answered !== null && index === currentWord.correctIndex ? 
                    "default" : "outline"}
              className={`h-auto py-4 text-left justify-start ${
                answered !== null ? 'pointer-events-none' : ''
              } ${
                answered === index && index === currentWord.correctIndex ? 'bg-green-500 hover:bg-green-500' : 
                answered === index && index !== currentWord.correctIndex ? 'bg-red-500 hover:bg-red-500' :
                answered !== null && index === currentWord.correctIndex ? 'bg-green-500 hover:bg-green-500' : ''
              }`}
              onClick={() => handleAnswer(index)}
            >
              <div className="mr-4 h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                {String.fromCharCode(65 + index)}
              </div>
              {option}
            </Button>
          ))}
        </div>
      </div>
    );
  };
  
  // Render game results
  const renderGameResults = () => {
    const accuracy = correctAnswers + wrongAnswers > 0 
      ? Math.round((correctAnswers / (correctAnswers + wrongAnswers)) * 100) 
      : 0;
    
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <div className="h-16 w-16 rounded-full bg-vocab-primary/10 text-vocab-primary flex items-center justify-center">
              <Trophy className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl">Kết quả</CardTitle>
          <CardDescription>Chúc mừng! Bạn đã hoàn thành trò chơi.</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6 text-center">
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Điểm số</p>
              <p className="text-2xl font-bold">{score}</p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Đúng</p>
              <p className="text-2xl font-bold text-green-500">{correctAnswers}</p>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Sai</p>
              <p className="text-2xl font-bold text-red-500">{wrongAnswers}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <p className="text-sm font-medium">Độ chính xác</p>
              <p className="text-sm font-medium">{accuracy}%</p>
            </div>
            <Progress value={accuracy} className="h-2" />
          </div>
          
          <div className="p-4 bg-muted rounded-lg text-center">
            <p className="text-muted-foreground">
              {accuracy >= 80 
                ? "Tuyệt vời! Bạn có vốn từ vựng rất tốt." 
                : accuracy >= 60 
                ? "Khá tốt! Hãy tiếp tục luyện tập để cải thiện vốn từ vựng." 
                : "Đừng nản chí! Hãy tiếp tục học và luyện tập hàng ngày."}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handlePlayAgain} className="flex-1">Chơi lại</Button>
          <Button onClick={handleBackToGames} variant="outline" className="flex-1">
            Trở về danh sách
          </Button>
        </CardFooter>
      </Card>
    );
  };
  
  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Luyện tập & Trò chơi</h1>
          {selectedGame && !gameFinished && (
            <Button variant="outline" onClick={handleBackToGames}>
              Trở về danh sách
            </Button>
          )}
        </div>
        
        {!selectedGame && (
          <>
            <p className="text-muted-foreground mb-8">
              Học từ vựng thú vị hơn với các trò chơi tương tác. Chọn một trò chơi và cải thiện vốn từ vựng của bạn.
            </p>
            {renderGameSelection()}
          </>
        )}
        
        {selectedGame === "wordrace" && gameStarted && (
          renderWordRaceGame()
        )}
        
        {selectedGame === "multiple-choice" && gameStarted && !gameFinished && (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-lg">Trò chơi đang được phát triển</p>
                <p className="text-muted-foreground mt-2">Vui lòng quay lại sau.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleBackToGames} className="w-full">
                Trở về danh sách
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
