import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, User, Bot, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Card } from './ui/card';
import { ChatAvatar } from "./ui/avatar"
import QuickActions from './QuickActions';
import WebsitePreview from './WebsitePreview';
import AuthModal from './AuthModal';
import { generateMockAIResponse, mockUser, generateWebsiteHTML } from '../mock';
import { toast } from '../hooks/use-toast';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Welcome to DigitAI! 👋\n\nI can generate beautiful static websites for you instantly. Just describe your project, and watch your website come to life!\n\nWhat type of website would you like to create?`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [websiteHTML, setWebsiteHTML] = useState(null);
  const [isGeneratingWebsite, setIsGeneratingWebsite] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(mockUser);
  const [websiteGenerated, setWebsiteGenerated] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateWebsitePreview = (conversationContext) => {
    // Check if enough information gathered (at least 3 exchanges)
    if (conversationContext.length >= 5 && !websiteGenerated) {
      setIsGeneratingWebsite(true);
      setWebsiteGenerated(true);
      
      // Extract business info from conversation
      const businessInfo = {
        name: 'Your Business',
        tagline: 'Professional solutions for modern businesses'
      };
      
      // Simulate website generation delay
      setTimeout(() => {
        const html = generateWebsiteHTML(businessInfo);
        setWebsiteHTML(html);
        setIsGeneratingWebsite(false);
        
        toast({
          title: "✨ Website preview generated!",
          description: "Check the preview panel on the right."
        });
        
        // Show prompt to login after preview
        setTimeout(() => {
          const loginPromptMessage = {
            id: Date.now() + 999,
            type: 'ai',
            content: `🎉 Great! Your website preview is ready!\n\nLike what you see? To get the complete website files and access our expert team for customization, please login or create an account.\n\n✨ Premium features include:\n• Full source code download\n• Custom domain setup\n• Expert assistance & modifications\n• Priority support`,
            timestamp: new Date(),
            requiresAuth: true
          };
          setMessages(prev => [...prev, loginPromptMessage]);
        }, 2000);
      }, 3000);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !selectedFile) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      file: selectedFile
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const messageContent = inputValue;
    setInputValue('');
    setSelectedFile(null);
    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateMockAIResponse(messageContent, newMessages),
        timestamp: new Date()
      };
      const updatedMessages = [...newMessages, aiResponse];
      setMessages(updatedMessages);
      setIsTyping(false);
      
      // Check if we should generate website
      generateWebsitePreview(updatedMessages);
    }, 1500);
  };

  const handleQuickAction = (action) => {
    const actionMessage = {
      id: Date.now(),
      type: 'user',
      content: `I want to create a ${action.label.toLowerCase()}`,
      timestamp: new Date()
    };

    const newMessages = [...messages, actionMessage];
    setMessages(newMessages);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: generateMockAIResponse(actionMessage.content, newMessages),
        timestamp: new Date()
      };
      setMessages([...newMessages, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
      toast({
        title: "File selected",
        description: `${file.name} is ready to upload`
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    toast({
      title: "Welcome to DigitAI!",
      description: "You now have access to premium features."
    });
    
    // Add a welcome message about next steps
    const welcomeMessage = {
      id: Date.now() + 9999,
      type: 'ai',
      content: `Welcome back, ${userData.name}! 🎉\n\nNow you can:\n• Download your website files\n• Request custom modifications\n• Get expert help from our team\n• Access priority support\n\nWhat would you like to do next?`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, welcomeMessage]);
  };

  const handleLoginPrompt = () => {
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex flex-col relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-20 right-20 w-48 h-48 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Header */}
      <div className="text-center py-6 animate-fade-in relative z-10">
        <div className="flex items-center justify-center gap-4 mb-2">
          <img 
            src="src/assets/digitai-logo.png" 
            alt="DigitAI Logo" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
          />
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
            DigitAI
          </h1>
        </div>
        <p className="text-lg text-gray-200 font-light drop-shadow-md"> Website Generator</p>
        
        {/* Login Button in Header */}
        {!user.isAuthenticated && (
          <div className="mt-4">
            <Button
              onClick={() => setShowAuthModal(true)}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-full px-6 py-2.5 font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <User className="w-4 h-4 mr-2" />
              Login / Sign Up
            </Button>
          </div>
        )}
      </div>

      {/* Main Content - Split View */}
      <div className="flex-1 flex gap-4 p-4 relative z-10 overflow-hidden max-w-7xl mx-auto w-full">
        {/* Chat Panel - Left Side */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <Card className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden hover:shadow-3xl transition-shadow duration-300">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent">
              {messages.map((message) => (
                <div key={message.id} className="animate-slide-in">
                  <div
                    className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} mb-2`}
                  >
                  <ChatAvatar type={message.type} photoURL={user?.photoURL} />
                    <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      <div
                        className={`inline-block max-w-[85%] p-4 rounded-2xl transition-all duration-200 hover:shadow-lg ${
                          message.type === 'user'
                            ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                            : 'bg-white/95 text-gray-800 shadow-md'
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.content}</p>
                        {message.file && (
                          <div className="mt-2 text-xs opacity-80 flex items-center gap-1">
                            📎 <span className="truncate">{message.file.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-white/50 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Show login button after auth-required message */}
                  {message.requiresAuth && !user.isAuthenticated && (
                    <div className="flex justify-center mt-4 animate-pulse">
                      <Button
                        onClick={handleLoginPrompt}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl text-base font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                      >
                        <Lock className="w-5 h-5 mr-2" />
                        Login to Access Premium Features
                      </Button>
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 animate-pulse">
                  <Avatar className="w-10 h-10 bg-gradient-to-br from-primary to-secondary border-2 border-white/30 flex-shrink-0">
                    <AvatarFallback className="text-white bg-transparent">
                      <Bot className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white/95 p-4 rounded-2xl shadow-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/5 backdrop-blur-sm border-t border-white/10">
              <div className="flex gap-2 items-end mb-3">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe your website needs..."
                    className="w-full bg-white/95 border border-gray-300 rounded-2xl py-3 px-4 pr-10 text-gray-800 placeholder:text-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm shadow-sm"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-600 transition-colors duration-200 hover:scale-110"
                    title="Attach file"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() && !selectedFile}
                  className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {selectedFile && (
                <div className="mb-3 p-2.5 bg-cyan-500/20 border border-cyan-400/30 rounded-lg text-white text-xs flex items-center justify-between animate-slide-in">
                  <span className="flex items-center gap-2">📎 <span className="truncate">{selectedFile.name}</span></span>
                  <button onClick={() => setSelectedFile(null)} className="text-white/70 hover:text-white transition-colors ml-2">
                    ✕
                  </button>
                </div>
              )}

              {/* Quick Actions */}
              <QuickActions onActionClick={handleQuickAction} />
            </div>
          </Card>
        </div>

        {/* Website Preview Panel - Right Side */}
        <div className="hidden lg:flex lg:w-1/2 flex-col">
          <Card className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300">
            <WebsitePreview 
              htmlContent={websiteHTML} 
              isGenerating={isGeneratingWebsite}
            />
          </Card>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default ChatInterface;