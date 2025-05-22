
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BarChart, LineChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  User,
  Award,
  Flame,
  Settings,
  BarChart2,
  Clock,
  Calendar,
  Bell,
  BookOpen
} from "lucide-react";

// Sample data for charts
const learningData = [
  { name: "T2", minutes: 15, words: 12 },
  { name: "T3", minutes: 20, words: 15 },
  { name: "T4", minutes: 10, words: 8 },
  { name: "T5", minutes: 25, words: 18 },
  { name: "T6", minutes: 15, words: 10 },
  { name: "T7", minutes: 5, words: 4 },
  { name: "CN", minutes: 30, words: 22 },
];

const masteryData = [
  { name: "Mới học", value: 45 },
  { name: "Đang học", value: 30 },
  { name: "Quen thuộc", value: 15 },
  { name: "Thành thạo", value: 10 },
];

// Sample achievements data
const achievements = [
  { id: 1, title: "Khởi đầu tốt đẹp", description: "Học từ vựng 7 ngày liên tiếp", completed: true },
  { id: 2, title: "Siêu trí nhớ", description: "Nhớ 50 từ vựng ở mức thành thạo", completed: false },
  { id: 3, title: "Người học chăm chỉ", description: "Hoàn thành mục tiêu hàng ngày 10 lần", completed: true },
  { id: 4, title: "Bậc thầy phát âm", description: "Đạt điểm tuyệt đối trong bài kiểm tra phát âm", completed: false },
  { id: 5, title: "Cao thủ từ vựng", description: "Học 500 từ vựng mới", completed: false },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [settings, setSettings] = useState({
    dailyGoal: 15,
    reminderTime: "08:00",
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    topics: ["technology", "business"]
  });
  
  // Sample user data
  const user = {
    name: "Nguyễn Văn A",
    email: "nguyen.van.a@example.com",
    streak: 7,
    level: 3,
    wordsLearned: 102,
    minutesLearned: 240,
    progress: 65,
    nextLevel: 5,
    avatar: null, // Placeholder for avatar
  };

  const handleSettingsChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Hồ Sơ Cá Nhân</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - User info */}
          <div className="col-span-1">
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-vocab-primary/10 text-vocab-primary flex items-center justify-center mr-2">
                      <span className="font-medium">{user.level}</span>
                    </div>
                    <span className="font-medium">Cấp độ {user.level}</span>
                  </div>
                  
                  <div className="w-full mt-2 mb-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{user.progress}%</span>
                      <span>Cấp {user.nextLevel}</span>
                    </div>
                    <Progress value={user.progress} className="h-2" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="flex justify-center">
                      <Flame className="h-5 w-5 text-vocab-accent mb-1" />
                    </div>
                    <p className="text-2xl font-bold">{user.streak}</p>
                    <p className="text-xs text-muted-foreground">Ngày liên tiếp</p>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="flex justify-center">
                      <BookOpen className="h-5 w-5 text-vocab-primary mb-1" />
                    </div>
                    <p className="text-2xl font-bold">{user.wordsLearned}</p>
                    <p className="text-xs text-muted-foreground">Từ đã học</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="h-5 w-5 mr-2 text-vocab-warning" />
                  Thành tích
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-3 rounded-lg border ${achievement.completed ? 'bg-green-50 border-green-200' : 'bg-muted border-muted'}`}
                    >
                      <div className="flex items-start">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                          achievement.completed ? 'bg-green-100 text-green-600' : 'bg-muted-foreground/20 text-muted-foreground'
                        }`}>
                          <Award className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{achievement.title}</p>
                          <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Xem tất cả thành tích
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Right column - Analytics and settings */}
          <div className="col-span-1 lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="overview" className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Tổng quan
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Cài đặt
                </TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="mt-6 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Tiến độ học tập</CardTitle>
                    <CardDescription>7 ngày gần nhất</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={learningData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" orientation="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="minutes"
                            name="Phút học"
                            stroke="#6366f1"
                            activeDot={{ r: 8 }}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="words"
                            name="Từ đã học"
                            stroke="#8b5cf6"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Mức độ thành thạo từ vựng</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={masteryData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" name="Số lượng từ" fill="#6366f1" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Từ vựng gần đây</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["diligent", "meticulous", "perseverance", "ambiguous", "benevolent"].map((word, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border border-border rounded-lg">
                          <div>
                            <p className="font-medium">{word}</p>
                            <p className="text-xs text-muted-foreground">Đã học 2 ngày trước</p>
                          </div>
                          <div className="flex items-center">
                            <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2" />
                            <span className="text-xs text-muted-foreground">Đang học</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Xem tất cả từ vựng
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Settings Tab */}
              <TabsContent value="settings" className="mt-6 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Clock className="h-5 w-5 mr-2" />
                      Mục tiêu học tập
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Mục tiêu hàng ngày (số từ vựng)</Label>
                      <div className="flex flex-col space-y-3">
                        <Slider
                          value={[settings.dailyGoal]}
                          min={5}
                          max={50}
                          step={5}
                          onValueChange={(value) => handleSettingsChange('dailyGoal', value[0])}
                        />
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">5</span>
                          <span className="text-sm font-medium">{settings.dailyGoal} từ</span>
                          <span className="text-sm text-muted-foreground">50</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="reminderTime">Thời gian nhắc nhở</Label>
                      <Input
                        id="reminderTime"
                        type="time"
                        value={settings.reminderTime}
                        onChange={(e) => handleSettingsChange('reminderTime', e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">Chúng tôi sẽ gửi thông báo nhắc nhở bạn học vào thời gian này.</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Bell className="h-5 w-5 mr-2" />
                      Thông báo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notifications" className="cursor-pointer">Thông báo hàng ngày</Label>
                      <Switch
                        id="notifications"
                        checked={settings.notifications}
                        onCheckedChange={(checked) => handleSettingsChange('notifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Label htmlFor="emailUpdates" className="cursor-pointer">Cập nhật qua email</Label>
                      <Switch
                        id="emailUpdates"
                        checked={settings.emailUpdates}
                        onCheckedChange={(checked) => handleSettingsChange('emailUpdates', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BookOpen className="h-5 w-5 mr-2" />
                      Tùy chọn nội dung
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="topics">Chủ đề quan tâm</Label>
                      <Select
                        defaultValue="technology"
                        onValueChange={(value) => handleSettingsChange('topics', [...settings.topics, value])}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn chủ đề" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Công nghệ</SelectItem>
                          <SelectItem value="business">Kinh doanh</SelectItem>
                          <SelectItem value="science">Khoa học</SelectItem>
                          <SelectItem value="arts">Nghệ thuật</SelectItem>
                          <SelectItem value="health">Y tế & Sức khỏe</SelectItem>
                          <SelectItem value="travel">Du lịch</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {settings.topics.map((topic) => (
                          <div key={topic} className="flex items-center bg-muted px-3 py-1 rounded-full text-xs">
                            <span>
                              {
                                {
                                  'technology': 'Công nghệ',
                                  'business': 'Kinh doanh',
                                  'science': 'Khoa học',
                                  'arts': 'Nghệ thuật',
                                  'health': 'Y tế & Sức khỏe',
                                  'travel': 'Du lịch'
                                }[topic]
                              }
                            </span>
                            <button
                              className="ml-2 text-muted-foreground hover:text-foreground"
                              onClick={() => handleSettingsChange(
                                'topics', 
                                settings.topics.filter(t => t !== topic)
                              )}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Tài khoản
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full">Đổi mật khẩu</Button>
                    <Button variant="outline" className="w-full text-red-500 hover:text-red-600">Đăng xuất</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
