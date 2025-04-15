import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { AnimatedVerticalCarousel } from './features';
import TestimonialsSection from './testimonials';
import MapPreview from './MapPreview';
import { Boxes } from "./ui/background-boxes";
import MovingCar from './Movingcar';
import { SparklesCore } from "./ui/sparkles";


export default function ZappCabLandingPage() {
  useEffect(() => {
    document.title = "ZappCab | Ride the Future";
  }, []);

  
  const features = [
      { title: 'Instant Booking', description: 'Book a ride within seconds with just a tap.' },
      { title: 'Live Driver Tracking', description: 'Track your driver in real-time for better coordination.' },
      { title: 'Secure Payments', description: 'Multiple secure payment options including UPI, cards, and wallets.' },
      { title: '24/7 Support', description: 'Reach us any time for assistance, queries or feedback.' },
      { title: 'Verified Drivers', description: 'Every driver is background checked and professionally trained.' },
      { title: 'Affordable Pricing', description: 'Transparent fare system with no hidden charges.' },
      { title: 'Eco-Friendly Rides', description: 'Choose electric vehicles to reduce your carbon footprint.' },
      { title: 'Rewards & Referrals', description: 'Earn rewards for every ride and invite your friends to earn more.' },
    
  ];

  return (
    <div className=" bg-black min-h-screen text-white font-sans overflow-x-hidden scroll-smooth">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[90vh] text-center px-4 bg-black overflow-hidden">
        {/* Background Animation */}
        <MovingCar />
        <div className="absolute inset-0 z-0">
            <Boxes />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10">
            <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold neon-text mb-6"
            >
            ZappCab
            </motion.h1>

            <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl max-w-2xl neon-subtext"
            >
            Fast, safe, and futuristic cab booking. Your ride, just a zap away.
            </motion.p>

            <motion.a
            href="https://zappcab.onrender.com/"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-amber-400 rounded-full text-lg font-bold shadow-lg text-white hover:shadow-pink-500/50 transition neon-button"
            >
            Book a Ride
            </motion.a>
        </div>
       </section>



      {/* Features Section */}
      <section id="features" className="py-5 px-6 bg-gradient-to-b from-black to-gray-900 relative">
  <h2 className="text-4xl font-bold text-center mb-5 neon-text z-20">Why ZappCab?</h2>
  
  {/* Foreground Carousel - Above the sparkles */}
  <div className="relative z-30">
    <AnimatedVerticalCarousel features={features} />
  </div>

  {/* Sparkles Background - Below the carousel */}
  <div className="absolute inset-0 w-full h-full z-10">
    <SparklesCore
      id="tsparticlesfullpage"
      background="transparent"
      minSize={0.6}
      maxSize={1.4}
      particleDensity={100}
      className="w-full h-full"
      particleColor="#FFFFFF"
    />
  </div>
</section>



      <MapPreview />


      {/* Testimonials */}
        <TestimonialsSection />


      {/* Booking Section */}
      <section id="book" className="py-10 px-6 bg-black text-center">
      
        <h2 className="text-4xl font-bold neon-text mb-5 z-20">Ready to Ride?</h2>
        <a href="https://zappcab.onrender.com/" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 px-10 py-4 z-30 rounded-full text-lg font-bold shadow-lg hover:shadow-green-500/50 transition neon-button">
          Go to App
        </a>
        
      </section>

      {/* Contact Form */}
      <section className="py-5 px-6 bg-gray-900 text-center">
        <h2 className="text-4xl font-bold neon-text my-10">Need Help? Contact Us </h2>
        <form action="https://google.com" method="POST" className="space-y-6 max-w-xl mx-auto flex flex-col items-center justify-center p-5">
          <input type="text" name="name" placeholder="Your Name" required className="w-full p-4 text-lg rounded-md bg-black text-white border border-gray-700" />
          <input type="email" name="email" placeholder="Your Email" required className="w-full p-4 text-lg rounded-md bg-black text-white border border-gray-700" />
          <textarea name="message" rows="5" placeholder="Your Message" required className="w-full p-4 text-lg rounded-md bg-black text-white border border-gray-700"></textarea>
          <button type="submit" className="bg-pink-500 px-6 py-4 rounded-full font-bold neon-button hover:shadow-pink-500/50 transition">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} ZappCab. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#book" className="hover:text-white">Book</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </footer>

    </div>
  );
}
