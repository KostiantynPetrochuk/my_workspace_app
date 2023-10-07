import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import App from "./App.jsx";
import theme from "./theme";
import store from "./app/store.js";
import Loading from "./components/Loading.jsx";
import Message from "./components/Message.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <Loading />
          <Message />
          <Routes>
            <Route path="/*" element={<App />} />
          </Routes>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
