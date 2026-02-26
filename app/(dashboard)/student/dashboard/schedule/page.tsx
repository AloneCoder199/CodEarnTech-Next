'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, Clock, Video, MapPin, ChevronRight,
  Sun, Moon, Monitor, Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ClassSchedule {
  day: string;
  dayShort: string;
  classes: {
    time: string;
    duration: string;
    subject: string;
    type: 'live' | 'recorded' | 'workshop';
    instructor: string;
    mode: 'online' | 'physical';
  }[];
}

const weeklySchedule: ClassSchedule[] = [
  {
    day: 'Monday',
    dayShort: 'Mon',
    classes: [
      { time: '09:00 AM', duration: '2h', subject: 'React Fundamentals', type: 'live', instructor: 'Sarah Chen', mode: 'online' },
      { time: '02:00 PM', duration: '1.5h', subject: 'JavaScript Deep Dive', type: 'live', instructor: 'Mike Johnson', mode: 'online' }
    ]
  },
  {
    day: 'Tuesday',
    dayShort: 'Tue',
    classes: [
      { time: '10:00 AM', duration: '2h', subject: 'Node.js Basics', type: 'live', instructor: 'David Park', mode: 'online' },
      { time: '03:00 PM', duration: '2h', subject: 'Database Design', type: 'workshop', instructor: 'Emma Wilson', mode: 'online' }
    ]
  },
  {
    day: 'Wednesday',
    dayShort: 'Wed',
    classes: [
      { time: '09:00 AM', duration: '2h', subject: 'Advanced React Patterns', type: 'live', instructor: 'Sarah Chen', mode: 'online' },
      { time: '01:00 PM', duration: '1h', subject: 'Code Review Session', type: 'workshop', instructor: 'Team Lead', mode: 'online' }
    ]
  },
  {
    day: 'Thursday',
    dayShort: 'Thu',
    classes: [
      { time: '10:00 AM', duration: '2h', subject: 'API Development', type: 'live', instructor: 'Mike Johnson', mode: 'online' },
      { time: '02:30 PM', duration: '1.5h', subject: 'Testing & Debugging', type: 'live', instructor: 'David Park', mode: 'online' }
    ]
  },
  {
    day: 'Friday',
    dayShort: 'Fri',
    classes: [
      { time: '09:00 AM', duration: '2h', subject: 'Deployment & DevOps', type: 'workshop', instructor: 'Emma Wilson', mode: 'online' },
      { time: '02:00 PM', duration: '2h', subject: 'Project Showcase', type: 'live', instructor: 'All Instructors', mode: 'online' }
    ]
  },
  {
    day: 'Saturday',
    dayShort: 'Sat',
    classes: [
      { time: '10:00 AM', duration: '3h', subject: 'Weekend Hackathon', type: 'workshop', instructor: 'Guest Mentors', mode: 'online' }
    ]
  },
  {
    day: 'Sunday',
    dayShort: 'Sun',
    classes: [] // No classes
  }
];

// const quickStats = [
//   { label: 'Live Classes', value: '12', icon: Video, color: 'text-blue-500', bg: 'bg-blue-500/10' },
//   { label: 'Workshops', value: '4', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
//   { label: 'This Week', value: '28h', icon: Clock, color: 'text-green-500', bg: 'bg-green-500/10' }
// ];

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const currentDaySchedule = weeklySchedule.find(s => s.day === selectedDay);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold">Class Schedule</h1>
        <p className="text-muted-foreground mt-1">
          Weekly live classes and workshops • All times in your local timezone
        </p>
      </div>

      {/* Quick Stats */}
      

      {/* Weekly Overview */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 border-b">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Weekly Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 divide-x divide-border">
            {weeklySchedule.map((day) => {
              const isToday = day.day === today;
              const isSelected = day.day === selectedDay;
              const hasClasses = day.classes.length > 0;

              return (
                <button
                  key={day.day}
                  onClick={() => setSelectedDay(day.day)}
                  className={`p-4 text-center transition-all hover:bg-muted/50 ${
                    isSelected ? 'bg-primary/5' : ''
                  }`}
                >
                  <p className={`text-xs font-medium mb-2 ${
                    isToday ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {day.dayShort}
                  </p>
                  <div className={`
                    w-10 h-10 mx-auto rounded-full flex items-center justify-center text-sm font-semibold mb-2
                    ${isToday ? 'bg-primary text-primary-foreground' : ''}
                    ${isSelected && !isToday ? 'bg-primary/10 text-primary' : ''}
                    ${!isSelected && !isToday ? 'bg-muted text-foreground' : ''}
                  `}>
                    {day.classes.length}
                  </div>
                  {hasClasses ? (
                    <div className="flex justify-center gap-0.5">
                      {day.classes.map((_, i) => (
                        <div key={i} className="w-1 h-1 rounded-full bg-primary" />
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-muted-foreground">No classes</p>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Day Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Class List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {selectedDay === today ? (
                <>
                  <Sun className="w-5 h-5 text-amber-500" />
                  Today's Schedule
                  <Badge className="bg-green-100 text-green-700">Live</Badge>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5 text-purple-500" />
                  {selectedDay}'s Classes
                </>
              )}
            </h2>
            <p className="text-sm text-muted-foreground">
              {currentDaySchedule?.classes.length || 0} sessions
            </p>
          </div>

          {currentDaySchedule?.classes.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Sun className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold mb-1">No Classes Scheduled</h3>
                <p className="text-sm text-muted-foreground">
                  Take this time to review previous lessons or work on projects.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {currentDaySchedule?.classes.map((cls, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="group hover:border-primary/20 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Time Column */}
                        <div className="text-center min-w-[60px]">
                          <p className="text-sm font-bold">{cls.time}</p>
                          <p className="text-xs text-muted-foreground">{cls.duration}</p>
                        </div>

                        {/* Divider */}
                        <div className="w-px h-12 bg-border" />

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-semibold group-hover:text-primary transition-colors">
                                {cls.subject}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                with {cls.instructor}
                              </p>
                            </div>
                            <Badge 
                              variant={cls.type === 'live' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {cls.type === 'live' ? 'Live Class' : 'Workshop'}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              {cls.mode === 'online' ? (
                                <Monitor className="w-3 h-3" />
                              ) : (
                                <MapPin className="w-3 h-3" />
                              )}
                              {cls.mode === 'online' ? 'Google Meet' : 'Campus'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Video className="w-3 h-3" />
                              Recording available
                            </span>
                          </div>
                        </div>

                        {/* Join Button */}
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <ChevronRight className="w-4 h-4 text-primary" />
                          </div>
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">Class Timings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Morning Batch</span>
                <span className="font-medium">9:00 AM - 11:00 AM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Afternoon Batch</span>
                <span className="font-medium">2:00 PM - 4:00 PM</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Weekend Workshop</span>
                <span className="font-medium">10:00 AM - 1:00 PM</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-purple-500/5">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Weekly Pattern
              </h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <span><strong>Mon-Wed-Fri:</strong> Core concepts & live coding</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5" />
                  <span><strong>Tue-Thu:</strong> Advanced topics & workshops</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                  <span><strong>Saturday:</strong> Hackathons & projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5" />
                  <span><strong>Sunday:</strong> No classes - self study</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Can't attend live? All sessions are recorded.
              </p>
              <button className="text-sm text-primary hover:underline font-medium">
                Access Recordings →
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}