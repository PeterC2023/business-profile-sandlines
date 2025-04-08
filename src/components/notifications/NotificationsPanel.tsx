"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Clock } from '@/components/ui/icons';
import { MessageCircle, FileText } from '@/components/ui/icons/additional';
import { SidePanel, Card, Button } from '@/components/shared';

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Notification {
  id: number;
  title: string;
  time: string;
  description: string;
  type: 'reminder' | 'comment' | 'task' | 'system';
  isNew?: boolean;
}

export default function NotificationsPanel({ isOpen, onClose }: NotificationsPanelProps) {
  // Mock notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: 1, 
      title: 'Team meeting reminder', 
      time: 'Today at 2:00 PM',
      description: 'Don\'t forget about the weekly team meeting!',
      type: 'reminder',
      isNew: true
    },
    { 
      id: 2, 
      title: 'New comment on your post', 
      time: '10 minutes ago',
      description: 'Sarah commented on your recent update',
      type: 'comment',
      isNew: true
    },
    { 
      id: 3, 
      title: 'Task deadline approaching', 
      time: 'Yesterday',
      description: 'The Website Redesign task is due in 2 days',
      type: 'task',
      isNew: true
    }
  ]);
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({
      ...notification,
      isNew: false
    })));
  };
  
  const newNotificationsCount = notifications.filter(n => n.isNew).length;
  
  return (
    <SidePanel
      isOpen={isOpen}
      onClose={onClose}
      title="Notifications"
      badgeText={newNotificationsCount > 0 ? `${newNotificationsCount} new` : undefined}
      badgeColor="#e62e4d"
      initialWidth={320}
      headerGradient="from-[#5e3b94]/10 to-[#e62e4d]/10"
    >
      {/* Actions bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <Bell className="h-4 w-4" />
          <span>{newNotificationsCount > 0 ? `${newNotificationsCount} new` : 'No new notifications'}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-[#5e3b94] dark:text-[#a78bff] hover:bg-[#5e3b94]/5"
          onClick={markAllAsRead}
          disabled={newNotificationsCount === 0}
        >
          Mark all as read
        </Button>
      </div>
      
      {/* Notifications List */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50 ${notification.isNew ? 'bg-[#5e3b94]/5 dark:bg-[#5e3b94]/10' : ''}`}
          >
            <div className="flex">
              <div className="mr-3 mt-1">
                {notification.type === 'reminder' && (
                  <div className="w-8 h-8 rounded-full bg-[#5e3b94]/10 dark:bg-[#5e3b94]/20 flex items-center justify-center">
                    <Bell className="w-4 h-4 text-[#5e3b94]" />
                  </div>
                )}
                {notification.type === 'comment' && (
                  <div className="w-8 h-8 rounded-full bg-[#e62e4d]/10 dark:bg-[#e62e4d]/20 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-[#e62e4d]" />
                  </div>
                )}
                {notification.type === 'task' && (
                  <div className="w-8 h-8 rounded-full bg-[#5e3b94]/10 dark:bg-[#5e3b94]/20 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-[#5e3b94]" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-800 dark:text-gray-200">{notification.title}</h3>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{notification.time}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{notification.description}</p>
              </div>
              {notification.isNew && (
                <div className="ml-2">
                  <div className="w-2 h-2 rounded-full bg-[#e62e4d]"></div>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {notifications.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            <div className="flex justify-center mb-4">
              <Bell className="w-10 h-10 text-gray-300 dark:text-gray-600" />
            </div>
            <p className="font-medium">No notifications yet</p>
            <p className="text-sm mt-1">We'll let you know when something new arrives</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex justify-between">
          <Button 
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            disabled={newNotificationsCount === 0}
            className="text-[#5e3b94] dark:text-[#a78bff] hover:bg-[#5e3b94]/5"
          >
            Mark all as read
          </Button>
          <Link 
            href="/notifications" 
            className="text-sm py-1.5 px-3 text-[#5e3b94] dark:text-[#a78bff] hover:bg-[#5e3b94]/5 rounded-md transition-colors"
            onClick={onClose}
          >
            View all notifications
          </Link>
        </div>
      </div>
    </SidePanel>
  );
}
