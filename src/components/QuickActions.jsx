import React from 'react';
import { Briefcase, User, FileText, ShoppingCart, Newspaper } from 'lucide-react';
import { Button } from './ui/button';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    { id: 1, icon: Briefcase, label: 'Business Website', action: 'business_website' },
    { id: 2, icon: User, label: 'Portfolio Site', action: 'portfolio' },
    { id: 3, icon: FileText, label: 'Landing Page', action: 'landing_page' },
    { id: 4, icon: ShoppingCart, label: 'E-commerce', action: 'ecommerce' },
    { id: 5, icon: Newspaper, label: 'Blog', action: 'blog' }
  ];

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center mt-4 px-2">
      {actions.map((action) => {
        const IconComponent = action.icon;
        return (
          <Button
            key={action.id}
            onClick={() => onActionClick(action)}
            variant="outline"
            className="bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 whitespace-nowrap"
          >
            <IconComponent className="w-4 h-4 flex-shrink-0" />
            <span className="hidden sm:inline">{action.label}</span>
            <span className="inline sm:hidden">{action.label.split(' ')[0]}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default QuickActions;