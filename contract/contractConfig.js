import { createPublicClient, http } from "viem";
import { polygon,sepolia, } from "viem/chains";
import { abi } from "../abi/abi.json";


export const CONTRACT_ADDRESS = "0xD5d1f49dACf70b30f27d36BF2cE66A464b2b5e3";

export const client = createPublicClient({
  chain: sepolia, 
  transport: http(),
});

export const contractConfig = {
  address: CONTRACT_ADDRESS,
  abi: abi,
};
