"use client";

import { useState, useEffect } from "react";
import { courses } from "@/lib/data";
import { useAuth } from "@/hooks/useAuth";
import { CourseCard, CourseDetailModal } from "@/components/sections/traning/traningmain";

export default function AcademyCourses() {
  const { isAuthenticated } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkTheme();
    
    // Dynamic theme changes tracking
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

 

  return (
    <section className="py-20 bg-neutral-50/50 dark:bg-neutral-900/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 dark:text-white">
            Available Practical Training Programs
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Select a specialized track to master industry-standard workflows with hands-on labs and 100% guaranteed local internship.
          </p>
        </div>

        {/* Courses Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id || index}
              course={course}
              index={index}
              isAuthenticated={isAuthenticated}
              onViewDetails={handleViewDetails}
              isDark={isDark}
            />
          ))}
        </div>
      </div>

      {/* Dynamic Details Modal Popup */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoggedIn={isAuthenticated}
      />
    </section>
  );
}