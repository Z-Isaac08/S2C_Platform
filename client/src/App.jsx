import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Lazy loading pages
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DepartmentsPage = lazy(() => import('./pages/DepartmentsPage'));
const StorePage = lazy(() => import('./pages/StorePage'));
const DonatePage = lazy(() => import('./pages/DonatePage'));
const SignPage = lazy(() => import('./pages/SignPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-black">
    <div className="w-12 h-12 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className="min-h-screen bg-brand-black">
      <ScrollToTop />
      <NavBar />
      
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/departements" element={<DepartmentsPage />} />
            <Route path="/boutique" element={<StorePage />} />
            <Route path="/soutien" element={<DonatePage />} />
            <Route path="/inscription" element={<SignPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default App;
