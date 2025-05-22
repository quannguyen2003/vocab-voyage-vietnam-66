
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Answer } from "../../types/assessment";

interface AssessmentResultsProps {
  correctCount: number;
  totalQuestions: number;
  onFinish: () => void;
  getTimeValue: () => number;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  correctCount,
  totalQuestions,
  onFinish,
  getTimeValue
}) => {
  const score = Math.round((correctCount / totalQuestions) * 100);
  const level = score >= 80 ? 'Cao' : score >= 60 ? 'Trung bình' : 'Cơ bản';
  const strengths = score >= 70 ? ['Từ vựng học thuật', 'Collocation'] : ['Từ vựng thông dụng'];
  const weaknesses = score < 70 ? ['Từ vựng học thuật', 'Phát âm'] : ['Phát âm nâng cao'];
  
  // Calculate estimated vocabulary size based on correct answers
  const estimateVocabSize = () => {
    const correctPercentage = correctCount / totalQuestions;
    
    // Simple estimation logic - would be more sophisticated in a real app
    if (correctPercentage > 0.8) return "5,000 - 8,000 từ";
    if (correctPercentage > 0.6) return "3,000 - 5,000 từ";
    if (correctPercentage > 0.4) return "1,500 - 3,000 từ";
    return "500 - 1,500 từ";
  };
  
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
            <p className="text-sm text-muted-foreground">Học {getTimeValue()} phút mỗi ngày như bạn đã đặt mục tiêu.</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onFinish} className="w-full">
            Bắt đầu học ngay
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssessmentResults;
