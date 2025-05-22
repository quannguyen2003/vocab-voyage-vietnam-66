
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  TrendingUp, 
  Repeat, 
  Award, 
  BarChart,
  Clock,
  CheckCircle,
  Users
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted to-background pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !leading-tight">
                Học từ vựng tiếng Anh <span className="text-vocab-primary">hiệu quả</span> và <span className="text-vocab-secondary">cá nhân hóa</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/80">
                VocabMaster sử dụng công nghệ học thông minh giúp bạn ghi nhớ từ vựng lâu dài và đạt mục tiêu nhanh chóng.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="w-full sm:w-auto">Bắt đầu miễn phí</Button>
                </Link>
                <Link to="/assessment">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Kiểm tra trình độ
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-vocab-success" />
                <span>Hơn 10,000+ người dùng hài lòng</span>
              </div>
            </div>
            
            <div className="relative flex justify-center">
              <div className="w-full max-w-md aspect-video bg-vocab-card-bg rounded-lg shadow-lg border border-border overflow-hidden">
                {/* Placeholder for demo video/image */}
                <div className="w-full h-full bg-gradient-to-br from-vocab-primary/10 to-vocab-secondary/10 flex items-center justify-center">
                  <p className="text-center text-muted-foreground">Video giới thiệu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Problem & Solution Section */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Vấn đề & Giải pháp</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nhiều người học từ vựng không hiệu quả vì thiếu phương pháp và hệ thống phù hợp
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-red-50 rounded-lg p-8 border border-red-100">
              <h3 className="text-xl font-semibold mb-4 text-red-600">Cách học truyền thống</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-200 flex items-center justify-center mt-0.5">
                    <span className="text-red-600">✕</span>
                  </div>
                  <span>Học cùng một cách với mọi người</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-200 flex items-center justify-center mt-0.5">
                    <span className="text-red-600">✕</span>
                  </div>
                  <span>Không có hệ thống nhắc lại thông minh</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-200 flex items-center justify-center mt-0.5">
                    <span className="text-red-600">✕</span>
                  </div>
                  <span>Chỉ tập trung vào ghi nhớ ngắn hạn</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-red-200 flex items-center justify-center mt-0.5">
                    <span className="text-red-600">✕</span>
                  </div>
                  <span>Thiếu dữ liệu đo lường tiến độ</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-lg p-8 border border-green-100">
              <h3 className="text-xl font-semibold mb-4 text-green-600">VocabMaster</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-200 flex items-center justify-center mt-0.5">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Lộ trình học cá nhân hóa dựa trên đánh giá</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-200 flex items-center justify-center mt-0.5">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Hệ thống lặp lại ngắt quãng thông minh</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-200 flex items-center justify-center mt-0.5">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Đa dạng phương pháp học (flashcard, ngữ cảnh, trò chơi)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-green-200 flex items-center justify-center mt-0.5">
                    <span className="text-green-600">✓</span>
                  </div>
                  <span>Theo dõi tiến độ chi tiết và phân tích học tập</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Highlight */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Tính năng nổi bật</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              VocabMaster kết hợp công nghệ học hiện đại với phương pháp được khoa học chứng minh
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="h-12 w-12 rounded-lg bg-vocab-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-vocab-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Đánh giá cá nhân hóa</h3>
              <p className="text-muted-foreground">
                Nhận đánh giá chi tiết về vốn từ vựng và các điểm mạnh/yếu để xây dựng lộ trình học phù hợp.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="h-12 w-12 rounded-lg bg-vocab-secondary/10 flex items-center justify-center mb-4">
                <Repeat className="h-6 w-6 text-vocab-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lặp lại ngắt quãng</h3>
              <p className="text-muted-foreground">
                Hệ thống nhắc nhở thông minh giúp bạn ôn tập đúng thời điểm để tối ưu hóa việc ghi nhớ lâu dài.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="h-12 w-12 rounded-lg bg-vocab-accent/10 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-vocab-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Học đa giác quan</h3>
              <p className="text-muted-foreground">
                Kết hợp phát âm, hình ảnh và ngữ cảnh giúp bạn nắm vững từ vựng nhanh chóng và hiệu quả.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="h-12 w-12 rounded-lg bg-vocab-success/10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-vocab-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phân tích học tập</h3>
              <p className="text-muted-foreground">
                Theo dõi tiến độ chi tiết và nhận báo cáo phân tích về hiệu suất học tập của bạn.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Người dùng nói gì về VocabMaster?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-vocab-warning">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-foreground/80 mb-6">
                "Sau 3 tháng học với VocabMaster, từ vựng của tôi đã tăng đáng kể. Phương pháp lặp lại ngắt quãng thực sự hiệu quả!"
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div>
                  <p className="font-medium">Nguyễn Thị An</p>
                  <p className="text-sm text-muted-foreground">Sinh viên</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-vocab-warning">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-foreground/80 mb-6">
                "VocabMaster giúp tôi chuẩn bị cho kỳ thi IELTS hiệu quả. Các từ chuyên ngành được phân loại rất rõ ràng và dễ học."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div>
                  <p className="font-medium">Trần Văn Bình</p>
                  <p className="text-sm text-muted-foreground">Kỹ sư phần mềm</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-vocab-warning">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-foreground/80 mb-6">
                "Tôi thích các mini-game và phương pháp học đa dạng. Điều này giúp việc học từ vựng trở nên thú vị và không nhàm chán."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div>
                  <p className="font-medium">Lê Thị Hương</p>
                  <p className="text-sm text-muted-foreground">Giáo viên</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-vocab-primary">10,000+</p>
              <p className="text-muted-foreground">Người dùng</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-vocab-primary">25,000+</p>
              <p className="text-muted-foreground">Từ vựng</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-vocab-primary">500+</p>
              <p className="text-muted-foreground">Bài học</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-vocab-primary">98%</p>
              <p className="text-muted-foreground">Tỷ lệ hài lòng</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Preview */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Gói dịch vụ</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bắt đầu miễn phí và nâng cấp khi cần thêm tính năng nâng cao
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Miễn phí</h3>
                <p className="text-muted-foreground">Bắt đầu hành trình học ngay</p>
              </div>
              <div className="mb-6">
                <p className="text-3xl font-bold">0 VND</p>
                <p className="text-sm text-muted-foreground">Mãi mãi</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>300+ từ vựng cơ bản</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Đánh giá trình độ cơ bản</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Flashcards học từ vựng</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>2 mini-games</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Bắt đầu miễn phí</Button>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-background rounded-lg p-6 shadow-lg border-2 border-vocab-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-vocab-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Phổ biến nhất
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Premium</h3>
                <p className="text-muted-foreground">Cho những người học nghiêm túc</p>
              </div>
              <div className="mb-6">
                <p className="text-3xl font-bold">99,000 VND</p>
                <p className="text-sm text-muted-foreground">mỗi tháng</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>5,000+ từ vựng</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Đánh giá trình độ chi tiết</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Tất cả phương pháp học</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Tất cả mini-games</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Phân tích học tập nâng cao</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Học từ vựng chuyên ngành</span>
                </li>
              </ul>
              <Button className="w-full">Đăng ký ngay</Button>
            </div>
            
            {/* Business Plan */}
            <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Business</h3>
                <p className="text-muted-foreground">Cho doanh nghiệp và tổ chức</p>
              </div>
              <div className="mb-6">
                <p className="text-3xl font-bold">Liên hệ</p>
                <p className="text-sm text-muted-foreground">Giá tùy chỉnh</p>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Tất cả tính năng Premium</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Từ vựng tùy chỉnh theo ngành</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Quản lý nhóm</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Báo cáo kết quả học tập</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-vocab-success" />
                  <span>Hỗ trợ ưu tiên 24/7</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full">Liên hệ với chúng tôi</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-vocab-primary/10">
        <div className="container px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Sẵn sàng cải thiện kỹ năng tiếng Anh của bạn?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Bắt đầu hành trình học từ vựng hiệu quả ngay hôm nay. VocabMaster sẽ đồng hành cùng bạn!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg">Bắt đầu miễn phí</Button>
            </Link>
            <Link to="/assessment">
              <Button variant="outline" size="lg">
                Kiểm tra trình độ ngay
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center">
              <Clock className="h-6 w-6 text-vocab-primary mb-2" />
              <p className="font-medium">Chỉ 15 phút mỗi ngày</p>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-6 w-6 text-vocab-primary mb-2" />
              <p className="font-medium">Cải thiện nhanh chóng</p>
            </div>
            <div className="flex flex-col items-center">
              <BookOpen className="h-6 w-6 text-vocab-primary mb-2" />
              <p className="font-medium">Phương pháp khoa học</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-6 w-6 text-vocab-primary mb-2" />
              <p className="font-medium">Cộng đồng hỗ trợ</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
