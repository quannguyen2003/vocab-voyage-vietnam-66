
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; isAuthenticated: boolean } | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check for user data in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "Đăng xuất thành công",
      description: "Hẹn gặp lại bạn sớm!",
    });
    navigate("/");
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };
  
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
          {user && user.isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-vocab-primary/10 text-vocab-primary">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Hồ sơ</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/profile?tab=settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Cài đặt</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Đăng xuất</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="px-4">Đăng Nhập</Button>
              </Link>
              <Link to="/register">
                <Button className="px-4">Đăng Ký</Button>
              </Link>
            </>
          )}
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
              {user && user.isAuthenticated ? (
                <>
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-vocab-primary/10 text-vocab-primary">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => {
                      navigate("/profile");
                      setIsMenuOpen(false);
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Hồ sơ
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start"
                    onClick={() => {
                      navigate("/profile?tab=settings");
                      setIsMenuOpen(false);
                    }}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Cài đặt
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>Đăng Nhập</Button>
                  </Link>
                  <Link to="/register">
                    <Button className="w-full" onClick={() => setIsMenuOpen(false)}>Đăng Ký</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
