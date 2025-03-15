import React from 'react';

interface ChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatDialog: React.FC<ChatDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        {/* 标题栏 */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">AI</span>
            </div>
            <h3 className="text-lg font-semibold">在线咨询</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        {/* 聊天内容区域 */}
        <div className="p-4 h-96 overflow-y-auto space-y-4">
          {/* 用户消息 */}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg max-w-[70%]">
              <p>你好，我想咨询一下宠物健康问题</p>
            </div>
          </div>

          {/* AI 消息 */}
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg max-w-[70%]">
              <p>您好，请问您的宠物有什么症状吗？</p>
            </div>
          </div>
        </div>

        {/* 输入区域 */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="输入消息..."
              className="flex-1 p-2 border rounded-lg focus:outline-none"
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};