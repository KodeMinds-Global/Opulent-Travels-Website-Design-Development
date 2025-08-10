import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', destination: '', message: '' });
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+94 771234567",
      description: "24/7 Support Available",
      gradient: "from-blue-500 to-indigo-600 dark:from-blue-400 dark:to-indigo-500",
      iconColor: "text-blue-500 dark:text-blue-400",
      detailsColor: "text-blue-600 dark:text-blue-400",
      shadow: "shadow-blue-500/20 dark:shadow-blue-400/10",
      hoverGlow: "group-hover:shadow-blue-500/40 dark:group-hover:shadow-blue-400/30",
      delay: 100
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "info@opulenttravels.com",
      description: "Quick Response Guaranteed",
      gradient: "from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-500",
      iconColor: "text-amber-500 dark:text-amber-400",
      detailsColor: "text-amber-600 dark:text-amber-400",
      shadow: "shadow-amber-500/20 dark:shadow-amber-400/10",
      hoverGlow: "group-hover:shadow-amber-500/40 dark:group-hover:shadow-amber-400/30",
      delay: 200
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Colombo, Sri Lanka",
      description: "By Appointment Only",
      gradient: "from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-500",
      iconColor: "text-emerald-500 dark:text-emerald-400",
      detailsColor: "text-emerald-600 dark:text-emerald-400",
      shadow: "shadow-emerald-500/20 dark:shadow-emerald-400/10",
      hoverGlow: "group-hover:shadow-emerald-500/40 dark:group-hover:shadow-emerald-400/30",
      delay: 300
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:bg-blue-500" },
    { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
    { icon: Instagram, href: "#", color: "hover:bg-pink-500" },
    { icon: Linkedin, href: "#", color: "hover:bg-blue-700" }
  ];

  return (
    <section id="contact" className="py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950 z-0"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Light Theme Decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-200/30 dark:opacity-0 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/30 dark:opacity-0 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        {/* Dark Theme Decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-900/20 opacity-0 dark:opacity-100 rounded-full translate-x-1/3 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-900/20 opacity-0 dark:opacity-100 rounded-full -translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern-light.svg')] opacity-5 dark:opacity-0"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern-dark.svg')] opacity-0 dark:opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className={`inline-block mb-3 transition-all duration-1000 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-gradient-to-r from-indigo-600 to-blue-400 dark:from-indigo-400 dark:to-blue-300 text-white dark:text-gray-900 text-sm font-medium px-4 py-1 rounded-full">
              Contact Us
            </div>
          </div>
          <h2 className={`font-playfair font-bold text-3xl lg:text-4xl mb-4 transition-all duration-1000 text-gray-900 dark:text-white ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Start Your <span className="text-transparent bg-clip-text" style={{
              background: 'linear-gradient(90deg, #00308F 0%, #0066CC 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Luxury Journey</span> Today
          </h2>
          <p className={`font-lora text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
            isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
          }`}>
            Let us craft your perfect getaway to paradise with our premium travel services
          </p>
        </div>

        {/* Two Column Layout */}
        <div className={`grid lg:grid-cols-2 gap-8 transition-all duration-1000 ${
          isVisible ? 'animate-fade-up' : 'opacity-0 translate-y-8'
        }`}>
          {/* Left Column - Contact Information Cards */}
          <div className={`transition-all duration-1000 delay-200 flex items-center ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-8'
          }`}>
            <div className="w-full space-y-6">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className="group relative"
                  style={{ animationDelay: `${info.delay}ms` }}
                >
                  <div className={`h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 shadow-lg ${info.shadow} transition-all duration-500 group-hover:shadow-xl ${info.hoverGlow} group-hover:-translate-y-1`}>
                    {/* Gradient Background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-white/0 dark:from-white/10 dark:to-white/0"></div>
                    
                    {/* Card Content */}
                    <div className="p-5 relative flex items-center">
                      {/* Icon with Gradient */}
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${info.gradient} p-[2px] mr-5 shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0`}>
                        <div className="w-full h-full rounded-[10px] bg-white dark:bg-gray-800 flex items-center justify-center">
                          <info.icon className={`w-7 h-7 ${info.iconColor}`} />
                        </div>
                      </div>
                      
                      {/* Text Content */}
                      <div>
                        <h4 className="font-playfair font-bold text-xl text-gray-900 dark:text-white mb-1">
                          {info.title}
                        </h4>
                        <p className={`font-medium ${info.detailsColor} mb-1`}>
                          {info.details}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${info.gradient} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}></div>
                </div>
              ))}
            
              {/* Social Links */}
              <div className="mt-8 flex justify-center md:justify-start space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-md transition-all duration-300 ${social.color} hover:text-white transform hover:-translate-y-1 hover:shadow-lg border border-gray-100 dark:border-gray-700`}
                    aria-label={`Visit our ${social.icon.name} page`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-8'
          }`}>
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800/90 border border-gray-100 dark:border-gray-700 relative">
              {/* Decorative Background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-500/20 dark:to-blue-500/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-gradient-to-tr from-amber-500/10 to-red-500/10 dark:from-amber-500/20 dark:to-red-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-2xl"></div>
              </div>

              {/* Form */}
              <div className="p-8 relative z-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors"
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                        Your Name
                      </label>
                      <div className="absolute inset-0 rounded-xl bg-purple-500/5 dark:bg-purple-400/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                    </div>

                    {/* Email Field */}
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors"
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                        Email Address
                      </label>
                      <div className="absolute inset-0 rounded-xl bg-purple-500/5 dark:bg-purple-400/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone Field */}
                    <div className="relative group">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors"
                        placeholder=" "
                      />
                      <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                        Phone Number
                      </label>
                      <div className="absolute inset-0 rounded-xl bg-purple-500/5 dark:bg-purple-400/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                    </div>

                    {/* Destination Select */}
                    <div className="relative group">
                      <select
                        name="destination"
                        value={formData.destination}
                        onChange={handleInputChange}
                        className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors appearance-none"
                      >
                        <option value="" disabled>Select Destination</option>
                        <option value="maldives" className="bg-white dark:bg-gray-800">Maldives</option>
                        <option value="srilanka" className="bg-white dark:bg-gray-800">Sri Lanka</option>
                        <option value="combined" className="bg-white dark:bg-gray-800">Combined Tour</option>
                        <option value="custom" className="bg-white dark:bg-gray-800">Custom Package</option>
                      </select>
                      <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                        Preferred Destination
                      </label>
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                      <div className="absolute inset-0 rounded-xl bg-purple-500/5 dark:bg-purple-400/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="relative group">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="peer w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white bg-transparent focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors resize-none"
                      placeholder=" "
                    ></textarea>
                    <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-300 transform -translate-y-[1.15rem] scale-75 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-[1.15rem] peer-focus:scale-75 peer-focus:text-purple-500 dark:peer-focus:text-purple-400 origin-[0]">
                      Tell us about your dream vacation...
                    </label>
                    <div className="absolute inset-0 rounded-xl bg-purple-500/5 dark:bg-purple-400/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                  </div>
                  
                  {/* Privacy Note */}
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    By submitting this form, you agree to our <a href="#" className="text-purple-600 dark:text-purple-400 hover:underline">Privacy Policy</a>.
                  </div>

                  {/* Submit Button with Gradient & Glow Effect */}
                  <div className="flex justify-end">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-500 dark:to-blue-500 rounded-xl blur-md opacity-0 group-hover:opacity-70 transition-all duration-500 -z-10"></div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative py-3 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-medium"
                      >
                        <span className={`flex items-center justify-center space-x-2 ${
                          isSubmitting ? 'opacity-0' : 'opacity-100'
                        }`}>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 ml-2" />
                        </span>
                        {isSubmitting && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          </div>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
