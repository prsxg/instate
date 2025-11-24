import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import MarketForecasting from './components/MarketForecasting';
import Partnerships from './components/Partnerships';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIChat from './components/AIChat';

function App() {
  return (
    <div className="bg-dark-950 min-h-screen text-zinc-100 selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <MarketForecasting />
        <Partnerships />
        <Contact />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;