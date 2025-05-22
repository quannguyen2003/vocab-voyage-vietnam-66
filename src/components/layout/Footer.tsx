
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">VocabMaster</h3>
            <p className="text-sm text-foreground/70 mb-4">
              Nền tảng học từ vựng tiếng Anh cá nhân hóa giúp bạn đạt mục tiêu nhanh chóng và hiệu quả.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Tính Năng</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/assessment" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  Đánh Giá Từ Vựng
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  Học Từ Vựng
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  Luyện Tập & Game
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  Cộng Đồng
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Tài Khoản</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/register" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  Đăng Ký
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  Đăng Nhập
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  Hồ Sơ Cá Nhân
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Liên Hệ & Hỗ Trợ</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
                  Hỗ Trợ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-foreground/70">
            © 2025 VocabMaster. Đã đăng ký Bản quyền.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link to="/privacy" className="text-sm text-foreground/70 hover:text-vocab-primary transition-colors">
              Chính sách riêng tư
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
