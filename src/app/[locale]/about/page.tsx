
import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/cart/Sidebar';
// import SEOHead from '../components/seo/SEOHead';
import { Card, CardContent } from '@/components/generic/Card';
import { User, Users } from 'lucide-react';
import Image from 'next/image'
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <SEOHead 
        title="About Us - NatureHarvest"
        description="Learn about NatureHarvest and our mission to bring pure and organic products from nature to your doorstep."
        keywords="organic food, natural products, pure honey, about natureharvest"
      /> */}
      
      <NavBar />
      <Sidebar />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <div className="bg-natural-lightOlive py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Our Story</h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-700">
              We started NatureHarvest with a simple mission: to bring the purest products 
              from nature directly to your doorstep, without any additives or processing.
            </p>
          </div>
        </div>
        
        {/* About Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At NatureHarvest, we believe in the power of pure, unprocessed natural products. 
                We work directly with local farmers and producers who follow traditional 
                methods to create products just as nature intended.
              </p>
              <p className="text-gray-700 mb-4">
                Our commitment is to provide you with food that nourishes not just your body, 
                but also supports sustainable farming practices and ethical sourcing.
              </p>
              <p className="text-gray-700">
                Every product in our collection undergoes strict quality checks to ensure 
                it meets our high standards of purity and nutritional value.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
                  <Image
                  width={862}
                  height={575}
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt="NatureHarvest Team" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="text-natural-olive mb-4 flex justify-center">
                    <Users size={48} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Community</h3>
                  <p className="text-gray-700">
                    We believe in building strong relationships with local communities and 
                    supporting the livelihoods of farmers and artisans who produce our food.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="text-natural-olive mb-4 flex justify-center">
                    <User size={48} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Transparency</h3>
                  <p className="text-gray-700">
                    We are committed to being open about our sourcing, production methods, 
                    and business practices. What you see is what you get.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="pt-6">
                  <div className="text-natural-olive mb-4 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-center">Sustainability</h3>
                  <p className="text-gray-700">
                    We're dedicated to environmentally friendly practices, minimizing waste, 
                    and ensuring that our operations contribute positively to the planet.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        {/* <section className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-center">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden mx-auto w-32 h-32 bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1721322800607-8c38375eef04"
                  width={491}
                  height={655}
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Ananya Patel</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden mx-auto w-32 h-32 bg-gray-200">
                <Image
                    width={809}
                    height={576}
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Rahul Singh</h3>
              <p className="text-gray-600">Head of Operations</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 rounded-full overflow-hidden mx-auto w-32 h-32 bg-gray-200">
                <Image
                    width={2048}
                    height={2048}
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                  alt="Team Member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Fatima Ahmed</h3>
              <p className="text-gray-600">Quality Control Manager</p>
            </div>
          </div>
        </section> */}
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
