import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./components/Base";
import ScrollToTop from "./components/ScrollToTop";

import { Homepage } from "./pages";
import ElementDetails from "./pages/ElementDetails";

export default function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />

            <Routes>
                <Route path="/" element={<Base />}>
                    <Route index element={<Homepage />} />

                    {/* Element Details Route */}
                    <Route
                        path="element/:symbol"
                        element={<ElementDetails />}
                    />

                    {/* Future Routes */}
                    {/* <Route path="about" element={<About />} /> */}
                    {/* <Route path="contact" element={<Contact />} /> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}