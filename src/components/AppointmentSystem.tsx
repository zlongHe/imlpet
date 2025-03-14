import React, { useState, useMemo } from 'react';
import { Calendar as CalendarIcon, Clock, Search, MapPin } from 'lucide-react';
import { useLocation } from '../hooks/useLocation';
import type { Doctor, TimeSlot } from '../types';

const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: '张医生',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80',
      role: 'vet',
      pets: [],
    },
    specialization: '小动物内科',
    experience: 8,
    certification: {
      number: 'VET20150123',
      imageUrl: 'https://example.com/cert.jpg',
      verificationStatus: 'verified',
    },
    clinic: {
      name: '爱宠诊所',
      address: '北京市朝阳区某某路123号',
      images: [],
      license: 'CLINIC20150123',
    },
    availableSlots: [],
  },
  {
    id: '2',
    user: {
      id: '2',
      name: '李医生',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80',
      role: 'vet',
      pets: [],
    },
    specialization: '宠物外科',
    experience: 12,
    certification: {
      number: 'VET20120456',
      imageUrl: 'https://example.com/cert.jpg',
      verificationStatus: 'verified',
    },
    clinic: {
      name: '康宠宠物医院',
      address: '北京市海淀区某某路456号',
      images: [],
      license: 'CLINIC20120456',
    },
    availableSlots: [],
  },
];

// 生成今天的时间段
function generateTimeSlots(doctorId: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  for (let hour = 9; hour < 22; hour++) {
    // 如果是今天，只显示未来的时间段
    if (hour <= currentHour) continue;

    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${hour.toString().padStart(2, '0')}:59`;
    
    slots.push({
      id: `${doctorId}-${today}-${startTime}`,
      doctorId,
      date: today,
      startTime,
      endTime,
      isBooked: Math.random() > 0.7, // 随机设置一些时段为已预约
    });
  }
  return slots;
}

export function AppointmentSystem() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const { location, loading, error } = useLocation();

  // 根据搜索词过滤医生列表
  const filteredDoctors = useMemo(() => {
    return MOCK_DOCTORS.filter(doctor => 
      doctor.user.name.includes(searchTerm) || 
      doctor.clinic.name.includes(searchTerm)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80"
          alt="Pet clinic background"
          className="w-full h-64 object-cover opacity-10"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">预约就诊</h2>
        
        {/* Search Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-2">
              <Search className="text-gray-400" />
              <input
                type="text"
                placeholder="搜索医生或诊所名称"
                className="w-full p-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <CalendarIcon className="text-gray-400" />
              <input
                type="date"
                className="w-full p-2 border rounded-md"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-gray-400" />
              <select className="w-full p-2 border rounded-md">
                {loading ? (
                  <option>正在获取位置...</option>
                ) : error ? (
                  <option>选择地区</option>
                ) : (
                  <>
                    <option value={`${location?.province}-${location?.city}`}>
                      {location?.province} {location?.city}
                    </option>
                    <option value="朝阳区">朝阳区</option>
                    <option value="海淀区">海淀区</option>
                  </>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Doctor List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={doctor.user.avatar}
                    alt={doctor.user.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{doctor.user.name}</h3>
                    <p className="text-gray-600">{doctor.specialization}</p>
                    <p className="text-gray-600">执业年限：{doctor.experience}年</p>
                    <p className="text-gray-600 flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {doctor.clinic?.name}
                    </p>
                  </div>
                </div>
                
                {/* Time Slots */}
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">可预约时段</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {generateTimeSlots(doctor.id).map((slot) => (
                      <button
                        key={slot.id}
                        disabled={slot.isBooked}
                        onClick={() => setSelectedTimeSlot(slot.id)}
                        className={`p-2 text-sm rounded-md text-center transition-colors ${
                          slot.isBooked
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : selectedTimeSlot === slot.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        }`}
                      >
                        <Clock size={14} className="inline mr-1" />
                        {slot.startTime}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Book Button */}
                {selectedTimeSlot && selectedTimeSlot.startsWith(doctor.id) && (
                  <button
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      alert('预约成功！');
                      setSelectedTimeSlot('');
                    }}
                  >
                    确认预约
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}