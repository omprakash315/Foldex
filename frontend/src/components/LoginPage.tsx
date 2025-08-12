import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import foldaxLogo from '@/assets/foldax-logo.jpg';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = '/api/auth/google';
  };

  const handleLinkedInLogin = () => {
    setIsLoading(true);
    window.location.href = '/api/auth/linkedin';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Company Branding */}
        <div className="text-center mb-8">
          <img 
            src={foldaxLogo} 
            alt="Foldax" 
            className="h-16 w-16 mx-auto mb-4 rounded-xl shadow-lg"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Foldax Insights
          </h1>
          <p className="text-muted-foreground mt-2">
            LinkedIn Analytics & Management Platform
          </p>
        </div>

        <Card className="shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Welcome to Foldax
            </CardTitle>
            <CardDescription className="text-center">
              Connect your LinkedIn account to start managing your posts and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={handleLinkedInLogin}
                disabled={isLoading}
                className="w-full h-11 bg-[#0077B5] hover:bg-[#006699] text-white transition-all duration-300"
              >
                {isLoading ? 'Connecting...' : 'Continue with LinkedIn'}
              </Button>
              
              <Button 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full h-11 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 transition-all duration-300"
              >
                {isLoading ? 'Connecting...' : 'Continue with Google'}
              </Button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-muted-foreground">
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Foldax. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
