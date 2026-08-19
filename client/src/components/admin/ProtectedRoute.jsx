import { Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <Loader2 className="animate-spin text-white" size={28} />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
