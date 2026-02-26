// app/dashboard/enrollments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Clock, CheckCircle, AlertCircle, XCircle,
  Loader2, ExternalLink, Download, ChevronRight, Receipt,
  GraduationCap, Calendar, CreditCard, FileText, MessageSquare
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getMyEnrollments } from '@/lib/api/enrollments';

const statusConfig = {
  pending: { 
    color: 'bg-amber-100 text-amber-700 border-amber-200', 
    icon: AlertCircle, 
    label: 'Pending Verification',
    description: 'Your payment is being verified by our team',
    progress: 25
  },
  confirmed: { 
    color: 'bg-blue-100 text-blue-700 border-blue-200', 
    icon: CheckCircle, 
    label: 'Confirmed',
    description: 'Payment verified. Course starting soon!',
    progress: 50
  },
  active: { 
    color: 'bg-green-100 text-green-700 border-green-200', 
    icon: BookOpen, 
    label: 'Active',
    description: 'You are currently learning',
    progress: 75
  },
  completed: { 
    color: 'bg-purple-100 text-purple-700 border-purple-200', 
    icon: GraduationCap, 
    label: 'Completed',
    description: 'Course completed! Certificate available',
    progress: 100
  },
  cancelled: { 
    color: 'bg-red-100 text-red-700 border-red-200', 
    icon: XCircle, 
    label: 'Cancelled',
    description: 'Enrollment cancelled',
    progress: 0
  },
};

export default function MyEnrollmentsPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnrollment, setSelectedEnrollment] = useState<any>(null);

  useEffect(() => {
    if (user?.email) {
      loadEnrollments();
    }
  }, [user]);

  const loadEnrollments = async () => {
    const result = await getMyEnrollments(user!.email);
    if (result.success) {
      setEnrollments(result.data);
      if (result.data.length > 0 && !selectedEnrollment) {
        setSelectedEnrollment(result.data[0]);
      }
    }
    setLoading(false);
  };

  const downloadReceipt = (enrollment: any) => {
    // Generate PDF or open receipt in new tab
    window.open(enrollment.payment.receiptUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center py-16">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <BookOpen className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Enrollments Yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            You haven't enrolled in any courses yet. Browse our courses and start your learning journey today!
          </p>
          <Button size="lg" onClick={() => window.location.href = '/training'}>
            Browse Courses
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Learning Journey</h1>
        <p className="text-muted-foreground mt-1">Track your enrollments and course progress</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enrollments List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="font-semibold text-lg mb-4">Your Enrollments ({enrollments.length})</h2>
          {enrollments.map((enrollment, idx) => {
            const status = statusConfig[enrollment.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;
            const isSelected = selectedEnrollment?._id === enrollment._id;
            
            return (
              <motion.div
                key={enrollment._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setSelectedEnrollment(enrollment)}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                  isSelected 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'border-border hover:border-primary/30 hover:bg-muted/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl ${
                    enrollment.status === 'pending' ? 'bg-amber-100' :
                    enrollment.status === 'confirmed' ? 'bg-blue-100' :
                    enrollment.status === 'active' ? 'bg-green-100' :
                    enrollment.status === 'completed' ? 'bg-purple-100' : 'bg-red-100'
                  }`}>
                    {enrollment.course.level === 'Beginner' ? '🌱' : 
                     enrollment.course.level === 'Intermediate' ? '🚀' : '👑'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{enrollment.course.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${status.color}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {enrollment.enrollmentId}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Enrollment Details */}
        <div className="lg:col-span-2">
          {selectedEnrollment && (
            <motion.div
              key={selectedEnrollment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Status Card */}
              <Card className={`border-l-4 ${
                selectedEnrollment.status === 'pending' ? 'border-l-amber-500' :
                selectedEnrollment.status === 'confirmed' ? 'border-l-blue-500' :
                selectedEnrollment.status === 'active' ? 'border-l-green-500' :
                selectedEnrollment.status === 'completed' ? 'border-l-purple-500' : 'border-l-red-500'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedEnrollment.course.title}</h2>
                      <p className="text-muted-foreground">{selectedEnrollment.course.level} • {selectedEnrollment.course.duration}</p>
                    </div>
                    <Badge className={statusConfig[selectedEnrollment.status as keyof typeof statusConfig].color}>
                      {statusConfig[selectedEnrollment.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  
                  <Progress 
                    value={statusConfig[selectedEnrollment.status as keyof typeof statusConfig].progress} 
                    className="h-2 mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    {statusConfig[selectedEnrollment.status as keyof typeof statusConfig].description}
                  </p>
                </CardContent>
              </Card>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Course Details</TabsTrigger>
                  <TabsTrigger value="payment">Payment Info</TabsTrigger>
                  <TabsTrigger value="support">Support</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Course Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Enrollment ID</p>
                          <p className="font-mono font-medium">{selectedEnrollment.enrollmentId}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Enrollment Date</p>
                          <p className="font-medium">{new Date(selectedEnrollment.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Preferred Batch</p>
                          <Badge variant="outline" className="capitalize">{selectedEnrollment.preferredBatch}</Badge>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Your Experience</p>
                          <Badge variant="outline" className="capitalize">{selectedEnrollment.student.experience}</Badge>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <p className="text-muted-foreground">What You'll Learn</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                          {selectedEnrollment.course.whatYouWillLearn?.slice(0, 4).map((item: string, idx: number) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                              <span className="text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedEnrollment.status === 'active' && (
                        <Button className="w-full" asChild>
                          <a href={`/courses/${selectedEnrollment.course.slug}`}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Access Course Materials
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payment" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5" />
                        Payment Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Amount Paid</p>
                          <p className="text-xl font-bold text-primary">PKR {selectedEnrollment.payment.amount.toLocaleString()}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Payment Method</p>
                          <p className="font-medium capitalize">{selectedEnrollment.payment.method.replace('_', ' ')}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Transaction ID</p>
                          <p className="font-mono font-medium">{selectedEnrollment.payment.transactionId}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">Payment Status</p>
                          <Badge className={
                            selectedEnrollment.payment.status === 'verified' ? 'bg-green-100 text-green-700' :
                            selectedEnrollment.payment.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }>
                            {selectedEnrollment.payment.status}
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-muted-foreground mb-2">Payment Receipt</p>
                        <div className="border rounded-lg overflow-hidden">
                          <img 
                            src={selectedEnrollment.payment.receiptUrl} 
                            alt="Payment Receipt"
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-3 bg-muted flex justify-between items-center">
                            <span className="text-sm font-medium">Transaction Receipt</span>
                            <Button size="sm" variant="outline" onClick={() => downloadReceipt(selectedEnrollment)}>
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="support" className="space-y-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" />
                        Need Help?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        Having issues with your enrollment? Our support team is here to help.
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-1">Email Support</h4>
                            <p className="text-sm text-muted-foreground mb-3">Get help within 24 hours</p>
                            <Button variant="outline" size="sm" className="w-full" asChild>
                              <a href="mailto:support@codeearn.com">Send Email</a>
                            </Button>
                          </CardContent>
                        </Card>
                        <Card className="bg-muted/50">
                          <CardContent className="p-4">
                            <h4 className="font-semibold mb-1">WhatsApp</h4>
                            <p className="text-sm text-muted-foreground mb-3">Quick responses</p>
                            <Button variant="outline" size="sm" className="w-full">
                              Chat Now
                            </Button>
                          </CardContent>
                        </Card>
                      </div>

                      {selectedEnrollment.status === 'pending' && (
                        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                            <div>
                              <h4 className="font-semibold text-amber-800">Verification in Progress</h4>
                              <p className="text-sm text-amber-700 mt-1">
                                Your payment is being verified. This usually takes 24-48 hours. You'll receive an email once verified.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}