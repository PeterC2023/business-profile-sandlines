"use client";

import React, { useState } from 'react';
import { Calendar, CheckSquare } from '@/components/ui/icons';
import { Bell, DollarSign } from '@/components/ui/icons'; 
import { Zap, PieChart } from '@/components/ui/icons/additional';
import DashboardLayout from '@/components/layout/DashboardLayout';

// Message interface
interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Quick action type
interface QuickAction {
  name: string;
  icon: React.ReactNode;
  color: string;
}

// AI Assistant page - inspired by ChatGPT with Sandlines branding
export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Sandlines AI Assistant. How can I help you manage your business today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Simulate AI response (would connect to actual AI endpoint in production)
    setTimeout(() => {
      const aiResponse: Message = {
        role: 'assistant',
        content: `I understand you're asking about "${inputValue}". Here's how I can help with that...`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  // Quick action buttons
  const quickActions: QuickAction[] = [
    { name: 'Generate Report', icon: <PieChart className="w-4 h-4" />, color: 'bg-[#6478AA]/10 text-[#6478AA]' },
    { name: 'Add Client', icon: <Bell className="w-4 h-4" />, color: 'bg-[#e57983]/10 text-[#e57983]' },
    { name: 'Schedule Meeting', icon: <Calendar className="w-4 h-4" />, color: 'bg-[#6478AA]/10 text-[#6478AA]' },
    { name: 'Create Task', icon: <CheckSquare className="w-4 h-4" />, color: 'bg-[#e57983]/10 text-[#e57983]' }
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-6rem)] max-w-5xl mx-auto overflow-hidden">
        {/* Messages container */}
        <div className="flex-1 overflow-y-auto mb-4 space-y-6 p-4">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex items-start ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-[#e57983] to-[#6478AA] rounded-xl flex items-center justify-center text-white mr-3 mt-1 shadow-md">
                  <span className="text-xs font-bold">AI</span>
                </div>
              )}
              
              <div 
                className={`max-w-3xl p-4 rounded-xl ${
                  message.role === 'assistant' 
                    ? 'bg-white border border-gray-100 text-gray-800 shadow-md' 
                    : 'bg-[#e57983]/10 text-gray-800 shadow-sm'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className="mt-2 text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-[#e57983] to-[#6478AA] rounded-xl flex items-center justify-center text-white ml-3 mt-1 shadow-md">
                  <span className="text-xs font-bold">You</span>
                </div>
              )}
            </div>
          ))}
        
          {isProcessing && (
            <div className="flex items-start justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-[#e57983] to-[#6478AA] rounded-xl flex items-center justify-center text-white mr-3 mt-1 shadow-md">
                <span className="text-xs font-bold">AI</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-[#e57983] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#e57983] rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-[#e57983] rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick action buttons */}
        <div className="flex justify-center space-x-3 mb-6">
          {quickActions.map((action, index) => (
            <button 
              key={index}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-md border border-gray-100 hover:bg-gray-50 transition-all text-gray-700 text-sm"
            >
              <div className={`p-1.5 rounded-full ${action.color}`}>
                {action.icon}
              </div>
              <span>{action.name}</span>
            </button>
          ))}
        </div>

        {/* Message input form */}
        <form 
          onSubmit={handleSendMessage} 
          className="bg-white p-3 rounded-xl border border-gray-200 mb-6 shadow-md"
        >
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Message Sandlines Assistant..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-sm py-2 px-3"
            />
            
            <button 
              type="submit"
              disabled={isProcessing || !inputValue.trim()}
              className={`p-2 rounded-xl transition-all ${
                isProcessing || !inputValue.trim() 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-gradient-to-br from-[#e57983] to-[#6478AA] text-white shadow-md'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
