"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Users, 
  Shield, 
  Zap,
  Globe,
  Calendar,
  FileText,
  ChevronDown,
  ChevronRight,
  X,
  Menu,
  ArrowUp,
  Headphones,
  Building2,
  Briefcase,
  HelpCircle,
  Upload,
  Loader2
} from 'lucide-react';
import SubscribeSection from '@/components/layout/subscription';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const contactMethods = [
  {
    id: 'support',
    title: 'Technical Support',
    description: 'For existing customers facing issues',
    icon: Headphones,
    color: 'blue',
    responseTime: '2 hours',
    availability: '24/7',
    action: 'Get Help',
    email: 'support@codearntech.com',
    features: ['Bug reports', 'Feature requests', 'API issues', 'Urgent outages'],
    apiEndpoint: '/api/support'
  },
  {
    id: 'sales',
    title: 'Sales Inquiry',
    description: 'Questions about pricing & features',
    icon: Briefcase,
    color: 'green',
    responseTime: '24 hours',
    availability: 'Business days',
    action: 'Talk to Sales',
    email: 'sales@codearntech.com',
    features: ['Custom pricing', 'Demo requests', 'Enterprise plans', 'Integration help'],
    apiEndpoint: '/api/sales'
  },
  {
    id: 'partners',
    title: 'Partnerships',
    description: 'Integration & reseller opportunities',
    icon: Building2,
    color: 'purple',
    responseTime: '48 hours',
    availability: 'Business days',
    action: 'Partner With Us',
    email: 'partners@codearntech.com',
    features: ['API partnerships', 'Reseller programs', 'Technology alliances', 'Co-marketing'],
    apiEndpoint: '/api/partners'
  }
];

const faqs = [
  {
    question: 'How do I get urgent help for a production outage?',
    answer: 'For critical outages affecting your customers, email codearntech@gmail.com or call our emergency hotline. Enterprise customers get priority SLA with 15-minute response times.'
  },
  {
    question: 'Do you offer custom enterprise plans?',
    answer: 'Yes! We offer tailored solutions for ISPs with 10,000+ subscribers. Contact our sales team for dedicated infrastructure, custom SLAs, and white-label options.'
  },
  {
    question: 'Can I schedule a technical demo with your engineering team?',
    answer: 'Absolutely. Our engineers (not salespeople) conduct technical demos. Book directly through our calendar or request a specific time that works for your team.'
  },
  {
    question: 'What information should I include in a bug report?',
    answer: 'Include: 1) Steps to reproduce, 2) Expected vs actual behavior, 3) Screenshots/logs, 4) Browser/OS version, 5) Your account email. This helps us resolve issues faster.'
  }
];

const teamMembers = [
  { name: 'Aditya Kumar', role: 'Founder & CEO', avatar: 'AK', color: 'bg-blue-500' },
  { name: 'Priya Sharma', role: 'Head of Engineering', avatar: 'PS', color: 'bg-purple-500' },
  { name: 'Rahul Verma', role: 'Customer Success', avatar: 'RV', color: 'bg-green-500' },
  { name: 'Neha Patel', role: 'Solutions Architect', avatar: 'NP', color: 'bg-orange-500' }
];

export default function ContactPage() {
  const [activeMethod, setActiveMethod] = useState('support');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: 'normal',
    budget: '',
    timeline: '',
    partnershipType: '',
    website: '',
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
 const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const currentMethod = contactMethods.find(m => m.id === activeMethod);
    
    try {
      // FormData banayein (file upload ke liye)
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('company', formData.company);
      submitData.append('subject', formData.subject);
      submitData.append('message', formData.message);

      // Method specific fields
      if (activeMethod === 'support') {
        submitData.append('priority', formData.priority);
      } else if (activeMethod === 'sales') {
        submitData.append('budget', formData.budget);
        submitData.append('timeline', formData.timeline);
      } else if (activeMethod === 'partners') {
        submitData.append('partnershipType', formData.partnershipType);
        submitData.append('website', formData.website);
      }

      // File agar hai toh add karein
      if (formData.file) {
        submitData.append('file', formData.file);
      }

      // API call
      if (!currentMethod) {
  throw new Error("Payment method not selected");
}

// Ab TypeScript ko pata hai ke currentMethod undefined nahi ho sakta
const response = await fetch(currentMethod.apiEndpoint, {
  method: 'POST',
  body: submitData,
});

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        // Form reset
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: '',
          priority: 'normal',
          budget: '',
          timeline: '',
          partnershipType: '',
          website: '',
          file: null
        });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error(result.error || 'Failed to submit');
      }

    } catch (err) {
      console.error('Submit error:', err);
      setError('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      alert('File size should be less than 10MB');
      return;
    }
    setFormData({...formData, file});
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentMethod = contactMethods.find(m => m.id === activeMethod) || contactMethods[0];

  // Render method specific fields
  const renderMethodFields = () => {
    switch(activeMethod) {
      case 'support':
        return (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Priority Level
            </label>
            <div className="flex gap-2 flex-wrap">
              {['low', 'normal', 'high', 'urgent'].map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData({...formData, priority})}
                  className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-medium capitalize transition-all ${
                    formData.priority === priority
                      ? priority === 'urgent' 
                        ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                        : 'bg-blue-500/10 text-blue-600 border border-blue-500/20'
                      : 'bg-muted text-muted-foreground border border-border hover:border-blue-500/20'
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        );
      
      case 'sales':
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Budget Range (Optional)
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({...formData, budget: e.target.value})}
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select budget</option>
                <option value="< $1k">Less than $1,000</option>
                <option value="$1k-$5k">$1,000 - $5,000</option>
                <option value="$5k-$20k">$5,000 - $20,000</option>
                <option value="$20k-$50k">$20,000 - $50,000</option>
                <option value="> $50k">More than $50,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Timeline (Optional)
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select timeline</option>
                <option value="immediate">Immediate</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </div>
        );
      
      case 'partners':
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Partnership Type
              </label>
              <select
                value={formData.partnershipType}
                onChange={(e) => setFormData({...formData, partnershipType: e.target.value})}
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select type</option>
                <option value="API Partnership">API Partnership</option>
                <option value="Reseller Program">Reseller Program</option>
                <option value="Technology Alliance">Technology Alliance</option>
                <option value="Co-marketing">Co-marketing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Company Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="https://company.com"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
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
                <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
            </motion.div>

            <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 lg:mb-6">
              Let&apos;s Talk
            </motion.h1>

            <motion.p className="text-base lg:text-xl text-muted-foreground mb-6 lg:mb-8 max-w-2xl mx-auto">
              Whether you need technical support, want to explore enterprise features, 
              or just want to say hello — we&apos;re here.
            </motion.p>

            {/* Trust Badges */}
            <motion.div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 text-xs lg:text-sm">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                2hr avg response
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border">
                <Shield className="w-3.5 h-3.5" />
                SOC 2 Compliant
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border">
                <Users className="w-3.5 h-3.5" />
                200+ ISPs helped
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 lg:gap-6 mb-12">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              const isActive = activeMethod === method.id;
              return (
                <motion.button
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setActiveMethod(method.id)}
                  className={`relative text-left p-5 lg:p-6 rounded-xl lg:rounded-2xl border transition-all duration-300 ${
                    isActive 
                      ? 'bg-card border-primary/30 shadow-lg shadow-primary/5' 
                      : 'bg-muted/30 border-border hover:border-primary/20 hover:bg-muted/50'
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
                  )}
                  
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-4 ${
                    isActive ? `bg-${method.color}-500/10` : 'bg-muted'
                  }`}>
                    <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${
                      isActive ? `text-${method.color}-500` : 'text-muted-foreground'
                    }`} />
                  </div>

                  <h3 className="text-base lg:text-lg font-semibold text-foreground mb-1">
                    {method.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground mb-4">
                    {method.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Response: <span className="text-foreground font-medium">{method.responseTime}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Zap className="w-3.5 h-3.5" />
                      <span>Available: <span className="text-foreground font-medium">{method.availability}</span></span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {method.features.slice(0, 2).map((feature, i) => (
                      <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg lg:text-xl font-bold text-foreground">
                      Send a Message
                    </h2>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      {currentMethod.description}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${currentMethod.color}-500/10 text-${currentMethod.color}-600`}>
                    {currentMethod.responseTime} response
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        We&apos;ll get back to you within {currentMethod.responseTime}.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Check your email for confirmation.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4" />
                          {error}
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Company / ISP Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                          className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="FastNet Broadband"
                        />
                      </div>

                      {/* Method Specific Fields */}
                      {renderMethodFields()}

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="How can we help?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                          placeholder="Describe your issue or question in detail..."
                        />
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Attachments (optional)
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          />
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/30 transition-colors bg-muted/30"
                          >
                            {formData.file ? (
                              <div className="flex items-center gap-2 text-sm text-foreground">
                               
                              </div>
                            ) : (
                              <>
                                <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                                <p className="text-xs text-muted-foreground">
                                  Drop files here or click to upload
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                  Max 10MB • Screenshots, logs, etc.
                                </p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-center text-muted-foreground">
                        Or email us directly at{' '}
                        <a href={`mailto:${currentMethod.email}`} className="text-primary hover:underline">
                          {currentMethod.email}
                        </a>
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Sidebar Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Contact */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-6"
              >
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Other Ways to Reach Us
                </h3>
                
                <div className="space-y-4">
                  <a href="mailto:hello@codearntech.com" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">General Inquiries</div>
                      <div className="text-xs text-muted-foreground">codearntech@gmail.com</div>
                    </div>
                  </a>

                  <a href="tel:+1234567890" className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">Emergency Hotline</div>
                      <div className="text-xs text-muted-foreground">+92-321-9515138</div>
                    </div>
                  </a>

                  <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Calendar className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-foreground text-sm">Book a Demo</div>
                      <div className="text-xs text-muted-foreground">Schedule with our engineers</div>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* Team Preview */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-6"
              >
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  You&apos;ll Talk To Humans
                </h3>
                
                <div className="flex -space-x-3 mb-4">
                  {teamMembers.map((member, idx) => (
                    <div 
                      key={idx}
                      className={`w-10 h-10 rounded-full ${member.color} border-2 border-card flex items-center justify-center text-xs font-bold text-white`}
                      title={`${member.name} - ${member.role}`}
                    >
                      {member.avatar}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs text-muted-foreground">
                    +8
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  Our team includes former ISP operators, network engineers, and support specialists who understand your challenges.
                </p>
              </motion.div>

              {/* Office Location */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-6"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground text-sm mb-1">Headquarters</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Samundri, City<br />
                      Faislabad
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm lg:text-base">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 lg:p-5 text-left"
                >
                  <span className="font-medium text-foreground text-sm lg:text-base pr-4">
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 lg:px-5 pb-4 lg:pb-5 pt-0">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Floating Nav */}
      {isMobile && (
        <>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setIsNavOpen(true)}
            className="fixed bottom-6 right-4 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center"
          >
            <Menu className="w-6 h-6" />
          </motion.button>

          <AnimatePresence>
            {isNavOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsNavOpen(false)}
                  className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                />
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl z-50 p-4"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Quick Actions</h3>
                    <button onClick={() => setIsNavOpen(false)}>
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {contactMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => {
                            setActiveMethod(method.id);
                            setIsNavOpen(false);
                            scrollToTop();
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                          <Icon className="w-5 h-5 text-primary" />
                          <span className="text-sm font-medium">{method.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          
        </>
      )}
      <SubscribeSection/>
    </div>
  );
}