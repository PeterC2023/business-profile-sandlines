"use client";

import React from 'react';
import { Search, Filter, Plus, Clock, DollarSign } from '@/components/ui/icons';
import { Star, Mail, Phone, MapPin, MoreHorizontal, Users, Briefcase, CalendarDays } from '@/components/ui/icons/additional';

// ClientHeader component with search and filters
const ClientHeader = () => (
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 p-5 glass rounded-xl shadow-lg border border-white/10 backdrop-blur-md">
    <div className="relative flex-1 min-w-[240px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 h-4 w-4" />
      <input
        type="text"
        placeholder="Search clients..."
        className="w-full pl-10 pr-4 py-2 text-sm border border-white/10 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#5e3b94]/50 transition-all"
      />
    </div>
    
    <div className="flex space-x-2">
      <button className="inline-flex items-center px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </button>
      <select className="px-3 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-[#5e3b94]/50 appearance-none cursor-pointer">
        <option value="">All Types</option>
        <option value="individual">Individuals</option>
        <option value="company">Companies</option>
        <option value="lead">Leads</option>
      </select>
    </div>
    
    <button className="inline-flex items-center px-4 py-2 ml-auto bg-gradient-to-r from-[#5e3b94] to-[#3e5f8a] text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
      <Plus className="h-4 w-4 mr-2" />
      Add Client
    </button>
  </div>
);

// ClientCard component for individual clients
const ClientCard = ({ name, company, email, phone, location, type, status, activity, value, image }) => {
  const statusStyles = {
    active: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
    lead: "bg-[#F0F7FF] dark:bg-[#2A4163]/50 text-[#3E5F8A]",
    inactive: "bg-gray-100 dark:bg-gray-800 text-gray-500",
    new: "bg-[#FFF1F1] dark:bg-[#981F26]/30 text-[#C23B43]"
  };
  
  const typeStyles = {
    individual: "bg-[#F6F1FC] dark:bg-[#5A3F70]/50 text-[#7E5A9B]",
    company: "bg-[#F0F7FF] dark:bg-[#2A4163]/50 text-[#3E5F8A]",
    lead: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600"
  };
  
  return (
    <div className="p-4 bg-white dark:bg-[#1A1A2E] rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="h-14 w-14 rounded-full object-cover border-2 border-gray-100 dark:border-gray-800" 
            />
          ) : (
            <div className="h-14 w-14 rounded-full bg-[#3E5F8A]/10 flex items-center justify-center text-xl font-medium text-[#3E5F8A]">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <div>
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-100 flex items-center">
                {name}
                {status === 'active' && <Star className="h-4 w-4 ml-1 text-yellow-400 fill-yellow-400" />}
              </h3>
              {company && (
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {company}
                </p>
              )}
            </div>
            
            <div className="flex space-x-1">
              <span className={`px-2 py-1 text-xs rounded-full ${statusStyles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${typeStyles[type]}`}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mt-3">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              {email}
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              {phone}
            </div>
            {location && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                {location}
              </div>
            )}
            {activity && (
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-2 text-gray-400" />
                Last contact: {activity}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex space-x-4">
          <div className="flex items-center text-sm">
            <DollarSign className="h-4 w-4 mr-1 text-green-500" />
            <span className="font-medium">${value.toLocaleString()}</span>
          </div>
          <div className="flex items-center text-sm">
            <Briefcase className="h-4 w-4 mr-1 text-[#3E5F8A]" />
            <span>3 Projects</span>
          </div>
          <div className="flex items-center text-sm">
            <CalendarDays className="h-4 w-4 mr-1 text-[#7E5A9B]" />
            <span>2 Meetings</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button className="p-1.5 text-gray-500 hover:text-[#3E5F8A] rounded-full hover:bg-gray-100 dark:hover:bg-[#252542]">
            <Mail className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-[#3E5F8A] rounded-full hover:bg-gray-100 dark:hover:bg-[#252542]">
            <Phone className="h-4 w-4" />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-[#3E5F8A] rounded-full hover:bg-gray-100 dark:hover:bg-[#252542]">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ClientCategorySection component
const ClientCategorySection = ({ title, count, children }) => (
  <div className="mb-8">
    <div className="flex items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
      <div className="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-[#252542] text-gray-700 dark:text-gray-300">
        {count}
      </div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

// ClientStats component
const ClientStats = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    <div className="bg-white dark:bg-[#1A1A2E] p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-[#F0F7FF] dark:bg-[#2A4163]/30 rounded-md mr-4">
          <Users className="h-6 w-6 text-[#3E5F8A]" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Clients</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">124</h3>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="text-xs text-green-500 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          12% increase
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
    
    <div className="bg-white dark:bg-[#1A1A2E] p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-[#FFF1F1] dark:bg-[#981F26]/20 rounded-md mr-4">
          <Star className="h-6 w-6 text-[#C23B43]" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Active Clients</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">86</h3>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="text-xs text-green-500 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          8% increase
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
    
    <div className="bg-white dark:bg-[#1A1A2E] p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-[#F6F1FC] dark:bg-[#5A3F70]/30 rounded-md mr-4">
          <DollarSign className="h-6 w-6 text-[#7E5A9B]" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">$125,400</h3>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="text-xs text-green-500 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          15.3% increase
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last quarter</span>
      </div>
    </div>
    
    <div className="bg-white dark:bg-[#1A1A2E] p-4 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-md mr-4">
          <Users className="h-6 w-6 text-yellow-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">New Leads</p>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">32</h3>
        </div>
      </div>
      <div className="flex items-center mt-3">
        <span className="text-xs text-red-500 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          5% decrease
        </span>
        <span className="text-xs text-gray-500 ml-2">vs last month</span>
      </div>
    </div>
  </div>
);

// Sample client data
const recentClients = [
  {
    name: "Alex Johnson",
    company: "Johnson Design Co.",
    email: "alex@johnsondesign.com",
    phone: "(555) 123-4567",
    location: "New York, NY",
    type: "company",
    status: "active",
    activity: "Today",
    value: 12500,
    image: null
  },
  {
    name: "Emma Williams",
    company: "Williams Consulting",
    email: "emma@williamsconsulting.com",
    phone: "(555) 987-6543",
    location: "San Francisco, CA",
    type: "company",
    status: "active",
    activity: "Yesterday",
    value: 8750,
    image: null
  }
];

const activeClients = [
  {
    name: "Sarah Miller",
    company: "Miller & Associates",
    email: "sarah@millerassociates.com",
    phone: "(555) 234-5678",
    location: "Chicago, IL",
    type: "company",
    status: "active",
    activity: "2 days ago",
    value: 23400,
    image: null
  },
  {
    name: "Michael Brown",
    company: null,
    email: "michael.brown@example.com",
    phone: "(555) 345-6789",
    location: "Boston, MA",
    type: "individual",
    status: "active",
    activity: "3 days ago",
    value: 5200,
    image: null
  },
  {
    name: "TechNova Solutions",
    company: null,
    email: "contact@technova.com",
    phone: "(555) 456-7890",
    location: "Austin, TX",
    type: "company",
    status: "active",
    activity: "1 week ago",
    value: 42000,
    image: null
  },
  {
    name: "Jennifer Lopez",
    company: "Creative Media",
    email: "jennifer@creativemedia.com",
    phone: "(555) 567-8901",
    location: "Los Angeles, CA",
    type: "individual",
    status: "active",
    activity: "2 weeks ago",
    value: 18600,
    image: null
  }
];

const potentialLeads = [
  {
    name: "David Wilson",
    company: "Wilson Enterprises",
    email: "david@wilsonenterprises.com",
    phone: "(555) 678-9012",
    location: "Seattle, WA",
    type: "lead",
    status: "lead",
    activity: null,
    value: 0,
    image: null
  },
  {
    name: "Global Tech Inc.",
    company: null,
    email: "info@globaltech.com",
    phone: "(555) 789-0123",
    location: "Denver, CO",
    type: "lead",
    status: "lead",
    activity: null,
    value: 0,
    image: null
  },
  {
    name: "Sophia Martinez",
    company: "Martinez Marketing",
    email: "sophia@martinezmarketing.com",
    phone: "(555) 890-1234",
    location: "Miami, FL",
    type: "lead",
    status: "new",
    activity: "Today",
    value: 0,
    image: null
  }
];

export default function ClientsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Clients</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your client relationships</p>
      </div>
      
      <ClientStats />
      
      <ClientHeader />
      
      <div className="space-y-8">
        <ClientCategorySection title="Recent Activity" count={recentClients.length}>
          {recentClients.map((client, index) => (
            <ClientCard key={index} {...client} />
          ))}
        </ClientCategorySection>
        
        <ClientCategorySection title="Active Clients" count={activeClients.length}>
          {activeClients.map((client, index) => (
            <ClientCard key={index} {...client} />
          ))}
        </ClientCategorySection>
        
        <ClientCategorySection title="Potential Leads" count={potentialLeads.length}>
          {potentialLeads.map((client, index) => (
            <ClientCard key={index} {...client} />
          ))}
        </ClientCategorySection>
      </div>
    </div>
  );
}
