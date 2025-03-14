import React, { useState } from 'react';
import { Upload, Building2, Award } from 'lucide-react';
import { useCallback } from 'react';

export function DoctorRegistration() {
  const [step, setStep] = useState(1);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // 验证文件类型和大小
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        alert('只支持 JPG 和 PNG 格式的文件');
        return;
      }
      
      if (file.size > maxSize) {
        alert('文件大小不能超过 5MB');
        return;
      }
      
      setCertificateFile(file);
    }
  }, []);

  const [clinicFiles, setClinicFiles] = useState<File[]>([]);

  const handleClinicFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      const maxFiles = 5;
  
      // 过滤无效文件
      const validFiles = Array.from(files).filter(file => 
        allowedTypes.includes(file.type) && 
        file.size <= maxSize
      ).slice(0, maxFiles);
  
      if (validFiles.length < files.length) {
        alert('只支持 JPG、PNG 格式的文件，且每个文件大小不超过 5MB，最多上传 5 张');
      }
  
      setClinicFiles(validFiles);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">医生入驻</h2>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((number) => (
          <div key={number} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              {number}
            </div>
            {number < 3 && (
              <div className={`w-24 h-1 ${
                step > number ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">基本信息</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="请输入真实姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  专业方向
                </label>
                <select className="w-full p-2 border rounded-md">
                  <option value="">请选择专业方向</option>
                  <option value="内科">内科</option>
                  <option value="外科">外科</option>
                  <option value="影像科">影像科</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  执业年限
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md"
                  placeholder="请输入执业年限"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">资质认证</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  执业证书编号
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="请输入执业证书编号"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  上传执业证书
                </label>
                <label htmlFor="certificate-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      点击或拖拽文件上传
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      支持 JPG、PNG 格式，大小不超过 5MB
                    </p>
                    {certificateFile && (
                      <p className="mt-2 text-sm text-blue-600">
                        已上传文件：{certificateFile.name}
                      </p>
                    )}
                  </div>
                </label>
                <input
                  id="certificate-upload"
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">诊所信息（选填）</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  诊所名称
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="请输入诊所名称"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  诊所地址
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="请输入详细地址"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  诊所照片
                </label>
                <label htmlFor="clinic-upload" className="cursor-pointer">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      点击或拖拽文件上传
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      最多上传 5 张照片，支持 JPG、PNG 格式，大小不超过 5MB
                    </p>
                    {clinicFiles.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {clinicFiles.map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`诊所照片 ${index + 1}`}
                              className="w-full h-20 object-cover rounded-md"
                            />
                            <button
                              onClick={() => setClinicFiles(clinicFiles.filter((_, i) => i !== index))}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </label>
                <input
                  id="clinic-upload"
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  onChange={handleClinicFileUpload}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              上一步
            </button>
          )}
          <button
            onClick={() => step < 3 ? setStep(step + 1) : console.log('Submit')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ml-auto"
          >
            {step === 3 ? '提交审核' : '下一步'}
          </button>
        </div>
      </div>
    </div>
  );
}