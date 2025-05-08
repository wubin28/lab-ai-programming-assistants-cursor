
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, FileText } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-screen bg-sidebar-background border-r border-sidebar-border w-64 p-4 flex flex-col">
      <div className="pb-4 border-b border-sidebar-border">
        <h2 className="text-xl font-semibold">Chat</h2>
        <p className="text-sm text-gray-500 mt-1">
          Optimize prompts to make them fluent and clear.
        </p>
      </div>
      
      <div className="mt-4">
        <Button className="w-full flex items-center justify-start gap-2" variant="default">
          <FileText size={16} />
          <span>New Session</span>
        </Button>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center gap-2 text-gray-500 mb-2">
          <Clock size={16} />
          <span className="text-sm font-medium">History</span>
        </div>
        
        <div className="space-y-1 mt-2">
          {/* <a href="#" className="sidebar-link">
            提示词优化要素
          </a>
          <a href="#" className="sidebar-link">
            免费AI工具推荐
          </a> */}
        </div>
      </div>
      
      <div className="mt-auto text-xs text-center text-gray-400 py-4">
        © 2025 Promptyoo-1
      </div>
    </div>
  );
};

export default Sidebar;
