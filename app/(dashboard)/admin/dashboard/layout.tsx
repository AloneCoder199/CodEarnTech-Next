// app/admin/layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, BookOpen, Settings, 
  LogOut, Menu, X, Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { href: '/admin/enrollments', icon: Users, label: 'Enrollments', badge: 'New' },
  { href: '/admin/courses', icon: BookOpen, label: 'Courses', badge: null },
  { href: '/admin/newsletter', icon: Settings, label: 'Newsletter', badge: null },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden lg:flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold hidden sm:block">CodeEarn Admin</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium">AD</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}