import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Monitor, Smartphone, Tablet, ExternalLink, RefreshCw } from 'lucide-react';

const WebsitePreview = ({ htmlContent, isGenerating }) => {
  const [deviceMode, setDeviceMode] = useState('desktop');
  const iframeRef = React.useRef(null);

  const openInNewTab = () => {
    const html = htmlContent || defaultHTML;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(html);
      newWindow.document.close();
    }
  };

  const defaultHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Website Preview - DigitAI</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          padding: 20px;
        }
        .container {
          max-width: 800px;
          text-align: center;
          animation: fadeIn 1s ease-in;
        }
        h1 {
          font-size: 3.5rem;
          margin-bottom: 20px;
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        p {
          font-size: 1.2rem;
          line-height: 1.6;
          opacity: 0.95;
          margin-bottom: 30px;
        }
        .cta-button {
          background: white;
          color: #667eea;
          padding: 15px 40px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
        }
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Your Website Preview</h1>
        <p>Start chatting with DigitAI to create your custom website. Describe your business, and watch your site come to life in real-time!</p>
        <button class="cta-button">Get Started</button>
      </div>
    </body>
    </html>
  `;

  const getDeviceWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  const getDeviceHeight = () => {
    switch (deviceMode) {
      case 'mobile':
        return '667px';
      case 'tablet':
        return '1024px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-gray-900 rounded-lg overflow-hidden">
      {/* Preview Toolbar */}
      <div className="bg-white/5 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="text-white font-semibold text-sm md:text-base">Website Preview</h3>
          {isGenerating && (
            <div className="flex items-center gap-2 text-cyan-400 text-xs md:text-sm animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating...</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1">
          {/* Device Mode Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeviceMode('desktop')}
            className={`px-2.5 py-2 rounded-md transition-all duration-200 ${
              deviceMode === 'desktop'
                ? 'bg-cyan-600/40 text-cyan-300'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            title="Desktop view"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeviceMode('tablet')}
            className={`px-2.5 py-2 rounded-md transition-all duration-200 ${
              deviceMode === 'tablet'
                ? 'bg-cyan-600/40 text-cyan-300'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            title="Tablet view"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeviceMode('mobile')}
            className={`px-2.5 py-2 rounded-md transition-all duration-200 ${
              deviceMode === 'mobile'
                ? 'bg-cyan-600/40 text-cyan-300'
                : 'text-white/50 hover:text-white hover:bg-white/10'
            }`}
            title="Mobile view"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          
          <div className="w-px h-6 bg-white/20 mx-2"></div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={openInNewTab}
            className="px-2.5 py-2 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 hover:text-cyan-400"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Frame */}
      <div className="flex-1 bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 overflow-auto flex items-center justify-center">
        <div
          className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 border border-gray-200/10"
          style={{
            width: getDeviceWidth(),
            height: getDeviceHeight(),
            maxHeight: '100%',
            minHeight: '400px'
          }}
        >
          <iframe
            ref={iframeRef}
            srcDoc={htmlContent || defaultHTML}
            className="w-full h-full border-0"
            title="Website Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </div>
    </div>
  );
};

export default WebsitePreview;