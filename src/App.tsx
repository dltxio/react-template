import React from "react";
import { SWRConfig } from "swr";
import { Navbar } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import { Buffer } from "buffer";
import api from "./apis/api";
import { AxiosError, AxiosResponse } from "axios";

window.Buffer = Buffer;

const swrConfig = {
  fetcher: (url: string): Promise<AxiosResponse | AxiosError> =>
    api.fetch.get(url).then((res) => res.data),
  shouldRetryOnError: false
};

export const App = () => {
  return (
    <SWRConfig value={swrConfig}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </SWRConfig>
  );
};
