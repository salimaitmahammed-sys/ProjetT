// Importation de la bibliothèque React nécessaire pour créer des composants
import React from 'react';

// Exportation par défaut du composant principal App
export default function App() {
  // Début du rendu JSX du composant
  return (
    // Conteneur global occupant au moins tout l'écran, avec fond gris clair, texte sombre et police sans-serif
    <div className="min-h-screen bg-gray-200 text-gray-800 font-sans">
      
      {/* 1. Navbar Supérieure : En-tête de navigation du site */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
        {/* Groupe gauche de la navbar : Logo et slogan */}
        <div className="flex items-center space-x-3">
          {/* Boîte contenant le nom et logo de l'application */}
          <div className="bg-blue-900 text-white p-2 rounded-lg font-bold">Master</div>
        </div>
        {/* Groupe droite de la navbar : Liens de navigation et avatar */}
        <nav className="flex items-center space-x-6 text-sm font-medium text-gray-600">
          {/* Lien vers la page profil */}
          <span className="cursor-pointer hover:text-blue-600">Mon profil</span>
          {/* Lien actif vers la page diagnostic */}
          <span className="text-blue-600 font-semibold cursor-pointer">Diagnostic</span>
          {/* Lien vers la page à propos */}
          <span className="cursor-pointer hover:text-blue-600">À propos</span>
          {/* Icône circulaire représentant l'utilisateur */}
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700">👤</div>
        </nav>
      </header>

      {/* Conteneur principal de la page avec largeur maximale et marges internes */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        {/* 2. Fil d'ariane / Étapes : Indique la progression dans le parcours utilisateur */}
        <div className="flex items-center space-x-4 mb-8 text-sm">
          {/* Première étape validée : Profil */}
          <div className="flex items-center space-x-2 text-gray-400">
            {/* Pastille avec une coche pour signifier que l'étape est passée */}
            <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">✓</span>
            <span>Profil</span>
          </div>
          {/* Séparateur visuel */}
          <span className="text-gray-300">›</span>
          {/* Deuxième étape validée : Master visé */}
          <div className="flex items-center space-x-2 text-gray-400">
            {/* Pastille avec une coche */}
            <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">✓</span>
            <span>Master visé</span>
          </div>
          {/* Séparateur visuel */}
          <span className="text-gray-300">›</span>
          {/* Troisième étape en cours : Résultats */}
          <div className="flex items-center space-x-2 text-blue-600 font-semibold">
            {/* Pastille bleue numérotée 3 */}
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
            <span>Résultats</span>
          </div>
        </div>

        {/* 3. En-tête du Diagnostic & Jauge Match% : Résumé de l'analyse */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 flex justify-between items-center">
          {/* Bloc texte de description du diagnostic */}
          <div>
            {/* Sous-titre en lettres capitales */}
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Votre diagnostic - Licence MIASHS</span>
            {/* Titre principal du diagnostic */}
            <h1 className="text-3xl font-bold text-gray-900 mt-1 mb-2">Diagnostic pour le Master MIAGE</h1>
            {/* Description textuelle contextuelle */}
            <p className="text-gray-600 text-sm mb-4">Un socle solide en programmation et en données. Deux lacunes à combler pour renforcer votre dossier.</p>
            
            {/* Compteurs de prérequis (validés, en cours, lacunes) */}
            <div className="flex space-x-6 text-sm">
              {/* Indicateur vert des prérequis validés */}
              <span className="text-emerald-600 font-medium">● 3 prérequis validés</span>
              {/* Indicateur orange des prérequis en cours */}
              <span className="text-amber-500 font-medium">● 1 en cours</span>
              {/* Indicateur rouge des lacunes */}
              <span className="text-rose-500 font-medium">● 2 lacunes</span>
            </div>
          </div>

          {/* Jauge circulaire : Visualisation du pourcentage de correspondance */}
          <div className="flex flex-col items-center justify-center bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
            {/* Cercle contenant le score */}
            <div className="w-20 h-20 rounded-full border-4 border-blue-600 flex flex-col items-center justify-center text-blue-900 font-bold">
              {/* Texte "Match :" */}
              <span className="text-xs text-gray-500 font-normal">Match :</span>
              {/* Valeur du pourcentage */}
              <span className="text-xl">72 %</span>
            </div>
            {/* Légende explicative sous la jauge */}
            <span className="text-xs text-gray-500 mt-2">Prérequis pondérés estimation</span>
          </div>
        </div>

        {/* 4. Grille Principale : Disposition en deux colonnes (Graphe à gauche, Panneau latéral à droite) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne Gauche : Carte des prérequis (Graphe) - Occupe 2 colonnes sur grand écran */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {/* En-tête de la carte du graphe */}
            <div className="flex justify-between items-center mb-6">
              {/* Titres de la section */}
              <div>
                <h2 className="text-lg font-bold text-gray-900">Votre carte des prérequis</h2>
                <p className="text-xs text-gray-500">Identifiez ce qui relie déjà votre parcours au Master MIAGE.</p>
              </div>
              {/* Badge du nombre de prérequis analysés */}
              <span className="text-xs bg-blue-50 text-blue-600 font-medium px-3 py-1 rounded-full">6 prérequis analysés</span>
            </div>

            {/* Zone interactive réservée au graphe */}
            <div className="border border-dashed border-gray-200 rounded-xl p-6 min-h-[450px] flex items-center justify-center bg-gray-50/50 relative">
              {/* Texte indicatif temporaire */}
              <span className="text-gray-400 text-sm">[ Zone d'intégration de Cytoscape.js ]</span>
              
              {/* Exemple de carte UE validée (Vert) positionnée dans le graphe */}
              <div className="absolute top-8 left-8 bg-white border-l-4 border-emerald-500 p-4 rounded-lg shadow-sm w-64 text-xs">
                {/* Nom de l'UE */}
                <p className="font-bold text-gray-800">Algorithme et programmation</p>
                {/* Informations de semestre, ECTS et note */}
                <p className="text-gray-500">S1 - 6 ECTS - 15/20</p>
                {/* Statut de validation de la compétence */}
                <span className="text-emerald-600 font-semibold mt-1 block">✓ Python - acquis</span>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Lacunes & Recommandations - Occupe 1 colonne */}
          <div className="space-y-6">
            
            {/* Boîte Lacunes : Liste des éléments manquants */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* En-tête de la boîte lacunes avec compteur */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 text-sm">Lacunes identifiées</h3>
                <span className="w-6 h-6 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              </div>

              {/* Conteneur des cartes de lacunes */}
              <div className="space-y-4 text-xs">
                {/* Première lacune : Bases de données avancées */}
                <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
                  {/* Ligne supérieure de la carte (Label et ECTS) */}
                  <div className="flex justify-between font-semibold text-rose-700 mb-1">
                    <span>🔴 Lacune</span>
                    <span>3 ECTS</span>
                  </div>
                  {/* Titre de la lacune */}
                  <p className="font-bold text-gray-800 mb-1">Bases de données avancées</p>
                  {/* Description détaillée de la lacune */}
                  <p className="text-gray-500">Modélisation avancée, transactions et optimisation des requêtes.</p>
                </div>

                {/* Seconde lacune : Gestion de projet */}
                <div className="p-3 bg-rose-50/50 border border-rose-100 rounded-xl">
                  {/* Ligne supérieure de la carte (Label et ECTS) */}
                  <div className="flex justify-between font-semibold text-rose-700 mb-1">
                    <span>🔴 Lacune</span>
                    <span>3 ECTS</span>
                  </div>
                  {/* Titre de la lacune */}
                  <p className="font-bold text-gray-800 mb-1">Gestion de projet</p>
                  {/* Description détaillée de la lacune */}
                  <p className="text-gray-500">Planification, méthodes agiles et coordination d'équipe.</p>
                </div>
              </div>

              {/* Pied de la boîte affichant le total des crédits à compléter */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-xs font-semibold text-gray-700">
                <span>Crédits à compléter</span>
                <span className="text-rose-600">9 ECTS</span>
              </div>
            </div>

            {/* Boîte Recommandations : Suggestions pour combler les lacunes */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {/* Titre de la section recommandations */}
              <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">
                <span>💡</span> Recommandations
              </h3>
              {/* Texte explicatif des options */}
              <p className="text-xs text-gray-600 mb-4">Deux UEs optionnelles au S6 pour combler ces lacunes :</p>
              
              {/* Carte de recommandation spécifique */}
              <div className="p-3 bg-blue-50/30 border border-blue-100 rounded-xl text-xs">
                {/* Nom de l'UE recommandée */}
                <p className="font-bold text-gray-800">Bases de données avancées</p>
                {/* Informations de semestre et ECTS */}
                <p className="text-gray-500 mb-2">Option S6 - 6 ECTS</p>
                {/* Badge de recommandation */}
                <span className="text-blue-600 font-semibold">★ Recommandé</span>
              </div>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}