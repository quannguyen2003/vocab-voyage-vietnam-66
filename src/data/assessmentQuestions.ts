
import { Question } from "../types/assessment";

// Sample questions for the assessment
export const questions: Question[] = [
  // Setup questions
  {
    id: 'goal',
    type: 'setup',
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
    type: 'setup',
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
    type: 'setup',
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
    type: 'multipleChoice',
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
    type: 'multipleChoice',
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
    type: 'context',
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
    type: 'audio',
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
    type: 'collocation',
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
    type: 'wordFormation',
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
