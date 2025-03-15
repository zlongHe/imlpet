import React from 'react';
import { Menu, Home, User, Stethoscope, Calendar, MessageCircle } from 'lucide-react';

interface NavigationProps {
  onNavigate: (view: 'home' | 'appointment' | 'consultation' | 'profile' | 'registration') => void;
}

import { useCallback } from 'react';

export function Navigation({ onNavigate }: NavigationProps) {
  const handleClick = useCallback((view: Parameters<NavigationProps['onNavigate']>[0]) => {
    try {
      console.log(`Navigating to: ${view}`);
      if (typeof onNavigate === 'function') {
        onNavigate(view);
      } else {
        console.error('onNavigate is not a function');
      }
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [onNavigate]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="flex items-center space-x-2 cursor-pointer" onClick={() => handleClick('home')}>
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">PetCare+</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink icon={<Home size={20} />} text="首页" onClick={() => handleClick('home')} />
            <NavLink icon={<Calendar size={20} />} text="预约" onClick={() => handleClick('appointment')} />
            <NavLink icon={<MessageCircle size={20} />} text="在线咨询" onClick={() => handleClick('consultation')} />
            <NavLink icon={<User size={20} />} text="我的" onClick={() => handleClick('profile')} />
          </div>

          <div className="md:hidden flex items-center">
            <button className="text-gray-500 hover:text-gray-700">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ icon, text, onClick }: { icon: React.ReactNode; text: string; onClick: () => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
  };

  return (
    <button 
      onClick={handleClick} 
      className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
}