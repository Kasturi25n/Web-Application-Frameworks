import React, { useState } from 'react';
import Program11 from '../Question-11/Program11.jsx';
import Program12 from '../Question-12/Counter.jsx';
import Program13 from '../Question-13/ProductList.jsx';
import Program15 from '../Question-15/EmployeeManagement.jsx';
import Program16 from '../Question-16/CourseRegistration.jsx';
import BackendExplorer from './components/BackendExplorer.jsx';
import './App.css';

const navItems = [
  {
    id: 'backend',
    category: 'NodeJS & ExpressJS',
    number: 'Q1-Q10, 14, 17, 18',
    label: 'Backend Programs Hub',
    badge: '13 Programs',
    Component: BackendExplorer
  },
  {
    id: 'q11',
    category: 'ReactJS',
    number: 'Q11',
    label: 'Reusable Student Component',
    badge: 'Props Demo',
    Component: Program11
  },
  {
    id: 'q12',
    category: 'ReactJS',
    number: 'Q12',
    label: 'Simple Counter',
    badge: 'useState',
    Component: Program12
  },
  {
    id: 'q13',
    category: 'ReactJS',
    number: 'Q13',
    label: 'Product List & Tracker',
    badge: 'useState + useEffect',
    Component: Program13
  },
  {
    id: 'q15',
    category: 'ReactJS',
    number: 'Q15',
    label: 'Employee Management',
    badge: 'CRUD + Hooks',
    Component: Program15
  },
  {
    id: 'q16',
    category: 'ReactJS',
    number: 'Q16',
    label: 'Course Registration System',
    badge: 'Context API',
    Component: Program16
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('backend');

  const currentItem = navItems.find((item) => item.id === activeTab) || navItems[0];
  const ActiveComponent = currentItem.Component;

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-logo">⚡</div>
          <div className="brand-text">
            <h2>Assignment 5</h2>
            <span>Web Application Framework</span>
          </div>
        </div>

        <div className="student-profile-badge">
          <div className="avatar-circle">PR</div>
          <div className="profile-info">
            <strong className="profile-name">Pushpam Raj Satyarthi</strong>
            <span className="profile-roll">Roll: 2024107717</span>
            <span className="profile-meta">CSE-Core • 6th Sem</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group-title">BACKEND LABS</div>
          <button
            className={`nav-btn ${activeTab === 'backend' ? 'active' : ''}`}
            onClick={() => setActiveTab('backend')}
          >
            <div className="btn-label-group">
              <span className="btn-q-num">Q1–Q18</span>
              <span className="btn-title">Backend API Explorer</span>
            </div>
            <span className="btn-pill">13 APIs</span>
          </button>

          <div className="nav-group-title">REACTJS LABS</div>
          {navItems.filter((i) => i.category === 'ReactJS').map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <div className="btn-label-group">
                <span className="btn-q-num">{item.number}</span>
                <span className="btn-title">{item.label}</span>
              </div>
              <span className="btn-pill">{item.badge}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>Assignment 5 • Complete 18 Programs</p>
          <small>NodeJS • ExpressJS • ReactJS</small>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="content">
        <header className="content-topbar">
          <div className="topbar-title">
            <span className="topbar-category">{currentItem.category}</span>
            <h1>{currentItem.label}</h1>
          </div>
          <div className="topbar-badges">
            <span className="tag-pill">{currentItem.badge}</span>
            <span className="tag-pill tag-status">● Live</span>
          </div>
        </header>

        <div className="content-body">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
}
