import React from 'react';
import { useCourseRegistration } from './CourseContext';

/**
 * SelectedCourses Component
 * Consumes CourseContext directly without receiving data through intermediate components!
 */
export default function SelectedCourses() {
  const { selectedCourses, dropCourse, totalCredits, lastAction } = useCourseRegistration();

  return (
    <div className="card-section selected-courses-section">
      <div className="section-header-flex">
        <h3>🎓 My Registered Courses</h3>
        <span className="badge badge-accent">Total Credits: {totalCredits} / 24</span>
      </div>

      {lastAction && (
        <div className="context-log">
          <small>Context Event: <em>{lastAction}</em></small>
        </div>
      )}

      {selectedCourses.length === 0 ? (
        <div className="empty-cart-state">
          <p>You have not registered for any courses yet.</p>
          <small>Select courses from the catalog on the left to see them appear here directly via Context API.</small>
        </div>
      ) : (
        <div className="selected-cards-list">
          {selectedCourses.map((c) => (
            <div key={c.id} className="selected-item-row">
              <div className="item-details">
                <strong>{c.code}: {c.title}</strong>
                <span className="item-sub">{c.credits} Credits • {c.instructor}</span>
              </div>
              <button
                className="btn btn-danger-sm"
                onClick={() => dropCourse(c.id)}
                title="Drop Course"
              >
                ✕ Drop
              </button>
            </div>
          ))}

          <div className="credit-summary-card">
            <div className="summary-row">
              <span>Total Enrolled Courses:</span>
              <strong>{selectedCourses.length}</strong>
            </div>
            <div className="summary-row">
              <span>Semester Credit Load:</span>
              <strong>{totalCredits} Credits</strong>
            </div>
            <div className="summary-row">
              <span>Status:</span>
              <span className={totalCredits >= 12 ? 'text-success' : 'text-warning'}>
                {totalCredits >= 12 ? 'Full-Time Student Status' : 'Part-Time Student Status'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
