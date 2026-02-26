// app/dashboard/my-courses/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  BookOpen, Clock, CheckCircle, PlayCircle, Award,
  MoreVertical, ExternalLink, Download, AlertCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const statusConfig = {
  active: { color: 'bg-green-100 text-green-700', label: 'Active', icon: PlayCircle },
  completed: { color: 'bg-purple-100 text-purple-700', label: 'Completed', icon: CheckCircle },
  confirmed: { color: 'bg-blue-100 text-blue-700', label: 'Confirmed', icon: BookOpen },
  pending: { color: 'bg-amber-100 text-amber-700', label: 'Pending', icon: AlertCircle },
};

export default function MyCoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCourses();
  }, [user]);

  const fetchMyCourses = async () => {
    if (!user?.email) return;
    
    try {
      const res = await fetch(`/api/student/progress?email=${encodeURIComponent(user.email)}`);
      const data = await res.json();
      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = (status: string) => {
    if (status === 'all') return courses;
    return courses.filter(c => c.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">My Courses</h2>
          <p className="text-muted-foreground">Manage and track your learning progress</p>
        </div>
        <Button asChild>
          <Link href="/training">Browse More Courses</Link>
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="all">All ({courses.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({filterCourses('active').length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({filterCourses('completed').length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filterCourses('pending').length})</TabsTrigger>
        </TabsList>

        {['all', 'active', 'completed', 'pending'].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-6">
            <div className="grid gap-4">
              {filterCourses(tabValue).length === 0 ? (
                <Card className="text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No {tabValue !== 'all' ? tabValue : ''} courses found</p>
                </Card>
              ) : (
                filterCourses(tabValue).map((course, idx) => {
                  const StatusIcon = statusConfig[course.status as keyof typeof statusConfig]?.icon || BookOpen;
                  
                  return (
                    <motion.div
                      key={course.enrollmentId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <Card className="group hover:shadow-md transition-all">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                            {/* Course Icon */}
                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl ${
                              course.status === 'active' ? 'bg-green-100' :
                              course.status === 'completed' ? 'bg-purple-100' :
                              course.status === 'confirmed' ? 'bg-blue-100' : 'bg-amber-100'
                            }`}>
                              {course.courseTitle.includes('React') ? '⚛️' :
                               course.courseTitle.includes('JavaScript') ? 'JS' :
                               course.courseTitle.includes('Python') ? '🐍' : '💻'}
                            </div>

                            {/* Course Info */}
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {course.courseTitle}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Badge className={statusConfig[course.status as keyof typeof statusConfig]?.color}>
                                      <StatusIcon className="w-3 h-3 mr-1" />
                                      {statusConfig[course.status as keyof typeof statusConfig]?.label}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      {course.enrollmentId}
                                    </span>
                                  </div>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreVertical className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/dashboard/enrollments?id=${course.id}`}>
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        View Details
                                      </Link>
                                    </DropdownMenuItem>
                                    {course.certificateEligible && (
                                      <DropdownMenuItem asChild>
                                        <Link href="/dashboard/certificates">
                                          <Download className="w-4 h-4 mr-2" />
                                          Download Certificate
                                        </Link>
                                      </DropdownMenuItem>
                                    )}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              {/* Progress */}
                              <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-muted-foreground">Progress</span>
                                  <span className="font-medium">{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-2" />
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    Last accessed {course.lastAccessed ? new Date(course.lastAccessed).toLocaleDateString() : 'Never'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Action Button */}
                            <div className="flex flex-col gap-2">
                              {course.status === 'active' && (
                                <Button asChild>
                                  <Link href={`/courses/${course.courseSlug}`}>
                                    <PlayCircle className="w-4 h-4 mr-2" />
                                    Continue
                                  </Link>
                                </Button>
                              )}
                              {course.status === 'completed' && (
                                <Button variant="outline" asChild>
                                  <Link href="/dashboard/certificates">
                                    <Award className="w-4 h-4 mr-2" />
                                    Certificate
                                  </Link>
                                </Button>
                              )}
                              {course.status === 'pending' && (
                                <Button variant="outline" disabled>
                                  <AlertCircle className="w-4 h-4 mr-2" />
                                  Pending
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}