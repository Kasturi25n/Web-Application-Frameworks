import React, { createContext, useContext, useState } from 'react';

// Create Course Context
const CourseContext = createContext(null);

const INITIAL_COURSES = [
  { id: 'CS301', code: 'CS301', title: 'Web Application Frameworks', credits: 4, department: 'Computer Science', instructor: 'Prof. David Chen' },
  { id: 'CS302', code: 'CS302', title: 'Database Management Systems', credits: 4, department: 'Computer Science', instructor: 'Dr. Ananya Roy' },
  { id: 'CS303', code: 'CS303', title: 'Distributed Systems & Cloud Computing', credits: 3, department: 'Cloud Computing', instructor: 'Dr. Sarah Mitchell' },
  { id: 'CS304', code: 'CS304', title: 'Artificial Intelligence & Neural Nets', credits: 4, department: 'AI & ML', instructor: 'Dr. Viktor Vance' },
  { id: 'CS305', code: 'CS305', title: 'Computer Networks & Security', credits: 3, department: 'Information Tech', instructor: 'Prof. Elena Rostova' }
];

export function CourseProvider({ children }) {
  const [courses] = useState(INITIAL_COURSES);
  const [selectedCourseIds, setSelectedCourseIds] = useState(['CS301']); // pre-select CS301 as default
  const [lastAction, setLastAction] = useState('Initialized with CS301 Web Application Frameworks');

  const selectCourse = (courseId) => {
    if (!selectedCourseIds.includes(courseId)) {
      setSelectedCourseIds([...selectedCourseIds, courseId]);
      const found = courses.find((c) => c.id === courseId);
      setLastAction(`Registered for ${found?.code}: ${found?.title}`);
    }
  };

  const dropCourse = (courseId) => {
    const found = courses.find((c) => c.id === courseId);
    setSelectedCourseIds(selectedCourseIds.filter((id) => id !== courseId));
    setLastAction(`Dropped course ${found?.code}: ${found?.title}`);
  };

  const selectedCourses = courses.filter((c) => selectedCourseIds.includes(c.id));
  const totalCredits = selectedCourses.reduce((sum, c) => sum + c.credits, 0);

  const value = {
    allCourses: courses,
    selectedCourses,
    selectedCourseIds,
    selectCourse,
    dropCourse,
    totalCredits,
    lastAction
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}

// Custom hook to consume CourseContext easily
export function useCourseRegistration() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error('useCourseRegistration must be used within a CourseProvider');
  }
  return context;
}
