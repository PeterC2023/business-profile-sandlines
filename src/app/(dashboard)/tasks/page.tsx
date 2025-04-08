"use client";

import React from 'react';
import { CheckSquare, Search, Filter, Plus, Calendar, Clock } from '@/components/ui/icons';
import { Flag } from '@/components/ui/icons/additional';
import { TaskGroupProps, TaskItem, TaskPriority, TaskStatus } from './types';

// TaskFilter component for filtering tasks with Sandlines styling
const TaskFilter: React.FC = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-5 bg-white rounded-xl shadow-lg border border-gray-200 backdrop-blur-md">
    <div className="relative flex-1 min-w-[240px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search tasks..."
        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5e3b94]/50 transition-all"
      />
    </div>
    
    <div className="flex space-x-2">
      <button className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-200 transition-all">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </button>
      <button className="inline-flex items-center px-3 py-2 text-sm bg-gray-100 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-200 transition-all">
        <Calendar className="h-4 w-4 mr-2" />
        Due Date
      </button>
    </div>
    
    <button className="inline-flex items-center px-4 py-2 ml-auto bg-gradient-to-r from-[#5e3b94] to-[#3e5f8a] text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
      <Plus className="h-4 w-4 mr-2" />
      Add Task
    </button>
  </div>
);

// TaskGroup component for grouping tasks by status
const TaskGroup: React.FC<TaskGroupProps> = ({ title, count, variant = "default", children }) => {
  const variantStyles: Record<TaskStatus, string> = {
    default: "bg-gray-100 text-gray-700",
    urgent: "bg-[#e62e4d]/10 text-[#e62e4d] font-medium",
    inProgress: "bg-[#3e5f8a]/10 text-[#3e5f8a] font-medium",
    review: "bg-[#5e3b94]/10 text-[#5e3b94] font-medium",
    upcoming: "bg-[#5e3b94]/10 text-[#5e3b94] font-medium",
    completed: "bg-green-100 text-green-600 font-medium"
  };
  
  // Icon based on task group type
  const getIcon = () => {
    switch(variant) {
      case 'urgent':
        return <Flag className="w-5 h-5 text-[#e62e4d] mr-2" />;
      case 'completed':
        return <CheckSquare className="w-5 h-5 text-green-600 mr-2" />;
      case 'inProgress':
        return <Clock className="w-5 h-5 text-[#3e5f8a] mr-2" />;
      default:
        return <Calendar className="w-5 h-5 text-[#5e3b94] mr-2" />;
    }
  };
  
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          {getIcon()}
          {title}
        </h3>
        <span className={`ml-2 text-sm ${variantStyles[variant]} px-3 py-0.5 rounded-full`}>
          {count}
        </span>
        <button className="ml-auto text-sm text-gray-500 hover:text-gray-700 hover:underline transition-colors">
          View all
        </button>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
};

// TaskCard component for individual tasks
const TaskCard: React.FC<TaskItem> = ({ title, description, priority, dueDate, assignees, labels }) => {
  const priorityStyles: Record<TaskPriority, string> = {
    high: "bg-[#e62e4d]/10 text-[#e62e4d] font-medium",
    medium: "bg-[#5e3b94]/10 text-[#5e3b94] font-medium",
    low: "bg-[#3e5f8a]/10 text-[#3e5f8a] font-medium"
  };
  
  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between mb-3">
        <h4 className="text-base font-medium text-gray-800">{title}</h4>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${priorityStyles[priority]}`}>
          {priority === 'high' && <Flag className="inline h-3 w-3 mr-1" />}
          {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </span>
      </div>
      
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}
      
      <div className="flex items-center text-xs text-gray-600 space-x-4 mb-4">
        {dueDate && (
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{dueDate}</span>
          </div>
        )}
        <div className="flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          <span>2 days left</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        {assignees && assignees.length > 0 && (
          <div className="flex -space-x-2">
            {assignees.map((assignee: string, index: number) => (
              <div 
                key={index}
                className="h-6 w-6 rounded-full bg-gradient-to-r from-[#5e3b94] to-[#3e5f8a] flex items-center justify-center text-white text-xs ring-2 ring-black/10"
                title={assignee}
              >
                {assignee.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
        )}
        
        {labels && labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {labels.map((label: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Special input component inspired by ChatGPT's interface for task creation
const TaskInput: React.FC = () => (
  <div className="max-w-3xl mx-auto mb-6">
    <div className="bg-gray-50 backdrop-blur-lg rounded-xl shadow-md border border-gray-200 p-3 transition-all duration-300">
      <div className="flex items-center gap-3">
        <CheckSquare className="h-5 w-5 text-gray-400" />
        <input 
          type="text" 
          placeholder="Ask about tasks or create a new one..." 
          className="bg-transparent border-none outline-none flex-1 text-gray-700 placeholder-gray-400 text-sm py-2"
        />
        <button className="p-2 rounded-full bg-gradient-to-r from-[#5e3b94] to-[#3e5f8a] text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

// Sample task data
const urgentTasks: TaskItem[] = [
  {
    title: "Finalize Client Proposal",
    description: "Complete the sales proposal for Acme Corp including pricing and timeline.",
    priority: "high",
    dueDate: "Today",
    assignees: ["John", "Sarah"],
    labels: ["Sales", "Urgent"]
  },
  {
    title: "Prepare Quarterly Financial Report",
    description: "Compile Q1 financial data and prepare report for stakeholders.",
    priority: "high",
    dueDate: "Tomorrow",
    assignees: ["Michael"],
    labels: ["Finance"]
  }
];

const todayTasks: TaskItem[] = [
  {
    title: "Website Redesign Project",
    description: "Working on new homepage layout and responsive design.",
    priority: "medium",
    dueDate: "May 12",
    assignees: ["Emma", "Alex"],
    labels: ["Marketing", "Design"]
  },
  {
    title: "Customer Feedback Analysis",
    description: "Review recent customer surveys and compile insights.",
    priority: "medium",
    dueDate: "May 15",
    assignees: ["Lisa"],
    labels: ["Research"]
  },
  {
    title: "Update Product Documentation",
    description: "Revise user guides for recent product updates.",
    priority: "low",
    dueDate: "May 18",
    assignees: ["James"],
    labels: ["Documentation"]
  }
];

const upcomingTasks: TaskItem[] = [
  {
    title: "Social Media Campaign",
    description: "Review and approve content for upcoming campaign.",
    priority: "medium",
    dueDate: "May 10",
    assignees: ["Robert", "Michelle"],
    labels: ["Marketing", "Social"]
  },
  {
    title: "New Feature Testing",
    description: "Conduct final testing of new product features before release.",
    priority: "high",
    dueDate: "May 11",
    assignees: ["David", "Emily"],
    labels: ["QA", "Product"]
  }
];

const completedTasks: TaskItem[] = [
  {
    title: "Team Training Session",
    description: "Conducted training on new project management tools.",
    priority: "low",
    dueDate: "Completed",
    assignees: ["Thomas"],
    labels: ["Training"]
  },
  {
    title: "Client Onboarding",
    description: "Completed onboarding process for new client XYZ Inc.",
    priority: "medium",
    dueDate: "Completed",
    assignees: ["Jennifer", "Mark"],
    labels: ["Client", "Onboarding"]
  }
];

export default function TasksPage() {
  return (
    <div>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Management</h1>
        <p className="text-gray-600">Organize your workflow and boost productivity</p>
      </div>
      
      <TaskInput />
      <TaskFilter />
      
      <div className="space-y-8">
        <TaskGroup title="Urgent Tasks" count={urgentTasks.length} variant="urgent">
          {urgentTasks.map((task: TaskItem, index: number) => (
            <TaskCard key={index} {...task} />
          ))}
        </TaskGroup>
        
        <TaskGroup title="Today's Tasks" count={todayTasks.length} variant="inProgress">
          {todayTasks.map((task: TaskItem, index: number) => (
            <TaskCard key={index} {...task} />
          ))}
        </TaskGroup>
        
        <TaskGroup title="Upcoming Tasks" count={upcomingTasks.length} variant="upcoming">
          {upcomingTasks.map((task: TaskItem, index: number) => (
            <TaskCard key={index} {...task} />
          ))}
        </TaskGroup>
        
        <TaskGroup title="Completed Tasks" count={completedTasks.length} variant="completed">
          {completedTasks.map((task: TaskItem, index: number) => (
            <TaskCard key={index} {...task} />
          ))}
        </TaskGroup>
      </div>
    </div>
  );
}
