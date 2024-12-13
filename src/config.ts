import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { liskSepolia } from "viem/chains";

const config = getDefaultConfig({
  appName: "Cre8ify",
  projectId: "YOUR_PROJECT_ID",
  chains: [liskSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;
