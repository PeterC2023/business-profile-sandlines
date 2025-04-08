"use client";

import React from 'react';
import { Search, Filter, Plus, Calendar, Clock, CheckSquare } from '@/components/ui/icons';
import { Tag, Users, BarChart2, MoreHorizontal, Flag } from '@/components/ui/icons/additional';

// ProjectHeader component with search and filters
const ProjectHeader = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-4 bg-white dark:bg-[#1A1A2E] rounded-lg shadow-sm">
    <div className="relative flex-1 min-w-[240px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search projects..."
        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-[#252542] text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3E5F8A]"
      />
    </div>
    
    <div className="flex space-x-2">
      <button className="inline-flex items-center px-3 py-2 text-sm bg-white dark:bg-[#252542] border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A2A4A]">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </button>
      <select className="px-3 py-2 text-sm bg-white dark:bg-[#252542] border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2A2A4A] focus:outline-none focus:ring-2 focus:ring-[#3E5F8A]">
        <option>All Status</option>
        <option>Active</option>
        <option>On Hold</option>
        <option>Completed</option>
      </select>
    </div>
    
    <button className="inline-flex items-center px-4 py-2 ml-auto bg-[#3E5F8A] hover:bg-[#2A4163] text-white text-sm font-medium rounded-md shadow-sm transition-colors">
      <Plus className="h-4 w-4 mr-2" />
      New Project
    </button>
  </div>
);

// ProjectCard component for individual projects
const ProjectCard = ({ title, description, client, status, progress, dueDate, team, tasks, priority }) => {
  const statusColors = {
    active: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    onHold: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400",
    completed: "bg-[#F0F7FF] dark:bg-[#2A4163]/50 text-[#3E5F8A]",
    atRisk: "bg-[#FFF1F1] dark:bg-[#981F26]/30 text-[#C23B43]"
  };
  
  const priorityColors = {
    high: "bg-[#FFF1F1] text-[#C23B43]",
    medium: "bg-[#F0F7FF] text-[#3E5F8A]",
    low: "bg-[#F6F1FC] text-[#7E5A9B]"
  };
  
  return (
    <div className="bg-white dark:bg-[#1A1A2E] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {client}
            </p>
          </div>
          
          <div className="flex space-x-1">
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[status]}`}>
              {status === 'active' && 'Active'}
              {status === 'onHold' && 'On Hold'}
              {status === 'completed' && 'Completed'}
              {status === 'atRisk' && 'At Risk'}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[priority]}`}>
              {priority === 'high' && <Flag className="inline h-3 w-3 mr-1" />}
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
          <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{progress}%</div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mb-4">
          <div 
            className={`h-1.5 rounded-full ${
              progress < 30 ? 'bg-[#C23B43]' : 
              progress < 70 ? 'bg-[#3E5F8A]' : 
              'bg-green-500'
            }`} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">Due {dueDate}</span>
          </div>
          <div className="flex items-center text-sm">
            <CheckSquare className="h-4 w-4 mr-2 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">{tasks.completed}/{tasks.total} Tasks</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex -space-x-2 mr-4">
            {team.map((member, index) => (
              <div 
                key={index}
                className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium border-2 border-white dark:border-[#1A1A2E]"
                title={member.name}
              >
                {member.name.charAt(0).toUpperCase()}
              </div>
            ))}
            {team.length > 3 && (
              <div className="h-8 w-8 rounded-full bg-[#3E5F8A] text-white flex items-center justify-center text-xs font-medium border-2 border-white dark:border-[#1A1A2E]">
                +{team.length - 3}
              </div>
            )}
          </div>
          
          <button className="ml-auto p-1.5 text-gray-500 hover:text-[#3E5F8A] rounded-full hover:bg-gray-100 dark:hover:bg-[#252542]">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="px-5 py-3 bg-gray-50 dark:bg-[#252542]/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            Updated 2 days ago
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Tag className="h-4 w-4 mr-1" />
            {tasks.tags.join(', ')}
          </div>
        </div>
        <button className="text-[#3E5F8A] hover:text-[#C23B43] text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
};

// ProjectStats component
const ProjectStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div className="bg-white dark:bg-[#1A1A2E] p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-[#F0F7FF] dark:bg-[#2A4163]/30 rounded-md mr-4">
          <BarChart2 className="h-6 w-6 text-[#3E5F8A]" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">32</h3>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="text-xs text-green-500 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          8% increase
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last quarter</span>
      </div>
    </div>
    
    <div className="bg-white dark:bg-[#1A1A2E] p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-[#FFF1F1] dark:bg-[#981F26]/20 rounded-md mr-4">
          <CheckSquare className="h-6 w-6 text-[#C23B43]" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">14</h3>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="text-xs text-green-500 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          12% increase
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last quarter</span>
      </div>
    </div>
    
    <div className="bg-white dark:bg-[#1A1A2E] p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-[#F6F1FC] dark:bg-[#5A3F70]/30 rounded-md mr-4">
          <Calendar className="h-6 w-6 text-[#7E5A9B]" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">In Progress</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">16</h3>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3">
        <div className="bg-[#7E5A9B] h-1.5 rounded-full" style={{ width: '68%' }}></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>68% on track</span>
        <span>5 at risk</span>
      </div>
    </div>
    
    <div className="bg-white dark:bg-[#1A1A2E] p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-md mr-4">
          <Users className="h-6 w-6 text-yellow-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Team Utilization</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">84%</h3>
        </div>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-3">
        <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
      </div>
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>12 team members</span>
        <span>3 available</span>
      </div>
    </div>
  </div>
);

// Sample project data
const activeProjects = [
  {
    title: "Website Redesign",
    description: "Complete overhaul of client's e-commerce website with new branding and improved user experience",
    client: "Acme Corporation",
    status: "active",
    progress: 65,
    dueDate: "May 28",
    team: [
      { name: "Sarah Miller", role: "Project Manager" },
      { name: "Alex Johnson", role: "UI Designer" },
      { name: "Michael Brown", role: "Developer" },
      { name: "Emma Williams", role: "Content Writer" }
    ],
    tasks: {
      total: 24,
      completed: 16,
      tags: ["Design", "Development"]
    },
    priority: "high"
  },
  {
    title: "Mobile App Development",
    description: "Building a cross-platform mobile application for inventory management and sales tracking",
    client: "TechNova Solutions",
    status: "active",
    progress: 42,
    dueDate: "June 15",
    team: [
      { name: "James Wilson", role: "Project Manager" },
      { name: "David Lee", role: "Mobile Developer" },
      { name: "Jennifer Lopez", role: "UX Designer" }
    ],
    tasks: {
      total: 31,
      completed: 13,
      tags: ["Mobile", "API"]
    },
    priority: "medium"
  },
  {
    title: "Brand Identity Package",
    description: "Creating comprehensive brand identity including logo, color palette, typography and brand guidelines",
    client: "Global Fitness Inc.",
    status: "atRisk",
    progress: 28,
    dueDate: "May 18",
    team: [
      { name: "Michelle Rodriguez", role: "Creative Director" },
      { name: "Thomas Clark", role: "Graphic Designer" }
    ],
    tasks: {
      total: 18,
      completed: 5,
      tags: ["Branding", "Design"]
    },
    priority: "high"
  }
];

const onHoldProjects = [
  {
    title: "Marketing Campaign Strategy",
    description: "Developing comprehensive marketing strategy for product launch including digital, print and social campaigns",
    client: "HealthPlus Medical",
    status: "onHold",
    progress: 35,
    dueDate: "On Hold",
    team: [
      { name: "Robert Miller", role: "Marketing Director" },
      { name: "Sophia Martinez", role: "Social Media Specialist" },
      { name: "Daniel Taylor", role: "Content Strategist" }
    ],
    tasks: {
      total: 22,
      completed: 8,
      tags: ["Marketing", "Strategy"]
    },
    priority: "medium"
  }
];

const completedProjects = [
  {
    title: "Annual Report Design",
    description: "Designed and produced the annual financial and impact report with data visualization and custom photography",
    client: "Community Foundation",
    status: "completed",
    progress: 100,
    dueDate: "Completed",
    team: [
      { name: "Emily Johnson", role: "Designer" },
      { name: "William Davis", role: "Financial Analyst" }
    ],
    tasks: {
      total: 14,
      completed: 14,
      tags: ["Design", "Finance"]
    },
    priority: "low"
  },
  {
    title: "CRM Implementation",
    description: "Successfully deployed and configured custom CRM solution with data migration and staff training",
    client: "Johnson Design Co.",
    status: "completed",
    progress: 100,
    dueDate: "Completed",
    team: [
      { name: "Chris Anderson", role: "Systems Analyst" },
      { name: "Lisa Wong", role: "Implementation Specialist" },
      { name: "Kevin Moore", role: "Trainer" }
    ],
    tasks: {
      total: 28,
      completed: 28,
      tags: ["Software", "Training"]
    },
    priority: "medium"
  }
];

// ProjectSection component
const ProjectSection = ({ title, projects }) => (
  <div className="mb-10">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  </div>
);

export default function ProjectsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Projects</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage and track your team's projects</p>
      </div>
      
      <ProjectStats />
      
      <ProjectHeader />
      
      <div className="space-y-6">
        <ProjectSection title="Active Projects" projects={activeProjects} />
        <ProjectSection title="On Hold" projects={onHoldProjects} />
        <ProjectSection title="Recently Completed" projects={completedProjects} />
      </div>
    </div>
  );
}
