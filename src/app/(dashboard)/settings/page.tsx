"use client";

import React, { useState } from 'react';
import { Bell, User } from '@/components/ui/icons';
import { Sun, Moon, Key, Globe, Lock, Shield, FileText, ChevronRight, Mail, X, Check } from '@/components/ui/icons/settings';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  
  // Initialize theme state from document or localStorage
  const [theme, setTheme] = useState(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      // Check localStorage first
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme as 'light' | 'dark';
      
      // Check document class
      if (document.documentElement.classList.contains('dark-theme')) {
        return 'dark';
      }
    }
    return 'light';
  });
  
  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: <Sun className="w-5 h-5" /> },
    { id: 'account', label: 'Account', icon: <User className="w-5 h-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
    { id: 'security', label: 'Security & Privacy', icon: <Lock className="w-5 h-5" /> },
    { id: 'integrations', label: 'Integrations', icon: <Globe className="w-5 h-5" /> },
    { id: 'billing', label: 'Billing', icon: <FileText className="w-5 h-5" /> },
  ];
  
  // Apply theme to document
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Remove both classes first
      document.documentElement.classList.remove('light-theme', 'dark-theme');
      // Add the current theme class
      document.documentElement.classList.add(`${theme}-theme`);
      // Store in localStorage for persistence
      localStorage.setItem('theme', theme);
    }
  }, [theme]);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Settings</h1>
        <p className="text-gray-500">Manage your account preferences and application settings</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Tabs */}
        <div className="w-full md:w-64 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="p-4 bg-gradient-to-r from-[#5e3b94]/10 to-[#e62e4d]/10 border-b border-gray-100">
            <h2 className="font-medium text-gray-700">Settings</h2>
          </div>
          <nav className="p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center w-full p-3 rounded-lg text-left transition-colors ${activeTab === tab.id ? 'bg-[#e62e4d]/10 text-[#e62e4d]' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-3">{tab.icon}</span>
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          {activeTab === 'account' && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Account Settings</h2>
              
              <div className="mb-6 p-4 border border-gray-100 rounded-lg bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#e62e4d] to-[#5e3b94] rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    S
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Sandlines User</h3>
                    <p className="text-gray-500">Business Account</p>
                  </div>
                  <button className="ml-auto px-4 py-2 text-sm bg-white text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Edit Profile
                  </button>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value="user@example.com" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/30"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                    <input 
                      type="text" 
                      defaultValue="Sandlines User" 
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/30"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea 
                    rows={3}
                    defaultValue="Business profile manager at Sandlines" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/30"
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <button className="px-5 py-2 bg-[#e62e4d] text-white rounded-lg hover:bg-[#e62e4d]/90 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Appearance</h2>
              
              <div className="mb-8">
                <h3 className="font-medium text-gray-800 mb-3">Theme</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center p-4 border ${theme === 'light' ? 'border-[#e62e4d] bg-[#e62e4d]/5' : 'border-gray-200'} rounded-lg hover:border-[#e62e4d]/50 transition-all w-40`}
                  >
                    <div className="w-full h-24 bg-white border border-gray-200 rounded-md mb-3 flex items-center justify-center">
                      <Sun className={`w-8 h-8 ${theme === 'light' ? 'text-[#e62e4d]' : 'text-gray-400'}`} />
                    </div>
                    <span className={`font-medium ${theme === 'light' ? 'text-[#e62e4d]' : 'text-gray-600'}`}>Light</span>
                  </button>
                  
                  <button
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center p-4 border ${theme === 'dark' ? 'border-[#5e3b94] bg-[#5e3b94]/5' : 'border-gray-200'} rounded-lg hover:border-[#5e3b94]/50 transition-all w-40`}
                  >
                    <div className="w-full h-24 bg-gray-800 border border-gray-700 rounded-md mb-3 flex items-center justify-center">
                      <Moon className={`w-8 h-8 ${theme === 'dark' ? 'text-[#5e3b94]' : 'text-gray-300'}`} />
                    </div>
                    <span className={`font-medium ${theme === 'dark' ? 'text-[#5e3b94]' : 'text-gray-600'}`}>Dark</span>
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <button 
                  onClick={toggleTheme}
                  className="px-5 py-2 bg-[#e62e4d] text-white rounded-lg hover:bg-[#e62e4d]/90 transition-colors"
                >
                  Apply Theme
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Notification Settings</h2>
              
              <div className="space-y-4">
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-[#e62e4d]" />
                      <div>
                        <h3 className="font-medium text-gray-800">App Notifications</h3>
                        <p className="text-sm text-gray-500">Receive notifications within the application</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={appNotifications}
                        onChange={() => setAppNotifications(!appNotifications)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e62e4d]/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e62e4d]"></div>
                    </label>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#5e3b94]" />
                      <div>
                        <h3 className="font-medium text-gray-800">Email Notifications</h3>
                        <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={emailNotifications}
                        onChange={() => setEmailNotifications(!emailNotifications)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#5e3b94]/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5e3b94]"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 mt-6 border-t border-gray-100">
                <button className="px-5 py-2 bg-[#e62e4d] text-white rounded-lg hover:bg-[#e62e4d]/90 transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'security' && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Security & Privacy</h2>
              
              <div className="space-y-6">
                <div className="p-4 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Key className="w-5 h-5 text-[#e62e4d]" />
                      <div>
                        <h3 className="font-medium text-gray-800">Two-Factor Authentication</h3>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={twoFactorAuth}
                        onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#e62e4d]/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e62e4d]"></div>
                    </label>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Change Password</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                      <input 
                        type="password" 
                        placeholder="Enter current password" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                      <input 
                        type="password" 
                        placeholder="Enter new password" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/30"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                      <input 
                        type="password" 
                        placeholder="Confirm new password" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e62e4d]/30"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 mt-6 border-t border-gray-100">
                <button className="px-5 py-2 bg-[#e62e4d] text-white rounded-lg hover:bg-[#e62e4d]/90 transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}
          
          {(activeTab === 'integrations' || activeTab === 'billing') && (
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {activeTab === 'integrations' ? 'Integrations' : 'Billing'}
              </h2>
              
              <div className="flex flex-col items-center justify-center py-16">
                <div className="mb-4 w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  {activeTab === 'integrations' ? 
                    <Globe className="w-8 h-8 text-gray-400" /> : 
                    <FileText className="w-8 h-8 text-gray-400" />
                  }
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {activeTab === 'integrations' ? 'Integrations Coming Soon' : 'Billing Settings Coming Soon'}
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  {activeTab === 'integrations' ? 
                    'Connect your favorite tools and apps to enhance your workflow.' : 
                    'Manage your subscription, payment methods, and billing history.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
