// Mock data for DigitAI website generator

export const mockUser = {
  name: 'Guest',
  isAuthenticated: false,
  email: null,
  hasSubscription: false
};

export const quickActions = [
  { id: 1, label: 'Business Website', action: 'business_website' },
  { id: 2, label: 'Portfolio Site', action: 'portfolio' },
  { id: 3, label: 'Landing Page', action: 'landing_page' },
  { id: 4, label: 'E-commerce', action: 'ecommerce' },
  { id: 5, label: 'Blog', action: 'blog' }
];

export const mockAIResponses = {
  business_website: "Great choice! Let me help you create a professional business website. Please tell me:\n\n1. What's your business name and industry?\n2. What services or products do you offer?\n3. What's your target audience?\n4. Any specific colors or branding preferences?",
  portfolio: "Perfect! I'll help you build a stunning portfolio. Tell me:\n\n1. What's your profession? (Designer, Developer, Artist, etc.)\n2. What type of work do you want to showcase?\n3. Do you have a preferred style? (Minimal, Bold, Creative)\n4. Any color preferences?",
  landing_page: "Excellent! Let's create a high-converting landing page. I need:\n\n1. What product/service are you promoting?\n2. Who is your target customer?\n3. What's the main action you want visitors to take?\n4. Any design preferences?",
  ecommerce: "Great! Let's build your online store. Please share:\n\n1. What products will you sell?\n2. How many products initially?\n3. Your brand name and style\n4. Target customer demographics",
  blog: "Nice! Let's create your blog. Tell me:\n\n1. What topics will you write about?\n2. Your blog name\n3. Target audience\n4. Preferred style (Professional, Casual, Minimalist)",
  default: "I'll help you create a beautiful static website! Please describe:\n\n1. What type of website do you need?\n2. What's the main purpose?\n3. Who is your target audience?\n4. Any design preferences?"
};

export const generateMockAIResponse = (userMessage, conversationContext = []) => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check if this is a follow-up with more details
  if (conversationContext.length > 2) {
    return "Perfect! I have all the information I need. Let me generate your website preview now... \n\n✨ Your custom website is being created based on your requirements!";
  }
  
  if (lowerMessage.includes('business') || lowerMessage.includes('company')) {
    return mockAIResponses.business_website;
  }
  
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('showcase')) {
    return mockAIResponses.portfolio;
  }
  
  if (lowerMessage.includes('landing') || lowerMessage.includes('product')) {
    return mockAIResponses.landing_page;
  }
  
  if (lowerMessage.includes('ecommerce') || lowerMessage.includes('shop') || lowerMessage.includes('store')) {
    return mockAIResponses.ecommerce;
  }
  
  if (lowerMessage.includes('blog') || lowerMessage.includes('article')) {
    return mockAIResponses.blog;
  }
  
  if (lowerMessage.includes('website') || lowerMessage.includes('web') || lowerMessage.includes('site')) {
    return mockAIResponses.default;
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return `Hello! Welcome to DigitAI - your AI-powered website generator. \n\nI can create beautiful static websites for you instantly. Just describe what you need, and I'll generate a preview for you!\n\nWhat type of website would you like to create?`;
  }
  
  // Default response encouraging more details
  return `Thanks for sharing that! To create the perfect website for you, could you provide a bit more detail about:\n\n• Your business/project name\n• Target audience\n• Main goals for the website\n• Any color or style preferences`;
};

export const generateWebsiteHTML = (businessInfo) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${businessInfo.name || 'Your Business'} - Professional Website</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          line-height: 1.6;
          color: #333;
        }
        
        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
          color: white;
          padding: 100px 20px;
          text-align: center;
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-content {
          max-width: 800px;
          animation: fadeInUp 1s ease;
        }
        
        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 20px;
          font-weight: 700;
        }
        
        .hero p {
          font-size: 1.3rem;
          margin-bottom: 30px;
          opacity: 0.95;
        }
        
        .cta-button {
          display: inline-block;
          background: white;
          color: #0891b2;
          padding: 15px 40px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        
        /* Features Section */
        .features {
          padding: 80px 20px;
          background: #f8f9fa;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 50px;
          color: #333;
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .feature-card {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
        }
        
        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #0891b2;
        }
        
        /* Footer */
        .footer {
          background: #2d3748;
          color: white;
          padding: 40px 20px;
          text-align: center;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2.5rem;
          }
          .hero p {
            font-size: 1.1rem;
          }
        }
      </style>
    </head>
    <body>
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <h1>${businessInfo.name || 'Your Business Name'}</h1>
          <p>${businessInfo.tagline || 'Transform your business with our innovative solutions. We deliver excellence and drive results.'}</p>
          <a href="#" class="cta-button">Get Started</a>
        </div>
      </section>
      
      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <h2 class="section-title">Why Choose Us</h2>
          <div class="feature-grid">
            <div class="feature-card">
              <h3>Professional Quality</h3>
              <p>High-quality solutions tailored to your specific needs and requirements.</p>
            </div>
            <div class="feature-card">
              <h3>Fast Delivery</h3>
              <p>Quick turnaround times without compromising on quality or attention to detail.</p>
            </div>
            <div class="feature-card">
              <h3>Expert Support</h3>
              <p>Dedicated team ready to help you succeed and grow your business.</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Footer -->
      <footer class="footer">
        <p>&copy; 2025 ${businessInfo.name || 'Your Business'}. All rights reserved.</p>
        <p style="margin-top: 10px; font-size: 0.9rem; opacity: 0.8;">Website generated by DigitAI</p>
      </footer>
    </body>
    </html>
  `;
};

export const mockWebsitePreview = {
  html: generateWebsiteHTML({ name: 'Your Business', tagline: 'Professional solutions for modern businesses' })
};

export const mockConversationHistory = [];