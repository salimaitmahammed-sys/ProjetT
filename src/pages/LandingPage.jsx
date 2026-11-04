import React from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  ListChecks, 
  GitFork, 
  User, 
  Clock 
} from 'lucide-react';

export default function LandingPage({ onStartDiagnostic }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. BARRE DE NAVIGATION */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="bg-[#1e3a8a] text-white p-2 rounded-lg">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xl font-bold text-[#1e3a8a] tracking-tight">CapMaster</span>
            <span className="text-xs text-gray-400 ml-3 border-l border-gray-300 pl-3 hidden md:inline">
              Votre parcours. Votre cap.
            </span>
          </div>
        </div>

        <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
          <a href="#profil" className="hover:text-[#1e3a8a] transition">Mon profil</a>
          <a href="#diagnostic" className="hover:text-[#1e3a8a] transition">Diagnostic</a>
          <a href="#comparer" className="hover:text-[#1e3a8a] transition">Comparer</a>
          <a href="#methodes" className="hover:text-[#1e3a8a] transition">Méthode et sources</a>
          <a href="#apropos" className="hover:text-[#1e3a8a] transition">À propos</a>
        </nav>

        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition cursor-pointer">
          <User className="w-5 h-5" />
        </button>
      </header>

      {/* 2. SECTION HERO & APERÇU DYNAMIQUE */}
      <section className="max-w-7xl mx-auto px-8 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Colonne Gauche : Titre et action */}
        <div className="lg:col-span-7 space-y-6">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center space-x-2">
            <span className="w-6 h-[2px] bg-gray-400"></span>
            <span>DE LA LICENCE MIASHS AU MASTER</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Quels sont les prérequis qui vous manquent pour votre Master ?
          </h1>

          <p className="text-lg text-gray-600 max-w-xl">
            Renseignez votre parcours MIASHS et obtenez un diagnostic visuel immédiat.
          </p>

          <div className="pt-2">
            <button 
              onClick={onStartDiagnostic}
              className="bg-[#1e3a8a] hover:bg-blue-800 text-white px-6 py-3.5 rounded-lg font-semibold flex items-center space-x-3 shadow-sm hover:shadow-md transition group cursor-pointer"
            >
              <span>Commencer mon diagnostic</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="flex items-center space-x-2 text-xs text-gray-500 pt-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Quelques minutes pour y voir plus clair · Notes facultatives</span>
          </div>
        </div>

        {/* Colonne Droite : Carte d'aperçu du diagnostic */}
        <div className="lg:col-span-5">
          <div className="bg-blue-50/50 border border-gray-200 rounded-2xl p-6 shadow-sm relative">
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 text-sm font-semibold text-[#1e3a8a]">
                <GitFork className="w-4 h-4 rotate-90" />
                <span>Votre parcours, en perspective</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">APERÇU</span>
            </div>

            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              VOS COMPÉTENCES
            </div>

            <div className="flex items-center justify-between relative">
              <div className="space-y-3 w-3/5 z-10">
                
                {/* Pastille Validée (emerald) */}
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-xs font-semibold text-gray-800">Programmation</div>
                  <span className="inline-block mt-1 text-[10px] font-medium bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-200">
                    ● Prérequis validé
                  </span>
                </div>

                {/* Pastille En cours (amber) */}
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-xs font-semibold text-gray-800">Systèmes d'information</div>
                  <span className="inline-block mt-1 text-[10px] font-medium bg-amber-50 text-amber-500 px-2 py-0.5 rounded-full border border-amber-200">
                    ● En cours
                  </span>
                </div>

                {/* Pastille Lacune (rose) */}
                <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                  <div className="text-xs font-semibold text-gray-800">Gestion de projet</div>
                  <span className="inline-block mt-1 text-[10px] font-medium bg-rose-50 text-rose-500 px-2 py-0.5 rounded-full border border-rose-200">
                    ● Lacune à combler
                  </span>
                </div>
              </div>

              {/* Carte Master Cible */}
              <div className="w-2/5 ml-4 z-10">
                <div className="bg-[#1e3a8a] text-white p-4 rounded-xl shadow-sm text-center space-y-1">
                  <GraduationCap className="w-6 h-6 mx-auto opacity-90" />
                  <div className="text-sm font-bold">Votre Master</div>
                  <div className="text-[10px] text-gray-300 leading-tight">Un cap, des étapes claires.</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-500">
              <span>Comprendre vos acquis. Repérer la suite.</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>

          </div>
        </div>

      </section>

      {/* 3. SECTION ÉTAPES */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <h2 className="text-xl font-bold text-gray-800 mb-8">
          Votre prochain cap, en trois étapes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 bg-gray-50 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-4 border border-gray-100">
              <ListChecks className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-2">1. Indiquez votre parcours</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Choisissez votre parcours MIASHS, vérifiez vos UEs et ajoutez vos compétences acquises en dehors de la formation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 bg-gray-50 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-4 border border-gray-100">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-2">2. Choisissez un Master</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Explorez cinq mentions et choisissez celle qui correspond à votre projet.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 bg-gray-50 text-[#1e3a8a] rounded-xl flex items-center justify-center mb-4 border border-gray-100">
              <GitFork className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-2">3. Visualisez vos lacunes</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Repérez les prérequis manquants et les UEs utiles pour préparer votre candidature.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 mt-12 bg-white px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-gray-400">
          <div>CapMaster · Éclairer votre orientation</div>
          <div>Licence MIASHS → Master</div>
        </div>
      </footer>

    </div>
  );
}