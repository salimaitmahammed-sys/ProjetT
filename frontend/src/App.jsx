import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import AccueilPage from "./pages/AccueilPage"
import ParcoursPage from "./pages/ParcoursPage"
import ProfilPage from "./pages/ProfilPage"
import MastersPage from "./pages/MastersPage"
import DiagnosticPage from "./pages/DiagnosticPage"
import ComparerPage from "./pages/ComparerPage"
import MethodePage from "./pages/MethodePage"
import { ProfilProvider } from "./state/ProfilContext"

export default function App() {
  return (
    <BrowserRouter>
      <ProfilProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<AccueilPage />} />
            <Route path="parcours" element={<ParcoursPage />} />
            <Route path="profil" element={<ProfilPage />} />
            <Route path="masters" element={<MastersPage />} />
            <Route path="diagnostic" element={<DiagnosticPage />} />
            <Route path="comparer" element={<ComparerPage />} />
            <Route path="methode" element={<MethodePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </ProfilProvider>
    </BrowserRouter>
  )
}
