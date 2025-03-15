import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AppointmentSystem } from './components/AppointmentSystem';
import { DoctorRegistration } from './components/DoctorRegistration';
import { ChatDialog } from './components/ChatDialog';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'appointment' | 'registration' | 'consultation' | 'profile'>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleNavigate = (view: 'home' | 'appointment' | 'registration' | 'consultation' | 'profile') => {
    if (view === 'consultation') {
      setIsChatOpen(true);
    } else {
      setCurrentView(view);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onNavigate={handleNavigate} />
      <main>
        {currentView === 'home' && (
          <>
            <HeroSection onNavigate={handleNavigate} />
            {/* Services Section */}
            <section className="py-16 px-4 max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                我们的服务
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ServiceCard
                  title="在线问诊"
                  description="随时随地与专业兽医在线交流，获取专业建议"
                  imageUrl="https://images.unsplash.com/photo-1583336663277-620dc1996580?auto=format&fit=crop&q=80"
                  onClick={() => handleNavigate('consultation')}
                />
                <ServiceCard
                  title="预约就医"
                  description="便捷的线上预约系统，节省您的等待时间"
                  imageUrl="https://images.unsplash.com/photo-1578496480157-697fc14d2e55?auto=format&fit=crop&q=80"
                  onClick={() => handleNavigate('appointment')}
                />
                <ServiceCard
                  title="医生入驻"
                  description="欢迎专业兽医加入我们的平台"
                  imageUrl="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80"
                  onClick={() => handleNavigate('registration')}
                />
              </div>
            </section>
          </>
        )}

        {currentView === 'appointment' && <AppointmentSystem />}
        {currentView === 'registration' && <DoctorRegistration />}
      </main>
      <ChatDialog isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

function ServiceCard({ title, description, imageUrl, onClick }: {
  title: string;
  description: string;
  imageUrl: string;
  onClick?: () => void;
}) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

export default App;