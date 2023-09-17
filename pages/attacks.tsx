import PokeSlider from "@/components/PokeSlider";
import React from "react";
import Image from "next/image";
import img from "../public/charizard/4hsh(1).gif";
import attack from "../public/charizard/3nRA.gif";
import attack1 from "../public/charizard/Ybic.gif";
import Web3 from "web3";
import { ethers } from "ethers";
import ABI from "../public/AttackABI.json";
const game = () => {
  const ContractAddress = "0x307485Fb6C6d993EA3055A94a8111600b48F31aa";

  let ethereum: any;
  if (typeof window !== "undefined") {
    ethereum = (window as any).ethereum;
  }

  const MintNFT = async () => {
    const accounts = await ethereum?.request({ method: "eth_requestAccounts" });
    console.log(accounts);
    const provider = accounts?.[0]
      ? new ethers.providers.Web3Provider(ethereum)
      : new ethers.providers.JsonRpcProvider(process.env.NEXT_APP_RPC_URL);
    const wallet = accounts?.[0] ? null : ethers.Wallet.createRandom();
    const signer = provider.getSigner(
      accounts?.[0] ? undefined : wallet?.address
    );
    const contract = new ethers.Contract(ContractAddress, ABI, signer);
    const tx = await contract.awardItem();
    await tx.wait();
  };

  return (
    <div className="flex justify-center flex-col items-center h-full mt-[50px] py-7">
      <div className="glassmorphism w-[90%] md:w-[70%] flex justify-center items-center py-4 my-7 tracking-[3px] text-[15px] md:text-[40px] text-yellow-200 font ">
        {" "}
        Attacks Gallery
      </div>
      <div className="glassmorphism  w-[90%] md:w-[70%] flex justify-center items-center py-[90px]">
        <div className="w-[600px] flex items-center justify-center ">
          <div className="flex flex-col glassmorphism justify-center items-center p-10">
            <div className=" border border-yellow-200  ">
              <Image src={attack1} alt="charizard"></Image>
            </div>
            <div className=" text-yellow-200 my-4 w-full flex justify-between gap-[50px] border  border-yellow-200 py-2 px-1 border-l-0 border-r-0 ">
              <p>
                Attack
                <br />
                FIRE{" "}
              </p>
              <p>
                Damage <br /> 20HP
              </p>
            </div>
            <div className="  flex justify-center items-center">
              <button className="button-minti " onClick={MintNFT}>
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default game;
