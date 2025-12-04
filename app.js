import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Menu, X, Mail, MapPin, Linkedin, Twitter, ArrowRight, BarChart2, Building2, ChevronRight, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// --- TYPES ---
interface NavItem {
  label: string;
  href: string;
}

interface StatItem {
  value: string;
  label: string;
  description?: string;
}

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  contactEmail: string;
  icon?: string;
}

interface ChartDataPoint {
  year: string;
  mumbai: number;
  delhi: number;
  bangalore: number;
}

// --- CONSTANTS ---
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Early Access", href: "#early-access" },
  { label: "Market Forecasting", href: "#market-forecasting" },
  { label: "Partnerships", href: "#partnerships" },
  { label: "Contact", href: "#contact" },
];

const STATS: StatItem[] = [
  { value: "£65M+", label: "Assets Under Management" },
  { value: "15.2%", label: "Average Annual Returns" },
  { value: "50+", label: "Successful Transactions" },
  { value: "98%", label: "Client Satisfaction" },
];

const SERVICES: ServiceItem[] = [
  {
    title: "Boutique Property Advisory",
    description: "Curated property selection and personalised advisory services for discerning investors seeking India's most exquisite opportunities.",
    features: [
      "Curated Property Selection",
      "Exclusive Pre-Launch Access",
      "Personalised Advisory Services",
      "End-to-End Transaction Management",
      "Investment Portfolio Optimisation",
    ],
    contactEmail: "concierge@instate.studio",
    icon: "Building",
  },
  {
    title: "Developer Consulting",
    description: "Strategic market intelligence and analytics services helping developers optimise pricing, marketing, and sales performance.",
    features: [
      "Market Intelligence & Analytics",
      "Pricing Optimisation Models",
      "Consumer Behaviour Insights",
      "Marketing Strategy Development",
      "Sales Performance Tracking",
    ],
    contactEmail: "intelligence@instate.studio",
    icon: "BarChart",
  },
];

const GROWTH_DATA: ChartDataPoint[] = [
  { year: '2024', mumbai: 36, delhi: 19, bangalore: 16 },
  { year: '2025', mumbai: 43, delhi: 22, bangalore: 20 },
  { year: '2026', mumbai: 51, delhi: 25, bangalore: 25 },
  { year: '2027', mumbai: 60, delhi: 29, bangalore: 30 },
  { year: '2028', mumbai: 71, delhi: 34, bangalore: 37 },
  { year: '2029', mumbai: 84, delhi: 39, bangalore: 45 },
  { year: '2030', mumbai: 100, delhi: 45, bangalore: 55 },
];

// --- COMPONENTS ---

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'white';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className = '', ...props }) => {
  const baseStyles = "px-8 py-3 transition-all duration-300 font-medium tracking-wide text-sm md:text-base";
  
  const variants = {
    primary: "bg-bronze-500 text-white hover:bg-bronze-600 shadow-lg hover:shadow-xl",
    outline: "border border-bronze-500 text-bronze-500 hover:bg-bronze-50",
    white: "bg-white text-navy-900 hover:bg-gray-100 shadow-md",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Header Component
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className={`font-serif text-2xl tracking-widest font-bold z-50 transition-colors ${isScrolled || isMobileMenuOpen ? 'text-navy-900' : 'text-white'}`}>
          instate
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 items-center">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              className={`text-sm tracking-wider hover:text-bronze-500 transition-colors ${
                isScrolled ? 'text-slate-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact"
            className={`px-6 py-2 border text-sm transition-all duration-300 ${
              isScrolled 
                ? 'border-bronze-500 text-bronze-500 hover:bg-bronze-500 hover:text-white' 
                : 'border-white text-white hover:bg-white hover:text-navy-900'
            }`}
          >
            Get Started
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="text-navy-900 w-6 h-6" />
          ) : (
            <Menu className={`${isScrolled ? 'text-navy-900' : 'text-white'} w-6 h-6`} />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-white transition-transform duration-300 ease-in-out lg:hidden flex flex-col items-center justify-center space-y-8 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.label} 
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-serif text-navy-900 hover:text-bronze-500 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-3 bg-bronze-500 text-white mt-4"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
};

// MarketChart Component
const MarketChart: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-white p-6 rounded-lg shadow-sm border border-slate-100">
      <h3 className="font-serif text-xl mb-6 text-navy-900 text-center">Projected Capital Appreciation (₹ '000 / sq ft)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={GROWTH_DATA}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="#94a3b8" 
            tick={{fontSize: 12}} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{fontSize: 12}} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px' }}
            itemStyle={{ fontSize: '12px', fontWeight: 500 }}
          />
          <Legend wrapperStyle={{paddingTop: '20px'}} />
          <Line 
            type="monotone" 
            dataKey="mumbai" 
            name="Mumbai (18.5% CAGR)"
            stroke="#a67c52" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#a67c52', strokeWidth: 2, stroke: '#fff' }} 
            activeDot={{ r: 6 }} 
          />
          <Line 
            type="monotone" 
            dataKey="delhi" 
            name="Delhi NCR (15.2% CAGR)"
            stroke="#1e293b" 
            strokeWidth={2} 
            strokeDasharray="5 5"
            dot={{ r: 4, fill: '#1e293b', strokeWidth: 2, stroke: '#fff' }} 
          />
          <Line 
            type="monotone" 
            dataKey="bangalore" 
            name="Bangalore (22.3% CAGR)"
            stroke="#64748b" 
            strokeWidth={2} 
            dot={{ r: 4, fill: '#64748b', strokeWidth: 2, stroke: '#fff' }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="font-serif text-2xl tracking-widest">instate</h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              India's Premier Boutique Property Consultancy. Bridging the gap between discerning investors and exquisite opportunities.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-bronze-500 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-bronze-500 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="mailto:contact@instate.studio" className="p-2 bg-white/5 rounded-full hover:bg-bronze-500 transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-bronze-500 font-medium mb-6">Services</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><a href="#services" className="hover:text-white transition-colors">Boutique Property Advisory</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Developer Consulting</a></li>
              <li><a href="#early-access" className="hover:text-white transition-colors">Early Access Properties</a></li>
              <li><a href="#market-forecasting" className="hover:text-white transition-colors">Market Intelligence</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-bronze-500 font-medium mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#market-forecasting" className="hover:text-white transition-colors">Market Forecasting</a></li>
              <li><a href="#partnerships" className="hover:text-white transition-colors">Strategic Partnerships</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-bronze-500 font-medium mb-6">Contact</h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 shrink-0" />
                <span>contact@instate.studio<br/>paras@instate.studio</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>London, United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; 2025 instate. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'advisory' | 'developer'>('advisory');

  return (
    <div className="font-sans text-slate-600 bg-slate-50 overflow-x-hidden">
      <Header />

      {/* HERO SECTION */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden parallax">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2835&auto=format&fit=crop" 
            alt="Luxury Real Estate India" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-900/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20 text-center">
          <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-white/80 text-xs tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
            India's Premier Consultancy
          </span>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-tight mb-8">
            Transforming India's <br/>
            <span className="text-bronze-200 italic">Luxury Real Estate</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Bridging the gap between luxury real estate aspirations and market realities through data-driven excellence and exclusive access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" onClick={() => window.location.href='#contact'}>
              Get Started
            </Button>
            <Button variant="white" onClick={() => window.location.href='#about'}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT & VALUES */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h4 className="text-bronze-500 uppercase tracking-widest text-sm font-semibold mb-3">About instate</h4>
              <h2 className="font-serif text-4xl md:text-5xl text-navy-900 mb-8 leading-tight">
                Data-Driven Excellence in <span className="italic text-bronze-600">Boutique Property</span>
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                instate is a boutique real estate consultancy specialising in India's exquisite property market. We bridge the gap between discerning international investors and India's most sophisticated real estate opportunities.
              </p>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Founded with the vision of democratising access to India's luxury real estate market, we provide institutional-grade market intelligence and brokerage services to sophisticated UK investors.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                {STATS.map((stat, idx) => (
                  <div key={idx} className="border-l-2 border-bronze-200 pl-4">
                    <div className="text-3xl font-serif text-navy-900 mb-1">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 border border-bronze-100 rounded-lg transform rotate-2"></div>
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2940&auto=format&fit=crop" 
                alt="Luxury Interior" 
                className="relative rounded-lg shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Institutional Excellence", desc: "Fortune 500 quality services with detail." },
              { title: "Exclusive Access", desc: "Premium opportunities through strategic partnerships." },
              { title: "Data-Driven Insights", desc: "Analytics inform every investment decision." },
              { title: "Strategic Vision", desc: "Understanding market interconnections." }
            ].map((val, idx) => (
              <div key={idx} className="p-8 bg-slate-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 group">
                <div className="w-12 h-12 bg-navy-900 text-bronze-300 flex items-center justify-center rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="font-serif text-xl text-navy-900 mb-3">{val.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-bronze-500 uppercase tracking-widest text-sm font-semibold mb-3">Our Expertise</h4>
            <h2 className="font-serif text-4xl text-navy-900 mb-6">Comprehensive Services</h2>
            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={() => setActiveTab('advisory')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'advisory' ? 'bg-navy-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
              >
                Investor Advisory
              </button>
              <button 
                onClick={() => setActiveTab('developer')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${activeTab === 'developer' ? 'bg-navy-900 text-white shadow-lg' : 'bg-white text-slate-500 hover:bg-slate-100'}`}
              >
                Developer Consulting
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
            <div className="grid lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-bronze-600 mb-6">
                  {activeTab === 'advisory' ? <Building2 size={24} /> : <BarChart2 size={24} />}
                  <span className="text-sm font-semibold tracking-wider uppercase">
                    {activeTab === 'advisory' ? 'For Investors' : 'For Developers'}
                  </span>
                </div>
                
                <h3 className="font-serif text-3xl md:text-4xl text-navy-900 mb-6">
                  {activeTab === 'advisory' ? SERVICES[0].title : SERVICES[1].title}
                </h3>
                
                <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                  {activeTab === 'advisory' ? SERVICES[0].description : SERVICES[1].description}
                </p>

                <ul className="space-y-4 mb-10">
                  {(activeTab === 'advisory' ? SERVICES[0].features : SERVICES[1].features).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-bronze-100 flex items-center justify-center text-bronze-600 shrink-0">
                        <CheckCircle2 size={14} />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div>
                  <Button onClick={() => window.location.href = `mailto:${activeTab === 'advisory' ? SERVICES[0].contactEmail : SERVICES[1].contactEmail}`}>
                    Enquire Now
                  </Button>
                </div>
              </div>
              
              <div className="relative h-96 lg:h-auto">
                 <img 
                  src={activeTab === 'advisory' 
                    ? "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2906&auto=format&fit=crop" 
                    : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
                  }
                  alt="Service Visualization" 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-navy-900/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EARLY ACCESS */}
      <section id="early-access" className="py-24 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1">
              <span className="text-bronze-400 font-medium tracking-widest text-sm uppercase mb-4 block">Exclusive Opportunity</span>
              <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
                Unlock India's Most <br/><span className="text-bronze-400 italic">Prestigious Developments</span>
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Access exclusive pre-launch opportunities through our strategic developer partnerships. We provide our sophisticated clientele with priority access before general market release.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <ShieldCheck className="text-bronze-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Institutional-Grade Due Diligence</h4>
                    <p className="text-slate-400 text-sm">Rigorous vetting process for every asset.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg">
                    <TrendingUp className="text-bronze-400" size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-1">Market Forecasting</h4>
                    <p className="text-slate-400 text-sm">Proprietary models predicting value uplift.</p>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <Button variant="primary" onClick={() => window.location.href='#contact'}>Request Access</Button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2940&auto=format&fit=crop"
                  alt="Luxury Apartment"
                  className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-8 left-8">
                  <span className="px-3 py-1 bg-bronze-500 text-xs text-white uppercase tracking-wider mb-2 inline-block">Pre-Launch</span>
                  <h3 className="text-2xl font-serif">Mumbai Skyline Residences</h3>
                  <p className="text-slate-300">Worli, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET FORECASTING */}
      <section id="market-forecasting" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h4 className="text-bronze-500 uppercase tracking-widest text-sm font-semibold mb-3">Market Intelligence</h4>
            <h2 className="font-serif text-4xl text-navy-900 mb-6 max-w-2xl">
              Forecasting the future of <span className="italic text-bronze-600">Urban Growth</span>
            </h2>
            <p className="text-slate-600 max-w-3xl text-lg">
              Our proprietary forecasting models incorporate economic indicators, demographic trends, and infrastructure development to deliver actionable insights.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MarketChart />
            </div>
            <div className="space-y-4">
               {/* Insight Cards */}
               <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-bronze-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-serif text-lg text-navy-900">Luxury Segment</h5>
                    <span className="text-bronze-600 font-bold text-sm bg-bronze-50 px-2 py-1 rounded">28.7% CAGR</span>
                  </div>
                  <p className="text-slate-500 text-sm">High-Net-Worth demand driving premium asset appreciation.</p>
               </div>

               <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-bronze-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-serif text-lg text-navy-900">Infrastructure Impact</h5>
                    <span className="text-bronze-600 font-bold text-sm bg-bronze-50 px-2 py-1 rounded">+50% Uplift</span>
                  </div>
                  <p className="text-slate-500 text-sm">Metro proximity remains a key value driver in major metros.</p>
               </div>

               <div className="bg-slate-50 p-6 rounded-lg border border-slate-100 hover:border-bronze-200 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-serif text-lg text-navy-900">Ultra-Luxury</h5>
                    <span className="text-bronze-600 font-bold text-sm bg-bronze-50 px-2 py-1 rounded">₹2.5L+ /sq ft</span>
                  </div>
                  <p className="text-slate-500 text-sm">Record breaking transactions in South Mumbai and Lutyens Delhi.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERSHIPS */}
      <section id="partnerships" className="py-24 bg-bronze-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-navy-900 mb-6">Strategic Partnerships</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-12">
            Partner with instate to unlock India's luxury real estate market potential through our comprehensive intelligence platform and exclusive access network.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto mb-12">
            {[
              { title: "Brand Alignment", text: "Perfect fit for joint ventures and co-branding." },
              { title: "Marketing Expertise", text: "Leverage our capabilities for joint ventures." },
              { title: "Risk Mitigation", text: "Comprehensive due diligence reducing risks." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 shadow-sm rounded-xl">
                <h3 className="font-serif text-xl text-navy-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
          
          <Button variant="outline" onClick={() => window.location.href = 'mailto:paras@instate.studio'}>
            Enquire About Partnerships
          </Button>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h4 className="text-bronze-500 uppercase tracking-widest text-sm font-semibold mb-3">Get in Touch</h4>
              <h2 className="font-serif text-4xl md:text-5xl text-navy-900 mb-6">Start Your Journey</h2>
              <p className="text-slate-600 mb-10 text-lg">
                Ready to explore India's luxury property opportunities? Contact us for a confidential consultation.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-navy-900">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h5 className="font-medium text-navy-900">London Office</h5>
                    <p className="text-slate-500 text-sm">London, United Kingdom</p>
                    <p className="text-slate-500 text-sm mt-1">Mon - Fri: 9:00 AM - 6:00 PM GMT</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                   <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-navy-900">
                    <ArrowRight size={20} />
                  </div>
                  <div>
                    <h5 className="font-medium text-navy-900">Direct Contacts</h5>
                    <p className="text-slate-500 text-sm">General: contact@instate.studio</p>
                    <p className="text-slate-500 text-sm">Advisory: concierge@instate.studio</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-8 md:p-10 rounded-2xl shadow-lg border border-slate-100">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-bronze-500 focus:ring-1 focus:ring-bronze-500 outline-none transition-colors bg-white" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-bronze-500 focus:ring-1 focus:ring-bronze-500 outline-none transition-colors bg-white" placeholder="john@company.com" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Service Interest</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-bronze-500 focus:ring-1 focus:ring-bronze-500 outline-none transition-colors bg-white text-slate-600">
                    <option>Property Advisory</option>
                    <option>Developer Consulting</option>
                    <option>Partnerships</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                   <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Investment Range</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-bronze-500 focus:ring-1 focus:ring-bronze-500 outline-none transition-colors bg-white text-slate-600">
                    <option>£500k - £1M</option>
                    <option>£1M - £5M</option>
                    <option>£5M - £20M</option>
                    <option>£20M+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-bronze-500 focus:ring-1 focus:ring-bronze-500 outline-none transition-colors bg-white" placeholder="Tell us about your requirements..."></textarea>
                </div>

                <div className="pt-2">
                  <Button type="submit" className="w-full flex items-center justify-center gap-2">
                    Send Message <ChevronRight size={16} />
                  </Button>
                  <p className="text-xs text-slate-400 mt-4 text-center">
                    By sending this message, you agree to our Privacy Policy.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-20 bg-navy-800 text-white border-b border-white/10">
        <div className="container mx-auto px-6 text-center">
          <h3 className="font-serif text-2xl mb-4">Stay Updated with Market Intelligence</h3>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">Join 500+ investors receiving our quarterly intelligence reports and exclusive market insights.</p>
          <div className="max-w-md mx-auto flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-bronze-500 outline-none"
            />
            <Button variant="primary">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Root Render
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);