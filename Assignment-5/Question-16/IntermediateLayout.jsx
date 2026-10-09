import React from 'react';
import AvailableCourses from './AvailableCourses';
import SelectedCourses from './SelectedCourses';

/**
 * IntermediateLayout Component
 * 
 * Note: This component receives NO course-related props!
 * It merely renders the structure, proving that the child components communicate
 * directly through the Context API without prop drilling.
 */
export default function IntermediateLayout() {
  return (
    <div className="registration-layout-grid">
      <div className="layout-col-left">
        <AvailableCourses />
      </div>
      <div className="layout-col-right">
        <SelectedCourses />
      </div>
    </div>
  );
}
