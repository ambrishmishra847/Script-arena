import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ProblemsPage from './pages/ProblemsPage';
import ProfilePage from './pages/ProfilePage';
import LearningPathsPage from './pages/LearningPathsPage';
import LearningPathDetail from './pages/LearningPathDetail';
import ContestsPage from './pages/ContestsPage';
import LessonPage from './pages/LessonPage'; // Import the new LessonPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/learning-paths" element={<LearningPathsPage />} />
          <Route path="/learning-paths/:id" element={<LearningPathDetail />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} /> {/* Add the new route */}
          <Route path="/contests" element={<ContestsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
