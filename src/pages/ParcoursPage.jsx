import React, { useState } from 'react';
import { 
  GraduationCap, 
  ChevronDown, 
  Check, 
  Info, 
  ArrowRight,
  ArrowLeft,
  User
} from 'lucide-react';

export default function ParcoursPage({ onGoHome, onBack, onNext }) {
  const [establishment, setEstablishment] = useState('UT2J');
  const [entryYear, setEntryYear] = useState('L1');
  const [selectedParcours, setSelectedParcours] = useState('parcours-a');
  const [isExternalArrival, setIsExternalArrival] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      
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
          <a href="#profil" className="text-[#1e3a8a] font-bold border-b-2 border-[#1e3a8a] pb-1">Mon profil</a>
          <a href="#diagnostic" className="hover:text-[#1e3a8a] transition">Diagnostic</a>
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
          <div className="flex items-center space-x-2 text-[#1e3a8a]">
            <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-xs">1</span>
            <span>Parcours</span>
          </div>
          <span className="text-gray-300">&gt;</span>

          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">2</span>
            <span>Profil</span>
          </div>
          <span className="text-gray-300">&gt;</span>

          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">3</span>
            <span>Master visé</span>
          </div>
          <span className="text-gray-300">&gt;</span>

          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs">4</span>
            <span>Résultats</span>
          </div>
        </div>

        {/* TITRE PRINCIPAL */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Quel est votre parcours ?</h1>
            <p className="text-gray-500 text-sm mt-1">
              Nous préremplissons votre profil selon votre parcours. Vous pourrez le modifier.
            </p>
          </div>
          <span className="text-xs font-semibold bg-blue-50 text-[#1e3a8a] px-3 py-1 rounded-md border border-blue-100">
            Étape 1 sur 4
          </span>
        </div>

        {/* CONTENU & SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
              <h2 className="text-base font-bold text-gray-800">Votre formation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-7 space-y-2">
                  <label className="block text-xs font-bold text-gray-700">Établissement</label>
                  <div className="border border-blue-200 rounded-xl bg-blue-50/30 overflow-hidden">
                    <div className="p-3.5 flex justify-between items-center text-sm font-semibold text-[#1e3a8a] bg-blue-50/50">
                      <span>Université Toulouse Jean Jaurès</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                    <div className="p-3 text-xs text-gray-400 flex justify-between border-t border-gray-100 bg-white">
                      <span>Université Toulouse Capitole</span>
                      <span className="italic">Bientôt disponible</span>
                    </div>
                    <div className="p-3 text-xs text-gray-400 flex justify-between border-t border-gray-100 bg-white">
                      <span>Université de Montpellier</span>
                      <span className="italic">Bientôt disponible</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-2">
                  <label className="block text-xs font-bold text-gray-700">Année d'entrée</label>
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    {['L1', 'L2', 'L3'].map((year) => (
                      <button
                        key={year}
                        onClick={() => setEntryYear(year)}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                          entryYear === year 
                            ? 'bg-[#1e3a8a] text-white shadow-sm' 
                            : 'text-gray-500 hover:text-gray-800'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    L'année à laquelle vous avez rejoint ce parcours.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-base font-bold text-gray-800">Choisissez votre parcours</h2>
                <span className="text-xs text-gray-400">Exemples fictifs · 2 parcours</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  onClick={() => setSelectedParcours('parcours-a')}
                  className={`p-6 rounded-2xl border-2 transition cursor-pointer relative bg-white ${
                    selectedParcours === 'parcours-a'
                      ? 'border-[#1e3a8a] ring-1 ring-[#1e3a8a]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-extrabold text-slate-900">Parcours A</h3>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      selectedParcours === 'parcours-a' 
                        ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' 
                        : 'border-gray-300'
                    }`}>
                      {selectedParcours === 'parcours-a' && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mb-4">Licence MIASHS · S1 à S6</p>

                  <div className="flex items-baseline space-x-3 mb-3">
                    <span className="text-2xl font-black text-[#1e3a8a]">19 UEs</span>
                    <span className="text-xl font-bold text-[#1e3a8a]">93 ECTS</span>
                  </div>

                  <div className="text-xs font-semibold text-gray-700 mb-4">Tronc commun + options</div>

                  <div className="flex justify-between items-center text-[11px] text-gray-400 pt-3 border-t border-gray-100">
                    <span>Sélection d'UEs à titre d'exemple</span>
                    {selectedParcours === 'parcours-a' && <span className="font-bold text-[#1e3a8a]">Sélectionné</span>}
                  </div>
                </div>

                <div 
                  onClick={() => setSelectedParcours('parcours-b')}
                  className={`p-6 rounded-2xl border-2 transition cursor-pointer relative bg-white ${
                    selectedParcours === 'parcours-b'
                      ? 'border-[#1e3a8a] ring-1 ring-[#1e3a8a]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-extrabold text-slate-900">Parcours B</h3>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      selectedParcours === 'parcours-b' 
                        ? 'bg-[#1e3a8a] text-white border-[#1e3a8a]' 
                        : 'border-gray-300'
                    }`}>
                      {selectedParcours === 'parcours-b' && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 mb-4">Licence MIASHS · S1 à S6</p>

                  <div className="flex items-baseline space-x-3 mb-3">
                    <span className="text-2xl font-black text-slate-800">20 UEs</span>
                    <span className="text-xl font-bold text-slate-800">96 ECTS</span>
                  </div>

                  <div className="text-xs font-semibold text-gray-700 mb-4">Tronc commun + options</div>

                  <div className="flex justify-between items-center text-[11px] text-gray-400 pt-3 border-t border-gray-100">
                    <span>Valeurs fictives · sélection d'UEs</span>
                    {selectedParcours === 'parcours-b' && <span className="font-bold text-[#1e3a8a]">Sélectionné</span>}
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-3">
                <input 
                  type="checkbox" 
                  id="external"
                  checked={isExternalArrival}
                  onChange={(e) => setIsExternalArrival(e.target.checked)}
                  className="w-4 h-4 text-[#1e3a8a] rounded border-gray-300 focus:ring-[#1e3a8a]"
                />
                <label htmlFor="external" className="text-xs font-medium text-gray-700 cursor-pointer">
                  J'ai fait mes études précédentes ailleurs (arrivée en L3)
                </label>
                <span className="text-[10px] text-gray-400 italic">Facultatif</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#1e3a8a]">Votre profil sera prérempli</h3>
              <p className="text-xs text-gray-500">
                Licence MIASHS · {selectedParcours === 'parcours-a' ? 'Parcours A' : 'Parcours B'}
              </p>

              <div className="flex space-x-6 pt-2">
                <div>
                  <div className="text-3xl font-black text-[#1e3a8a]">{selectedParcours === 'parcours-a' ? '17' : '18'}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">UEs cochées</div>
                </div>

                <div>
                  <div className="text-3xl font-black text-[#1e3a8a]">{selectedParcours === 'parcours-a' ? '84' : '88'}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold">ECTS sélectionnés</div>
                </div>
              </div>

              <div className="pt-3 border-t border-blue-100 text-xs text-[#1e3a8a] font-medium leading-relaxed">
                2 options S6 non cochées · 9 ECTS<br/>
                <span className="text-gray-500 font-normal">À explorer lors de la vérification du profil.</span>
              </div>

              <p className="text-[10px] text-gray-400 leading-normal pt-2">
                Les {selectedParcours === 'parcours-a' ? '19 UEs et 93 ECTS' : '20 UEs et 96 ECTS'} correspondent à une sélection d'UEs à titre d'exemple, pas à la totalité d'une licence.
              </p>
            </div>

            <div className="flex items-start space-x-3 text-xs text-gray-500 px-2">
              <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <span>
                À l'étape suivante, vérifiez vos UEs, renseignez vos notes si vous le souhaitez et complétez vos compétences.
              </span>
            </div>
          </div>
        </div>

        {/* BARRE DE BOUTONS EN BAS */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button 
            onClick={onBack}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold flex items-center space-x-2 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Précédent</span>
          </button>

          <button 
            onClick={onNext}
            className="bg-[#1e3a8a] hover:bg-blue-800 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center space-x-3 shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <span>Continuer</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </main>
    </div>
  );
}