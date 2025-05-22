import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle } from "lucide-react";

// Define question types
type QuestionType = 'setup' | 'multipleChoice' | 'audio' | 'context' | 'wordFormation' | 'collocation';

// Define answer type to properly type our state
type Answer = string | number | {
  answer: string;
  correct: boolean;
  difficulty: string;
}

// Sample questions for the assessment
const questions = [
  // Setup questions
  {
    id: 'goal',
    type: 'setup' as QuestionType,
    question: 'Bạn đang học tiếng Anh để làm gì?',
    options: [
      { value: 'work', label: 'Công việc/Chuyên ngành' },
      { value: 'travel', label: 'Du lịch' },
      { value: 'academic', label: 'Học tập/Nghiên cứu' },
      { value: 'general', label: 'Giao tiếp thông thường' },
      { value: 'exam', label: 'Chuẩn bị cho kỳ thi (IELTS, TOEFL, etc.)' },
    ],
  },
  {
    id: 'field',
    type: 'setup' as QuestionType,
    question: 'Bạn quan tâm đến lĩnh vực nào nhất?',
    options: [
      { value: 'technology', label: 'Công nghệ' },
      { value: 'business', label: 'Kinh doanh' },
      { value: 'science', label: 'Khoa học' },
      { value: 'arts', label: 'Nghệ thuật & Giải trí' },
      { value: 'health', label: 'Y tế & Sức khỏe' },
    ],
  },
  {
    id: 'time',
    type: 'setup' as QuestionType,
    question: 'Bạn có thể dành bao nhiêu phút mỗi ngày để học từ vựng?',
    isSlider: true,
    min: 5,
    max: 60,
    step: 5,
    defaultValue: 15,
  },
  // Assessment questions
  {
    id: '1',
    type: 'multipleChoice' as QuestionType,
    question: 'Idiom "Once in a blue moon" có nghĩa là gì?',
    options: [
      { value: 'a', label: 'Hiếm khi, thỉnh thoảng' },
      { value: 'b', label: 'Vào đêm trăng xanh' },
      { value: 'c', label: 'Một cơ hội tốt' },
      { value: 'd', label: 'Một khoảnh khắc buồn' },
    ],
    correctAnswer: 'a',
    difficulty: 'medium',
  },
  {
    id: '2',
    type: 'multipleChoice' as QuestionType,
    question: '"Procrastination" có nghĩa là gì?',
    options: [
      { value: 'a', label: 'Sự hợp tác' },
      { value: 'b', label: 'Sự trì hoãn' },
      { value: 'c', label: 'Sự tiến bộ' },
      { value: 'd', label: 'Sự dự đoán' },
    ],
    correctAnswer: 'b',
    difficulty: 'medium',
  },
  {
    id: '3',
    type: 'context' as QuestionType,
    question: 'Chọn từ phù hợp nhất để điền vào chỗ trống: "The company has experienced significant _____ in the past year, with profits increasing by 30%."',
    options: [
      { value: 'a', label: 'growth' },
      { value: 'b', label: 'extension' },
      { value: 'c', label: 'rising' },
      { value: 'd', label: 'inflation' },
    ],
    correctAnswer: 'a',
    difficulty: 'medium',
  },
  {
    id: '4',
    type: 'audio' as QuestionType,
    question: 'Nghe và chọn từ bạn nghe được (hiện tại sử dụng placeholder)',
    audioUrl: '#', // Placeholder for audio URL
    options: [
      { value: 'a', label: 'Pronunciation' },
      { value: 'b', label: 'Pronounciation' },
      { value: 'c', label: 'Pronouncetion' },
      { value: 'd', label: 'Pronounciation' },
    ],
    correctAnswer: 'a',
    difficulty: 'hard',
  },
  {
    id: '5',
    type: 'collocation' as QuestionType,
    question: 'Từ nào thường đi kèm với "heavy" trong các cụm từ phổ biến?',
    options: [
      { value: 'a', label: 'traffic' },
      { value: 'b', label: 'car' },
      { value: 'c', label: 'house' },
      { value: 'd', label: 'pencil' },
    ],
    correctAnswer: 'a',
    difficulty: 'easy',
  },
  {
    id: '6',
    type: 'wordFormation' as QuestionType,
    question: 'Chọn dạng đúng của từ để hoàn thành câu: "Her _____ of the situation was very accurate." (ASSESS)',
    options: [
      { value: 'a', label: 'assess' },
      { value: 'b', label: 'assessing' },
      { value: 'c', label: 'assessment' },
      { value: 'd', label: 'assessor' },
    ],
    correctAnswer: 'c',
    difficulty: 'hard',
  },
];

export default function Assessment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [sliderValue, setSliderValue] = useState([15]);
  const [showResults, setShowResults] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;
  
  const handleAnswer = (value: string) => {
    setSelectedOption(value);
    
    // For setup questions, just save the answer
    if (currentQuestion.type === 'setup') {
      setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
      return;
    }
    
    // For assessment questions, check if correct
    const isAnswerCorrect = value === currentQuestion.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    
    setAnswers(prev => ({ 
      ...prev, 
      [currentQuestion.id]: {
        answer: value,
        correct: isAnswerCorrect,
        difficulty: currentQuestion.difficulty
      }
    }));
    
    setShowFeedback(true);
  };
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value[0] }));
  };
  
  const handleContinue = () => {
    setSelectedOption(null);
    setShowFeedback(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Show results at the end
      setShowResults(true);
    }
  };
  
  const handleFinish = () => {
    toast({
      title: "Đánh giá hoàn tất!",
      description: "Chúng tôi đã xây dựng lộ trình học tập cá nhân hóa cho bạn.",
    });
    navigate('/learn');
  };
  
  // Calculate estimated vocabulary size based on correct answers (simplified logic)
  const estimateVocabSize = () => {
    const totalAssessmentQuestions = questions.filter(q => q.type !== 'setup').length;
    const correctPercentage = correctCount / totalAssessmentQuestions;
    
    // Simple estimation logic - would be more sophisticated in a real app
    if (correctPercentage > 0.8) return "5,000 - 8,000 từ";
    if (correctPercentage > 0.6) return "3,000 - 5,000 từ";
    if (correctPercentage > 0.4) return "1,500 - 3,000 từ";
    return "500 - 1,500 từ";
  };
  
  // Function to render the current question based on type
  const renderQuestion = () => {
    if (showResults) {
      return renderResults();
    }
    
    switch (currentQuestion.type) {
      case 'setup':
        return renderSetupQuestion();
      case 'multipleChoice':
      case 'context':
      case 'collocation':
      case 'wordFormation':
        return renderMultipleChoiceQuestion();
      case 'audio':
        return renderAudioQuestion();
      default:
        return <p>Loại câu hỏi không được hỗ trợ</p>;
    }
  };
  
  const renderSetupQuestion = () => {
    if (currentQuestion.isSlider) {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-medium">{currentQuestion.question}</h2>
          <div className="py-4">
            <Slider
              value={sliderValue}
              min={currentQuestion.min}
              max={currentQuestion.max}
              step={currentQuestion.step}
              onValueChange={handleSliderChange}
              className="w-full"
            />
            <div className="mt-2 text-center font-medium">
              {sliderValue[0]} phút
            </div>
          </div>
          <Button onClick={handleContinue} className="w-full mt-4">
            Tiếp tục
          </Button>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-medium">{currentQuestion.question}</h2>
        <RadioGroup value={selectedOption || ''} onValueChange={handleAnswer}>
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value}>{option.label}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
        {selectedOption && (
          <Button onClick={handleContinue} className="w-full mt-4">
            Tiếp tục
          </Button>
        )}
      </div>
    );
  };
  
  const renderMultipleChoiceQuestion = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-medium">{currentQuestion.question}</h2>
        <RadioGroup value={selectedOption || ''} onValueChange={handleAnswer} disabled={showFeedback}>
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <div 
                key={option.value} 
                className={`flex items-center space-x-2 p-3 border rounded-md ${
                  showFeedback && option.value === currentQuestion.correctAnswer 
                    ? 'border-green-500 bg-green-50' 
                    : showFeedback && option.value === selectedOption 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-border'
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1">{option.label}</Label>
                {showFeedback && option.value === currentQuestion.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {showFeedback && option.value === selectedOption && option.value !== currentQuestion.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </RadioGroup>
        {showFeedback && (
          <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? 'Chính xác!' : 'Chưa chính xác.'}
            </p>
            <p className="text-sm mt-1">
              {isCorrect 
                ? 'Tuyệt vời, bạn đã trả lời đúng!' 
                : `Đáp án đúng là: ${
                    currentQuestion.options.find(o => o.value === currentQuestion.correctAnswer)?.label
                  }`
              }
            </p>
          </div>
        )}
        {showFeedback && (
          <Button onClick={handleContinue} className="w-full mt-4">
            {currentQuestionIndex < questions.length - 1 ? 'Câu hỏi tiếp theo' : 'Xem kết quả'}
          </Button>
        )}
      </div>
    );
  };
  
  const renderAudioQuestion = () => {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-medium">{currentQuestion.question}</h2>
        <div className="bg-muted rounded-md p-4 flex justify-center">
          <Button variant="outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            <span className="ml-2">Phát âm thanh</span>
          </Button>
        </div>
        <RadioGroup value={selectedOption || ''} onValueChange={handleAnswer} disabled={showFeedback}>
          <div className="space-y-3">
            {currentQuestion.options.map(option => (
              <div 
                key={option.value} 
                className={`flex items-center space-x-2 p-3 border rounded-md ${
                  showFeedback && option.value === currentQuestion.correctAnswer 
                    ? 'border-green-500 bg-green-50' 
                    : showFeedback && option.value === selectedOption 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-border'
                }`}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1">{option.label}</Label>
                {showFeedback && option.value === currentQuestion.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {showFeedback && option.value === selectedOption && option.value !== currentQuestion.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </div>
        </RadioGroup>
        {showFeedback && (
          <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            <p className={`font-medium ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? 'Chính xác!' : 'Chưa chính xác.'}
            </p>
            <p className="text-sm mt-1">
              {isCorrect 
                ? 'Nghe phát âm chuẩn xác là một kỹ năng quan trọng!' 
                : `Đáp án đúng là: ${
                    currentQuestion.options.find(o => o.value === currentQuestion.correctAnswer)?.label
                  }`
              }
            </p>
          </div>
        )}
        {showFeedback && (
          <Button onClick={handleContinue} className="w-full mt-4">
            {currentQuestionIndex < questions.length - 1 ? 'Câu hỏi tiếp theo' : 'Xem kết quả'}
          </Button>
        )}
      </div>
    );
  };
  
  const renderResults = () => {
    const assessmentQuestions = questions.filter(q => q.type !== 'setup').length;
    const score = Math.round((correctCount / assessmentQuestions) * 100);
    
    const level = score >= 80 ? 'Cao' : score >= 60 ? 'Trung bình' : 'Cơ bản';
    const strengths = score >= 70 ? ['Từ vựng học thuật', 'Collocation'] : ['Từ vựng thông dụng'];
    const weaknesses = score < 70 ? ['Từ vựng học thuật', 'Phát âm'] : ['Phát âm nâng cao'];
    
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Kết quả đánh giá</h2>
          <p className="text-muted-foreground">Dựa trên câu trả lời của bạn, chúng tôi đã phân tích trình độ từ vựng của bạn</p>
        </div>
        
        <div className="bg-muted p-6 rounded-lg text-center">
          <div className="text-4xl font-bold text-vocab-primary mb-2">{score}%</div>
          <p className="text-sm text-muted-foreground">Điểm số tổng thể</p>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Vốn từ vựng ước tính</p>
                <p className="font-bold">{estimateVocabSize()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Trình độ</p>
                <p className="font-bold">{level}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-vocab-primary">Điểm mạnh</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-vocab-accent">Điểm yếu</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Lộ trình học tập đề xuất</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium">1. Xây dựng nền tảng vững chắc</h3>
              <p className="text-sm text-muted-foreground">Tập trung vào 500 từ vựng cốt lõi đầu tiên trong lộ trình của bạn.</p>
            </div>
            <div>
              <h3 className="font-medium">2. Cải thiện điểm yếu</h3>
              <p className="text-sm text-muted-foreground">Chúng tôi đã thêm các bài học phát âm và từ vựng học thuật vào lộ trình của bạn.</p>
            </div>
            <div>
              <h3 className="font-medium">3. Thực hành hàng ngày</h3>
              <p className="text-sm text-muted-foreground">Học {answers['time'] || 15} phút mỗi ngày như bạn đã đặt mục tiêu.</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleFinish} className="w-full">
              Bắt đầu học ngay
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Đánh giá trình độ từ vựng</h1>
          <p className="text-muted-foreground">
            {!showResults ? "Hoàn thành bài đánh giá để nhận lộ trình học cá nhân hóa" : "Kết quả đánh giá của bạn"}
          </p>
          
          {!showResults && (
            <div className="mt-4">
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Câu {currentQuestionIndex + 1}/{questions.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
            </div>
          )}
        </div>
        
        <Card>
          <CardContent className="pt-6">
            {renderQuestion()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
