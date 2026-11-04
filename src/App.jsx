import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ParcoursPage from './pages/ParcoursPage';
import ProfilPage from './pages/ProfilPage';
import MasterSelectionPage from './pages/MasterSelectionPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Navigations centralisées
  const goHome = () => setCurrentPage('landing');
  const goToParcours = () => setCurrentPage('parcours');
  const goToProfil = () => setCurrentPage('profil');
  const goToMaster = () => setCurrentPage('master');

  return (
    <main>
      {currentPage === 'landing' && (
        <LandingPage onStartDiagnostic={goToParcours} />
      )}

      {currentPage === 'parcours' && (
        <ParcoursPage 
          onGoHome={goHome}
          onBack={goHome} 
          onNext={goToProfil} 
        />
      )}

      {currentPage === 'profil' && (
        <ProfilPage 
          onGoHome={goHome}
          onBack={goToParcours} 
          onNext={goToMaster} 
        />
      )}

      {currentPage === 'master' && (
        <MasterSelectionPage 
          onGoHome={goHome}
          onBack={goToProfil} 
          onNext={() => alert("Étape 4 : Résultats du diagnostic")} 
        />
      )}
    </main>
  );
}