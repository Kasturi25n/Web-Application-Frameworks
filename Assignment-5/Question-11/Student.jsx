import React from 'react';

/**
 * Question 11: Reusable Student Component
 * 
 * Accepts student name, branch, and semester through props and displays the details.
 */
export function Student({ name, branch, semester, avatar, email, rollNumber }) {
  return (
    <div className="student-card">
      <div className="student-header">
        <div className="student-avatar">
          {avatar || (name ? name.charAt(0).toUpperCase() : 'S')}
        </div>
        <div className="student-title-block">
          <h3 className="student-name">{name || 'Unnamed Student'}</h3>
          {rollNumber && <span className="student-roll">ID: {rollNumber}</span>}
        </div>
      </div>
      <div className="student-body">
        <div className="student-detail-row">
          <span className="label">Branch:</span>
          <span className="value branch-tag">{branch || 'Not Specified'}</span>
        </div>
        <div className="student-detail-row">
          <span className="label">Semester:</span>
          <span className="value semester-tag">{semester || 'N/A'}</span>
        </div>
        {email && (
          <div className="student-detail-row">
            <span className="label">Email:</span>
            <span className="value">{email}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Student;
