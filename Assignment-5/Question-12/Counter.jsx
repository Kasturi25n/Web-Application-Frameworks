import React, { useState } from 'react';

/**
 * Question 12: Simple Counter with useState
 * 
 * Requirements:
 * - Develop a ReactJS program using useState to implement a simple counter
 *   with Increment, Decrement, and Reset buttons.
 */
export default function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => prev - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const getCounterColor = () => {
    if (count > 0) return 'count-positive';
    if (count < 0) return 'count-negative';
    return 'count-zero';
  };

  return (
    <div className="program-container">
      <div className="program-header">
        <h2>Question 12: Simple Counter with useState</h2>
        <p className="subtitle">
          Develop a ReactJS program using <code>useState</code> to implement a simple counter with
          <strong> Increment</strong>, <strong>Decrement</strong>, and <strong>Reset</strong> buttons.
        </p>
      </div>

      <div className="counter-card">
        <div className="counter-label">Current Count</div>
        <div className={`counter-display ${getCounterColor()}`}>
          {count}
        </div>
        <div className="counter-status-badge">
          {count > 0 ? '📈 Positive Value' : count < 0 ? '📉 Negative Value' : '⚖️ Initial State (Zero)'}
        </div>

        <div className="counter-actions">
          <button
            onClick={handleDecrement}
            className="btn btn-danger"
            id="btn-decrement"
          >
            ➖ Decrement
          </button>
          <button
            onClick={handleReset}
            className="btn btn-secondary"
            id="btn-reset"
          >
            🔄 Reset
          </button>
          <button
            onClick={handleIncrement}
            className="btn btn-success"
            id="btn-increment"
          >
            ➕ Increment
          </button>
        </div>

        <div className="counter-history">
          <small>State is managed using React's <code>useState(0)</code> Hook.</small>
        </div>
      </div>
    </div>
  );
}
