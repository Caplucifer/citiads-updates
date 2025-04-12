import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Contact.css'

export function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-50 via-white to-indigo-50 pt-24 px-4">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
      
      {/* LEFT: Company Info + Google Map */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6">
            We're here to help! Whether you have a question or just want to say hi — we’d love to hear from you.
          </p>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-indigo-600">Address</h4>
              <p>123 Market Street<br />Cityville, ST 54321</p>
            </div>
  
            <div>
              <h4 className="font-semibold text-indigo-600">Phone</h4>
              <p>(123) 456-7890</p>
            </div>
  
            <div>
              <h4 className="font-semibold text-indigo-600">Email</h4>
              <p>contact@yourcompany.com</p>
            </div>
          </div>
        </div>
  
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-[300px]">
          <iframe
            title="Company Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.349238056419!2d-122.4194161846817!3d37.77492927975938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5ba1e1e9%3A0x4a7c0f9b1d1f68db!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1612138749220!5m2!1sen!2sus"
            className="w-full h-full border-0"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
  
      {/* RIGHT: Contact Form */}
      <div className="bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6">Send Us a Message</h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
  
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
  
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
  
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              required
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-200 focus:border-indigo-500"
            />
          </div>
  
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors"
          >
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
  
          {submitStatus === 'success' && (
            <p className="text-green-600 text-center mt-2">Message sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-center mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  </div>
  );
}