import React, { useState } from 'react';
import { 
  GraduationCap, 
  Check, 
  ArrowRight,
  ArrowLeft,
  User,
  Layers,
  Code2,
  BarChart3,
  Network,
  Sigma,
  Info
} from 'lucide-react';

const MASTERS_DATA = [
  {
    id: 'miashs',
    title: 'MIASHS',
    subtitle: 'Mathématiques & sciences humaines',
    description: 'Croisez modélisation, analyse de données et sciences humaines et sociales.',
    match: '86 %',
    Icon: Network
  },
  {
    id: 'miage',
    title: 'MIAGE',
    subtitle: 'Informatique & gestion',
    description: 'Concevez des systèmes d’information et pilotez des projets numériques.',
    match: '72 %',
    Icon: Layers
  },
  {
    id: 'informatique',
    title: 'Informatique',
    subtitle: 'Développement & systèmes',
    description: 'Approfondissez l’algorithmique, le développement logiciel et les systèmes.',
    match: '64 %',
    Icon: Code2
  },
  {
    id: 'mathematiques',
    title: 'Mathématiques',
    subtitle: 'Modélisation & applications',
    description: 'Renforcez vos bases en analyse, algèbre et mathématiques appliquées.',
    match: '68 %',
    Icon: Sigma
  },
  {
    id: 'statistiques',
    title: 'Statistiques',
    subtitle: 'Données & aide à la décision',
    description: 'Explorez l’inférence, l’apprentissage statistique et la science des données.',
    match: '81 %',
    Icon: BarChart3
  }
];

export default function MasterSelectionPage({ onGoHome, onBack, onNext }) {
  const [selectedMasterId, setSelectedMasterId] = useState('miage');

  const selectedMaster = MASTERS_DATA.find(m => m.id === selectedMasterId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-16">
      
      {/* HEADER AVEC LOGO CLIQUABLE */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div 
          onClick={onGoHome} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="bg-[#1e3a8a] text-white p-2 rounded-lg group-hover:bg-blue-800 transition">
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
          <a href="#diagnostic" className="text-[#1e3a8a] font-bold border-b-2 border-[#1e3a8a] pb-1">Diagnostic</a>
          <a href="#comparer" className="hover:text-[#1e3a8a] transition">Comparer</a>
          <a href="#methodes" className="hover:text-[#1e3a8a] transition">Méthode et sources</a>
          <a href="#apropos" className="hover:text-[#1e3a8a] transition">À propos</a>
        </nav>

        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition cursor-pointer">
          <User className="w-5 h-5" />
        </button>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        
        {/* STEPPER */}
        <div className="flex items-center space-x-4 text-xs font-semibold">
          <div className="flex items-center space-x-2 text-gray-500 cursor-pointer" onClick={onGoHome}>
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
            <span>Parcours</span>
          </div>
          <span className="text-gray-300">&gt;</span>

          <div className="flex items-center space-x-2 text-gray-500 cursor-pointer" onClick={onBack}>
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
            <span>Profil</span>
          </div>
          <span className="text-gray-300">&gt;</span>

          <div className="flex items-center space-x-2 text-[#1e3a8a]">
            <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-xs">3</span>
            <span className="font-bold">Master visé</span>
          </div>
          <span className="text-gray-300">&gt;</span>

          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">4</span>
            <span>Résultats</span>
          </div>
        </div>

        {/* TITRE */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900">Quel Master souhaitez-vous rejoindre ?</h1>
          <p className="text-gray-500 text-sm">
            Choisissez une mention pour comparer ses prérequis à votre parcours MIASHS.
          </p>
        </div>

        {/* SUBHEADER */}
        <div className="flex justify-between items-center pt-2">
          <h2 className="text-sm font-bold text-gray-800">5 mentions à explorer</h2>
          <div className="flex items-center space-x-1.5 text-xs text-gray-400">
            <Info className="w-4 h-4" />
            <span>Estimations fictives fondées sur votre profil · 17 UEs et 6 compétences</span>
          </div>
        </div>

        {/* GRILLE DES MENTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MASTERS_DATA.map((m) => {
            const isSelected = selectedMasterId === m.id;
            const IconComponent = m.Icon;

            return (
              <div 
                key={m.id}
                onClick={() => setSelectedMasterId(m.id)}
                className={`p-6 rounded-2xl border-2 transition cursor-pointer relative flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-blue-50/40 border-[#1e3a8a] ring-1 ring-[#1e3a8a]' 
                    : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center border border-blue-100">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      isSelected 
                        ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' 
                        : 'border-gray-300'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 mb-1">{m.title}</h3>
                  <p className="text-xs font-semibold text-blue-700 mb-3">{m.subtitle}</p>
                  <p className="text-xs text-gray-500 leading-relaxed mb-6">{m.description}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100/80">
                  <span className="text-xs font-bold text-[#1e3a8a] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                    Match estimé · {m.match}
                  </span>
                  {isSelected && (
                    <span className="text-xs font-bold text-[#1e3a8a]">Sélectionné</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BANDEAU RECAPITULATIF */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-50 text-[#1e3a8a] rounded-xl flex items-center justify-center border border-blue-100 shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Master {selectedMaster?.title} sélectionné
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Découvrez vos points forts, vos lacunes et les UEs recommandées.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
            <button 
              onClick={onBack}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold flex items-center space-x-2 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>

            <button 
              onClick={onNext}
              className="bg-[#1e3a8a] hover:bg-blue-800 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center space-x-3 shadow-sm hover:shadow-md transition cursor-pointer shrink-0"
            >
              <span>Voir mon diagnostic</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400">
          Le match estimé indique la proximité de votre parcours avec les prérequis, pas une probabilité d’admission.
        </p>

      </main>
    </div>
  );
}