"use client"
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/cart/Sidebar';
// import SEOHead from '../components/seo/SEOHead';
import { Button } from '@/components/generic/Button';
import { Input } from '@/components/generic/Input';
import { Card, CardContent } from '@/components/generic/Card';
import { Phone, Mail, MessageSquare, Info } from 'lucide-react';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Contact form submitted');
    // You could add toast notification here
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* <SEOHead 
        title="Contact Us - NatureHarvest"
        description="Get in touch with NatureHarvest. We're here to answer your questions and provide support."
        keywords="contact natureharvest, customer support, inquiry, help"
      />
       */}
      <NavBar />
      <Sidebar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-natural-lightOlive py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-700">
              Have questions about our products or need assistance? 
              We're here to help! Reach out to us using any of the methods below.
            </p>
          </div>
        </div>
        
        {/* Contact Information */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 text-natural-olive flex justify-center">
                  <Phone size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Phone</h3>
                <p className="text-gray-700">+91 98765 43210</p>
                <p className="text-gray-700">Mon-Sat 9:00 AM - 6:00 PM</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 text-natural-olive flex justify-center">
                  <Mail size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-gray-700">info@natureharvest.com</p>
                <p className="text-gray-700">support@natureharvest.com</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="mb-4 text-natural-olive flex justify-center">
                  <Info size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-gray-700">123 Nature Street</p>
                <p className="text-gray-700">Green Valley, Earth</p>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium">Your Name</label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium">Your Email</label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="How can we help you?" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                    placeholder="Please write your message here..."
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-center">
                  <Button type="submit" className="w-full md:w-auto">
                    <MessageSquare className="mr-2" size={18} />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        {/* <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg bg-gray-200 h-80">
            {/* Placeholder for an actual map. In a real application, you'd use Google Maps or similar 
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <p className="text-gray-500 text-lg">Map Location Placeholder</p>
            </div>
          </div>
        </section> */}
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
