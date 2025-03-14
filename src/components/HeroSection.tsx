import React from 'react';
import { Search, Calendar, MessageCircle } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (view: 'appointment' | 'consultation') => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="relative bg-blue-600">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover opacity-20"
          src="https://images.unsplash.com/photo-1587560699334-cc4ff634909a?auto=format&fit=crop&q=80"
          alt="Pet care background"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          专业的宠物医疗服务平台
        </h1>
        <p className="mt-6 text-xl text-blue-100 max-w-3xl">
          连接专业兽医和宠物主人，提供全方位的宠物健康服务
        </p>
        
        <div className="mt-10 flex flex-wrap gap-4">
          <ActionButton icon={<Search />} text="找医生" onClick={() => onNavigate('appointment')} />
          <ActionButton icon={<Calendar />} text="预约就诊" onClick={() => onNavigate('appointment')} />
          <ActionButton icon={<MessageCircle />} text="在线咨询" onClick={() => onNavigate('consultation')} />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, text, onClick }: { icon: React.ReactNode; text: string; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-sm transition-colors duration-150"
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
}