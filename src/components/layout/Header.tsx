
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="border-b border-border sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
      <div className="container px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-vocab-primary font-bold text-2xl font-display">VocabMaster</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/assessment" className="font-medium text-foreground/80 hover:text-vocab-primary transition-colors">
            Đánh Giá
          </Link>
          <Link to="/learn" className="font-medium text-foreground/80 hover:text-vocab-primary transition-colors">
            Học Từ Vựng
          </Link>
          <Link to="/practice" className="font-medium text-foreground/80 hover:text-vocab-primary transition-colors">
            Luyện Tập
          </Link>
          <Link to="/profile" className="font-medium text-foreground/80 hover:text-vocab-primary transition-colors">
            Hồ Sơ
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="outline" className="px-4">Đăng Nhập</Button>
          </Link>
          <Link to="/register">
            <Button className="px-4">Đăng Ký</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden py-4 px-4 sm:px-6 bg-background border-b">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/assessment" 
              className="px-2 py-2 font-medium text-foreground/80 hover:text-vocab-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Đánh Giá
            </Link>
            <Link 
              to="/learn" 
              className="px-2 py-2 font-medium text-foreground/80 hover:text-vocab-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Học Từ Vựng
            </Link>
            <Link 
              to="/practice" 
              className="px-2 py-2 font-medium text-foreground/80 hover:text-vocab-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Luyện Tập
            </Link>
            <Link 
              to="/profile" 
              className="px-2 py-2 font-medium text-foreground/80 hover:text-vocab-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hồ Sơ
            </Link>
            <div className="flex flex-col gap-2 mt-2">
              <Link to="/login">
                <Button variant="outline" className="w-full">Đăng Nhập</Button>
              </Link>
              <Link to="/register">
                <Button className="w-full">Đăng Ký</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
