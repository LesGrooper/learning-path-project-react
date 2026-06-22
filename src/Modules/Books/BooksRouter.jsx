import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    BooksDetail
} from "./BooksDetail/BooksDetail";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/books/:slug" element={<BooksDetail />}>
            </Route>
        </Routes>
    );
};

export default AppRoutes;