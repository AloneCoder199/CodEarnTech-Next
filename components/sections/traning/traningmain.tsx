"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Clock,
  Users,
  ChevronRight,
  PlayCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Layers,
  Code2,
  Eye,
  Lock,
  X,
  CheckIcon,
  Star,
  Award,
  Filter,
  ChevronDown,
  Target,
  Zap,
} from "lucide-react";
import { courses, ICourse } from "@/lib/data";
import { useAuth } from "@/hooks/useAuth";
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
import { Separator } from "@/components/ui/separator";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Progress } from "@/components/ui/progress";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

// Level configurations
const LEVEL_CONFIG = {
  Beginner: {
    color: "from-emerald-500 to-teal-600",
    darkColor: "from-emerald-400 to-teal-500",
    badge:
      "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
    icon: "🌱",
  },
  Intermediate: {
    color: "from-blue-500 to-indigo-600",
    darkColor: "from-blue-400 to-indigo-500",
    badge:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    icon: "🚀",
  },
  Advanced: {
    color: "from-violet-500 to-purple-600",
    darkColor: "from-violet-400 to-purple-500",
    badge:
      "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-300 dark:border-violet-800",
    icon: "👑",
  },
  "All Levels": {
    color: "from-amber-500 to-orange-600",
    darkColor: "from-amber-400 to-orange-500",
    badge:
      "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
    icon: "⚡",
  },
};

// Stat Card Component
const StatCard = ({ icon: Icon, value, label, color }: any) => (
  <Card className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
    <CardContent className="p-4 text-center">
      <div
        className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-linear-to-br ${color} flex items-center justify-center`}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
        {label}
      </p>
    </CardContent>
  </Card>
);

// Module Card Component for Modal
const ModuleCard = ({ module, index, isDark }: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card hover:border-primary/20 transition-all duration-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-accent/30 transition-colors group"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-xl bg-linear-to-br ${isDark ? "from-primary/20 to-primary/10" : "from-primary/10 to-primary/5"} flex items-center justify-center text-lg font-bold text-primary group-hover:scale-110 transition-transform`}
            >
              {String(index + 1).padStart(2, "0")}
            </div>
            {module.isCompleted && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <CheckIcon className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {module.title}
            </h4>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <BookOpen className="w-3 h-3" /> {module.topics.length} topics
              </span>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" /> {module.duration || "2h 30m"}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {module.hasPreview && (
            <Badge
              variant="secondary"
              className="hidden sm:flex items-center gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
            >
              <PlayCircle className="w-3 h-3" /> Preview
            </Badge>
          )}
          <ChevronDown
            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border overflow-hidden bg-muted/20"
          >
            <div className="p-4 space-y-2">
              {module.topics.map((topic: any, idx: number) => (
                <div
                  key={topic.id}
                  className="flex items-center justify-between py-3 px-4 rounded-lg bg-card hover:bg-accent/20 transition-colors group/topic"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-secondary-foreground">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-foreground font-medium block truncate group-hover/topic:text-primary transition-colors">
                        {topic.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {topic.duration}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {topic.isPreview ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 text-xs gap-1 text-green-600 hover:text-green-700 hover:bg-green-100 dark:hover:bg-green-900/20"
                      >
                        <PlayCircle className="w-3.5 h-3.5" /> Watch
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Lock className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Locked</span>
                      </div>
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
const CourseDetailModal = ({
  course,
  isOpen,
  onClose,
  onEnroll,
  isLoggedIn,
}: any) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isDark, setIsDark] = useState(false);
  const scrollAreaRef = useRef<any>(null);

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Reset scroll when tab changes
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  if (!course) return null;

  const levelConfig = LEVEL_CONFIG[course.level as keyof typeof LEVEL_CONFIG];
  const gradientColor = isDark ? levelConfig?.darkColor : levelConfig?.color;

  const totalDuration =
    course.modules?.reduce(
      (acc: number, m: any) => acc + (m.durationHours || 2),
      0,
    ) || 0;
  const completionRate = 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 overflow-hidden gap-0 bg-card border-border flex flex-col">
        <DialogHeader className="sr-only">
          <VisuallyHidden.Root>
            <DialogTitle>{course.title} - Course Details</DialogTitle>
          </VisuallyHidden.Root>
        </DialogHeader>

        {/* Fixed Header */}
        <div
          className={`relative h-32 bg-gradient-to-r ${gradientColor} overflow-hidden shrink-0`}
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors backdrop-blur-sm z-20"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
            <div className="flex items-end gap-4">
              <span className="text-5xl filter drop-shadow-lg">
                {course.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    {levelConfig?.icon} {course.level}
                  </Badge>
                  {course.featured && (
                    <Badge className="bg-amber-500/90 text-white border-0">
                      <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                    </Badge>
                  )}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg truncate">
                  {course.title}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Navigation - Fixed */}
        <div className="border-b border-border px-6 pt-4 bg-card shrink-0">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 bg-muted/50">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="syllabus"
                className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Syllabus ({course.totalModules})
              </TabsTrigger>
              <TabsTrigger
                value="outcomes"
                className="data-[state=active]:bg-card data-[state=active]:shadow-sm"
              >
                Outcomes
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full w-full" ref={scrollAreaRef}>
            <div className="p-6 space-y-6 pb-24">
              {activeTab === "overview" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
                      <Clock className="w-6 h-6 text-primary mb-2" />
                      <p className="text-lg font-bold text-foreground">
                        {course.duration}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Duration
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/10">
                      <Layers className="w-6 h-6 text-blue-500 mb-2" />
                      <p className="text-lg font-bold text-foreground">
                        {course.totalModules}
                      </p>
                      <p className="text-xs text-muted-foreground">Modules</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/10">
                      <BookOpen className="w-6 h-6 text-purple-500 mb-2" />
                      <p className="text-lg font-bold text-foreground">
                        {course.totalTopics}
                      </p>
                      <p className="text-xs text-muted-foreground">Topics</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/5 to-amber-500/10 border border-amber-500/10">
                      <Users className="w-6 h-6 text-amber-500 mb-2" />
                      <p className="text-lg font-bold text-foreground">2.5k+</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-primary" />
                      About This Course
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* What You'll Learn Preview */}
                  <div className="p-5 rounded-xl bg-muted/30 border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-amber-500" />
                      Key Highlights
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {course.whatYouWillLearn
                        ?.slice(0, 4)
                        .map((item: string, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border/50 hover:border-primary/20 transition-colors"
                          >
                            <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                              <CheckIcon className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-sm text-foreground">
                              {item}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Pricing Card */}
                  <div className="p-5 rounded-xl bg-card border border-border shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Course Investment
                        </p>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <span className="text-3xl font-bold text-foreground">
                            PKR{" "}
                            {course.discountPrice?.toLocaleString() ||
                              course.price.toLocaleString()}
                          </span>
                          {course.discountPrice && (
                            <>
                              <span className="text-lg text-muted-foreground line-through">
                                PKR {course.price.toLocaleString()}
                              </span>
                              <Badge className="bg-green-500 text-white">
                                Save{" "}
                                {Math.round(
                                  ((course.price - course.discountPrice) /
                                    course.price) *
                                    100,
                                )}
                                %
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        className={`flex-1 bg-linear-to-r ${gradientColor} text-white hover:opacity-90`}
                        onClick={() => onEnroll(course)}
                      >
                        {isLoggedIn ? "Enroll Now" : "Login to Enroll"}
                        <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-border">
                      {[
                        { icon: CheckIcon, text: "Lifetime Access" },
                        { icon: Award, text: "Certificate" },
                        { icon: Users, text: "Community" },
                        { icon: Zap, text: "24/7 Support" },
                      ].map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <benefit.icon className="w-4 h-4 text-green-500" />
                          {benefit.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "syllabus" && (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between bg-card/95 backdrop-blur-sm py-2 sticky top-0 z-10">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        Complete Syllabus
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        {course.totalModules} modules • {course.totalTopics}{" "}
                        topics • {totalDuration} hours total
                      </p>
                    </div>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground">
                        Course Progress
                      </p>
                      <p className="text-sm font-semibold text-foreground">
                        {completionRate}% Complete
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {course.modules?.map((module: any, idx: number) => (
                      <ModuleCard
                        key={module.id}
                        module={module}
                        index={idx}
                        isDark={isDark}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "outcomes" && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="p-6 rounded-xl bg-gradient-to-br from-primary/5 to-purple-500/5 border border-border">
                    <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2 text-lg">
                      <Award className="w-6 h-6 text-primary" />
                      Skills You Will Master
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {course.whatYouWillLearn?.map(
                        (item: string, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all"
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <CheckIcon className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-foreground font-medium">
                              {item}
                            </span>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-muted/30 border border-border">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-amber-500" />
                      Requirements & Prerequisites
                    </h3>
                    <div className="space-y-3">
                      {course.requirements?.map((req: string, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-foreground"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-card border border-border">
                    <h3 className="font-semibold text-foreground mb-4">
                      Career Opportunities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {course.tags?.map((tag: string, idx: number) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="px-3 py-1 text-sm bg-secondary/50 hover:bg-secondary transition-colors cursor-default"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Fixed Footer */}
        <div className="p-4 border-t border-border bg-card/95 backdrop-blur-sm shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <p className="text-xs text-muted-foreground">Total Investment</p>
              <p className="text-2xl font-bold text-foreground">
                PKR{" "}
                {course.discountPrice?.toLocaleString() ||
                  course.price.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                className="flex-1 sm:flex-none border-border"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                className={`flex-1 sm:flex-none bg-gradient-to-r ${gradientColor} text-white hover:opacity-90 shadow-lg shadow-primary/25`}
                onClick={() => {
                  onClose();
                  onEnroll(course);
                }}
              >
                {isLoggedIn ? "Enroll Now" : "Login to Enroll"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Course Card Component
const CourseCard = ({
  course,
  index,
  isAuthenticated,
  onViewDetails,
  onEnroll,
  isDark,
}: any) => {
  const levelConfig = LEVEL_CONFIG[course.level as keyof typeof LEVEL_CONFIG];
  const gradientColor = isDark ? levelConfig?.darkColor : levelConfig?.color;
  const [showAllModules, setShowAllModules] = useState(false);

  // Show only first 2 modules initially
  const visibleModules = showAllModules
    ? course.modules
    : course.modules?.slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="group h-full border border-border shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 bg-card overflow-hidden flex flex-col">
        <div className={`h-2 bg-linear-to-r ${gradientColor}`} />

        <CardContent className="p-6 flex flex-col h-full">
          {/* Header */}
          <div className="space-y-3 mb-4">
            <div className="flex items-start justify-between">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
                {course.icon}
              </span>
              <div className="flex flex-wrap gap-1 justify-end">
                <Badge className={`${levelConfig?.badge} text-xs font-medium`}>
                  {levelConfig?.icon} {course.level}
                </Badge>
                {course.featured && (
                  <Badge className="bg-linear-to-r from-amber-500 to-orange-500 text-white border-0 text-xs shadow-md">
                    <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                  </Badge>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {course.shortDescription}
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-4 py-3 border-y border-border text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> {course.totalModules} Modules
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> {course.totalTopics} Topics
            </span>
          </div>

          {/* Modules Preview - Only show first 2 */}
          <div className="flex-1 space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Eye className="w-3 h-3" /> Syllabus Preview
              </p>
              <span className="text-xs text-muted-foreground">
                {course.modules?.length > 2 &&
                  `+${course.modules.length - 2} more`}
              </span>
            </div>

            <div className="space-y-2">
              {visibleModules?.map((module: any, idx: number) => (
                <div
                  key={module.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/20 hover:bg-accent/20 transition-all group/module"
                >
                  <div
                    className={`w-6 h-6 rounded-md bg-linear-to-br ${gradientColor} flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground font-medium truncate group-hover/module:text-primary transition-colors">
                      {module.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {module.topics?.length || 0} topics
                    </p>
                  </div>
                  {module.hasPreview && (
                    <PlayCircle className="w-4 h-4 text-green-500 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            {course.modules?.length > 2 && !showAllModules && (
              <button
                onClick={() => onViewDetails(course)}
                className="w-full py-2 text-xs text-center text-primary hover:text-primary/80 font-medium border border-dashed border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all"
              >
                View All {course.modules.length} Modules
              </button>
            )}
          </div>

          {/* Price & Actions */}
          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">
                  PKR{" "}
                  {course.discountPrice?.toLocaleString() ||
                    course.price.toLocaleString()}
                </span>
                {course.discountPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    PKR {course.price.toLocaleString()}
                  </span>
                )}
              </div>
              {course.discountPrice && (
                <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">
                  Save{" "}
                  {Math.round(
                    ((course.price - course.discountPrice) / course.price) *
                      100,
                  )}
                  %
                </Badge>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-border hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => onViewDetails(course)}
              >
                View Details
              </Button>
              <Button
                size="sm"
                className={`flex-1 bg-linear-to-r ${gradientColor} text-white hover:opacity-90 shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:shadow-primary/30`}
                onClick={() => onEnroll(course)}
              >
                {isAuthenticated ? "Enroll Now" : "Get Started"}
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Main Page Component
export default function TrainingPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const filteredCourses =
    selectedLevel === "all"
      ? courses
      : courses.filter(
          (c) => c.level.toLowerCase() === selectedLevel.toLowerCase(),
        );

  const handleEnroll = (course: ICourse) => {
    if (!isAuthenticated) {
      // Save intended course in URL, redirect to login
      router.push(`/login?redirect=/enroll?course=${course.slug}`);
    } else {
      router.push(`/enroll?course=${course.slug}`);
    }
  };

  const handleViewDetails = (course: ICourse) => {
    setSelectedCourse(course);
    setIsDetailOpen(true);
  };

  const stats = [
    {
      icon: BookOpen,
      value: courses.length,
      label: "Courses",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Layers,
      value: courses.reduce((a, b) => a + b.totalModules, 0),
      label: "Modules",
      color: "from-violet-500 to-purple-500",
    },
    {
      icon: Code2,
      value: courses.reduce((a, b) => a + b.totalTopics, 0),
      label: "Topics",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Users,
      value: "2,500+",
      label: "Students",
      color: "from-amber-500 to-orange-500",
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-card border-b border-border overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            <motion.div variants={fadeInUp}>
              <Badge
                variant="outline"
                className="px-4 py-1.5 text-sm border-primary/30 bg-primary/5 text-primary backdrop-blur-sm"
              >
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Professional Training Programs
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight"
            >
              Master Modern{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-purple-600 to-primary">
                Web Development
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Industry-leading courses with complete syllabus transparency.
              Browse all modules before you enroll.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-4"
            >
              {stats.map((stat, idx) => (
                <StatCard key={idx} {...stat} />
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={fadeInUp} className="pt-4">
              <Button
                size="lg"
                className="shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() =>
                  document
                    .getElementById("courses")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Courses
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Our Courses
              </h2>
              <p className="text-muted-foreground flex items-center gap-2 justify-center sm:justify-start">
                <Eye className="w-4 h-4 text-green-500" />
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Full syllabus visible
                </span>
                <span className="hidden sm:inline">
                  • Enroll to start learning
                </span>
              </p>
            </div>

            <Tabs value={selectedLevel} onValueChange={setSelectedLevel}>
              <TabsList className="bg-card border border-border p-1">
                {["all", "beginner", "intermediate", "advanced"].map(
                  (level) => (
                    <TabsTrigger
                      key={level}
                      value={level}
                      className="text-sm capitalize px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                    >
                      {level}
                    </TabsTrigger>
                  ),
                )}
              </TabsList>
            </Tabs>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <CourseCard
                key={course.id}
                course={course}
                index={idx}
                isAuthenticated={isAuthenticated}
                onViewDetails={handleViewDetails}
                onEnroll={handleEnroll}
                isDark={isDark}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center pt-12"
          >
            <Card className="border border-border bg-linear-to-r from-primary/5 via-purple-500/5 to-primary/5 overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
              <CardContent className="py-10 px-6 relative">
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  Not Sure Which Course to Choose?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  Browse our complete syllabus or contact our team for
                  personalized guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="lg"
                    asChild
                    className="border-border hover:bg-accent"
                  >
                    <Link href="/contact">Talk to an Advisor</Link>
                  </Button>
                  {!isAuthenticated && (
                    <Button
                      size="lg"
                      asChild
                      className="shadow-lg shadow-primary/25"
                    >
                      <Link href="/register">Create Free Account</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onEnroll={handleEnroll}
        isLoggedIn={isAuthenticated}
      />
    </div>
  );
}
