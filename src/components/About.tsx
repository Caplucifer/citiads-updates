import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import  './About.css';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-bg pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="text-4xl font-bold mb-8">About LocalMarket</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed">
              Citi Offers was founded with a simple yet powerful mission: to bridge the gap between local businesses and their communities. We believe in the power of local commerce to create vibrant, sustainable neighborhoods and stronger economies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Connect</h3>
                <p>We connect local businesses with customers in their area, making it easier for communities to discover and support local enterprises.</p>
              </div>
              <div className="bg-card-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Support</h3>
                <p>We provide tools and platforms for local businesses to showcase their products and services to their target audience effectively.</p>
              </div>
              <div className="bg-card-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Grow</h3>
                <p>We help businesses grow by providing insights, analytics, and marketing tools to reach more customers.</p>
              </div>
              <div className="bg-card-bg p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-3">Community</h3>
                <p>We foster a sense of community by encouraging local shopping and supporting neighborhood businesses.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-4 text-lg">
              <li>Supporting local economies and communities</li>
              <li>Promoting sustainable business practices</li>
              <li>Fostering authentic connections</li>
              <li>Encouraging entrepreneurship</li>
              <li>Building lasting relationships</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Join Our Community</h2>
            <p className="text-lg leading-relaxed">
              Whether you're a local business owner looking to expand your reach or a customer wanting to support your local community, LocalMarket is here to help. Join us in building stronger, more connected communities through local commerce.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}