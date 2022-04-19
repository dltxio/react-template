import React from "react";
import { SWRConfig } from "swr";
import { Navbar } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApiProvider } from "./providers/Api";
import Home from "./pages/Home";
import About from "./pages/About";
import { Buffer } from "buffer";

window.Buffer = Buffer;

export const App = () => {
  const swrConfig = {
    shouldRetryOnError: false
  };
  return (
    <SWRConfig value={swrConfig}>
      <ApiProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </SWRConfig>
  );
};
