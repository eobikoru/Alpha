import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { useAccount } from "wagmi";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function useConnected() {
  const { isConnected } = useAccount();
  return isConnected;
}