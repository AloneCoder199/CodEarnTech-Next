"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Users,
  PlayCircle,
  CheckCircle2,
  ArrowRight,
  Lock,
  X,
  CheckIcon,
  Star,
  ChevronDown,
  Target,
  Zap,
  Globe,
  Server,
  Database,
  Cpu,
  Code2,
  Terminal,
  Layers,
  GraduationCap,
  Layout
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

// Native Apple Spring Physics
const springTransition = { type: "spring", stiffness: 140, damping: 20 };

// Dynamic React Icon Mapper (No more cheap emojis, janii!)
const CourseIcon = ({ name, className = "w-5 h-5" }: { name: string; className?: string }) => {
  const iconMap: Record<string, any> = {
    frontend: Globe,
    backend: Server,
    database: Database,
    architecture: Cpu,
    coding: Code2,
    terminal: Terminal,
    fullstack: Layout,
  };

  const IconComponent = iconMap[name?.toLowerCase()] || GraduationCap;
  return <IconComponent className={className} />;
};

// Clean level badge system that respects your global theme border
const LEVEL_CONFIG = {
  Beginner: "bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800",
  Intermediate: "bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800",
  Advanced: "bg-primary text-primary-foreground border-transparent font-medium",
  "All Levels": "bg-neutral-50 text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800",
};

// Stat Card Component (Clean, flat layout)
const StatCard = ({ icon: Icon, value, label }: any) => (
  <Card className="border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/40 dark:bg-neutral-900/20 rounded-2xl transition-all duration-300">
    <CardContent className="p-4 text-center">
      <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200/10">
        <Icon className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
      </div>
      <p className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">{value}</p>
      <p className="text-[10px] font-medium tracking-wider text-neutral-400 uppercase mt-0.5">{label}</p>
    </CardContent>
  </Card>
);

// Module Card Component
const ModuleCard = ({ module, index }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-neutral-200/60 dark:border-neutral-800/60 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 transition-all duration-200">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-neutral-50/60 dark:hover:bg-neutral-900/40 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-mono text-xs font-semibold text-neutral-500 dark:text-neutral-400">
              {String(index + 1).padStart(2, "0")}
            </div>
            {module.isCompleted && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center shadow-xs">
                <CheckIcon className="w-2.5 h-2.5 text-primary-foreground" />
              </div>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {module.title}
            </h4>
            <div className="flex items-center gap-3 mt-1 text-xs text-neutral-400">
              <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {module.topics?.length || 0} Topics</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {module.duration || "2h 30m"}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {module.hasPreview && (
            <Badge variant="secondary" className="bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 rounded-md font-medium text-[10px] px-2 py-0.5 border-0">
              Preview
            </Badge>
          )}
          <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ease-out ${isExpanded ? "rotate-180 text-neutral-900 dark:text-white" : ""}`} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="border-t border-neutral-100 dark:border-neutral-900 overflow-hidden bg-neutral-50/20 dark:bg-neutral-900/10"
          >
            <div className="p-2 space-y-1">
              {module.topics?.map((topic: any, idx: number) => (
                <div key={topic.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-all">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-5 h-5 rounded-md bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center text-[10px] font-medium text-neutral-400">
                      {idx + 1}
                    </div>
                    <span className="text-xs font-normal text-neutral-700 dark:text-neutral-300 truncate">
                      {topic.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-mono text-neutral-400">{topic.duration}</span>
                    {topic.isPreview ? (
                      <Button size="sm" variant="ghost" className="h-6 rounded-lg text-[11px] px-2 text-primary hover:bg-primary/10">
                        Watch
                      </Button>
                    ) : (
                      <Lock className="w-3 h-3 text-neutral-300 dark:text-neutral-700" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Course Detail Modal
const CourseDetailModal = ({ course, isOpen, onClose, onEnroll, isLoggedIn }: any) => {
  const [activeTab, setActiveTab] = useState("overview");
  const scrollAreaRef = useRef<any>(null);

  if (!course) return null;
  const levelBadgeStyle = LEVEL_CONFIG[course.level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG["All Levels"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl h-[80vh] p-0 overflow-hidden rounded-3xl bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col shadow-2xl">
        <DialogHeader className="sr-only">
          <VisuallyHidden.Root><DialogTitle>{course.title}</DialogTitle></VisuallyHidden.Root>
        </DialogHeader>

        {/* Minimal High-Contrast Header Panel */}
        <div className="relative p-6 border-b border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 shrink-0 flex flex-col justify-end">
          <button onClick={onClose} className="absolute top-5 right-5 p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all z-20">
            <X className="w-3.5 h-3.5 text-neutral-500" />
          </button>

          <div className="relative z-10 flex items-start gap-4 mt-2">
            <span className="p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800/60 text-primary rounded-2xl shrink-0 shadow-2xs">
              <CourseIcon name={course.iconKey || course.title} className="w-6 h-6" />
            </span>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-1.5">
                <Badge className={`${levelBadgeStyle} rounded-md text-[9px] uppercase font-semibold tracking-wider px-2 py-0.5 border`}>
                  {course.level}
                </Badge>
                {course.featured && (
                  <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 font-medium rounded-md text-[9px] px-2 py-0.5">
                    <Star className="w-2.5 h-2.5 mr-1 fill-primary" /> POPULAR
                  </Badge>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 dark:text-white truncate">{course.title}</h2>
            </div>
          </div>
        </div>

        {/* Apple Segmented Controller Tabs */}
        <div className="px-6 py-2.5 bg-neutral-50/40 dark:bg-neutral-950 shrink-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 p-0.5 bg-neutral-200/50 dark:bg-neutral-900 rounded-xl border border-neutral-200/10">
              {["overview", "syllabus", "outcomes"].map((tab) => (
                <TabsTrigger key={tab} value={tab} className="text-xs font-medium capitalize rounded-lg py-1.5 transition-all data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-950 data-[state=active]:shadow-xs data-[state=active]:text-neutral-950 dark:data-[state=active]:text-white">
                  {tab === "syllabus" ? `Syllabus (${course.totalModules || 0})` : tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full" ref={scrollAreaRef}>
            <div className="p-6 space-y-6 pb-16">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <StatCard icon={Clock} value={course.duration} label="Duration" />
                    <StatCard icon={Layers} value={course.totalModules} label="Modules" />
                    <StatCard icon={BookOpen} value={course.totalTopics} label="Topics" />
                    <StatCard icon={Users} value="2.5k+" label="Students" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" /> About the Program
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">{course.description}</p>
                  </div>

                  <div className="p-4 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/60 bg-neutral-50/30 dark:bg-neutral-900/20">
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-3 text-neutral-400 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> Key Highlights
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {course.whatYouWillLearn?.slice(0, 4).map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2.5 p-2 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-900">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                          <span className="text-xs font-normal text-neutral-600 dark:text-neutral-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "syllabus" && (
                <div className="space-y-2.5">
                  {course.modules?.map((module: any, idx: number) => (
                    <ModuleCard key={module.id} module={module} index={idx} />
                  ))}
                </div>
              )}

              {activeTab === "outcomes" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-950">
                    <h3 className="text-xs font-semibold uppercase tracking-wider mb-4 text-neutral-400">Targeted Professional Skills</h3>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {course.whatYouWillLearn?.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-200/10">
                          <div className="w-5 h-5 rounded-md bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                            <CheckIcon className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-normal text-neutral-700 dark:text-neutral-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Dynamic Sticky Footer (Inherits Brand Colors perfectly) */}
        <div className="p-4 border-t border-neutral-100 dark:border-neutral-900 bg-white dark:bg-neutral-950 shrink-0 flex items-center justify-between gap-4">
          <div>
            <p className="text-[9px] uppercase tracking-wider font-semibold text-neutral-400">Total Investment</p>
            <p className="text-lg font-bold tracking-tight text-neutral-950 dark:text-white">
              PKR {(course.discountPrice || course.price).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-xl px-4 text-xs font-medium h-9" onClick={onClose}>
  Close
</Button>

{isLoggedIn ? (

  <Link href="/enroll" passHref legacyBehavior>
    <Button 
      variant="default" 
      className="rounded-xl px-5 text-xs font-medium h-9" 
      onClick={onClose} // Closes modal beautifully when redirecting to login page
    >
       Enroll Now<ArrowRight className="w-3.5 h-3.5 ml-1.5" />
    </Button>
  </Link>
) : (
  <Link href="/enroll" passHref legacyBehavior>
    <Button 
      variant="default" 
      className="rounded-xl px-5 text-xs font-medium h-9" 
      onClick={onClose} // Closes modal beautifully when redirecting to login page
    >
      Login to Enroll <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
    </Button>
  </Link>
)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Course Card Component
const CourseCard = ({ course, index, isAuthenticated, onViewDetails, onEnroll }: any) => {
  const levelBadgeStyle = LEVEL_CONFIG[course.level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG["All Levels"];
  const visibleModules = course.modules?.slice(0, 2);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      // transition={{ ...springTransition, delay: index * 0.03 }}
    >
      <Card className="group h-full border border-neutral-200/70 dark:border-neutral-800/80 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 bg-white dark:bg-neutral-950 flex flex-col">
        <CardContent className="p-5 flex flex-col h-full">
          
          {/* Metadata Row */}
          <div className="flex items-start justify-between gap-2 mb-4">
            <span className="p-2 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/40 text-primary rounded-xl shadow-2xs group-hover:scale-105 transition-transform duration-300">
              <CourseIcon name={course.iconKey || course.title} className="w-5 h-5" />
            </span>
            <div className="flex flex-col items-end gap-1">
              <Badge className={`${levelBadgeStyle} rounded-md border text-[9px] font-semibold py-0.5 px-2 tracking-wide uppercase`}>
                {course.level}
              </Badge>
              {course.featured && (
                <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 font-medium rounded-md text-[9px] px-1.5 py-0">
                  POPULAR
                </Badge>
              )}
            </div>
          </div>

          {/* Heading Content */}
          <div className="mb-3">
            <h3 className="text-base font-bold tracking-tight text-neutral-950 dark:text-neutral-50 line-clamp-1">
              {course.title}
            </h3>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 line-clamp-2 mt-1 leading-normal font-normal">
              {course.shortDescription}
            </p>
          </div>

          {/* Micro Stats */}
          <div className="flex items-center gap-3 py-2 my-1 border-y border-neutral-100 dark:border-neutral-900 text-[11px] font-medium text-neutral-400 shrink-0">
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {course.totalModules} Modules</span>
          </div>

          {/* Curriculum Preview Section */}
          <div className="flex-1 space-y-2 my-3">
            <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Curriculum Outline</p>
            <div className="space-y-1.5">
              {visibleModules?.map((module: any, idx: number) => (
                <div key={module.id} className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30 border border-neutral-100/50 dark:border-neutral-900/30">
                  <div className="w-5 h-5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center text-[10px] font-mono font-bold shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-xs font-normal text-neutral-700 dark:text-neutral-300 truncate flex-1">{module.title}</p>
                </div>
              ))}
            </div>
            {course.modules?.length > 2 && (
              <button onClick={() => onViewDetails(course)} className="w-full text-center text-[10px] font-medium text-neutral-400 hover:text-neutral-950 dark:hover:text-white transition-colors pt-1">
                +{course.modules.length - 2} more dynamic modules
              </button>
            )}
          </div>

          {/* Pricing & Actions */}
          <div className="pt-3 border-t border-neutral-100 dark:border-neutral-900 flex items-center justify-between gap-2 shrink-0">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-neutral-950 dark:text-white tracking-tight">
                  PKR {(course.discountPrice || course.price).toLocaleString()}
                </span>
                {course.discountPrice && (
                  <span className="text-[10px] text-neutral-400 line-through">
                    PKR {course.price.toLocaleString()}
                  </span>
                )}
              </div>
              {course.discountPrice && (
                <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400 block">
                  Save {Math.round(((course.price - course.discountPrice) / course.price) * 100)}% off
                </span>
              )}
            </div>

            <div className="flex gap-1.5">
              <Button size="sm" variant="ghost" className="h-8 rounded-xl text-xs font-medium px-2.5 text-neutral-500 hover:text-neutral-950 dark:hover:text-white" onClick={() => onViewDetails(course)}>
                Details
              </Button>
              
{isAuthenticated ? (
  <Link href="/enroll" passHref legacyBehavior>
    <Button 
      size="sm" 
      variant="default" 
      className="h-8 rounded-xl text-xs font-medium px-3.5 shadow-2xs"
    >
      Enroll
    </Button>
  </Link>
) : (
  <Link href="/enroll" passHref legacyBehavior>
    <Button 
      size="sm" 
      variant="default" 
      className="h-8 rounded-xl text-xs font-medium px-3.5 shadow-2xs"
    >
      Join
    </Button>
  </Link>
)}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export { CourseCard, CourseDetailModal, StatCard };