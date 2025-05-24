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
ArtNFT Contract Deployed at 0x779AAD155d53890D11a103340b248F1d25b55831
CreatorToken Contract Deployed at 0x9E54C0397C7FE2324E18D4A6fbfb9F8607b622C7
Verifying contracts...
verifying contract ...
Successfully submitted source code for contract
contracts/ArtNFT.sol:ArtNFT at 0x779AAD155d53890D11a103340b248F1d25b55831
for verification on the block explorer. Waiting for verification result...




*/
