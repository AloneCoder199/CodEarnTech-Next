'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { courses } from "@/lib/data"; // Check kar lein ke export ka naam yehi hai
import { 
  BookOpen, Clock, Award, TrendingUp, Calendar,
  ChevronRight, Flame, PlayCircle, Zap, MoreHorizontal,
  ArrowUpRight, Target, ArrowRight
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Course {
  id: string;
  title: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  lastAccessed: string;
  thumbnail: string;
  instructor: string;
  nextLesson: string;
}

interface DashboardStats {
  activecourses: number;
  completedcourses: number;
  certificates: number;
  studyHours: number;
  weeklyGoal: number;
  weeklyProgress: number;
  streak: number;
  recentcourses: Course[];
  upcomingSession?: {
    title: string;
    time: string;
    type: 'live' | 'deadline';
  };
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    activecourses: 3,
    completedcourses: 2,
    certificates: 2,
    studyHours: 47,
    weeklyGoal: 10,
    weeklyProgress: 7.5,
    streak: 12,
    recentcourses: [
      {
        id: '1',
        title: 'Advanced React Patterns',
        progress: 65,
        totalModules: 12,
        completedModules: 8,
        lastAccessed: '2 hours ago',
        thumbnail: '⚛️',
        instructor: 'Sarah Chen',
        nextLesson: 'Custom Hooks Deep Dive'
      },
      {
        id: '2',
        title: 'Node.js Microservices',
        progress: 30,
        totalModules: 15,
        completedModules: 5,
        lastAccessed: '1 day ago',
        thumbnail: '🟢',
        instructor: 'Mike Johnson',
        nextLesson: 'Service Discovery'
      }
    ],
    upcomingSession: {
      title: 'Live Q&A: React Performance',
      time: 'Today, 3:00 PM',
      type: 'live'
    }
  });
  const [loading, setLoading] = useState(false);

  const getInitials = () => {
    const first = user?.profile?.firstName?.[0] || '';
    const last = user?.profile?.lastName?.[0] || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {user?.profile?.firstName || 'Student'}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            You have {stats.recentcourses.length} active courses • {stats.streak} day streak 🔥
          </p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/training">
            <Zap className="w-4 h-4 mr-2" />
            Browse courses
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Weekly Progress */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  Weekly Goal
                </CardTitle>
                <Badge variant="secondary" className="text-xs">
                  {stats.streak} day streak
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between mb-2">
                <div>
                  <span className="text-2xl font-bold">{stats.weeklyProgress}</span>
                  <span className="text-muted-foreground text-sm"> / {stats.weeklyGoal} hrs</span>
                </div>
                <span className="text-sm font-medium text-primary">
                  {Math.round((stats.weeklyProgress / stats.weeklyGoal) * 100)}%
                </span>
              </div>
              <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-3">
                {stats.weeklyGoal - stats.weeklyProgress > 0 
                  ? `${(stats.weeklyGoal - stats.weeklyProgress).toFixed(1)} hours left to reach your goal`
                  : "Goal achieved! Great job!"}
              </p>
            </CardContent>
          </Card>

{/* Continue Learning Section */}
<Card className="border-primary/10 shadow-sm bg-card/50 backdrop-blur-sm">
  <CardHeader className="pb-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/10">
          <BookOpen className="w-4 h-4 text-primary" />
        </div>
        <div>
          <CardTitle className="text-base font-bold">Continue Learning</CardTitle>
          <p className="text-[10px] text-muted-foreground italic">Your journey to excellence</p>
        </div>
      </div>
      <Button variant="ghost" size="sm" asChild className="text-xs font-bold hover:text-primary transition-colors">
        <Link href="/student/dashboard/my-courses" className="flex items-center gap-1">
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </Button>
    </div>
  </CardHeader>
  
  <CardContent className="space-y-4">
    {/* Sirf Top 3 'In Progress' courses dikhane ke liye filter aur slice use karein */}
    {courses.filter((c: any) => c.status === "in-progress").slice(0, 3).map((course: any) => (
      <div 
        key={course.id} 
        className="group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all border border-border/40 hover:border-primary/20 bg-background/40"
      >
        {/* Course Thumbnail */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/10 flex items-center justify-center text-2xl shrink-0 group-hover:rotate-3 transition-transform">
          {course.thumbnail}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="font-bold text-sm truncate group-hover:text-primary transition-colors">
              {course.title}
            </h4>
            <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
              {course.lastAccessed}
            </span>
          </div>
          
          <p className="text-[11px] text-muted-foreground mb-3 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            Next: <span className="text-foreground font-medium">{course.nextLesson}</span>
          </p>
          
          <div className="flex items-center gap-3">
            <div className="relative flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
               <div 
                 className="absolute inset-0 bg-primary transition-all duration-1000 ease-out" 
                 style={{ width: `${course.progress}%` }} 
               />
            </div>
            <span className="text-[10px] font-black text-primary shrink-0">{course.progress}%</span>
          </div>
        </div>

        {/* Dynamic Resume Link */}
        <Button 
          asChild
          size="sm" 
          className="shrink-0 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 h-9 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20"
        >
          <Link href={`/student/dashboard/my-courses/${course.id}`}>
            <PlayCircle className="w-3.5 h-3.5 mr-1.5" />
            Resume
          </Link>
        </Button>
      </div>
    ))}

    {/* Agar data khali ho */}
    {courses.length === 0 && (
      <div className="text-center py-6 text-muted-foreground text-sm">
        No active courses. Start your learning today!
      </div>
    )}
  </CardContent>
</Card>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          
          {/* Upcoming Session */}
          {stats.upcomingSession && (
            <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Upcoming
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {stats.upcomingSession.type === 'live' ? (
                      <PlayCircle className="w-5 h-5 text-primary" />
                    ) : (
                      <Target className="w-5 h-5 text-amber-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{stats.upcomingSession.title}</h4>
                    <p className="text-xs text-primary mt-1 font-medium">{stats.upcomingSession.time}</p>
                  </div>
                </div>
                <Link href="/training" className="w-full">
  <Button 
    className="w-full mt-4 cursor-pointer" 
    size="sm" 
    variant={stats.upcomingSession.type === 'live' ? 'default' : 'outline'}
  >
    {stats.upcomingSession.type === 'live' ? 'Join Session' : 'View Details'}
  </Button>
</Link>

              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/student/dashboard/certificates">
                  <span className="flex items-center">
                    <Award className="w-4 h-4 mr-2 text-purple-500" />
                    Certificates
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="/student/dashboard/schedule">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    Schedule
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}