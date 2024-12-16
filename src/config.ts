import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { liskSepolia } from "viem/chains";
import {
  baseSepolia,
} from "wagmi/chains";
const config = getDefaultConfig({
  appName: "Alpha",
  projectId: "YOUR_PROJECT_ID",
  chains: [liskSepolia,baseSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;
