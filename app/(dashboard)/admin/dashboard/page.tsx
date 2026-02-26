// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, DollarSign, BookOpen,
  ArrowUpRight, ArrowDownRight, Loader2,
  AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

interface StatsData {
  overview: {
    totalEnrollments: number;
    totalRevenue: number;
    verifiedRevenue: number;
    pendingRevenue: number;
  };
  statusBreakdown: Array<{ _id: string; count: number }>;
  paymentStats: Array<{ _id: string; count: number; amount: number }>;
  topCourses: Array<{ _id: string; enrollments: number; revenue: number }>;
  monthlyTrend: Array<{ _id: { year: number; month: number }; count: number; revenue: number }>;
  recentPending: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const overview = stats?.overview || { totalEnrollments: 0, totalRevenue: 0, verifiedRevenue: 0, pendingRevenue: 0 };
  
  // Calculate percentages
  const verifiedRate = overview.totalRevenue > 0 
    ? Math.round((overview.verifiedRevenue / overview.totalRevenue) * 100) 
    : 0;

  const pendingCount = stats?.statusBreakdown.find(s => s._id === 'pending')?.count || 0;
  const confirmedCount = stats?.statusBreakdown.find(s => s._id === 'confirmed')?.count || 0;
  const activeCount = stats?.statusBreakdown.find(s => s._id === 'active')?.count || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your platform performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={fetchStats}>Refresh</Button>
          <Button asChild>
            <Link href="/admin/enrollments">View All Enrollments</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overview.totalEnrollments.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{stats?.monthlyTrend[stats.monthlyTrend.length - 1]?.count || 0} this month
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">PKR {overview.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  {verifiedRate}% verified
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{pendingCount}</div>
              <p className="text-xs text-muted-foreground">
                PKR {overview.pendingRevenue.toLocaleString()} pending
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{confirmedCount + activeCount}</div>
              <p className="text-xs text-muted-foreground">
                {activeCount} currently learning
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts & Lists */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* Revenue Trend */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Trend (Last 6 Months)</CardTitle>
            <CardDescription>Monthly enrollment and revenue statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.monthlyTrend.map((month, idx) => {
                const monthName = new Date(month._id.year, month._id.month - 1).toLocaleString('default', { month: 'short' });
                const maxRevenue = Math.max(...(stats?.monthlyTrend.map(m => m.revenue) || [1]));
                const percentage = (month.revenue / maxRevenue) * 100;
                
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{monthName} {month._id.year}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">{month.count} enrollments</span>
                        <span className="font-semibold">PKR {month.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Top Courses */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Courses</CardTitle>
            <CardDescription>Most enrolled courses by revenue</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats?.topCourses.map((course, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{course._id}</p>
                    <p className="text-xs text-muted-foreground">{course.enrollments} students</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">PKR {course.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Pending Enrollments */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>Pending Verifications</CardTitle>
            <CardDescription>Recent enrollments awaiting payment verification</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-amber-100 text-amber-700">
            {pendingCount} pending
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.recentPending.map((enrollment) => (
              <div 
                key={enrollment._id} 
                className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold">{enrollment.student.firstName} {enrollment.student.lastName}</p>
                    <p className="text-sm text-muted-foreground">
                      {enrollment.course.title} • {enrollment.enrollmentId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">PKR {enrollment.payment.amount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(enrollment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm" asChild>
                    <Link href={`/admin/enrollments?id=${enrollment._id}`}>
                      Verify
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}