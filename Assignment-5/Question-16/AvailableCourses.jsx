import React from 'react';
import { useCourseRegistration } from './CourseContext';

/**
 * AvailableCourses Component
 * Consumes CourseContext directly without receiving courses or handlers via props!
 */
export default function AvailableCourses() {
  const { allCourses, selectedCourseIds, selectCourse } = useCourseRegistration();

  return (
    <div className="card-section">
      <div className="section-header-flex">
        <h3>📚 Available Course Catalog</h3>
        <span className="badge badge-info">{allCourses.length} Courses Offered</span>
      </div>
      <div className="course-list">
        {allCourses.map((course) => {
          const isRegistered = selectedCourseIds.includes(course.id);
          return (
            <div key={course.id} className={`course-card ${isRegistered ? 'course-selected' : ''}`}>
              <div className="course-main-info">
                <div className="course-header-row">
                  <span className="course-code">{course.code}</span>
                  <span className="course-credits">{course.credits} Credits</span>
                </div>
                <h4 className="course-title">{course.title}</h4>
                <p className="course-meta">
                  <span>🏢 {course.department}</span> • <span>👨‍🏫 {course.instructor}</span>
                </p>
              </div>
              <div className="course-action">
                {isRegistered ? (
                  <span className="registered-badge">✓ Registered</span>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => selectCourse(course.id)}
                  >
                    ➕ Register Course
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
