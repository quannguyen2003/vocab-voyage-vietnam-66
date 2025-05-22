
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

// Import types
import { Answer, Question } from "@/types/assessment";

// Import data
import { questions } from "@/data/assessmentQuestions";

// Import components
import SetupQuestion from "@/components/assessment/SetupQuestion";
import MultipleChoiceQuestion from "@/components/assessment/MultipleChoiceQuestion";
import AudioQuestion from "@/components/assessment/AudioQuestion";
import AssessmentResults from "@/components/assessment/AssessmentResults";

export default function Assessment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = (currentQuestionIndex / questions.length) * 100;
  
  const handleAnswer = (value: string | number) => {
    if (typeof value === 'string') {
      setSelectedOption(value);
    }
    
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
        answer: value as string,
        correct: isAnswerCorrect,
        difficulty: 'medium' // Assuming this is from currentQuestion.difficulty
      }
    }));
    
    setShowFeedback(true);
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
  
  // Function to get time value from answers
  const getTimeValue = (): number => {
    const timeAnswer = answers['time'];
    if (typeof timeAnswer === 'number') {
      return timeAnswer;
    } else if (typeof timeAnswer === 'string') {
      return parseInt(timeAnswer, 10) || 15;
    } else {
      return 15; // Default value
    }
  };
  
  // Function to render the current question based on type
  const renderQuestion = () => {
    if (showResults) {
      const assessmentQuestions = questions.filter(q => q.type !== 'setup').length;
      return (
        <AssessmentResults
          correctCount={correctCount}
          totalQuestions={assessmentQuestions}
          onFinish={handleFinish}
          getTimeValue={getTimeValue}
        />
      );
    }
    
    switch (currentQuestion.type) {
      case 'setup':
        return (
          <SetupQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            onContinue={handleContinue}
            selectedOption={selectedOption}
          />
        );
      case 'audio':
        return (
          <AudioQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            onContinue={handleContinue}
            selectedOption={selectedOption}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        );
      case 'multipleChoice':
      case 'context':
      case 'collocation':
      case 'wordFormation':
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            onContinue={handleContinue}
            selectedOption={selectedOption}
            showFeedback={showFeedback}
            isCorrect={isCorrect}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        );
      default:
        return <p>Loại câu hỏi không được hỗ trợ</p>;
    }
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
