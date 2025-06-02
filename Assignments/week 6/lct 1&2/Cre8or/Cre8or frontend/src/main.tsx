import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { Providers } from "./providers.tsx";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </StrictMode>
);

/* 
export const ArtNFTAddress =
  "0x795939176C15C3c279A077960753d4e24bFC8EEa" as const;
export const CreatorTokenAddress =
  "0x69B2Ee0F323739320ac6dC377aDA750d15F95cD3" as const;

*/
