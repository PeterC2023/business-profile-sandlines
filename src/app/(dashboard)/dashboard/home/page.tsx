"use client";

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Link from 'next/link';
import { Calendar, CheckSquare } from '@/components/ui/icons';
import { Bell, DollarSign } from '@/components/ui/icons';
import { PieChart } from '@/components/ui/icons/additional';

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard number={5} label="Overdue Tasks" color="text-[#e62e4d]" />
          <StatCard number={12} label="Active Tasks" color="text-[#3e5f8a]" />
          <StatCard number={8} label="Team Members" color="text-[#5e3b94]" />
          <StatCard number={24} label="Completed Tasks" color="text-green-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Column */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <CheckSquare className="w-5 h-5 text-[#e62e4d] mr-2" />
                <h2 className="text-lg font-bold text-gray-800">Tasks</h2>
              </div>
              <button className="bg-[#5e3b94] hover:bg-[#5e3b94]/90 text-white px-4 py-2 rounded-lg flex items-center shadow-md">
                <span className="mr-1">+</span> New Task
              </button>
            </div>

            {/* Task Items */}
            <div className="space-y-4">
              <TaskItem 
                title="Website Redesign" 
                company="Acme Corporation" 
                description="Complete overhaul of client's e-commerce website with new branding and improved user experience" 
                progress={65} 
                dueDate="May 28" 
                taskCount="16/24"
                priority="High"
              />
              
              <TaskItem 
                title="Mobile App Development" 
                company="TechNova Solutions" 
                description="Building a cross-platform mobile application for inventory management and sales tracking" 
                progress={42} 
                dueDate="June 15" 
                taskCount="13/31"
                priority="Medium"
              />
              
              <TaskItem 
                title="Marketing Campaign" 
                company="Green Leaf Organics" 
                description="Develop and execute a comprehensive digital marketing campaign for product launch" 
                progress={21} 
                dueDate="July 10" 
                taskCount="5/18"
                priority="Low"
              />
            </div>
          </div>

          {/* Notifications & Calendar Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6 p-4">
              <div className="flex items-center mb-4">
                <Bell className="w-5 h-5 text-[#e62e4d] mr-2" />
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <span className="bg-[#e62e4d] text-white text-xs rounded-full px-2 py-1 ml-2">3 new</span>
              </div>
              
              <div className="p-3 bg-[#e62e4d]/5 rounded-lg mb-3">
                <p className="text-sm text-gray-700">Team meeting at 2:00 PM today</p>
                <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6 p-4">
              <div className="flex items-center mb-4">
                <Calendar className="w-5 h-5 text-[#3e5f8a] mr-2" />
                <h3 className="font-semibold text-gray-800">Upcoming</h3>
              </div>
              
              <div className="p-3 bg-gray-50 rounded-lg mb-3">
                <p className="text-sm text-gray-700">Client Presentation</p>
                <p className="text-xs text-gray-500 mt-1">Tomorrow, 10:00 AM</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-gray-100 mb-6 p-4">
              <div className="flex items-center mb-4">
                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-gray-800">Finances</h3>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg mb-3">
                <p className="text-sm text-gray-700">Monthly revenue: <span className="font-semibold text-green-600">$24,500</span></p>
                <p className="text-xs text-gray-500 mt-1">↑ 12% from last month</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ number, label, color }: { number: number, label: string, color: string }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
      <h3 className={`text-3xl font-bold ${color}`}>{number}</h3>
      <p className="text-gray-700 text-sm mt-1">{label}</p>
    </div>
  );
}

function TaskItem({ 
  title, 
  company,
  description, 
  progress, 
  dueDate, 
  taskCount,
  priority
}: { 
  title: string, 
  company: string,
  description: string, 
  progress: number, 
  dueDate: string, 
  taskCount: string,
  priority: "High" | "Medium" | "Low"
}) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-[#e62e4d]/10 text-[#e62e4d]";
      case "Medium": return "bg-gray-200 text-gray-700";
      case "Low": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-semibold text-gray-800 text-lg">{title}</h4>
          <p className="text-sm text-gray-600 flex items-center">
            <span>{company}</span>
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(priority)}`}>
          {priority}
        </div>
      </div>
      
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              priority === "High" ? "bg-[#e62e4d]" : 
              priority === "Medium" ? "bg-[#3e5f8a]" : "bg-[#5e3b94]"
            }`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>Due {dueDate}</span>
        </div>
        <div className="flex items-center">
          <CheckSquare className="w-4 h-4 mr-1" />
          <span>{taskCount} Tasks</span>
        </div>
      </div>
    </div>
  );
}
