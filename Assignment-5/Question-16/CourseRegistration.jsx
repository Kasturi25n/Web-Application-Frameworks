import React from 'react';
import { CourseProvider } from './CourseContext';
import IntermediateLayout from './IntermediateLayout';

/**
 * Question 16: Course Registration System
 * 
 * Requirements:
 * - Develop a ReactJS application for a Course Registration System using Context API and Hooks.
 * - Allow users to select courses and display the selected courses in a separate component
 *   WITHOUT passing data through intermediate components.
 * 
 * Student: Pushpam Raj Satyarthi
 */
export default function CourseRegistration() {
  return (
    <CourseProvider>
      <div className="program-container">
        <div className="program-header">
          <h2>Question 16: Course Registration System (Context API)</h2>
          <p className="subtitle">
            Demonstrates React Context API and Hooks (<code>createContext</code>, <code>useContext</code>).
            Users can select courses, and selected courses appear in a separate component
            <strong> without passing data through intermediate components</strong>.
          </p>
        </div>

        {/* Notice IntermediateLayout receives zero props! */}
        <IntermediateLayout />
      </div>
    </CourseProvider>
  );
}
