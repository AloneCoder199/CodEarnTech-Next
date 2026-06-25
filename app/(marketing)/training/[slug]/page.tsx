import React from 'react';
import CourseDetailHero from '@/components/sections/academy/courses/coursesDeatilHero';
import CourseOverview from '@/components/sections/academy/courses/courseOverview';
import WhatYouWillBecome from '@/components/sections/academy/courses/whatYouWillBecome';
import WhyDifferent from '@/components/sections/academy/courses/whyDifferent';
import CourseRoadmap from '@/components/sections/academy/courses/courseRoadmap';
import ProjectsBuild from '@/components/sections/academy/courses/projectsBuild';
import PortfolioPreview from '@/components/sections/academy/courses/portfolioPreview';
import GithubTransformation from '@/components/sections/academy/courses/githubTransformation';
import CertificatePreview from '@/components/sections/academy/courses/certificatePreview';
import WhoShouldJoin from '@/components/sections/academy/courses/whoShouldJoin';
import ToolsUsed from '@/components/sections/academy/courses/toolsUsed';
import CourseRequirements from '@/components/sections/academy/courses/courseRequirements';
import SuccessPath from '@/components/sections/academy/courses/successPath';
import FinalEnrollment from '@/components/sections/academy/courses/finalEnrollment';

interface PageProps {
  params: Promise<{ slug: string }>; // Modern Next.js context handle karne ke liye Promise type use kiya hai
}

export default async function TrainingSlugPage({ params }: PageProps) {
  // 1. Pehle params ko await karein taake slug extract ho sake
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return (
    <main className="w-full min-h-screen bg-background">
      {/* 2. Hero Component ko slug pass kar diya */}
      <CourseDetailHero slug={slug} />
      <CourseOverview slug={slug}/>
      <WhatYouWillBecome  slug={slug}/>
      <WhyDifferent slug={slug}/>
      <CourseRoadmap  slug={slug}/>
      <ProjectsBuild   slug={slug}/>
      <PortfolioPreview  slug={slug}/>
      <GithubTransformation slug={slug}/>
      <CertificatePreview slug={slug}/>
      <WhoShouldJoin slug={slug}/>
      <ToolsUsed slug={slug}/>
      <CourseRequirements slug={slug}/>
      <SuccessPath slug={slug}/>
      <FinalEnrollment slug={slug}/>
      
      {/* Niche baaki ke sections (Syllabus, Comparison tabs etc.) call honge */}
    </main>
  );
}