import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Send, Image, Calendar, Hash } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostCreatorProps {
  onClose: () => void;
}

const PostCreator = ({ onClose }: PostCreatorProps) => {
  const [content, setContent] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const { toast } = useToast();

  const suggestedTopics = [
    'AI', 'Analytics', 'Innovation', 'Technology', 'DataScience', 'Business',
    'Leadership', 'Growth', 'Productivity', 'Industry4.0', 'DigitalTransformation'
  ];

  const handleTopicToggle = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handlePost = () => {
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    // Mock posting - in real app would connect to LinkedIn API
    toast({
      title: "Success",
      description: "Your post has been scheduled for publishing!",
    });
    onClose();
  };

  const estimatedReach = Math.floor(content.length * 50 + selectedTopics.length * 200 + Math.random() * 1000);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl">Create LinkedIn Post</CardTitle>
            <CardDescription>
              Compose and schedule your LinkedIn content
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Content Input */}
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Post Content
            </label>
            <Textarea
              id="content"
              placeholder="What would you like to share with your network?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={3000}
            />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{content.length}/3000 characters</span>
              <span>Estimated reach: {estimatedReach.toLocaleString()}</span>
            </div>
          </div>

          {/* Topic Selection */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Hash className="h-4 w-4" />
              <label className="text-sm font-medium">Add Topics</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTopics.map((topic) => (
                <Badge
                  key={topic}
                  variant={selectedTopics.includes(topic) ? "default" : "outline"}
                  className="cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => handleTopicToggle(topic)}
                >
                  #{topic}
                </Badge>
              ))}
            </div>
            {selectedTopics.length > 0 && (
              <div className="text-xs text-muted-foreground">
                Selected: {selectedTopics.join(', ')}
              </div>
            )}
          </div>

          {/* Additional Options */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Image className="h-6 w-6" />
              <span className="text-sm">Add Image</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Calendar className="h-6 w-6" />
              <span className="text-sm">Schedule</span>
            </Button>
          </div>

          {/* AI Suggestions */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-sm flex items-center">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              AI Suggestions
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Add an engaging question to increase comments</li>
              <li>• Consider posting between 8-10 AM for better reach</li>
              <li>• Include 3-5 hashtags for optimal visibility</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handlePost}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover"
            >
              <Send className="h-4 w-4 mr-2" />
              Post Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostCreator;