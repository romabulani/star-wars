import React from "react";
import "./App.css";
import Header from "./components/molecules/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/atoms/Footer";
import ScrollToTop from "./components/atoms/ScrollToTop";

function App() {
  return (
    <div className="flex flex-col max-w-[1024px] mx-auto">
      <ScrollToTop />
      <Header />
      <div className="min-h-[calc(100vh-130px)] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
