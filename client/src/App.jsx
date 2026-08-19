import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Conferences from "./pages/Conferences";
import ConferenceDetails from "./pages/ConferenceDetails";
import SDGImpact from "./pages/SDGImpact";
import AssociateConference from "./pages/AssociateConference";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";

import { AuthProvider } from "./context/AuthContext";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import Dashboard from "./pages/admin/Dashboard";
import ConferencesList from "./pages/admin/ConferencesList";
import ConferenceForm from "./pages/admin/ConferenceForm";
import EvaluationsList from "./pages/admin/EvaluationsList";
import ContactEnquiriesList from "./pages/admin/ContactEnquiriesList";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        {/* ---------------- Public site (with Header/Footer) ---------------- */}
        <Route
          path="/*"
          element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/conferences" element={<Conferences />} />
                <Route path="/conferences/:id" element={<ConferenceDetails />} />
                <Route path="/sdg-impact" element={<SDGImpact />} />
                <Route path="/associate-conference" element={<AssociateConference />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PublicLayout>
          }
        />

        {/* ---------------- Admin (no public Header/Footer) ---------------- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="conferences" element={<ConferencesList />} />
          <Route path="conferences/new" element={<ConferenceForm />} />
          <Route path="conferences/:id/edit" element={<ConferenceForm />} />
          <Route path="evaluations" element={<EvaluationsList />} />
          <Route path="contact-enquiries" element={<ContactEnquiriesList />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
