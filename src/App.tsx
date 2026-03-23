/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Zap, 
  Disc, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  PhoneCall, 
  ChevronDown, 
  CheckCircle2, 
  Menu, 
  X,
  Wrench,
  Fuel,
  Lock
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-safety-orange p-1.5 rounded-sm">
            <Truck className={`w-6 h-6 ${isScrolled ? 'text-white' : 'text-white'}`} />
          </div>
          <span className={`text-2xl font-black tracking-tighter uppercase italic ${isScrolled ? 'text-slate-950' : 'text-white'}`}>
            Recovero
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Services', 'About', 'Fleet', 'FAQ'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-sm font-bold tracking-wide uppercase hover:text-safety-orange transition-colors ${
                isScrolled ? 'text-slate-950' : 'text-white'
              }`}
            >
              {item}
            </a>
          ))}
          <button className="bg-safety-orange hover:bg-orange-700 text-white px-6 py-2.5 rounded-sm font-black text-sm uppercase tracking-wider transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-600/20">
            Request Tow
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={isScrolled ? 'text-slate-950' : 'text-white'} />
          ) : (
            <Menu className={isScrolled ? 'text-slate-950' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {['Services', 'About', 'Fleet', 'FAQ'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-950 text-lg font-bold uppercase"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button className="bg-safety-orange text-white w-full py-4 rounded-sm font-black uppercase tracking-wider">
                Request Tow
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 opacity-40"
      >
        <img 
          src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=2000" 
          alt="Recovery Truck at night"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
      </motion.div>

      {/* Ghost Silhouettes Animation */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ 
              x: '200%', 
              opacity: [0, 0.1, 0] 
            }}
            transition={{ 
              duration: 15 + i * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 7
            }}
            className="absolute top-1/2 -translate-y-1/2"
          >
            <Truck className="w-96 h-96 text-white/10 rotate-12" strokeWidth={0.5} />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safety-orange opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-safety-orange"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">Live Dispatch Active</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
            Rapid <span className="text-safety-orange text-shadow-glow">Recovery</span> <br /> Service
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-medium mb-12 leading-relaxed">
            Elite 24/7 roadside assistance for premium vehicles. When performance meets the unexpected, we provide the solution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-safety-orange hover:bg-orange-700 text-white px-10 py-5 rounded-sm font-black text-lg uppercase tracking-widest transition-all shadow-2xl shadow-orange-600/40">
              Get Immediate Help
            </button>
            <button className="w-full sm:w-auto glass hover:bg-white/10 text-white px-10 py-5 rounded-sm font-black text-lg uppercase tracking-widest transition-all">
              Our Services
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

const TrustBar = () => {
  const services = [
    "Jump Starts", "Winch Outs", "Flat Tire Change", "Fuel Delivery", "Lockout Service", "Long Distance Towing"
  ];

  return (
    <div className="bg-white py-8 overflow-hidden border-y border-slate-200">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {services.map((service) => (
              <div key={service} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-safety-orange" />
                <span className="text-slate-950 font-black uppercase tracking-wider text-sm">{service}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsGrid = () => {
  const stats = [
    { label: "Recoveries Completed", value: "50K+" },
    { label: "Response Time", value: "<30m" },
    { label: "Fleet Vehicles", value: "120+" },
    { label: "Customer Rating", value: "4.9/5" },
  ];

  return (
    <section className="py-24 bg-slate-950 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl font-black text-white mb-2 italic tracking-tighter">
                {stat.value}
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-safety-orange">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const benefits = [
    {
      title: "Transparent Pricing",
      desc: "No hidden fees or surprise surcharges. Get an instant quote before we dispatch.",
      icon: ShieldCheck
    },
    {
      title: "Safe Handling",
      desc: "Specialized equipment for low-clearance and luxury vehicles to ensure zero damage.",
      icon: Truck
    },
    {
      title: "Real-time Tracking",
      desc: "Watch our rescue vehicle approach your location in real-time on your mobile device.",
      icon: MapPin
    }
  ];

  return (
    <section id="about" className="py-32 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -50 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">
              Why <span className="text-safety-orange">Elite</span> Rescue?
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-xl">
              We don't just tow cars; we rescue your schedule. Our premium service is designed for those who demand reliability and professionalism in every mile.
            </p>

            <div className="space-y-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex-shrink-0 w-14 h-14 glass flex items-center justify-center rounded-sm group-hover:bg-safety-orange transition-colors duration-500">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase mb-2 tracking-tight">{benefit.title}</h3>
                    <p className="text-white/40 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 50 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square glass rounded-3xl overflow-hidden p-4">
              <img 
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1000" 
                alt="Tracking Mockup"
                className="w-full h-full object-cover rounded-2xl opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-safety-orange/20 to-transparent pointer-events-none" />
            </div>
            {/* Floating UI Element */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-2xl shadow-2xl max-w-xs"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-safety-orange rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase text-white/50">Driver En Route</div>
                  <div className="text-sm font-black uppercase">John D. • 4 mins away</div>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 2, delay: 1 }}
                  className="h-full bg-safety-orange"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServicesGrid = () => {
  const services = [
    { title: "Emergency Towing", icon: Truck, desc: "24/7 flatbed and wheel-lift recovery." },
    { title: "Battery Jump", icon: Zap, desc: "Professional jump-start for all vehicles." },
    { title: "Tire Change", icon: Disc, desc: "On-site tire replacement and repair." },
    { title: "Fuel Delivery", icon: Fuel, desc: "Emergency gas or diesel delivery." },
    { title: "Lockout Assist", icon: Lock, desc: "Damage-free vehicle entry service." },
    { title: "Roadside Repair", icon: Wrench, desc: "Minor mechanical fixes on the spot." },
  ];

  return (
    <section id="services" className="py-32 bg-slate-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">
            Our <span className="text-safety-orange">Arsenal</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto uppercase tracking-widest text-sm font-bold">
            Comprehensive roadside solutions for every scenario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="group glass p-8 rounded-sm hover:border-safety-orange/50 transition-all duration-500 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-safety-orange/0 group-hover:bg-safety-orange/5 transition-colors duration-500" />
              <service.icon className="w-10 h-10 text-safety-orange mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-lg font-black uppercase tracking-tight mb-3">{service.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed uppercase tracking-wider">{service.desc}</p>
              <div className="mt-6 w-0 group-hover:w-full h-0.5 bg-safety-orange transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How fast is your average response time?",
      a: "Our average response time is under 30 minutes within city limits. We utilize a dynamic dispatch system that routes the closest available unit to your exact GPS coordinates."
    },
    {
      q: "Do you handle luxury and low-clearance vehicles?",
      a: "Yes, we specialize in premium vehicle recovery. Our fleet includes specialized flatbeds with low-angle loading ramps designed specifically for supercars and low-clearance luxury vehicles."
    },
    {
      q: "Are you available on holidays and weekends?",
      a: "Recovero operates 24/7, 365 days a year. Our dispatch center and recovery fleet never sleep, ensuring you're never stranded, regardless of the date or time."
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit cards, digital wallets (Apple Pay/Google Pay), and most major insurance roadside assistance plans."
    }
  ];

  return (
    <section id="faq" className="py-32 bg-slate-950">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-16 text-center">
          Common <span className="text-safety-orange">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass rounded-sm overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
              >
                <span className="text-lg font-bold uppercase tracking-tight">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-safety-orange transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-white/50 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-safety-orange p-1.5 rounded-sm">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic text-white">
                Recovero
              </span>
            </div>
            <p className="text-white/40 max-w-md leading-relaxed mb-8">
              The gold standard in vehicle recovery and roadside assistance. Professional, rapid, and reliable service for the modern driver.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
                <a key={social} href="#" className="text-xs font-bold uppercase tracking-widest text-white/40 hover:text-safety-orange transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-safety-orange">Quick Links</h4>
            <ul className="space-y-4">
              {['Services', 'About', 'Fleet', 'FAQ'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm font-bold uppercase text-white/60 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-8 text-safety-orange">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/60">
                <PhoneCall className="w-4 h-4 text-safety-orange" />
                <span className="text-sm font-bold">1-800-RECOVERO</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <MapPin className="w-4 h-4 text-safety-orange" />
                <span className="text-sm font-bold">Global HQ, London UK</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
          <p className="text-xs font-bold uppercase tracking-widest text-white/20">
            © 2026 Recovero Industries. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/20 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-white/20 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const EmergencyCTA = () => {
  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 right-6 z-50 md:hidden"
    >
      <button className="bg-safety-orange text-white p-4 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
        <PhoneCall className="w-6 h-6" />
        <span className="font-black uppercase tracking-wider pr-2">Call Now</span>
      </button>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-safety-orange selection:text-white">
      <Navbar />
      <Hero />
      <TrustBar />
      <StatsGrid />
      <WhyChooseUs />
      <ServicesGrid />
      <FAQ />
      <Footer />
      <EmergencyCTA />
    </div>
  );
}
