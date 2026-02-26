'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Award, Calendar, 
  Bell, LogOut, Menu, X, ChevronRight,
  TrendingUp, User, Settings, CreditCard, HelpCircle, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/student/dashboard', icon: LayoutDashboard, label: 'Overview', color: 'text-blue-500' },
  { href: '/student/dashboard/my-courses', icon: BookOpen, label: 'My Courses', color: 'text-green-500', badge: 'New' },
  { href: '/student/dashboard/certificates', icon: Award, label: 'Certificates', color: 'text-purple-500' },
  { href: '/student/dashboard/schedule', icon: Calendar, label: 'Schedule', color: 'text-orange-500' },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const getInitials = () => {
    const first = user?.profile?.firstName?.[0] || '';
    const last = user?.profile?.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  const getFullName = () => {
    return `${user?.profile?.firstName || ''} ${user?.profile?.lastName || ''}`.trim() || 'User';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header - Clean & Minimal */}
      <div className="lg:hidden h-16 bg-card border-b border-border flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(true)}
            className="hover:bg-muted"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Link href="/student/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CE</span>
            </div>
            <span className="font-bold text-lg">CodeEarn</span>
          </Link>
        </div>
        
        {/* Mobile Right Actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative hover:bg-muted" 
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </Button>
          
          {/* Mobile Profile Button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-muted"
            onClick={() => setProfileOpen(true)}
          >
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
              {getInitials()}
            </div>
          </Button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - Professional SaaS Style */}
        <aside className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full flex flex-col">
            {/* Logo Section */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-border">
              <Link href="/student/dashboard" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                  <span className="text-white font-bold text-sm">CE</span>
                </div>
                <div>
                  <span className="font-bold text-lg tracking-tight">CodeEarn</span>
                  <p className="text-[10px] text-muted-foreground -mt-1">Student Portal</p>
                </div>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden hover:bg-muted" 
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* User Profile Card - Mini Version */}
            <div className="p-4 mx-4 mt-4 rounded-xl bg-gradient-to-br from-primary/5 via-purple-500/5 to-blue-500/5 border border-primary/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary border-2 border-primary/20">
                  {getInitials()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{getFullName()}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-primary/10 flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">Student ID</span>
                <span className="font-mono font-medium bg-primary/10 px-2 py-0.5 rounded text-primary">
                  STU-{user?.id?.slice(-6) || '000000'}
                </span>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Main Menu
              </p>
              
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group relative overflow-hidden",
                      isActive 
                        ? "bg-primary text-primary-foreground font-medium shadow-md shadow-primary/20" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full"
                      />
                    )}
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <Icon className={cn("w-5 h-5", isActive ? "text-white" : item.color)} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {item.badge && !isActive && (
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-5 bg-primary/10 text-primary border-0">
                          {item.badge}
                        </Badge>
                      )}
                      {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
                    </div>
                  </Link>
                );
              })}

              <div className="mt-6 pt-6 border-t border-border">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Quick Links
                </p>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted px-3 h-10" 
                  asChild
                >
                  <Link href="/training">
                    <TrendingUp className="w-4 h-4 text-orange-500" />
                    <span className="text-sm">Browse Courses</span>
                  </Link>
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted px-3 h-10" 
                  asChild
                >
                  <Link href="/book-call">
                    <HelpCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Help Center</span>
                  </Link>
                </Button>
              </div>
            </nav>

            {/* Bottom Upgrade Card */}
            <div className="p-4 m-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20">
              <div className="flex items-start gap-3">
               
                
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 flex flex-col">
          {/* Desktop Header - Minimal & Professional */}
          <header className="hidden lg:flex h-16 items-center justify-between px-6 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-30">
            {/* Left: Breadcrumb/Title */}
            <div className="flex items-center gap-4">
              <h1 className="text-lg font-semibold text-foreground">
                {navItems.find(n => pathname === n.href || pathname.startsWith(`${n.href}/`))?.label || 'Dashboard'}
              </h1>
              <Badge variant="outline" className="text-xs font-normal">
                v2.0
              </Badge>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative hover:bg-muted rounded-full w-10 h-10"
                onClick={() => setNotificationsOpen(true)}
              >
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse ring-2 ring-card" />
              </Button>

              <div className="h-6 w-px bg-border mx-1" />

              {/* Profile Dropdown Trigger */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  className="flex items-center gap-3 h-10 px-3 hover:bg-muted rounded-full"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-medium text-white shadow-md">
                    {getInitials()}
                  </div>
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-medium leading-tight">{getFullName()}</p>
                    <p className="text-xs text-muted-foreground leading-tight">Student</p>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", profileOpen && "rotate-180")} />
                </Button>

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setProfileOpen(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl shadow-black/10 z-50 overflow-hidden"
                      >
                        {/* Profile Header */}
                        <div className="p-4 border-b border-border bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-medium text-white">
                              {getInitials()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">{getFullName()}</p>
                              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link 
                            href="/student/dashboard/profile"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            <User className="w-4 h-4" />
                            My Profile
                          </Link>

                          <Link 
                            href="/book-call"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          >
                            <HelpCircle className="w-4 h-4" />
                            Help Center
                          </Link>
                        </div>

                        {/* Logout */}
                        <div className="p-2 border-t border-border bg-muted/30">
                          <button 
                            onClick={() => {
                              setProfileOpen(false);
                              logout();
                            }}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <div className="flex-1 p-4 lg:p-8 overflow-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Notifications Panel - Slide Over */}
      <AnimatePresence>
        {notificationsOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
              onClick={() => setNotificationsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-card border-l border-border z-50 shadow-2xl"
            >
              <div className="h-full flex flex-col">
                <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-card/50 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bell className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h2 className="font-semibold">Notifications</h2>
                      <p className="text-xs text-muted-foreground">You have 2 unread</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setNotificationsOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {/* Sample Notifications */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Course Update</p>
                        <p className="text-xs text-muted-foreground mt-1">New module added to your enrolled course</p>
                        <p className="text-[10px] text-muted-foreground mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2 shrink-0" />
                      <div>
                        <p className="text-sm font-medium">Certificate Ready</p>
                        <p className="text-xs text-muted-foreground mt-1">Your certificate is now available for download</p>
                        <p className="text-[10px] text-muted-foreground mt-2">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-t border-border">
                  <Button variant="outline" className="w-full" size="sm">
                    Mark all as read
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Profile Sheet */}
      <AnimatePresence>
        {profileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setProfileOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl z-50 lg:hidden max-h-[80vh] overflow-auto"
            >
              <div className="p-6 space-y-4">
                {/* Handle */}
                <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
                
                {/* Profile Header */}
                <div className="flex items-center gap-4 pb-4 border-b border-border">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                    {getInitials()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{getFullName()}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">Student</Badge>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="space-y-1">
                  <Link 
                    href="/student/dashboard/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">My Profile</p>
                      <p className="text-xs text-muted-foreground">View and edit your profile</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>

                  
                  

                  <Link 
                    href="/book-call"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <HelpCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Help Center</p>
                      <p className="text-xs text-muted-foreground">FAQs and support</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </Link>
                </div>

                {/* Logout */}
                <button 
                  onClick={() => {
                    setProfileOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 p-4 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors mt-4"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}