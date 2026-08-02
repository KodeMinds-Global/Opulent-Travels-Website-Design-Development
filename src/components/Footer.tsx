import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import TestimonialsModal from './TestimonialsModal';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showTestimonials, setShowTestimonials] = useState(false);

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  const contactInfo = [
    { icon: Phone, text: '+94 771234567' },
    { icon: Mail, text: 'info@opulenttravels.com' },
    { icon: MapPin, text: '123 Colombo, Sri Lanka' },
  ];

  const linkClass =
    'font-montserrat text-white/70 hover:text-luxury-teal transition-colors duration-300 relative group';

  const underline = (
    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-luxury-teal transition-all duration-300 group-hover:w-full" />
  );

  return (
    <>
      <footer className="bg-luxury-charcoal text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="bg-white/20 p-3 rounded-lg inline-block">
                  <h3 className="text-xl font-bold font-playfair text-white">Opulent Travels</h3>
                </div>
              </div>
              <p className="font-lora text-white/80 mb-6 leading-relaxed">
                Crafting extraordinary luxury travel experiences to the world's most pristine
                destinations. Your journey to paradise begins here.
              </p>
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 text-white/70">
                    <item.icon className="w-4 h-4 text-luxury-gold flex-shrink-0" />
                    <span className="font-montserrat text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Destinations */}
            <div>
              <h3 className="font-playfair font-bold text-xl text-luxury-gold mb-6">Destinations</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/maldives" className={linkClass}>
                    Maldives Tours
                    {underline}
                  </Link>
                </li>
                <li>
                  <Link to="/sri-lanka" className={linkClass}>
                    Sri Lanka Adventures
                    {underline}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-playfair font-bold text-xl text-luxury-gold mb-6">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/about-us" className={linkClass}>
                    About Us
                    {underline}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setShowTestimonials(true)}
                    className={`${linkClass} text-left`}
                  >
                    Testimonials
                    {underline}
                  </button>
                </li>
                <li>
                  <Link to="/contact" className={linkClass}>
                    Contact
                    {underline}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-playfair font-bold text-xl text-luxury-gold mb-6">Support</h3>
              <ul className="space-y-3 mb-8">
                <li>
                  <Link to="/contact" className={linkClass}>
                    Customer Support
                    {underline}
                  </Link>
                </li>
                <li>
                  <a href="#" className={linkClass}>
                    Travel Insurance
                    {underline}
                  </a>
                </li>
                <li>
                  <Link to="/terms-conditions" className={linkClass}>
                    Terms &amp; Conditions
                    {underline}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="font-montserrat text-white/60 text-sm text-center md:text-left">
                © {currentYear} Opulent Travels. All rights reserved. Powered by{' '}
                <a href="#" className="text-luxury-gold hover:text-luxury-teal transition-colors duration-300">
                  KodeMinds Solutions
                </a>
                .
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <div className="flex items-center gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-luxury-gold hover:text-luxury-charcoal transition-all duration-300 transform hover:scale-110"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <TestimonialsModal
        isOpen={showTestimonials}
        onClose={() => setShowTestimonials(false)}
      />
    </>
  );
};

export default Footer;