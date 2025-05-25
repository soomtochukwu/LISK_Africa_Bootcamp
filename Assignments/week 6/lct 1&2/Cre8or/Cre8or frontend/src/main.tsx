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
  "0x43c73E1a22130737a0bA4B8e0825Be3347F565Df" as const;
export const CreatorTokenAddress =
  "0x6a5264A88a46412771119c49137A18aAcCf2EA76" as const;

*/
