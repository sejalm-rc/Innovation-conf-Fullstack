import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page py-24 text-center">
      <p className="text-brandGreen font-bold text-lg mb-2">404</p>
      <h1 className="text-3xl font-bold text-navy-900 mb-3">Page Not Found</h1>
      <p className="text-navy-500 mb-8 max-w-md mx-auto">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="btn-primary inline-flex">
        <Home size={16} /> Back to Home
      </Link>
    </div>
  );
}
