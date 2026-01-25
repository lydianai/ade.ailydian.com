import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../contexts/useAuthStore';
export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuthStore();
    // Show loading spinner while checking auth
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "glass-card p-8 text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4" }), _jsx("p", { className: "text-white/70", children: "Y\u00FCkleniyor..." })] }) }));
    }
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/giris-yap", replace: true });
    }
    // Render children if authenticated
    return _jsx(_Fragment, { children: children });
}
