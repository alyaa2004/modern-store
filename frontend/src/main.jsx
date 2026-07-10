import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// @ts-ignore
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import { BrowserRouter } from "react-router-dom";
function Root() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider 
// @ts-ignore
    value={colorMode}>
      <ThemeProvider 
// @ts-ignore
      theme={theme}>
        <CssBaseline />
<Provider store={store}>
  <AuthProvider>
    <SearchProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SearchProvider>
  </AuthProvider>
</Provider>
</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// @ts-ignore
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);