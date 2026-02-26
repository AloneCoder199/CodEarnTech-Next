'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Award, Download, Share2, Linkedin, Mail, 
  CheckCircle2, Clock, ExternalLink, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CertificatesPage() {
  const [previewOpen, setPreviewOpen] = useState(false);

  // Demo certificate data
  const demoCertificate = {
    courseTitle: 'Full Stack Web Development',
    studentName: 'Your Name',
    completionDate: 'January 15, 2024',
    certificateNumber: 'CERT-2024-FSW-001',
    grade: 'Distinction',
    hours: 120,
    instructor: 'Industry Expert'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center pb-6 border-b border-border">
        <h1 className="text-3xl font-bold">Your Certificates</h1>
        <p className="text-muted-foreground mt-2">
          Complete courses to earn verified, shareable certificates
        </p>
      </div>

      {/* How It Works - Simple 3 Step */}
      <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-semibold text-center mb-6">How to Get Your Certificate</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-medium mb-1">1. Complete Course</h3>
            <p className="text-sm text-muted-foreground">Finish all modules and pass the final assessment</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-medium mb-1">2. Email Arrives</h3>
            <p className="text-sm text-muted-foreground">Certificate link sent to your email instantly</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-500/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-medium mb-1">3. Download & Share</h3>
            <p className="text-sm text-muted-foreground">Access, download PDF, and share on LinkedIn</p>
          </div>
        </div>
      </div>

      {/* Demo Certificate Preview */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Your Certificate Will Look Like This</h2>
        
        <Card className="overflow-hidden border-2 hover:border-primary/20 transition-colors">
          {/* Certificate Preview Header */}
          <div className="h-48 bg-gradient-to-br from-amber-50 via-white to-amber-50 flex items-center justify-center relative">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                {demoCertificate.grade}
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold">{demoCertificate.courseTitle}</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {demoCertificate.hours} hours
                  </span>
                  <span>•</span>
                  <span>Completed {demoCertificate.completionDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'Database', 'API Design', 'Deployment'].map((skill) => (
                  <Badge key={skill} variant="outline" className="bg-muted/50">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
                <code className="font-mono text-muted-foreground flex-1">
                  {demoCertificate.certificateNumber}
                </code>
                <Badge variant="secondary" className="text-xs">Verified</Badge>
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1" 
                  onClick={() => setPreviewOpen(true)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Certificate
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Start Learning CTA */}
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Ready to earn your first certificate?</p>
        <Button size="lg" asChild>
          <Link href="/training">Browse Courses</Link>
        </Button>
      </div>

      {/* Full Certificate Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Certificate Preview
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            {/* Actual Certificate Design */}
            <div className="relative bg-white border-8 border-amber-100 rounded-lg shadow-xl overflow-hidden">
              <div className="absolute inset-2 border-2 border-amber-200/50 rounded pointer-events-none" />
              
              <div className="p-8 md:p-12 text-center">
                {/* Header */}
                <div className="mb-8">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                    Certificate of Completion
                  </p>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <p className="text-muted-foreground">This certifies that</p>
                  
                  <h2 className="text-2xl md:text-3xl font-serif italic text-slate-800">
                    {demoCertificate.studentName}
                  </h2>

                  <p className="text-muted-foreground">
                    has successfully completed with{' '}
                    <span className="font-semibold text-amber-600">{demoCertificate.grade}</span>
                  </p>

                  <h3 className="text-xl font-bold text-slate-800">
                    {demoCertificate.courseTitle}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {demoCertificate.hours} hours • {demoCertificate.completionDate}
                  </p>
                </div>

                {/* Footer */}
                <div className="mt-10 pt-6 border-t grid grid-cols-2 gap-8 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Certificate ID</p>
                    <p className="font-mono font-semibold">{demoCertificate.certificateNumber}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Instructor</p>
                    <p className="font-semibold">{demoCertificate.instructor}</p>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground text-center">QR Code<br/>for Verification</span>
                  </div>
                  <div className="text-left text-xs text-muted-foreground">
                    <p>Verify at:</p>
                    <p className="text-primary">codeearn.com/verify/{demoCertificate.certificateNumber}</p>
                  </div>
                </div>
              </div>

              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                <span className="text-8xl font-bold rotate-45">CODEARN</span>
              </div>
            </div>

            
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}