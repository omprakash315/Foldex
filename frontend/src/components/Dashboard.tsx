import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Heart, 
  MessageCircle, 
  Share2, 
  Eye,
  Calendar,
  Plus,
  LogOut
} from 'lucide-react';
import foldaxLogo from '@/assets/foldax-logo.jpg';
import PostCreator from './PostCreator';
import MonthlyReport from './MonthlyReport';

interface DashboardProps {
  onLogout: () => void;
}

// Mock data for LinkedIn posts
const mockPosts = [
  {
    id: 1,
    content: "Excited to announce our latest AI-driven analytics platform! 🚀 #Innovation #AI #Analytics",
    timestamp: "2024-01-15T10:30:00Z",
    likes: 247,
    comments: 32,
    shares: 18,
    reach: 3240,
    engagement: 9.2,
    sentiment: "positive",
    topics: ["AI", "Analytics", "Innovation"],
    performance: "high"
  },
  {
    id: 2,
    content: "Great insights from our recent webinar on data visualization best practices. Thank you to everyone who attended! 📊",
    timestamp: "2024-01-12T14:20:00Z",
    likes: 156,
    comments: 24,
    shares: 12,
    reach: 2180,
    engagement: 8.8,
    sentiment: "positive",
    topics: ["Data Visualization", "Webinar", "Best Practices"],
    performance: "medium"
  },
  {
    id: 3,
    content: "Reflecting on the importance of data-driven decision making in today's business landscape.",
    timestamp: "2024-01-10T09:15:00Z",
    likes: 89,
    comments: 15,
    shares: 7,
    reach: 1456,
    engagement: 7.6,
    sentiment: "neutral",
    topics: ["Data-Driven", "Business", "Decision Making"],
    performance: "low"
  }
];

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("posts");
  const [showPostCreator, setShowPostCreator] = useState(false);

  const getPerformanceBadgeColor = (performance: string) => {
    switch (performance) {
      case 'high': return 'bg-success text-white';
      case 'medium': return 'bg-warning text-white';
      case 'low': return 'bg-destructive text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={foldaxLogo} alt="Foldax" className="h-8 w-8 rounded-lg" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Foldax Insights</h1>
              <p className="text-sm text-muted-foreground">LinkedIn Analytics Hub</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              onClick={() => setShowPostCreator(true)}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>FX</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={onLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
                  <p className="text-2xl font-bold text-foreground">47</p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Reach</p>
                  <p className="text-2xl font-bold text-foreground">98.2K</p>
                </div>
                <Eye className="h-8 w-8 text-linkedin" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                  <p className="text-2xl font-bold text-foreground">8.4%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Followers</p>
                  <p className="text-2xl font-bold text-foreground">12.8K</p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="posts">Recent Posts</TabsTrigger>
            <TabsTrigger value="reports">Monthly Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {mockPosts.map((post) => (
              <Card key={post.id} className="shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getPerformanceBadgeColor(post.performance)}>
                          {post.performance} performance
                        </Badge>
                        <span className={`text-sm ${getSentimentColor(post.sentiment)}`}>
                          {post.sentiment} sentiment
                        </span>
                      </div>
                      <CardTitle className="text-lg leading-relaxed">{post.content}</CardTitle>
                      <CardDescription className="flex items-center mt-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Engagement Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium">{post.likes}</span>
                      <span className="text-xs text-muted-foreground">likes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{post.comments}</span>
                      <span className="text-xs text-muted-foreground">comments</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Share2 className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">{post.shares}</span>
                      <span className="text-xs text-muted-foreground">shares</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Eye className="h-4 w-4 text-linkedin" />
                      <span className="text-sm font-medium">{post.reach.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">reach</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="text-sm font-medium">{post.engagement}%</span>
                      <span className="text-xs text-muted-foreground">engagement</span>
                    </div>
                  </div>

                  {/* Topics */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {post.topics.map((topic, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Analysis */}
                  <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                    <h4 className="font-medium text-sm">AI Analysis:</h4>
                    <p className="text-sm text-muted-foreground">
                      This post performed {post.performance === 'high' ? 'exceptionally well' : 
                        post.performance === 'medium' ? 'moderately well' : 'below average'} 
                      {' '}with a {post.engagement}% engagement rate. 
                      {post.performance === 'high' && ' Consider similar content for future posts.'}
                      {post.performance === 'medium' && ' Adding more visual elements could improve engagement.'}
                      {post.performance === 'low' && ' Try posting at peak hours or with more engaging visuals.'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="reports">
            <MonthlyReport />
          </TabsContent>
        </Tabs>
      </main>

      {/* Post Creator Modal */}
      {showPostCreator && (
        <PostCreator onClose={() => setShowPostCreator(false)} />
      )}
    </div>
  );
};

export default Dashboard;