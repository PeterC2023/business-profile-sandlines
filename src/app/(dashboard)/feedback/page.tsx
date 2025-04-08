"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle } from '@/components/ui/icons/additional';

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState('Bug Report');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentField, setCurrentField] = useState('subject');
  
  // Refs for form fields
  const subjectRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  // Focus the current field that needs attention
  useEffect(() => {
    if (currentField === 'subject' && subjectRef.current) {
      subjectRef.current.focus();
    } else if (currentField === 'description' && descriptionRef.current) {
      descriptionRef.current.focus();
    } else if (currentField === 'email' && emailRef.current) {
      emailRef.current.focus();
    }
  }, [currentField]);
  
  // Validate form and determine which field to highlight
  const validateForm = () => {
    if (!subject) {
      setCurrentField('subject');
      return false;
    }
    if (!description) {
      setCurrentField('description');
      return false;
    }
    // Email is optional, so we don't validate it
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if form is valid
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after submission
      setTimeout(() => {
        setFeedbackType('Bug Report');
        setSubject('');
        setDescription('');
        setEmail('');
        setSubmitted(false);
        setCurrentField('subject');
      }, 3000);
    }, 1000);
  };
  
  // Handle field completion
  const handleFieldComplete = (field: string, value: string, nextField: string) => {
    if (value.trim()) {
      // If field is filled, move to next field
      setCurrentField(nextField);
    }
  };

  // Helper text to show users how to navigate
  const getHelperText = (fieldName: string) => {
    if (fieldName === 'subject') {
      return 'Press Enter to move to description';
    } else if (fieldName === 'description') {
      return 'Press Shift+Enter to move to email';
    } else if (fieldName === 'email') {
      return 'Press Enter to submit (optional)';
    }
    return '';
  };

  return (
    <div className="max-w-3xl mx-auto">


      {submitted ? (
        <div className="celebration-container overflow-hidden relative p-8 md:p-10 rounded-2xl text-center">
          {/* Animated background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#5e3b94] via-[#e62e4d] to-[#3e5f8a] animate-gradient-shift"></div>
          
          {/* Animated particles */}
          <div className="particle-container">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`particle particle-${i % 5}`}></div>
            ))}
          </div>
          
          {/* Glass container for content */}
          <div className="relative z-10 glass-panel p-8 rounded-xl backdrop-blur-md bg-white/20 shadow-glow animate-rise">
            {/* Animated checkmark */}
            <div className="checkmark-container mb-6">
              <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
              </svg>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-white glow-text animate-pulse-soft">Thank You!</h2>
            <p className="text-white/90 text-lg max-w-md mx-auto">
              Your feedback makes Sandlines better! We'll carefully review your thoughts and use them to improve the experience.
            </p>
            
            {/* Hearts animation */}
            <div className="hearts-container mt-6">
              <div className="heart heart1"></div>
              <div className="heart heart2"></div>
              <div className="heart heart3"></div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 transition-all duration-300">
          <style jsx global>{`
            .form-field-highlight {
              box-shadow: 0 0 0 3px rgba(230, 46, 77, 0.3);
              border-color: #e62e4d;
              transition: all 0.2s ease;
            }
            
            .form-field-completed {
              box-shadow: 0 0 0 3px rgba(80, 200, 120, 0.3);
              border-color: #50c878;
              background-color: rgba(80, 200, 120, 0.05);
              transition: all 0.2s ease;
            }
            
            /* Celebration animations */
            .celebration-container {
              height: 500px;
              perspective: 1000px;
              overflow: hidden;
            }

            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            .animate-gradient-shift {
              background-size: 400% 400%;
              animation: gradient-shift 8s ease infinite;
            }

            @keyframes rise {
              0% { transform: translateY(60px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }

            .animate-rise {
              animation: rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            }

            .shadow-glow {
              box-shadow: 0 0 30px rgba(230, 46, 77, 0.4),
                          0 0 60px rgba(94, 59, 148, 0.2);
            }

            @keyframes pulse-soft {
              0% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.8); }
              50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(230, 46, 77, 0.6); }
              100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.8); }
            }

            .animate-pulse-soft {
              animation: pulse-soft 2s ease-in-out infinite;
            }

            .glow-text {
              text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
            }

            /* Particle animations */
            .particle-container {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              overflow: hidden;
              z-index: 1;
            }

            .particle {
              position: absolute;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              animation: float 4s ease-in-out infinite;
              opacity: 0.6;
            }

            @keyframes float {
              0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { transform: translateY(-150px) translateX(20px) rotate(360deg); opacity: 0; }
            }

            .particle-0 { left: 10%; top: 90%; background: #e62e4d; animation-delay: 0s; }
            .particle-1 { left: 20%; top: 80%; background: #5e3b94; animation-delay: 0.5s; }
            .particle-2 { left: 30%; top: 90%; background: #3e5f8a; animation-delay: 1s; }
            .particle-3 { left: 40%; top: 80%; background: #e62e4d; animation-delay: 1.5s; }
            .particle-4 { left: 50%; top: 90%; background: #5e3b94; animation-delay: 2s; }
            .particle-0 { right: 10%; top: 90%; background: #e62e4d; animation-delay: 0s; }
            .particle-1 { right: 20%; top: 80%; background: #5e3b94; animation-delay: 0.5s; }
            .particle-2 { right: 30%; top: 90%; background: #3e5f8a; animation-delay: 1s; }
            .particle-3 { right: 40%; top: 80%; background: #e62e4d; animation-delay: 1.5s; }
            .particle-4 { right: 50%; top: 90%; background: #5e3b94; animation-delay: 2s; }

            /* Checkmark animation */
            .checkmark-container {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .checkmark {
              width: 80px;
              height: 80px;
              border-radius: 50%;
              stroke-width: 2;
              stroke: #fff;
              stroke-miterlimit: 10;
              box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            }

            .checkmark-circle {
              stroke-dasharray: 166;
              stroke-dashoffset: 166;
              stroke-width: 2;
              stroke: #fff;
              fill: transparent;
              animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards 0.3s;
            }

            .checkmark-check {
              transform-origin: 50% 50%;
              stroke-dasharray: 48;
              stroke-dashoffset: 48;
              stroke-width: 3;
              animation: stroke 0.4s cubic-bezier(0.65, 0, 0.45, 1) forwards 0.9s;
            }

            @keyframes stroke {
              100% { stroke-dashoffset: 0; }
            }

            /* Hearts animation */
            .hearts-container {
              position: relative;
              height: 40px;
            }

            .heart {
              position: absolute;
              width: 24px;
              height: 22px;
              background-color: white;
              transform: rotate(45deg);
              animation: fly 4s ease-in-out infinite;
              opacity: 0;
            }

            .heart::before,
            .heart::after {
              content: '';
              position: absolute;
              width: 24px;
              height: 22px;
              border-radius: 50%;
              background-color: white;
            }

            .heart::before {
              top: -12px;
              left: 0;
            }

            .heart::after {
              top: 0;
              left: -12px;
            }

            @keyframes fly {
              0% { transform: translateY(0) rotate(45deg); opacity: 0; }
              10% { opacity: 0.9; }
              50% { opacity: 0.6; }
              100% { transform: translateY(-80px) rotate(45deg); opacity: 0; }
            }

            .heart1 {
              left: calc(50% - 30px);
              animation-delay: 0.5s;
            }

            .heart2 {
              left: 50%;
              animation-delay: 1s;
            }

            .heart3 {
              left: calc(50% + 30px);
              animation-delay: 1.5s;
            }
            
            @keyframes pulseError {
              0% { box-shadow: 0 0 0 0 rgba(230, 46, 77, 0.4); }
              70% { box-shadow: 0 0 0 5px rgba(230, 46, 77, 0); }
              100% { box-shadow: 0 0 0 0 rgba(230, 46, 77, 0); }
            }
            
            .pulse-error {
              animation: pulseError 1.5s infinite;
            }
          `}</style>
          <div className="mb-5">
            <label htmlFor="feedbackType" className="block text-gray-700 font-medium mb-2">
              Feedback Type
            </label>
            <select
              id="feedbackType"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              onFocus={(e) => e.target.classList.add('form-field-focus')}
              onBlur={(e) => {
                e.target.classList.remove('form-field-focus');
                if (e.target.value) e.target.classList.add('form-field-completed');
                else e.target.classList.remove('form-field-completed');
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none transition duration-200"
              required
            >
              <option value="Bug Report">Bug Report</option>
              <option value="Feature Request">Feature Request</option>
              <option value="General Feedback">General Feedback</option>
              <option value="UX/UI Feedback">UX/UI Feedback</option>
              <option value="Performance Issue">Performance Issue</option>
            </select>
          </div>
          
          <div className="mb-5">
            <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
              Subject <span className="text-xs text-gray-500">({getHelperText('subject')})</span>
            </label>
            <input
              type="text"
              id="subject"
              ref={subjectRef}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && subject.trim()) {
                  e.preventDefault();
                  handleFieldComplete('subject', subject, 'description');
                }
              }}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none transition duration-200 
                ${subject ? 'form-field-completed' : ''} 
                ${currentField === 'subject' && !subject ? 'form-field-highlight pulse-error' : ''}`}
              placeholder="Brief description of your feedback"
              required
            />
          </div>
          
          <div className="mb-5">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description <span className="text-xs text-gray-500">({getHelperText('description')})</span>
            </label>
            <textarea
              id="description"
              ref={descriptionRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => {
                // Only move to next field on Enter + Shift since description may have multiple paragraphs
                if (e.key === 'Enter' && e.shiftKey && description.trim()) {
                  e.preventDefault();
                  handleFieldComplete('description', description, 'email');
                }
              }}
              placeholder="Please provide details about your feedback..."
              rows={6}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none transition duration-200 
                ${description ? 'form-field-completed' : ''} 
                ${currentField === 'description' && !description ? 'form-field-highlight pulse-error' : ''}`}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email (optional)
            </label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && email.trim()) {
                  e.preventDefault();
                  // Focus the submit button when Enter is pressed in the email field
                  document.querySelector('button[type="submit"]')?.focus();
                }
              }}
              className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none transition duration-200 
                ${email ? 'form-field-completed' : ''} 
                ${currentField === 'email' && !email ? 'form-field-highlight' : ''}`}
              placeholder="Your email for follow-up"
            />
            <p className="text-xs text-gray-500 mt-1">
              We'll only use your email to follow up on your feedback if needed. {getHelperText('email')}
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-[#5e3b94] to-[#e62e4d] text-white py-3 px-6 rounded-lg font-medium transition-all ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Feedback'
            )}
          </button>
        </form>
      )}

      {/* AI Assistant CTA */}
      <div className="mt-8 bg-gradient-to-r from-[#5e3b94]/10 to-[#e62e4d]/10 rounded-xl p-6 text-center">
        <h2 className="text-xl font-semibold mb-3 text-gray-800">Need immediate assistance?</h2>
        <p className="text-gray-600 mb-4">
          Ask our AI assistant for help with any issues you're experiencing
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
