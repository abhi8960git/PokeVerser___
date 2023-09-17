import React from 'react'
import nft from '../public/png-image.png'
import Image from 'next/image'
import Web3 from 'web3'
import { ethers } from 'ethers'
import ABI from '../public/CharacterABI.json';
const PokeCard = () => {


  const ContractAddress = "0xE2e6F76502383e4Dac87b27A62D461c9063E1D09";

  let ethereum: any;
  if (typeof window !== "undefined") {
    ethereum = (window as any).ethereum;
  }


  const MintNFT= async()=>{
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

    window.location.href= 'https://dapp-thon-ta9c.vercel.app/'
    await tx.wait()

  }


  return (
   
    <div className="  glassmorphism mx-[14px] my-[14px] ">
    <div className="flex flex-col items-center m-6 text-white font tracking-[3px]">
      <p>Charizard</p>
      <div className="h-[2px] w-full bg-white my-3"></div>
     <Image src={nft} alt="nft_card_Image"></Image>
      <div className="h-[2px] w-full bg-white my-3 font tracking-[3px] "></div>
   <p className='text-sm'>0xE2e6..63E1D09</p>

   <div className='glassmorphism p-3 px-6 mt-3 text-md  shadow-lg hover:animate-pulse'>
    <button className='tracking-[3px]' onClick={MintNFT}>Get NFT</button>

   </div>
     </div>
   </div>
  )
}

export default PokeCard