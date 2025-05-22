
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, CheckCircle } from "lucide-react";
import { Answer } from "@/types/assessment";

interface AIFeedbackProps {
  answers: Record<string, Answer>;
  correctCount: number;
  totalQuestions: number;
}

const AIFeedback: React.FC<AIFeedbackProps> = ({ 
  answers, 
  correctCount, 
  totalQuestions 
}) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  // Function to get AI feedback based on assessment results
  const generateAIFeedback = async () => {
    setLoading(true);
    
    try {
      // In a real implementation, this would call an AI API with the answers data
      // For now, simulate AI analysis with predetermined feedback
      const score = Math.round((correctCount / totalQuestions) * 100);
      
      // Sample feedback based on score and answer patterns
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      let aiAnalysis = "";
      
      if (score >= 80) {
        aiAnalysis = `Rất tốt! Bạn có vốn từ vựng ở mức cao với ${score}% câu trả lời đúng. 
        
Phân tích: Bạn làm tốt với các từ học thuật và các cụm từ collocation phức tạp. Khả năng hiểu ngữ cảnh của bạn rất tốt.

Đề xuất: 
- Tiếp tục làm phong phú vốn từ vựng với các từ chuyên ngành
- Tập trung vào các idioms và phrasal verbs nâng cao
- Luyện tập các từ vựng IELTS/TOEFL band 8-9`;
      } else if (score >= 60) {
        aiAnalysis = `Khá tốt! Bạn có vốn từ vựng ở mức trung bình khá với ${score}% câu trả lời đúng.
        
Phân tích: Bạn đã làm tốt với từ vựng cơ bản và một số từ học thuật. Tuy nhiên, bạn còn gặp khó khăn với các idioms và collocation phức tạp.

Đề xuất:
- Mở rộng vốn từ vựng học thuật
- Luyện tập thêm về các cụm từ collocation
- Tập trung vào ngữ cảnh sử dụng từ`;
      } else {
        aiAnalysis = `Bạn có vốn từ vựng ở mức cơ bản với ${score}% câu trả lời đúng.
        
Phân tích: Bạn làm tốt với các từ vựng thông dụng nhưng gặp khó khăn với từ vựng học thuật và các idioms.

Đề xuất:
- Tập trung vào 1000 từ vựng thông dụng trước
- Học từ vựng theo chủ đề, bắt đầu từ các chủ đề quen thuộc
- Sử dụng flashcards và ứng dụng học từ vựng hàng ngày`;
      }
      
      setFeedback(aiAnalysis);
    } catch (error) {
      console.error("Error generating AI feedback:", error);
      setFeedback("Có lỗi xảy ra khi phân tích. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="text-yellow-500" />
          Phân tích AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!feedback ? (
          <div className="text-center">
            <p className="mb-4 text-muted-foreground">
              Nhận phân tích chuyên sâu và gợi ý cá nhân hóa từ AI
            </p>
            <Button 
              onClick={generateAIFeedback} 
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? "Đang phân tích..." : "Nhận phân tích AI"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md whitespace-pre-line">
              {feedback}
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={() => setFeedback(null)}>
                Phân tích lại
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIFeedback;
