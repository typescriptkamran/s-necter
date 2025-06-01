
import React from 'react';
import Hero from '@/components/Hero';
import Featured from '@/components/product/Featured';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/cart/Sidebar';

const Index = async () => {


  return (
    <div className="min-h-screen flex flex-col">

      <NavBar />
      <Sidebar />
      <main className="grow">
        <Hero />
        <Featured />
        
        {/* Benefits Section */}
        <section className="section-container bg-natural-lightOlive py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">Why Choose Our Products?</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-700">
              We are committed to bringing you the purest products from nature with no additives or processing.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 text-natural-olive text-4xl flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Pure & Natural</h3>
              <p className="text-gray-600">
                Our products are sourced directly from nature with no artificial additives or processing.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 text-natural-olive text-4xl flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Traditional Methods</h3>
              <p className="text-gray-600">
                We use time-tested traditional methods to ensure highest quality and nutrient preservation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mb-4 text-natural-olive text-4xl flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ethically Sourced</h3>
              <p className="text-gray-600">
                We work directly with farmers and follow ethical practices that are good for people and planet.
              </p>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        {/* <section className="section-container py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">What Our Customers Say</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-700">
              Don't just take our word for it. Hear from those who have experienced the goodness of our products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="ml-3">
                  <h4 className="font-semibold">Priya Sharma</h4>
                  <div className="flex text-natural-golden">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The A2 Ghee is the best I've ever tried. My family can taste the difference, and we've noticed improvements in our digestion since we switched."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="ml-3">
                  <h4 className="font-semibold">Rajesh Kumar</h4>
                  <div className="flex text-natural-golden">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The forest honey has a unique taste that you just don't get with store-bought honey. It's become a morning ritual in our home."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="ml-3">
                  <h4 className="font-semibold">Anjali Patel</h4>
                  <div className="flex text-natural-golden">
                    ★★★★★
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "Impressed with the quality and purity. The COD option made it easy to try these products without worrying about online payment."
              </p>
            </div>
          </div>
        </section> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
