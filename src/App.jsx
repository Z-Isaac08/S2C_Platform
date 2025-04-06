import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollTo';

// Chargement dynamique des pages
const HomePage = lazy(() => import('./pages/HomePage'));
const SoutienPage = lazy(() => import('./pages/SoutienPage'));
const SignPage = lazy(() => import('./pages/SignPage'));
const StorePage = lazy(() => import('./pages/StorePage'));
const FormPayPonct = lazy(() => import('./components/FormPayPonct'));
const FormPayRect = lazy(() => import('./components/FormPayRect'));

function App() {

  return (
    <>
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Chargement...</div>}>
        <ScrollToTop />
        <NavBar />
        <main className=''>
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
    </>
  )
}

export default App
