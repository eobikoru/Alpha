import { getDefaultConfig } from "@rainbow-me/rainbowkit";
<<<<<<< HEAD
import { liskSepolia } from "viem/chains";
import {
  baseSepolia,
} from "wagmi/chains";
=======
import { kairos } from "viem/chains";

>>>>>>> bad140314a6e2c7bde53787902c16ab5283959f0
const config = getDefaultConfig({
  appName: "Alpha",
  projectId: "YOUR_PROJECT_ID",
<<<<<<< HEAD
  chains: [liskSepolia,baseSepolia],
=======
  chains: [kairos],
>>>>>>> bad140314a6e2c7bde53787902c16ab5283959f0
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export default config;
