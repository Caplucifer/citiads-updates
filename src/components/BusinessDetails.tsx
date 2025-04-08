import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from './Modal';

interface BusinessDetailsProps {
  shops: Array<{
    id: number;
    name: string;
    category: string;
    image: string;
    description: string;
    rating: number;
  }>;
}

export function BusinessDetails({ shops }: BusinessDetailsProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const shop = shops.find(s => s.id === Number(id));
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  if (!shop) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-bg pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 px-4 py-2 rounded-lg hover:bg-primary/10"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Listings</span>
          </button>
          <h1 className="text-2xl font-bold">Business not found</h1>
        </div>
      </div>
    );
  }

  // Curated gallery images from Unsplash
  const galleryImages = [
    shop.image,
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600'
  ];

  const businessHours = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  const handlePreviousImage = () => {
    setSelectedImageIndex(prev => 
      prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => 
      prev === null ? null : (prev + 1) % galleryImages.length
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-primary/10 to-bg pt-24 px-4">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8 px-4 py-2 rounded-lg hover:bg-primary/10"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Listings</span>
          </button>

          {/* Hero Section */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden mb-12">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{shop.name}</h1>
              <p className="text-lg text-white/90">{shop.description}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-card-bg rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <Phone size={20} className="text-primary" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <Mail size={20} className="text-primary" />
                    <span>contact@{shop.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg">
                    <MapPin size={20} className="text-primary" />
                    <span>123 Business Street, City, State 12345</span>
                  </div>
                </div>
              </div>

              <div className="bg-card-bg rounded-xl p-6 shadow-lg mt-6">
                <h2 className="text-2xl font-semibold mb-6">Business Hours</h2>
                <div className="space-y-3">
                  {businessHours.map(({ day, hours }) => (
                    <div
                      key={day}
                      className="flex justify-between items-center p-3 bg-primary/5 rounded-lg"
                    >
                      <span className="font-medium">{day}</span>
                      <span className="text-primary">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-2">
              <div className="bg-card-bg rounded-xl p-6 shadow-lg h-full">
                <h2 className="text-2xl font-semibold mb-6">Location</h2>
                <div className="relative h-[400px] rounded-lg overflow-hidden">
                  <iframe
                    title="Business Location"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2219901290355!2d-74.00369368400567!3d40.71312937933185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a23e28c1191%3A0x49f75d3281df052a!2s150%20Park%20Row%2C%20New%20York%2C%20NY%2010007!5e0!3m2!1sen!2sus!4v1644262070010!5m2!1sen!2sus"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('123 Business Street, City, State 12345')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-4 right-4 bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Get Directions
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="bg-card-bg rounded-xl p-6 shadow-lg mb-12">
            <h2 className="text-2xl font-semibold mb-6">Photo Gallery</h2>
            <div className="grid grid-cols-3 gap-4 [&>*:first-child]:col-span-2 [&>*:first-child]:row-span-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`group relative overflow-hidden rounded-xl ${
                    index === 0 ? 'aspect-square md:aspect-[4/3]' : 'aspect-square'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${shop.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <Modal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        showControls={true}
        onPrevious={handlePreviousImage}
        onNext={handleNextImage}
      >
        {selectedImageIndex !== null && (
          <img
            src={galleryImages[selectedImageIndex]}
            alt={`${shop.name} - Image ${selectedImageIndex + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        )}
      </Modal>
    </>
  );
}