import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Map, 
  Bot, 
  BarChart3, 
  Globe, 
  Mic, 
  Camera, 
  FileText,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Star,
  Zap,
  Shield,
  Smartphone,
  Building2,
  Scale,
  Eye,
  MessageCircle,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Heart,
  Lightbulb,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  PlayCircle,
  Download,
  Share2,
  Bell,
  Filter,
  Search,
  ThumbsUp,
  AlertCircle,
  Info,
  Settings,
  HelpCircle,
  LogIn,
  UserPlus
} from 'lucide-react';

import ComplaintForm from './components/ComplaintForm';
import IssueTracker from './components/IssueTracker';
import DemoModal from './components/DemoModal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [activePolicy, setActivePolicy] = useState(0);
  const [activeFeedback, setActiveFeedback] = useState('all');
  const [scrollY, setScrollY] = useState(0);
  const [isComplaintFormOpen, setIsComplaintFormOpen] = useState(false);
  const [isIssueTrackerOpen, setIsIssueTrackerOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: "Smart Complaint System",
      description: "Submit civic issues via text, voice, or image in your preferred regional language with AI-powered categorization",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500",
      action: () => setIsComplaintFormOpen(true)
    },
    {
      icon: Map,
      title: "Real-time Issue Mapping",
      description: "Visualize civic problems across your city with live status updates and heat map analytics",
      color: "green",
      gradient: "from-green-500 to-emerald-500",
      action: () => setIsIssueTrackerOpen(true)
    },
    {
      icon: Bot,
      title: "AI-Powered Assistant",
      description: "Get instant assistance and information in 15+ Indian languages with contextual responses",
      color: "purple",
      gradient: "from-purple-500 to-violet-500",
      action: () => alert('AI Assistant feature coming soon!')
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Comprehensive insights for administrators to track, prioritize, and resolve issues efficiently",
      color: "orange",
      gradient: "from-orange-500 to-red-500",
      action: () => alert('Analytics Dashboard available for government officials')
    }
  ];

  const policies = [
    {
      title: "Digital India Initiative",
      description: "Aligned with government's vision for digital transformation",
      icon: Smartphone,
      status: "Active",
      action: () => window.open('https://digitalindia.gov.in/', '_blank')
    },
    {
      title: "Right to Information Act",
      description: "Ensuring transparency and accountability in governance",
      icon: Eye,
      status: "Compliant",
      action: () => window.open('https://rti.gov.in/', '_blank')
    },
    {
      title: "Municipal Corporation Act",
      description: "Supporting local governance and citizen services",
      icon: Building2,
      status: "Integrated",
      action: () => alert('Municipal integration details available for officials')
    },
    {
      title: "Data Protection Framework",
      description: "Adhering to privacy and data security regulations",
      icon: Shield,
      status: "Certified",
      action: () => document.getElementById('privacy')?.scrollIntoView({ behavior: 'smooth' })
    }
  ];

  const dailyStats = [
    { label: "Issues Reported Today", value: "247", change: "+12%", icon: MessageSquare, action: () => setIsIssueTrackerOpen(true) },
    { label: "Issues Resolved Today", value: "189", change: "+8%", icon: CheckCircle, action: () => setIsIssueTrackerOpen(true) },
    { label: "Active Users", value: "1,234", change: "+15%", icon: Users, action: () => alert('User analytics available for administrators') },
    { label: "Response Time", value: "18 min", change: "-5%", icon: Clock, action: () => alert('Performance metrics dashboard coming soon') }
  ];

  const recentIssues = [
    {
      id: 1,
      title: "Street Light Repair",
      location: "MG Road, Sector 14",
      status: "Resolved",
      time: "2 hours ago",
      category: "Infrastructure",
      rating: 4.8,
      action: () => setIsIssueTrackerOpen(true)
    },
    {
      id: 2,
      title: "Water Supply Issue",
      location: "Nehru Colony",
      status: "In Progress",
      time: "4 hours ago",
      category: "Utilities",
      rating: null,
      action: () => setIsIssueTrackerOpen(true)
    },
    {
      id: 3,
      title: "Road Pothole",
      location: "Civil Lines",
      status: "Resolved",
      time: "6 hours ago",
      category: "Roads",
      rating: 4.5,
      action: () => setIsIssueTrackerOpen(true)
    }
  ];

  const feedbackData = {
    all: [
      { user: "Rajesh Kumar", rating: 5, comment: "Excellent service! My complaint was resolved within 24 hours.", time: "2 days ago", issue: "Street Cleaning" },
      { user: "Priya Sharma", rating: 4, comment: "Good platform, but could use better mobile app interface.", time: "3 days ago", issue: "Water Supply" },
      { user: "Amit Singh", rating: 5, comment: "Very responsive team. Great initiative for digital governance.", time: "5 days ago", issue: "Traffic Signal" }
    ],
    positive: [
      { user: "Rajesh Kumar", rating: 5, comment: "Excellent service! My complaint was resolved within 24 hours.", time: "2 days ago", issue: "Street Cleaning" },
      { user: "Amit Singh", rating: 5, comment: "Very responsive team. Great initiative for digital governance.", time: "5 days ago", issue: "Traffic Signal" }
    ],
    suggestions: [
      { user: "Priya Sharma", rating: 4, comment: "Good platform, but could use better mobile app interface.", time: "3 days ago", issue: "Water Supply" }
    ]
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
      setActivePolicy((prev) => (prev + 1) % policies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleGetStarted = () => {
    setIsComplaintFormOpen(true);
  };

  const handleWatchDemo = () => {
    setIsDemoModalOpen(true);
  };

  const handlePrivacyPolicy = () => {
    alert('Privacy Policy: We protect your data with enterprise-grade security. No personal information is shared with third parties. You have complete control over your data.');
  };

  const handleContactSupport = () => {
    alert('Contact Support:\nPhone: +91-11-2345-6789\nEmail: support@nagarik-sahayak.gov.in\n24/7 helpline available');
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 transform hover:scale-105 transition-transform duration-300">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Nagarik Sahayak
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { name: 'Features', id: 'features' },
                { name: 'Policies', id: 'policies' },
                { name: 'Daily Stats', id: 'daily-stats' },
                { name: 'Feedback', id: 'feedback' },
                { name: 'Privacy', id: 'privacy' }
              ].map((item) => (
                <button 
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 hover:scale-105 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <button 
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                Get Started
              </button>
            </div>

            <button 
              className="md:hidden transform hover:scale-110 transition-transform duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Glass Effect */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-white/20 animate-slideDown">
            <div className="px-4 py-2 space-y-2">
              {[
                { name: 'Features', id: 'features' },
                { name: 'Policies', id: 'policies' },
                { name: 'Daily Stats', id: 'daily-stats' },
                { name: 'Feedback', id: 'feedback' },
                { name: 'Privacy', id: 'privacy' }
              ].map((item) => (
                <button 
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </button>
              ))}
              <button 
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 rounded-lg mt-2 transform hover:scale-105 transition-transform duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative z-10 py-20" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeInLeft">
              <div className="inline-flex items-center bg-white/60 backdrop-blur-sm text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20 shadow-lg">
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
                AI-Powered Civic Engagement
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent animate-gradient"> Civic </span>
                Engagement in India
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Nagarik Sahayak bridges the gap between citizens and governance through AI-powered solutions. 
                Report issues, get instant responses, and track resolutions in your preferred language.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleGetStarted}
                  className="group bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  Report an Issue
                  <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button 
                  onClick={handleWatchDemo}
                  className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 hover:scale-105 bg-white/60 backdrop-blur-sm"
                >
                  <PlayCircle className="w-5 h-5 mr-2 inline group-hover:scale-110 transition-transform duration-300" />
                  Watch Demo
                </button>
              </div>
            </div>
            
            <div className="relative animate-fadeInRight">
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse animation-delay-1000"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse animation-delay-2000"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full animate-shimmer"></div>
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-blue-300 rounded w-3/4 animate-shimmer animation-delay-500"></div>
                    <div className="h-4 bg-gradient-to-r from-green-200 to-green-300 rounded w-1/2 animate-shimmer animation-delay-1000"></div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-100/80 to-green-100/80 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                    <MessageSquare className="w-8 h-8 text-blue-600 mb-2 animate-bounce" />
                    <p className="text-sm text-gray-600">AI Processing your civic complaint...</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full animate-progress"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Stats Section */}
      <section id="daily-stats" className="relative z-10 py-16 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Today's Impact</h2>
            <p className="text-lg text-gray-600">Real-time statistics showing our daily civic engagement</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyStats.map((stat, index) => (
              <div 
                key={index} 
                onClick={stat.action}
                className="group bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 border border-white/20 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Enhanced Animations */}
      <section id="features" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Revolutionizing Civic Engagement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines cutting-edge AI technology with user-friendly design 
              to make civic participation accessible to every Indian citizen.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`group p-6 rounded-xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                    activeFeature === index 
                      ? 'bg-white/80 backdrop-blur-lg shadow-xl border border-white/30 translate-x-2' 
                      : 'bg-white/40 backdrop-blur-sm hover:bg-white/60 hover:shadow-lg border border-white/20'
                  }`}
                  onClick={() => {
                    setActiveFeature(index);
                    feature.action();
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-gray-400 transition-all duration-300 ${
                      activeFeature === index ? 'rotate-90 text-blue-600' : 'group-hover:translate-x-1'
                    }`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20 animate-float">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Multi-Modal Input</h3>
                  <div className="flex space-x-2">
                    <div className="p-2 bg-blue-100 rounded-lg animate-pulse">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg animate-pulse animation-delay-1000">
                      <Mic className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg animate-pulse animation-delay-2000">
                      <Camera className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div 
                    onClick={() => setIsComplaintFormOpen(true)}
                    className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-blue-200 cursor-pointer"
                  >
                    <p className="text-blue-800 font-medium flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Text Input
                    </p>
                    <p className="text-blue-600 text-sm">Type your complaint in any Indian language</p>
                  </div>
                  <div 
                    onClick={() => setIsComplaintFormOpen(true)}
                    className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-green-200 cursor-pointer"
                  >
                    <p className="text-green-800 font-medium flex items-center">
                      <Mic className="w-4 h-4 mr-2" />
                      Voice Recording
                    </p>
                    <p className="text-green-600 text-sm">Speak naturally in your mother tongue</p>
                  </div>
                  <div 
                    onClick={() => setIsComplaintFormOpen(true)}
                    className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg transform hover:scale-105 transition-transform duration-300 border border-purple-200 cursor-pointer"
                  >
                    <p className="text-purple-800 font-medium flex items-center">
                      <Camera className="w-4 h-4 mr-2" />
                      Image Upload
                    </p>
                    <p className="text-purple-600 text-sm">Show the issue with photos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Government Policies Section */}
      <section id="policies" className="relative z-10 py-20 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Government Policy Compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Fully aligned with Indian government initiatives and municipal regulations for transparent, 
              accountable, and secure digital governance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {policies.map((policy, index) => (
              <div 
                key={index}
                onClick={policy.action}
                className={`group bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-white/20 cursor-pointer ${
                  activePolicy === index ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <policy.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    policy.status === 'Active' ? 'bg-green-100 text-green-800' :
                    policy.status === 'Compliant' ? 'bg-blue-100 text-blue-800' :
                    policy.status === 'Integrated' ? 'bg-purple-100 text-purple-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {policy.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {policy.title}
                </h3>
                <p className="text-gray-600 text-sm">{policy.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Legal Compliance</h3>
                <p className="text-gray-600">Adhering to all Indian legal frameworks and municipal regulations</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse animation-delay-1000">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Municipal Integration</h3>
                <p className="text-gray-600">Seamless integration with existing municipal systems and processes</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse animation-delay-2000">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Data Security</h3>
                <p className="text-gray-600">Enterprise-grade security meeting government data protection standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Issues & Solutions */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recent Issues & Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Track real-time progress on civic issues reported by citizens
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {recentIssues.map((issue, index) => (
              <div 
                key={issue.id} 
                onClick={issue.action}
                className="group bg-white/60 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                      {issue.title}
                    </h3>
                    <p className="text-sm text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {issue.location}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    issue.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {issue.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{issue.category}</span>
                  <span>{issue.time}</span>
                </div>
                
                {issue.rating && (
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(issue.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="text-sm text-gray-600 ml-1">{issue.rating}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button 
              onClick={() => setIsIssueTrackerOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              View All Issues
            </button>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="relative z-10 py-20 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Citizen Feedback & Reviews
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from citizens using Nagarik Sahayak
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="bg-white/60 backdrop-blur-lg rounded-lg p-1 shadow-lg border border-white/20">
              {['all', 'positive', 'suggestions'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFeedback(filter)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeFeedback === filter
                      ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter === 'all' ? 'All Feedback' : filter === 'positive' ? 'Positive' : 'Suggestions'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {feedbackData[activeFeedback].map((feedback, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{feedback.user}</h4>
                    <p className="text-sm text-gray-600">{feedback.time}</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-700 mb-3">"{feedback.comment}"</p>
                
                <div className="flex items-center justify-between">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {feedback.issue}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-300">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy & Security Section */}
      <section id="privacy" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeInUp">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy & Security First
            </h2>
            <p className="text-xl text-gray-600">
              Your data is protected with enterprise-grade security and complete transparency
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">End-to-End Encryption</h3>
                </div>
                <p className="text-gray-600">All data transmission is secured with military-grade encryption protocols</p>
              </div>

              <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Complete Transparency</h3>
                </div>
                <p className="text-gray-600">Full visibility into how your data is used and processed</p>
              </div>

              <div className="bg-white/60 backdrop-blur-lg p-6 rounded-xl shadow-lg border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">User Control</h3>
                </div>
                <p className="text-gray-600">Complete control over your personal information and privacy settings</p>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Privacy Commitments</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">No personal data sold to third parties</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Minimal data collection - only what's necessary</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Regular security audits and compliance checks</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">Right to data deletion and portability</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700">24/7 security monitoring and incident response</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button 
                  onClick={handlePrivacyPolicy}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Read Full Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-fadeInUp">
            Ready to Transform Your City?
          </h2>
          <p className="text-xl mb-8 opacity-90 animate-fadeInUp animation-delay-500">
            Join the digital governance revolution. Whether you're a citizen looking to report issues 
            or a government official seeking better engagement tools, Nagarik Sahayak is here to help.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeInUp animation-delay-1000">
            <button 
              onClick={handleGetStarted}
              className="group bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
            >
              Start as Citizen
              <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <button 
              onClick={handleWatchDemo}
              className="group border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              Government Demo
              <PlayCircle className="w-5 h-5 ml-2 inline group-hover:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">Nagarik Sahayak</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering citizens and transforming governance through AI-powered civic engagement.
              </p>
              <div className="flex space-x-4">
                <button 
                  onClick={() => alert('Share feature coming soon!')}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => alert('Mobile app download coming soon!')}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => alert('Notifications enabled!')}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors duration-300">Features</button></li>
                <li><button onClick={() => alert('Technology details available for developers')} className="hover:text-white transition-colors duration-300">Technology</button></li>
                <li><button onClick={() => scrollToSection('privacy')} className="hover:text-white transition-colors duration-300">Security</button></li>
                <li><button onClick={() => alert('API documentation coming soon')} className="hover:text-white transition-colors duration-300">API</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={handleContactSupport} className="hover:text-white transition-colors duration-300 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Help Center
                </button></li>
                <li><button onClick={handleContactSupport} className="hover:text-white transition-colors duration-300 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </button></li>
                <li><button onClick={() => alert('Training materials available for government officials')} className="hover:text-white transition-colors duration-300">Training</button></li>
                <li><button onClick={() => alert('System status: All services operational')} className="hover:text-white transition-colors duration-300">Status</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Government</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => alert('Municipal solutions available - contact for demo')} className="hover:text-white transition-colors duration-300">Municipal Solutions</button></li>
                <li><button onClick={() => alert('State integration program - contact for details')} className="hover:text-white transition-colors duration-300">State Integration</button></li>
                <li><button onClick={() => scrollToSection('policies')} className="hover:text-white transition-colors duration-300">Compliance</button></li>
                <li><button onClick={() => alert('Partnership opportunities - contact us')} className="hover:text-white transition-colors duration-300">Partnership</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Nagarik Sahayak. Building the future of digital governance in India.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ComplaintForm 
        isOpen={isComplaintFormOpen} 
        onClose={() => setIsComplaintFormOpen(false)} 
      />
      
      <IssueTracker 
        isOpen={isIssueTrackerOpen} 
        onClose={() => setIsIssueTrackerOpen(false)} 
      />
      
      <DemoModal 
        isOpen={isDemoModalOpen} 
        onClose={() => setIsDemoModalOpen(false)} 
      />

      <style jsx>{`
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 75%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-fadeInLeft { animation: fadeInLeft 0.8s ease-out; }
        .animate-fadeInRight { animation: fadeInRight 0.8s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .animate-shimmer { 
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
        .animate-progress { animation: progress 3s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

export default App;