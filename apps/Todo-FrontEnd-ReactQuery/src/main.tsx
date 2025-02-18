import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ThemeProvider from "./context/themeContext/ThemeProvider.tsx";

import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/authContext/AuthProvider.tsx";
import "./index.css";
import { globalErrorHandler } from "./utils/globalErrorHandler.ts";
const store = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => globalErrorHandler(error),
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => globalErrorHandler(error),
  }),
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={store}>
        <ThemeProvider>
          <AuthProvider>
            <Toaster />
            <App />
          </AuthProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
