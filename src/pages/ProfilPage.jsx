import React, { useState } from 'react';
import { 
  GraduationCap, 
  Check, 
  Plus, 
  X, 
  Info, 
  ArrowRight,
  ArrowLeft,
  User,
  Sparkles
} from 'lucide-react';

const INITIAL_SEMESTERS = [
  {
    id: 'S1',
    title: 'S1 · Les fondamentaux',
    ues: [
      { id: 'ue-s1-1', name: 'Analyse mathématique 1', ects: 6, checked: true, note: '13', status: 'validated', competences: ['Calcul', 'Démonstration', 'Raisonnement mathématique'] },
      { id: 'ue-s1-2', name: 'Algorithmique et programmation Python', ects: 6, checked: true, note: '15', status: 'validated', competences: ['Python', 'Algorithmique', 'Programmation'] },
      { id: 'ue-s1-3', name: 'Introduction à l\'économie', ects: 3, checked: true, note: '14', status: 'validated', competences: ['Économie', 'Analyse', 'Marchés'] }
    ]
  },
  {
    id: 'S2',
    title: 'S2 · Consolider les bases',
    ues: [
      { id: 'ue-s2-1', name: 'Algèbre linéaire', ects: 6, checked: true, note: '14', status: 'validated', competences: ['Algèbre', 'Linéarité', 'Raisonnement'] },
      { id: 'ue-s2-2', name: 'Probabilités', ects: 6, checked: true, note: '13', status: 'validated', competences: ['Probabilités', 'Statistiques', 'Incertitude'] },
      { id: 'ue-s2-3', name: 'Statistique descriptive', ects: 3, checked: true, note: '14', status: 'validated', competences: ['Statistiques', 'Descriptive', 'Données'] }
    ]
  },
  {
    id: 'S3',
    title: 'S3 · Structurer et modéliser',
    ues: [
      { id: 'ue-s3-1', name: 'Bases de données SQL', ects: 6, checked: true, note: '15', status: 'validated', competences: ['SQL', 'Bases de données', 'Modélisation'] },
      { id: 'ue-s3-2', name: 'Algorithmique et structures de données', ects: 6, checked: true, note: '14', status: 'validated', competences: ['Algorithmie', 'Structures', 'Programmation'] },
      { id: 'ue-s3-3', name: 'Microéconomie', ects: 3, checked: true, note: '12', status: 'validated', competences: ['Économie', 'Marchés', 'Analyse'] }
    ]
  },
  {
    id: 'S4',
    title: 'S4 · Analyser les données',
    ues: [
      { id: 'ue-s4-1', name: 'Statistique inférentielle', ects: 6, checked: true, note: '14', status: 'validated', competences: ['Statistiques', 'Inférence', 'Données'] },
      { id: 'ue-s4-2', name: 'Analyse de données avec R', ects: 3, checked: true, note: '13', status: 'validated', competences: ['R', 'Données', 'Visualisation'] },
      { id: 'ue-s4-3', name: 'Optimisation', ects: 6, checked: true, note: '12', status: 'validated', competences: ['Optimisation', 'Mathématiques', 'Modélisation'] }
    ]
  },
  {
    id: 'S5',
    title: 'S5 · Approfondir son parcours',
    ues: [
      { id: 'ue-s5-1', name: 'Économétrie', ects: 6, checked: true, note: '13', status: 'validated', competences: ['Économétrie', 'Analyse', 'Données'] },
      { id: 'ue-s5-2', name: 'Systèmes d\'information', ects: 3, checked: true, note: '', status: 'in_progress', competences: ['SI', 'Gestion', 'Projets'] }
    ]
  },
  {
    id: 'S6',
    title: 'S6 · Spécialisation & Options',
    ues: [
      { id: 'ue-s6-1', name: 'Anglais & Communication', ects: 3, checked: true, note: '15', status: 'validated', competences: ['Anglais', 'Communication', 'Lecture'] },
      { id: 'ue-s6-2', name: 'Bases de données avancées', isOption: true, tag: 'Option S6', ects: 6, checked: false, note: '', status: 'not_acquired', competences: [] },
      { id: 'ue-s6-3', name: 'Gestion de projet', isOption: true, tag: 'Option S6', ects: 3, checked: false, note: '', status: 'not_acquired', competences: [] }
    ]
  }
];

export default function ProfilPage({ onGoHome, onBack, onNext }) {
  const [semesters, setSemesters] = useState(INITIAL_SEMESTERS);
  const [showAddExpModal, setShowAddExpModal] = useState(false);
  const [extraSkills, setExtraSkills] = useState(['Python', 'SQL', 'Probabilités', 'Économétrie', 'R', 'Statistiques']);
  
  const [expType, setExpType] = useState('Stage');
  const [expTitle, setExpTitle] = useState('Analyste data');
  const [expSkills, setExpSkills] = useState(['Python', 'SQL']);

  const toggleUECheck = (semesterId, ueId) => {
    setSemesters(prev => prev.map(sem => {
      if (sem.id === semesterId) {
        return {
          ...sem,
          ues: sem.ues.map(ue => {
            if (ue.id === ueId) {
              const newChecked = !ue.checked;
              let newStatus = ue.status;
              if (newChecked) {
                newStatus = ue.status === 'not_acquired' ? 'validated' : ue.status;
              } else {
                newStatus = ue.isOption ? 'not_acquired' : 'in_progress';
              }
              return { ...ue, checked: newChecked, status: newStatus };
            }
            return ue;
          })
        };
      }
      return sem;
    }));
  };

  const handleNoteChange = (semesterId, ueId, val) => {
    setSemesters(prev => prev.map(sem => {
      if (sem.id === semesterId) {
        return {
          ...sem,
          ues: sem.ues.map(ue => ue.id === ueId ? { ...ue, note: val } : ue)
        };
      }
      return sem;
    }));
  };

  const handleAddCompetenceToUE = (semesterId, ueId) => {
    const newComp = prompt("Intitulé de la compétence à ajouter :");
    if (newComp && newComp.trim() !== "") {
      setSemesters(prev => prev.map(sem => {
        if (sem.id === semesterId) {
          return {
            ...sem,
            ues: sem.ues.map(ue => ue.id === ueId ? { ...ue, competences: [...ue.competences, newComp.trim()] } : ue)
          };
        }
        return sem;
      }));
    }
  };

  const handleAddCustomUE = () => {
    const ueName = prompt("Nom de votre Unité d'Enseignement (UE) :");
    if (ueName && ueName.trim() !== "") {
      const newUE = {
        id: `ue-custom-${Date.now()}`,
        name: ueName.trim(),
        ects: 3,
        checked: true,
        note: '',
        status: 'validated',
        competences: ['Compétence personnalisée']
      };
      setSemesters(prev => prev.map(sem => {
        if (sem.id === 'S6') {
          return { ...sem, ues: [...sem.ues, newUE] };
        }
        return sem;
      }));
    }
  };

  const toggleExpSkill = (skill) => {
    if (expSkills.includes(skill)) {
      setExpSkills(expSkills.filter(s => s !== skill));
    } else {
      setExpSkills([...expSkills, skill]);
    }
  };

  const totalUEsChecked = semesters.flatMap(s => s.ues).filter(ue => ue.checked).length;
  const totalExtraSkills = extraSkills.length;

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
          <div className="flex items-center space-x-2 text-gray-500 cursor-pointer" onClick={onBack}>
            <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">✓</span>
            <span>Parcours</span>
          </div>
          <span className="text-gray-300">&gt;</span>

          <div className="flex items-center space-x-2 text-[#1e3a8a]">
            <span className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center text-xs">2</span>
            <span className="font-bold">Profil</span>
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

        {/* TITRE */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Vérifions votre profil</h1>
            <p className="text-gray-500 text-sm mt-1">
              Votre profil est prérempli selon votre parcours. Décochez ce que vous n'avez pas validé et ajoutez ce qui manque.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-blue-50 text-[#1e3a8a] text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-100">
            <span>Licence MIASHS · Parcours A · S1 à S6</span>
            <button onClick={onBack} className="underline text-blue-700 hover:text-blue-900 ml-1 cursor-pointer">Changer</button>
          </div>
        </div>

        {/* GRILLE (UES + SIDEBAR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-bold text-gray-800">Vos unités d'enseignement</h2>
              <span className="text-xs text-gray-400">Exemples fictifs · sélection d'UEs</span>
            </div>

            {semesters.map((sem) => (
              <div key={sem.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-slate-50/80 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                  <span className="text-xs font-extrabold text-[#1e3a8a] uppercase tracking-wider">{sem.title}</span>
                  <span className="text-[11px] text-gray-400">Note /20 · facultative</span>
                </div>

                <div className="divide-y divide-gray-100">
                  {sem.ues.map((ue) => (
                    <div key={ue.id} className="p-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <input 
                            type="checkbox"
                            checked={ue.checked}
                            onChange={() => toggleUECheck(sem.id, ue.id)}
                            className="w-4 h-4 mt-1 text-[#1e3a8a] rounded border-gray-300 focus:ring-[#1e3a8a] cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-bold text-gray-800">{ue.name}</span>
                              {ue.tag && (
                                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                                  {ue.tag}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">{ue.ects} ECTS</div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          <input 
                            type="text"
                            value={ue.note}
                            onChange={(e) => handleNoteChange(sem.id, ue.id, e.target.value)}
                            placeholder="Note"
                            className="w-12 p-1.5 bg-slate-50 border border-gray-300 rounded-lg text-center text-xs font-bold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]"
                          />
                          <span className="text-xs text-gray-400 font-medium">/20</span>
                        </div>
                      </div>

                      <div>
                        {ue.status === 'validated' && (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>Validée</span>
                          </span>
                        )}
                        {ue.status === 'in_progress' && (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            <span>En cours</span>
                          </span>
                        )}
                        {ue.status === 'not_acquired' && (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            <span>Non acquise</span>
                          </span>
                        )}
                      </div>

                      {ue.competences.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {ue.competences.map((comp, idx) => (
                            <span key={idx} className="inline-flex items-center space-x-1 text-xs bg-blue-50/60 text-[#1e3a8a] px-2.5 py-1 rounded-lg border border-blue-100 font-medium">
                              <Check className="w-3 h-3 text-[#1e3a8a]" />
                              <span>{comp}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-1">
                        <button 
                          onClick={() => handleAddCompetenceToUE(sem.id, ue.id)}
                          className="text-xs text-[#1e3a8a] font-semibold hover:underline flex items-center space-x-1 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Ajouter une compétence</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-center">
              <button 
                onClick={handleAddCustomUE}
                className="text-xs font-bold text-[#1e3a8a] hover:underline cursor-pointer"
              >
                Mon UE n'est pas dans la liste
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center space-x-2 text-slate-800 font-bold text-base">
                <Sparkles className="w-5 h-5 text-[#1e3a8a]" />
                <span>Compétences hors formation</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ajoutez une expérience pour enrichir votre profil avec des compétences acquises hors cursus.
              </p>

              <div className="flex flex-wrap gap-2">
                {extraSkills.map((skill, idx) => (
                  <span key={idx} className="inline-flex items-center space-x-1 text-xs bg-blue-50/60 text-[#1e3a8a] px-3 py-1.5 rounded-xl border border-blue-100 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#1e3a8a]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>

              <button 
                onClick={() => setShowAddExpModal(true)}
                className="w-full bg-[#1e3a8a] hover:bg-blue-800 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une expérience</span>
              </button>
            </div>

            {showAddExpModal && (
              <div className="bg-white border-2 border-[#1e3a8a] rounded-2xl p-6 space-y-4 shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-900">Ajouter une expérience</h3>
                  <button onClick={() => setShowAddExpModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Type</label>
                    <select 
                      value={expType}
                      onChange={(e) => setExpType(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800"
                    >
                      <option value="Stage">Stage</option>
                      <option value="Projet personnel">Projet personnel</option>
                      <option value="Emploi / Alternance">Emploi / Alternance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Intitulé</label>
                    <input 
                      type="text"
                      value={expTitle}
                      onChange={(e) => setExpTitle(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs font-semibold text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-2">Compétences</label>
                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                      {['Python', 'SQL', 'R', 'Statistiques', 'Power BI'].map((s) => (
                        <div 
                          key={s}
                          onClick={() => toggleExpSkill(s)}
                          className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-2 cursor-pointer border ${
                            expSkills.includes(s)
                              ? 'bg-blue-50 border-blue-200 text-[#1e3a8a]'
                              : 'bg-white border-gray-200 text-gray-600'
                          }`}
                        >
                          <input type="checkbox" checked={expSkills.includes(s)} readOnly className="rounded text-[#1e3a8a]" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button onClick={() => setShowAddExpModal(false)} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-600">Annuler</button>
                  <button 
                    onClick={() => {
                      setExtraSkills([...new Set([...extraSkills, ...expSkills])]);
                      setShowAddExpModal(false);
                    }}
                    className="flex-1 py-2.5 bg-[#1e3a8a] text-white rounded-xl text-xs font-bold hover:bg-blue-800"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            )}

            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Votre parcours en un regard</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-3xl font-black text-[#1e3a8a]">{totalUEsChecked}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold mt-0.5">UEs sélectionnées</div>
                </div>

                <div>
                  <div className="text-3xl font-black text-[#1e3a8a]">{totalExtraSkills}</div>
                  <div className="text-[10px] text-gray-500 uppercase font-semibold mt-0.5">compétences ajoutées</div>
                </div>
              </div>

              <div className="pt-3 border-t border-blue-100 text-xs text-[#1e3a8a] font-medium leading-relaxed">
                Deux options du S6 restent à explorer pour enrichir votre parcours.
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs text-gray-500 px-2">
              <Info className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <span>
                Cochez les UEs suivies, y compris celles en cours. Les notes sont facultatives.
              </span>
            </div>
          </div>
        </div>

        {/* BARRE DE BOUTONS EN BAS */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-start">
            <button 
              onClick={onBack}
              className="bg-white border border-gray-300 text-gray-700 hover:bg-slate-100 px-6 py-3.5 rounded-xl font-semibold flex items-center space-x-2 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Précédent</span>
            </button>
            <p className="text-xs text-gray-500 font-medium hidden md:block">
              Prochaine étape : choisir le Master que vous souhaitez rejoindre.
            </p>
          </div>

          <button 
            onClick={onNext}
            className="bg-[#1e3a8a] hover:bg-blue-800 text-white px-8 py-3.5 rounded-xl font-semibold flex items-center space-x-3 shadow-sm hover:shadow-md transition cursor-pointer w-full sm:w-auto justify-center"
          >
            <span>Continuer</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </main>
    </div>
  );
}