
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { AssessmentQuestion } from "../../types/assessment";

interface MultipleChoiceQuestionProps {
  question: AssessmentQuestion;
  onAnswer: (value: string) => void;
  onContinue: () => void;
  selectedOption: string | null;
  showFeedback: boolean;
  isCorrect: boolean;
  isLastQuestion: boolean;
}

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({
  question,
  onAnswer,
  onContinue,
  selectedOption,
  showFeedback,
  isCorrect,
  isLastQuestion
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">{question.question}</h2>
      <RadioGroup value={selectedOption || ''} onValueChange={onAnswer} disabled={showFeedback}>
        <div className="space-y-3">
          {question.options.map(option => (
            <div 
              key={option.value} 
              className={`flex items-center space-x-2 p-3 border rounded-md ${
                showFeedback && option.value === question.correctAnswer 
                  ? 'border-green-500 bg-green-50' 
                  : showFeedback && option.value === selectedOption 
                    ? 'border-red-500 bg-red-50' 
                    : 'border-border'
              }`}
            >
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value} className="flex-1">{option.label}</Label>
              {showFeedback && option.value === question.correctAnswer && (
                <CheckCircle className="h-5 w-5 text-green-500" />
              )}
              {showFeedback && option.value === selectedOption && option.value !== question.correctAnswer && (
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
                  question.options.find(o => o.value === question.correctAnswer)?.label
                }`
            }
          </p>
        </div>
      )}
      {showFeedback && (
        <Button onClick={onContinue} className="w-full mt-4">
          {isLastQuestion ? 'Xem kết quả' : 'Câu hỏi tiếp theo'}
        </Button>
      )}
    </div>
  );
};

export default MultipleChoiceQuestion;
