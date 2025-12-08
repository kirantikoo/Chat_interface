import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from '../hooks/use-toast';

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock login
    setTimeout(() => {
      const mockUser = {
        name: loginData.email.split('@')[0],
        email: loginData.email,
        isAuthenticated: true
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in."
      });
      onAuthSuccess(mockUser);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are the same.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Mock registration
    setTimeout(() => {
      const mockUser = {
        name: registerData.name,
        email: registerData.email,
        isAuthenticated: true
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast({
        title: "Account created!",
        description: "Welcome to DigitAI!"
      });
      onAuthSuccess(mockUser);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-primary via-primary to-secondary text-white border border-white/20 shadow-2xl rounded-2xl p-6">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-white">Welcome to DigitAI</DialogTitle>
          <DialogDescription className="text-gray-200 text-sm md:text-base">
            Sign in to access all features and save your conversations
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="login" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2 bg-white/10 p-1 rounded-lg">
            <TabsTrigger value="login" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-white/80 rounded-md transition-all duration-200">Login</TabsTrigger>
            <TabsTrigger value="register" className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-white/80 rounded-md transition-all duration-200">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2.5">
                <Label htmlFor="email" className="text-white font-medium text-sm">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="password" className="text-white font-medium text-sm">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2.5">
                <Label htmlFor="name" className="text-white font-medium text-sm">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="reg-email" className="text-white font-medium text-sm">Email Address</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="reg-password" className="text-white font-medium text-sm">Password</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="confirm-password" className="text-white font-medium text-sm">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                  required
                  className="w-full bg-white/10 border border-white/30 text-white placeholder:text-gray-400 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? 'Creating account...' : 'Register'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;