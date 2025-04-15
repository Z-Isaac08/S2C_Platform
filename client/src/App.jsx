import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollTo';// <-- Le composant qui affiche ta vidéo
import Preloader from './components/preLoader';

const HomePage = lazy(() => import('./pages/HomePage'));
const SoutienPage = lazy(() => import('./pages/SoutienPage'));
const SignPage = lazy(() => import('./pages/SignPage'));
const StorePage = lazy(() => import('./pages/StorePage'));
const FormPayPonct = lazy(() => import('./components/FormPayPonct'));
const FormPayRect = lazy(() => import('./components/FormPayRect'));

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 4000); // Durée de ta vidéo
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Preloader />; // 🔥 Vidéo de chargement au démarrage uniquement
  }

  return (
    <Suspense fallback={""}>
      <ScrollToTop />
      <NavBar />
      <main>
        <Routes>
          <Route path='/' index element={<HomePage />} />
          <Route path='/soutien' element={<SoutienPage />} >
            <Route index element={<Navigate to="ponctuel" replace />} />
            <Route path='ponctuel' element={<FormPayPonct />} />
            <Route path='recurrent' element={<FormPayRect />} />
          </Route>
          <Route path='/inscription' element={<SignPage />} />
          <Route path='/boutique' element={<StorePage />} />
        </Routes>
      </main>
      <Footer />
    </Suspense>
  );
}

export default App;
