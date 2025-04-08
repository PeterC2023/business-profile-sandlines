"use client";

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Calendar, Clock, FileText, Mail, Phone, User } from '@/components/ui/icons/auth';
import Link from 'next/link';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data for the profile page
  const profileData = {
    name: 'John Doe',
    title: 'Business Owner',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    company: 'Sandlines Enterprises',
    bio: 'Entrepreneur with a passion for business optimization and efficiency.',
    upcomingTasks: [
      { id: 1, title: 'Quarterly Tax Filing', due: '2025-04-15', priority: 'High' },
      { id: 2, title: 'Team Meeting', due: '2025-04-09', priority: 'Medium' },
      { id: 3, title: 'Update Business License', due: '2025-04-30', priority: 'Low' },
    ],
    upcomingEvents: [
      { id: 1, title: 'Networking Event', date: '2025-04-10', time: '18:00', location: 'Downtown Convention Center' },
      { id: 2, title: 'Client Meeting', date: '2025-04-12', time: '10:00', location: 'Online' },
      { id: 3, title: 'Workshop: Business Growth', date: '2025-04-20', time: '09:00', location: 'Business Hub' },
    ],
    stats: {
      completedTasks: 124,
      ongoingProjects: 3,
      teamMembers: 8,
      documentsManaged: 56
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#e57983] to-[#6478AA] flex items-center justify-center text-white text-3xl font-bold">
              {profileData.name.split(' ').map(name => name[0]).join('')}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{profileData.name}</h1>
              <p className="text-gray-500">{profileData.title} at {profileData.company}</p>
              
              <div className="flex flex-wrap gap-4 mt-3">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-1 text-[#e57983]" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-1 text-[#e57983]" />
                  <span>{profileData.phone}</span>
                </div>
              </div>
            </div>
            <div>
              <button className="bg-[#e57983] hover:bg-[#e57983]/90 text-white px-4 py-2 rounded-lg transition shadow-sm">
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-100 pt-4">
            <p className="text-gray-700">{profileData.bio}</p>
          </div>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Completed Tasks</p>
                <p className="text-2xl font-bold text-[#e57983]">{profileData.stats.completedTasks}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#e57983]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#e57983]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-[#6478AA]">{profileData.stats.ongoingProjects}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#6478AA]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#6478AA]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Team Members</p>
                <p className="text-2xl font-bold text-[#e57983]">{profileData.stats.teamMembers}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#e57983]/10 flex items-center justify-center">
                <User className="w-5 h-5 text-[#e57983]" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Documents</p>
                <p className="text-2xl font-bold text-[#6478AA]">{profileData.stats.documentsManaged}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#6478AA]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#6478AA]" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="bg-white rounded-t-xl shadow-md border border-gray-100 border-b-0">
          <div className="flex">
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'overview' ? 'text-[#e57983] border-b-2 border-[#e57983]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'tasks' ? 'text-[#e57983] border-b-2 border-[#e57983]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('tasks')}
            >
              My Tasks
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'events' ? 'text-[#e57983] border-b-2 border-[#e57983]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('events')}
            >
              Upcoming Events
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'settings' ? 'text-[#e57983] border-b-2 border-[#e57983]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </button>
            <button 
              className={`px-6 py-4 text-sm font-medium ${activeTab === 'subscription' ? 'text-[#e57983] border-b-2 border-[#e57983]' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('subscription')}
            >
              Subscription
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-b-xl shadow-md p-6 border border-gray-100 border-t-0 mb-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Tasks */}
              <div>
                <h2 className="text-lg font-bold mb-4 text-gray-800">Recent Tasks</h2>
                <div className="space-y-3">
                  {profileData.upcomingTasks.map(task => (
                    <div key={task.id} className="p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-all flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-500">Due: {new Date(task.due).toLocaleDateString()}</p>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        task.priority === 'High' ? 'bg-[#e57983]/10 text-[#e57983]' : 
                        task.priority === 'Medium' ? 'bg-[#6478AA]/10 text-[#6478AA]' : 
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {task.priority}
                      </div>
                    </div>
                  ))}
                  <Link 
                    href="/tasks" 
                    className="block text-center text-[#6478AA] hover:underline mt-4 text-sm"
                  >
                    View All Tasks
                  </Link>
                </div>
              </div>
              
              {/* Upcoming Events */}
              <div>
                <h2 className="text-lg font-bold mb-4 text-gray-800">Upcoming Events</h2>
                <div className="space-y-3">
                  {profileData.upcomingEvents.map(event => (
                    <div key={event.id} className="p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-all">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{event.title}</h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {event.date}
                        </div>
                      </div>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{event.time}</span>
                        <span className="mx-2">•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  ))}
                  <Link 
                    href="/calendar" 
                    className="block text-center text-[#6478AA] hover:underline mt-4 text-sm"
                  >
                    View All Events
                  </Link>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">My Tasks</h2>
                <Link 
                  href="/tasks" 
                  className="text-[#e57983] bg-[#e57983]/10 px-4 py-1 rounded-lg text-sm hover:bg-[#e57983]/20 transition-all"
                >
                  Add New Task
                </Link>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {profileData.upcomingTasks.map(task => (
                      <tr key={task.id} className="hover:bg-gray-50 transition-all">
                        <td className="px-4 py-3 whitespace-nowrap">{task.title}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{new Date(task.due).toLocaleDateString()}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === 'High' ? 'bg-[#e57983]/10 text-[#e57983]' : 
                            task.priority === 'Medium' ? 'bg-[#6478AA]/10 text-[#6478AA]' : 
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">In Progress</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'events' && (
            <div>
              <div className="flex justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Upcoming Events</h2>
                <Link 
                  href="/calendar" 
                  className="text-[#e57983] bg-[#e57983]/10 px-4 py-1 rounded-lg text-sm hover:bg-[#e57983]/20 transition-all"
                >
                  Add New Event
                </Link>
              </div>
              
              <div className="space-y-4">
                {profileData.upcomingEvents.map(event => (
                  <div key={event.id} className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <div>
                        <h3 className="font-medium text-lg">{event.title}</h3>
                        <div className="flex items-center mt-2 text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{event.date}</span>
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{event.time}</span>
                        </div>
                        <div className="mt-2 text-gray-500">
                          <span>Location: {event.location}</span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex space-x-2">
                        <button className="bg-[#6478AA] hover:bg-[#6478AA]/90 text-white px-3 py-1 rounded text-sm transition-all">
                          Details
                        </button>
                        <button className="border border-[#e57983] text-[#e57983] hover:bg-[#e57983]/10 px-3 py-1 rounded text-sm transition-all">
                          RSVP
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-lg font-bold mb-6 text-gray-800">Profile Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">Personal Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e57983]/50 shadow-sm"
                        defaultValue={profileData.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e57983]/50 shadow-sm"
                        defaultValue={profileData.email}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e57983]/50 shadow-sm"
                        defaultValue={profileData.phone}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-4 text-gray-700">Company Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Company Name</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e57983]/50 shadow-sm"
                        defaultValue={profileData.company}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Job Title</label>
                      <input 
                        type="text" 
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e57983]/50 shadow-sm"
                        defaultValue={profileData.title}
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Bio</label>
                      <textarea 
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#e57983]/50 shadow-sm"
                        rows={3}
                        defaultValue={profileData.bio}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  className="bg-[#e57983] hover:bg-[#e57983]/90 text-white px-4 py-2 rounded shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'subscription' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-800">Manage My Subscription</h2>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">Current Plan:</span>
                  <span className="bg-[#5e3b94] text-white text-sm font-medium py-1 px-3 rounded-full">Business Pro</span>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#e57983]/10 to-[#6478AA]/10 p-4 rounded-xl mb-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#5e3b94] font-medium">$39.99/month per user</p>
                    <p className="text-sm text-gray-600">Current users: 2</p>
                  </div>
                  <button className="bg-white border border-[#5e3b94] text-[#5e3b94] hover:bg-[#5e3b94] hover:text-white transition-colors duration-300 px-4 py-2 rounded-lg text-sm font-medium">
                    Add Team Member
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">Add or remove users anytime - you'll only be charged for active users. No surcharges or hidden fees.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Feature 1 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">AI Assistant</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5e3b94] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5e3b94]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">Smart business insights and automation</p>
                </div>
                
                {/* Feature 2 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Task Management</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5e3b94] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5e3b94]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">Project & task tracking tools</p>
                </div>
                
                {/* Feature 3 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Financial Tools</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5e3b94] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5e3b94]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">Invoicing and financial management</p>
                </div>
                
                {/* Feature 4 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Marketing</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5e3b94] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5e3b94]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">Email campaigns and social media tools</p>
                </div>
                
                {/* Feature 5 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Team Collaboration</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5e3b94] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5e3b94]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">Team messaging and project sharing</p>
                </div>
                
                {/* Feature 6 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Customer Management</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5e3b94] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5e3b94]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">CRM and client relationship tools</p>
                </div>
                
                {/* Feature 7 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">Document Storage</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5e3b94] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5e3b94]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">Secure document storage and sharing</p>
                </div>
                
                {/* Feature 8 */}
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium text-gray-800">E-Commerce</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5e3b94] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#5e3b94]"></div>
                    </label>
                  </div>
                  <p className="text-xs text-gray-600">Online store and product management</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <button className="text-gray-500 hover:text-[#e62e4d] text-sm font-medium transition-colors">
                  Cancel Subscription
                </button>
                <button className="bg-[#5e3b94] hover:bg-[#5e3b94]/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-[#3e5f8a]/5 rounded-lg">
                <p className="text-xs text-gray-600">You can modify your subscription or cancel anytime. Changes to your plan take effect immediately. Add users anytime with no extra fees - you'll only be charged for active users at the end of your billing cycle.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
