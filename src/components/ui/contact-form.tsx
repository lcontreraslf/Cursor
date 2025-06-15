// src/components/ui/contact-form.tsx
import React, { useState } from 'react';
import { EnvelopeSimple, Phone, User, ChatText } from '@phosphor-icons/react';
import { Label } from './label';
import { Input } from './input';
import { Textarea } from './textarea';
import { Button } from './button';
import { type Property } from '../../types';

interface ContactFormProps {
  property?: Property;
  agent?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo?: string;
  };
}

const ContactForm: React.FC<ContactFormProps> = ({ property, agent }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: property 
      ? `Hello, I'm interested in the property "${property.title}" with ID ${property.id}. Please provide more information.` 
      : 'Hello, I would like to inquire about a property.',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Submit form (simulating API call)
    setIsSubmitting(true);
    
    // Simulating API response
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: property 
            ? `Hello, I'm interested in the property "${property.title}" with ID ${property.id}. Please provide more information.` 
            : 'Hello, I would like to inquire about a property.',
        });
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      {/* Title and description */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Contact {agent ? agent.name : 'Us'}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {property 
            ? 'Interested in this property? Send a message to the agent.' 
            : 'Have questions? Send us a message and we\'ll get back to you shortly.'}
        </p>
      </div>
      
      {/* Agent info (if provided) */}
      {agent && (
        <div className="flex items-center mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="mr-4">
            {agent.photo ? (
              <img 
                src={agent.photo} 
                alt={agent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={28} className="text-primary" />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-medium">{agent.name}</h4>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <div className="flex items-center">
                <Phone size={14} className="mr-1" />
                <a 
                  href={`tel:${agent.phone}`}
                  className="hover:text-primary transition-colors"
                >
                  {agent.phone}
                </a>
              </div>
              <div className="flex items-center">
                <EnvelopeSimple size={14} className="mr-1" />
                <a 
                  href={`mailto:${agent.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {agent.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium">
              Name <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-gray-400" />
              </div>
              <Input
                id="name"
                name="name"
                placeholder="Your name"
                className="pl-10"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <EnvelopeSimple size={16} className="text-gray-400" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                className="pl-10"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone
            </Label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={16} className="text-gray-400" />
              </div>
              <Input
                id="phone"
                name="phone"
                placeholder="Your phone number"
                className="pl-10"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Message */}
          <div>
            <Label htmlFor="message" className="text-sm font-medium">
              Message <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1 relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <ChatText size={16} className="text-gray-400" />
              </div>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message"
                className="pl-10 min-h-[120px]"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || submitStatus === 'success'}
          >
            {isSubmitting ? 'Sending...' : 
             submitStatus === 'success' ? 'Message Sent!' : 
             'Send Message'}
          </Button>
          
          {/* Success message */}
          {submitStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm">
              Thank you for your message! We'll get back to you shortly.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;