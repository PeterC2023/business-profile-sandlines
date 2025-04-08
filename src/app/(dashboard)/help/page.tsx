"use client";

import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, ChevronDown } from '@/components/ui/icons/additional';
import Link from 'next/link';

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="max-w-5xl mx-auto">


      {/* Contact Support Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Support</h2>
        <p className="text-gray-600 mb-6">
          Can't find what you're looking for? Our support team is here to help.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email Support */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-[#5e3b94]/10 p-3 rounded-full">
                <Mail className="w-6 h-6 text-[#5e3b94]" />
              </div>
              <h3 className="ml-3 font-semibold">Email Support</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Send us a detailed message and we'll respond within 24 hours.
            </p>
            <Link 
              href="mailto:support@sandlinesbusiness.com" 
              className="text-[#5e3b94] text-sm font-medium hover:text-[#e62e4d] transition-colors"
            >
              Email support team
            </Link>
          </div>
          
          {/* Live Chat */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-[#e62e4d]/10 p-3 rounded-full">
                <MessageCircle className="w-6 h-6 text-[#e62e4d]" />
              </div>
              <h3 className="ml-3 font-semibold">Live Chat</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Chat with a support agent during business hours (9am-5pm PT).
            </p>
            <button 
              className="text-[#e62e4d] text-sm font-medium hover:text-[#5e3b94] transition-colors"
              onClick={() => window.alert('Live chat coming soon!')}
            >
              Start live chat
            </button>
          </div>
          
          {/* Phone Support */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-[#3e5f8a]/10 p-3 rounded-full">
                <Phone className="w-6 h-6 text-[#3e5f8a]" />
              </div>
              <h3 className="ml-3 font-semibold">Phone Support</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Call our dedicated support line for immediate assistance.
            </p>
            <a 
              href="tel:+18005551234" 
              className="text-[#3e5f8a] text-sm font-medium hover:text-[#e62e4d] transition-colors"
            >
              Call (800) 555-1234
            </a>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {/* FAQ 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleFaq(0)}
            >
              <h3 className="font-medium text-gray-800">How do I upload documents?</h3>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedFaq === 0 ? 'rotate-180' : ''}`} />
            </div>
            {expandedFaq === 0 && (
              <div className="px-4 pb-4 text-gray-600 text-sm">
                <p>
                  To upload documents, navigate to the Documents section and click on the "Upload" button. 
                  You can upload single files or multiple files in a zip archive. Supported formats include 
                  PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, and image files.
                </p>
              </div>
            )}
          </div>
          
          {/* FAQ 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleFaq(1)}
            >
              <h3 className="font-medium text-gray-800">How do I search for specific records?</h3>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedFaq === 1 ? 'rotate-180' : ''}`} />
            </div>
            {expandedFaq === 1 && (
              <div className="px-4 pb-4 text-gray-600 text-sm">
                <p>
                  Use the search bar at the top of any data page to search by keyword, record type, department, 
                  or date range. You can also use filters to narrow down your results by various criteria including
                  status, category, or custom fields you've set up.
                </p>
              </div>
            )}
          </div>
          
          {/* FAQ 3 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div 
              className="p-4 flex items-center justify-between cursor-pointer"
              onClick={() => toggleFaq(2)}
            >
              <h3 className="font-medium text-gray-800">How do I manage subscription and billing?</h3>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${expandedFaq === 2 ? 'rotate-180' : ''}`} />
            </div>
            {expandedFaq === 2 && (
              <div className="px-4 pb-4 text-gray-600 text-sm">
                <p>
                  To manage your subscription, go to Settings &gt; Billing and Subscription. There you can update 
                  your payment method, view billing history, download invoices, and change your plan. If you 
                  need to cancel, you can do so from this page as well.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Getting Started</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-3">
              <div className="bg-[#e62e4d]/10 min-w-[28px] h-7 rounded-full flex items-center justify-center mr-3">
                <span className="text-[#e62e4d] font-semibold">1</span>
              </div>
              <h3 className="font-semibold text-gray-800">Navigate the dashboard</h3>
            </div>
            <p className="text-sm text-gray-600 pl-10">
              Familiarize yourself with the sidebar navigation to access different sections of your business profile.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-3">
              <div className="bg-[#5e3b94]/10 min-w-[28px] h-7 rounded-full flex items-center justify-center mr-3">
                <span className="text-[#5e3b94] font-semibold">2</span>
              </div>
              <h3 className="font-semibold text-gray-800">Customize your profile</h3>
            </div>
            <p className="text-sm text-gray-600 pl-10">
              Add your business details, upload your logo, and set your preferences in the settings page.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start mb-3">
              <div className="bg-[#3e5f8a]/10 min-w-[28px] h-7 rounded-full flex items-center justify-center mr-3">
                <span className="text-[#3e5f8a] font-semibold">3</span>
              </div>
              <h3 className="font-semibold text-gray-800">Connect your accounts</h3>
            </div>
            <p className="text-sm text-gray-600 pl-10">
              Link your business accounts and services to maximize the value of your Sandlines Business Profile.
            </p>
          </div>
        </div>
      </div>

      {/* AI Assistant CTA */}
      <div className="bg-gradient-to-r from-[#5e3b94]/10 to-[#e62e4d]/10 rounded-xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Need more help?</h2>
        <p className="text-gray-600 mb-4">
          Ask our AI assistant for immediate answers to your questions
        </p>
        <button
          className="bg-gradient-to-r from-[#5e3b94] to-[#e62e4d] text-white px-6 py-3 rounded-lg inline-flex items-center hover:opacity-90 transition-opacity"
          onClick={() => window.location.href = '/ai-assistant'}
        >
          Ask Sandy
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
