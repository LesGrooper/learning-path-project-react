import React, {lazy, Suspense} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
    Home,
    Books,
    LoginPage
} from "../Modules";
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import { Loader } from '../components/common/Loader';
import { ROUTES } from '../utils/constants';

const SuspenseFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
    <Loader size="lg" />
  </div>
);

const AppRoutes = () => {
    return (
        // <Routes>
        //     <Route path="/" element={<Home />}></Route>
        //     <Route path="/books" element={<Books />}>
        //     </Route>
        // </Routes>
        <Suspense fallback={<SuspenseFallback />}>
            <Routes>
                {/* Public routes */}
                <Route element={<PublicRoute />}>
                    <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                </Route>

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/books" element={<Books />}></Route>
                    {/* <Route element={<DashboardLayout />}>
                        <Route path={ROUTES.HOME} element={<HomePage />} />
                        <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
                        <Route path="/products/add" element={<ProductAddPage />} />
                        <Route path="/products/edit/:id" element={<ProductEditPage />} />
                        <Route path="/products/:id" element={<ProductDetailPage />} />
                    </Route> */}
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;