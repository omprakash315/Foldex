import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Target, 
  Award,
  BarChart3,
  Download,
  Share2
} from 'lucide-react';

const MonthlyReport = () => {
  // Mock data for monthly report
  const currentMonth = "January 2024";
  const metrics = {
    totalPosts: 12,
    totalLikes: 2840,
    totalComments: 456,
    totalShares: 189,
    totalReach: 45200,
    avgEngagement: 8.4,
    followerGrowth: 340,
    topPerformingPost: {
      content: "Excited to announce our latest AI-driven analytics platform! 🚀",
      likes: 247,
      comments: 32,
      shares: 18,
      reach: 3240
    }
  };

  const previousMonth = {
    totalPosts: 10,
    totalLikes: 2100,
    totalComments: 320,
    totalShares: 145,
    avgEngagement: 7.2,
    followerGrowth: 280
  };

  const calculateGrowth = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    return {
      percentage: Math.abs(growth).toFixed(1),
      isPositive: growth >= 0
    };
  };

  const MetricCard = ({ 
    title, 
    current, 
    previous, 
    icon: Icon, 
    suffix = "" 
  }: { 
    title: string; 
    current: number; 
    previous: number; 
    icon: any; 
    suffix?: string; 
  }) => {
    const growth = calculateGrowth(current, previous);
    
    return (
      <Card className="bg-gradient-to-br from-card to-card/80 shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Icon className="h-8 w-8 text-primary" />
            <Badge 
              className={growth.isPositive ? 'bg-success text-white' : 'bg-destructive text-white'}
            >
              {growth.isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
              {growth.percentage}%
            </Badge>
          </div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">
            {current.toLocaleString()}{suffix}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            vs. {previous.toLocaleString()}{suffix} last month
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-8">
      {/* Report Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold flex items-center">
            <Calendar className="h-8 w-8 mr-3 text-primary" />
            {currentMonth} Report
          </h2>
          <p className="text-muted-foreground mt-2">
            Complete overview of your LinkedIn performance this month
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Share2 className="h-4 w-4 mr-2" />
            Share Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Total Posts"
          current={metrics.totalPosts}
          previous={previousMonth.totalPosts}
          icon={BarChart3}
        />
        <MetricCard
          title="Total Likes"
          current={metrics.totalLikes}
          previous={previousMonth.totalLikes}
          icon={TrendingUp}
        />
        <MetricCard
          title="Total Comments"
          current={metrics.totalComments}
          previous={previousMonth.totalComments}
          icon={TrendingUp}
        />
        <MetricCard
          title="Total Shares"
          current={metrics.totalShares}
          previous={previousMonth.totalShares}
          icon={Share2}
        />
        <MetricCard
          title="Average Engagement"
          current={metrics.avgEngagement}
          previous={previousMonth.avgEngagement}
          icon={Target}
          suffix="%"
        />
        <MetricCard
          title="Follower Growth"
          current={metrics.followerGrowth}
          previous={previousMonth.followerGrowth}
          icon={TrendingUp}
        />
      </div>

      {/* Best Performing Post */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-6 w-6 mr-3 text-accent" />
            Best Performing Post
          </CardTitle>
          <CardDescription>
            Your top post this month by total engagement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <p className="text-foreground font-medium leading-relaxed">
              {metrics.topPerformingPost.content}
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <p className="text-2xl font-bold text-primary">
                {metrics.topPerformingPost.likes}
              </p>
              <p className="text-sm text-muted-foreground">Likes</p>
            </div>
            <div className="text-center p-3 bg-accent/5 rounded-lg">
              <p className="text-2xl font-bold text-accent">
                {metrics.topPerformingPost.comments}
              </p>
              <p className="text-sm text-muted-foreground">Comments</p>
            </div>
            <div className="text-center p-3 bg-linkedin/5 rounded-lg">
              <p className="text-2xl font-bold text-linkedin">
                {metrics.topPerformingPost.shares}
              </p>
              <p className="text-sm text-muted-foreground">Shares</p>
            </div>
            <div className="text-center p-3 bg-success/5 rounded-lg">
              <p className="text-2xl font-bold text-success">
                {metrics.topPerformingPost.reach.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Reach</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights & Recommendations */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-6 w-6 mr-3 text-primary" />
            AI Insights & Recommendations
          </CardTitle>
          <CardDescription>
            Data-driven suggestions to improve your LinkedIn performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-start space-x-3 p-4 bg-success/5 rounded-lg border-l-4 border-success">
              <TrendingUp className="h-5 w-5 text-success mt-0.5" />
              <div>
                <h4 className="font-medium text-success">Strong Growth</h4>
                <p className="text-sm text-muted-foreground">
                  Your engagement rate increased by 1.2% this month. Keep posting consistently!
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-primary/5 rounded-lg border-l-4 border-primary">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-primary">Optimal Timing</h4>
                <p className="text-sm text-muted-foreground">
                  Your best performing posts were published on Tuesday and Thursday mornings.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-accent/5 rounded-lg border-l-4 border-accent">
              <Award className="h-5 w-5 text-accent mt-0.5" />
              <div>
                <h4 className="font-medium text-accent">Content Strategy</h4>
                <p className="text-sm text-muted-foreground">
                  AI and Innovation topics generated 40% more engagement than other content.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Outstanding Month! 🎉
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            You've achieved a <span className="font-bold text-success">8.4% average engagement rate</span> 
            {' '}and gained <span className="font-bold text-primary">{metrics.followerGrowth} new followers</span>. 
            Your content strategy is clearly resonating with your audience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyReport;