"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Calendar, CheckSquare, DollarSign, 
  Settings, Bell, User, Clock
} from '@/components/ui/icons';
import { 
  Bot, Briefcase, Users, MessageSquare, FileText, ShoppingBag,
  BarChart2, FileCheck, CreditCard, Mail, Rss, Share2, Send, LineChart, Megaphone,
  HelpCircle, MessageCircle, ChevronDown, ChevronUp
} from '@/components/ui/icons/additional';

type NavItemType = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

interface SidebarProps {
  collapsed?: boolean;
}

type NavSectionType = {
  title: string;
  items: NavItemType[];
  id: string;
};

const navigation: NavSectionType[] = [
  {
    title: 'OVERVIEW',
    id: 'overview',
    items: [
      { name: 'Home', href: '/home', icon: <Home className="w-5 h-5" /> },
      { name: 'Calendar', href: '/calendar', icon: <Calendar className="w-5 h-5" /> },
      { name: 'AI Assistant', href: '/ai-assistant', icon: <Bot className="w-5 h-5" /> },
    ],
  },
  {
    title: 'WORK',
    id: 'work',
    items: [
      { name: 'Tasks', href: '/tasks', icon: <CheckSquare className="w-5 h-5" /> },
      { name: 'Projects', href: '/projects', icon: <Briefcase className="w-5 h-5" /> },
      { name: 'Staff Meetings', href: '/staff-meetings', icon: <Users className="w-5 h-5" /> },
      { name: 'Team', href: '/team', icon: <Users className="w-5 h-5" /> },
      { name: 'Docs', href: '/docs', icon: <FileText className="w-5 h-5" /> },
    ],
  },
  {
    title: 'OUTREACH',
    id: 'outreach',
    items: [
      { name: 'Inbox', href: '/inbox', icon: <Mail className="w-5 h-5" /> },
      { name: 'Newsfeed', href: '/newsfeed', icon: <Rss className="w-5 h-5" /> },
      { name: 'Social', href: '/social', icon: <Share2 className="w-5 h-5" /> },
      { name: 'Marketing', href: '/marketing', icon: <LineChart className="w-5 h-5" /> },
      { name: 'Newsletter', href: '/newsletter', icon: <Send className="w-5 h-5" /> },
    ],
  },
  {
    title: 'GROWTH',
    id: 'growth',
    items: [
      { name: 'Sales', href: '/sales', icon: <DollarSign className="w-5 h-5" /> },
      { name: 'Clients', href: '/clients', icon: <Users className="w-5 h-5" /> },
    ],
  },
  {
    title: 'BUSINESS',
    id: 'business',
    items: [
      { name: 'Store', href: '/store', icon: <ShoppingBag className="w-5 h-5" /> },
      { name: 'Finances', href: '/finances', icon: <BarChart2 className="w-5 h-5" /> },
      { name: 'Payroll', href: '/payroll', icon: <CreditCard className="w-5 h-5" /> },
      { name: 'Compliance', href: '/compliance', icon: <FileCheck className="w-5 h-5" /> },
    ],
  },
  {
    title: 'CONTACT',
    id: 'contact',
    items: [
      { name: 'Help', href: '/help', icon: <HelpCircle className="w-5 h-5" /> },
      { name: 'Feedback', href: '/feedback', icon: <MessageCircle className="w-5 h-5" /> },
    ],
  },
];

export default function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(
    navigation.reduce((acc, section) => ({ ...acc, [section.id]: true }), {})
  );
  
  // Store the sidebar scroll position in session storage to persist through navigation
  useEffect(() => {
    // On mount, restore the scroll position if it exists
    const savedScrollPosition = sessionStorage.getItem('sidebarScrollPosition');
    if (savedScrollPosition && sidebarRef.current) {
      sidebarRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }
    
    // Set up scroll event listener to save position
    const handleScroll = () => {
      if (sidebarRef.current) {
        sessionStorage.setItem('sidebarScrollPosition', String(sidebarRef.current.scrollTop));
      }
    };
    
    const sidebarElement = sidebarRef.current;
    if (sidebarElement) {
      sidebarElement.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (sidebarElement) {
        sidebarElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="h-full flex flex-col w-full bg-white border-r border-gray-200 shadow-lg transition-all duration-300">
      {/* No spacer needed - header is in its own container now */}
      
      <div 
        ref={sidebarRef}
        className={`flex-1 overflow-y-auto ${collapsed ? 'px-2 py-4' : 'p-4 pt-2'} transition-all duration-300`}
      >
        {navigation.map((section) => {
          const isExpanded = expandedSections[section.id];
          const sectionHasActiveItem = section.items.some(item => pathname === item.href);
          
          return (
            <div key={section.title} className="mb-6">
              {!collapsed && (
                <div 
                  className="px-3 py-1 flex items-center justify-between cursor-pointer group"
                  onClick={() => setExpandedSections(prev => ({ ...prev, [section.id]: !prev[section.id] }))}
                >
                  <div className="flex items-center">
                    {section.id === 'outreach' && (
                      <Megaphone className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-600" />
                    )}
                    <h3 className="text-xs font-semibold text-gray-500 group-hover:text-gray-700">
                      {section.title}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  )}
                </div>
              )}
              
              {(isExpanded || collapsed) && (
                <ul>
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li 
                        key={item.name} 
                        className={isActive ? 'relative' : ''}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-br from-[#e62e4d] to-[#5e3b94] rounded-r-xl"></div>
                        )}
                        <Link 
                          href={item.href}
                          className={`
                            flex items-center ${collapsed ? 'justify-center' : 'px-3'} py-2 my-1 text-sm rounded-xl transition-all duration-200
                            ${isActive 
                              ? `text-gray-800 font-medium ${collapsed ? '' : 'pl-5'} shadow-sm` 
                              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                            }
                          `}
                          title={collapsed ? item.name : ''}
                        >
                          <span className={`${collapsed ? '' : 'mr-3'} ${isActive ? 'text-[#e62e4d]' : 'text-gray-400'}`}>{item.icon}</span>
                          {!collapsed && item.name}
                          {isActive && !collapsed && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e62e4d]"></div>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
