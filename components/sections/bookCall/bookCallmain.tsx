"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Shield, 
  Zap,
  Globe,
  ChevronRight,
  ChevronLeft,
  X,
  Menu,
  ArrowUp,
  Building2,
  Headphones,
  Briefcase,
  Code2,
  Star,
  CalendarCheck,
  Clock3,
  MapPin,
  Mail,
  PhoneCall,
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const callCategories = [
  {
    id: 'discovery',
    title: 'Discovery Call',
    duration: '15 min',
    price: 'Free',
    icon: Briefcase,
    color: 'blue',
    description: 'Quick intro to understand your needs and see if we\'re a fit',
    idealFor: ['New prospects', 'Exploring options', 'Budget planning'],
    host: {
      name: 'Rahul Verma',
      role: 'Solutions Consultant',
      avatar: 'RV',
      expertise: ['ISP Operations', 'Cost Analysis', 'ROI Planning']
    },
    agenda: [
      'Understand your current infrastructure',
      'Identify pain points and challenges',
      'Discuss potential solutions',
      'Next steps recommendation'
    ]
  },
  {
    id: 'technical',
    title: 'Technical Deep Dive',
    duration: '30 min',
    price: 'Free',
    icon: Code2,
    color: 'purple',
    description: 'Architecture review with our senior engineers',
    idealFor: ['CTOs', 'Network Engineers', 'Technical evaluators'],
    host: {
      name: 'Priya Sharma',
      role: 'Lead Solutions Architect',
      avatar: 'PS',
      expertise: ['Network Architecture', 'API Integration', 'Scalability']
    },
    agenda: [
      'Technical requirements gathering',
      'Architecture compatibility check',
      'Integration possibilities',
      'Q&A with engineering team'
    ]
  },
  {
    id: 'demo',
    title: 'Demo & Onboarding',
    duration: '45 min',
    price: 'Free',
    icon: Video,
    color: 'green',
    description: 'Full product walkthrough with implementation planning',
    idealFor: ['Decision makers', 'Implementation teams', 'Evaluating features'],
    host: {
      name: 'Aditya Kumar',
      role: 'Founder & CEO',
      avatar: 'AK',
      expertise: ['Product Strategy', 'Implementation', 'Growth']
    },
    agenda: [
      'Live product demonstration',
      'Feature deep-dive relevant to you',
      'Implementation timeline',
      'Onboarding process overview'
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise Consultation',
    duration: '60 min',
    price: 'Free',
    icon: Building2,
    color: 'orange',
    description: 'Strategic planning for large-scale deployments',
    idealFor: ['10,000+ subscribers', 'Multi-location ISPs', 'White-label needs'],
    host: {
      name: 'Neha Patel',
      role: 'Enterprise Account Director',
      avatar: 'NP',
      expertise: ['Enterprise Sales', 'Custom Solutions', 'SLA Design']
    },
    agenda: [
      'Custom requirements analysis',
      'Dedicated infrastructure discussion',
      'SLA and support planning',
      'Pricing and contract terms'
    ]
  },
  {
    id: 'support',
    title: 'Priority Support',
    duration: '15 min',
    price: 'For customers',
    icon: Headphones,
    color: 'red',
    description: 'Fast-track help for existing customers',
    idealFor: ['Current customers', 'Urgent issues', 'Account questions'],
    host: {
      name: 'Support Team',
      role: 'Customer Success',
      avatar: 'ST',
      expertise: ['Troubleshooting', 'Account Management', 'Best Practices']
    },
    agenda: [
      'Issue diagnosis',
      'Immediate workaround if available',
      'Resolution timeline',
      'Prevention recommendations'
    ]
  }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

const weekDays = [
  { day: 'Mon', date: '20', full: 'Monday, Feb 20' },
  { day: 'Tue', date: '21', full: 'Tuesday, Feb 21' },
  { day: 'Wed', date: '22', full: 'Wednesday, Feb 22' },
  { day: 'Thu', date: '23', full: 'Thursday, Feb 23' },
  { day: 'Fri', date: '24', full: 'Friday, Feb 24' },
  { day: 'Sat', date: '25', full: 'Saturday, Feb 25' },
  { day: 'Sun', date: '26', full: 'Sunday, Feb 26' }
];

export default function BookCallPage() {
  const [step, setStep] = useState(1);
 const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    guests: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [error, setError] = useState('');
  const [bookingId, setBookingId] = useState('');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentCategory = callCategories.find(c => c.id === selectedCategory);

  const handleBooking = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const bookingData = {
        callType: currentCategory?.title,
    duration: currentCategory?.duration,
        date: selectedDate,
        time: selectedTime,
        hostName: currentCategory?.host?.name,
    hostRole: currentCategory?.host?.role,
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        guests: formData.guests,
        notes: formData.notes
      };

      const response = await fetch('/api/book-call', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.success) {
        setBookingId(result.bookingId);
        setIsConfirmed(true);
      } else {
        throw new Error(result.error || 'Failed to book call');
      }

    } catch (err) {
      console.error('Booking error:', err);
      setError('Failed to confirm booking. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', email: '', company: '', phone: '', guests: '', notes: '' });
    setIsConfirmed(false);
    setError('');
    setBookingId('');
  };

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-card border border-border rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">You&apos;re All Set!</h2>
          <p className="text-muted-foreground mb-2">
            Your {currentCategory?.title} is confirmed
          </p>
          <p className="text-sm text-primary font-medium mb-6">
            Booking ID: {bookingId}
          </p>
          
          <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground text-sm">{selectedDate}</div>
                <div className="text-xs text-muted-foreground">{selectedTime} • {currentCategory?.duration}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium text-foreground text-sm">Google Meet</div>
                <div className="text-xs text-muted-foreground">Link will be emailed</div>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mb-6">
            Confirmation email sent to <strong>{formData.email}</strong>
          </p>

          <div className="space-y-3">
            <button 
              onClick={resetBooking}
              className="w-full py-3 bg-muted text-foreground font-medium rounded-xl hover:bg-muted/80 transition-all"
            >
              Book Another Call
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div className="flex items-center justify-center gap-3 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
            </motion.div>

            <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 lg:mb-6">
              Book a Call With Our Team
            </motion.h1>

            <motion.p className="text-base lg:text-lg text-muted-foreground mb-6 lg:mb-8 max-w-2xl mx-auto">
              Choose the type of call that fits your needs. No sales pressure — just 
              engineers helping engineers solve problems.
            </motion.p>

            {/* Trust Badges */}
            <motion.div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-xs lg:text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Free Consultation
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border">
                <Clock className="w-3.5 h-3.5" />
                Average wait: 2 days
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border">
                <Shield className="w-3.5 h-3.5" />
                Private & Encrypted
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-8 lg:mb-12">
            <div className="flex items-center justify-between">
              {[
                { step: 1, label: 'Select Type' },
                { step: 2, label: 'Choose Time' },
                { step: 3, label: 'Your Details' }
              ].map((s, idx) => (
                <div key={s.step} className="flex items-center">
                  <div className={`flex flex-col items-center ${step >= s.step ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-sm font-semibold mb-1 ${
                      step > s.step ? 'bg-primary text-primary-foreground' :
                      step === s.step ? 'bg-primary/10 text-primary border-2 border-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {step > s.step ? <Check className="w-4 h-4 lg:w-5 lg:h-5" /> : s.step}
                    </div>
                    <span className="text-xs hidden sm:block">{s.label}</span>
                  </div>
                  {idx < 2 && (
                    <div className={`w-12 lg:w-24 h-0.5 mx-2 lg:mx-4 ${step > s.step ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-600"
            >
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {/* Step 1: Select Category */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-5xl mx-auto"
            >
              <h2 className="text-lg lg:text-xl font-semibold text-foreground mb-4 lg:mb-6 text-center">
                What would you like to discuss?
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {callCategories.map((category, idx) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  return (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`relative text-left p-5 lg:p-6 rounded-xl lg:rounded-2xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? `border-${category.color}-500 bg-${category.color}-500/5 shadow-lg` 
                          : 'border-border bg-card hover:border-primary/30 hover:shadow-md'
                      }`}
                    >
                      {isSelected && (
                        <div className={`absolute top-4 right-4 w-6 h-6 rounded-full bg-${category.color}-500 flex items-center justify-center`}>
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${category.color}-500/10`}>
                        <Icon className={`w-6 h-6 text-${category.color}-500`} />
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{category.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full bg-${category.color}-500/10 text-${category.color}-600 font-medium`}>
                          {category.duration}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                        {category.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-foreground">{category.price}</span>
                        <div className="flex -space-x-2">
                          <div className={`w-6 h-6 rounded-full bg-${category.color}-500 text-white text-[10px] flex items-center justify-center border-2 border-card`}>
                            {category.host.avatar}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {selectedCategory && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 lg:mt-8 bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-${currentCategory?.color}-500/10 flex items-center justify-center shrink-0`}>
                      <Users className={`w-6 h-6 text-${currentCategory?.color}-500`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Your Host: {currentCategory?.host.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">{currentCategory?.host.role}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {currentCategory?.host.expertise.map((exp, i) => (
                          <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground">
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">What we&apos;ll cover:</h4>
                    <ul className="space-y-1.5">
                      {currentCategory?.agenda.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center gap-2"
                  >
                    Continue to Scheduling
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && currentCategory && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setStep(1)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-foreground">Select Date & Time</h2>
                  <p className="text-sm text-muted-foreground">{currentCategory.title} • {currentCategory.duration}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Date Selection */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-card border border-border rounded-xl lg:rounded-2xl p-4 lg:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-foreground">February 2026</h3>
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-muted rounded"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="p-1 hover:bg-muted rounded"><ChevronRight className="w-4 h-4" /></button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2 mb-2">
                      {['S','M','T','W','T','F','S'].map((d, i) => (
                        <div key={i} className="text-center text-xs text-muted-foreground py-2">{d}</div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-2">
                      {weekDays.map((day) => {
                        const isSelected = selectedDate === day.full;
                        const isToday = day.date === '20';
                        return (
                          <button
                            key={day.date}
                            onClick={() => setSelectedDate(day.full)}
                            className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm transition-all ${
                              isSelected 
                                ? 'bg-primary text-primary-foreground' 
                                : isToday
                                  ? 'bg-primary/10 text-primary border border-primary/20'
                                  : 'hover:bg-muted text-foreground'
                            }`}
                          >
                            <span className="text-xs opacity-70">{day.day}</span>
                            <span className="font-semibold">{day.date}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  {selectedDate && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-card border border-border rounded-xl lg:rounded-2xl p-4 lg:p-6"
                    >
                      <h3 className="font-semibold text-foreground mb-4">Available Times</h3>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map((time) => {
                          const isSelected = selectedTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                                isSelected
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted text-foreground hover:bg-muted/80'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Sidebar Summary */}
                <div className="space-y-4">
                  <div className="bg-card border border-border rounded-xl lg:rounded-2xl p-5">
                    <h3 className="font-semibold text-foreground mb-4">Booking Summary</h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-${currentCategory.color}-500/10 flex items-center justify-center`}>
                          <currentCategory.icon className={`w-5 h-5 text-${currentCategory.color}-500`} />
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">{currentCategory.title}</div>
                          <div className="text-xs text-muted-foreground">{currentCategory.duration}</div>
                        </div>
                      </div>

                      {selectedDate && (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <div className="font-medium text-foreground text-sm">{selectedDate}</div>
                            {selectedTime && <div className="text-xs text-muted-foreground">{selectedTime}</div>}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                          <Globe className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">Your Time Zone</div>
                          <div className="text-xs text-muted-foreground">IST (UTC+5:30)</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4 text-center">
                    <p className="text-xs text-muted-foreground">
                      <Clock3 className="w-4 h-4 inline mr-1" />
                      Times shown in your local timezone
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Your Details */}
          {step === 3 && currentCategory && selectedDate && selectedTime && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <button 
                  onClick={() => setStep(2)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h2 className="text-lg lg:text-xl font-semibold text-foreground">Your Information</h2>
                  <p className="text-sm text-muted-foreground">So we can prepare for our call</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-6 mb-6">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg mb-6">
                  <div className={`w-10 h-10 rounded-lg bg-${currentCategory.color}-500/10 flex items-center justify-center`}>
                    <currentCategory.icon className={`w-5 h-5 text-${currentCategory.color}-500`} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-foreground text-sm">{currentCategory.title}</div>
                    <div className="text-xs text-muted-foreground">{selectedDate} at {selectedTime}</div>
                  </div>
                  <button 
                    onClick={() => setStep(2)}
                    className="text-xs text-primary hover:underline"
                  >
                    Change
                  </button>
                </div>

                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Company / ISP Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="FastNet Broadband"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="+1 (234) 567-890"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      What would you like to discuss? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                      placeholder="Tell us about your current setup, challenges you're facing, or specific questions you have..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Additional guests (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.guests}
                      onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="email@example.com, email2@example.com"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Separate multiple emails with commas</p>
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input type="checkbox" id="consent" className="mt-1 rounded border-border" required />
                    <label htmlFor="consent" className="text-sm text-muted-foreground">
                      I agree to receive meeting confirmations and reminders via email. 
                      I understand this call may be recorded for quality purposes (with my consent).
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.company || !formData.notes}
                    className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Confirming...
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="w-4 h-4" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  By booking, you agree to our{' '}
                  <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{' '}
                  <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Mobile Nav */}
      {isMobile && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsNavOpen(true)}
          className="fixed bottom-6 right-4 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  );
}