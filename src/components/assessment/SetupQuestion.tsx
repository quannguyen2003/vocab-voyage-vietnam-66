
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SetupQuestion as SetupQuestionType } from "../../types/assessment";

interface SetupQuestionProps {
  question: SetupQuestionType;
  onAnswer: (value: string | number) => void;
  onContinue: () => void;
  selectedOption: string | null;
}

const SetupQuestion: React.FC<SetupQuestionProps> = ({ 
  question, 
  onAnswer, 
  onContinue,
  selectedOption 
}) => {
  const [sliderValue, setSliderValue] = useState([question.defaultValue || 15]);
  
  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    onAnswer(value[0]);
  };
  
  if (question.isSlider) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-medium">{question.question}</h2>
        <div className="py-4">
          <Slider
            value={sliderValue}
            min={question.min || 5}
            max={question.max || 60}
            step={question.step || 5}
            onValueChange={handleSliderChange}
            className="w-full"
          />
          <div className="mt-2 text-center font-medium">
            {sliderValue[0]} phút
          </div>
        </div>
        <Button onClick={onContinue} className="w-full mt-4">
          Tiếp tục
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">{question.question}</h2>
      <RadioGroup value={selectedOption || ''} onValueChange={onAnswer}>
        <div className="space-y-3">
          {question.options?.map(option => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
      {selectedOption && (
        <Button onClick={onContinue} className="w-full mt-4">
          Tiếp tục
        </Button>
      )}
    </div>
  );
};

export default SetupQuestion;
