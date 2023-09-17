// @ts-nocheck
import Button from "@/components/Button";
import Card from "@/components/Card";
import { Inter } from "next/font/google";
import { useState, useEffect, use } from "react";
import pokemon from "../public/20048-2-pikachu-hd.png";
import dragon from "../public/png-image.png";
import Web3 from "web3";
import axios from "axios";
import { ethers } from "ethers";
import ABI from "../public/ABI.json";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [account, setAccount] = useState([]);
  const [nfts, setNfts] = useState(0);
  const [is , setIs] = useState(false);
  console.log(account);
  console.log(nfts);

  // connect wallet function

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum != "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        console.log("these are accounts", accounts);
        setAccount(accounts);
      }
    } catch (error) {
      console.log("error", error);
    }

    setTimeout(async () => {
      var res = await getNFT(account[0]);
      console.log(res);
      setIs(true);
    }, 2000);

  };

  // is wallet connect function

  const isWalletConnected = () => {
    if (account.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  function trimAndEllipsis(inputString: string) {
    if (inputString.length <= 13) {
      return inputString;
    } else {
      const halfLength = Math.floor(13 / 2);
      const start = inputString.slice(0, halfLength);
      const end = inputString.slice(-halfLength);
      return start + "..." + end;
    }
  }

  function showAlertWithDelay() {
    // Set the delay for showing the alert (2 seconds)
    const delayInSeconds = 2;
    const delayInMilliseconds = delayInSeconds * 1000;

    // Show the alert after the delay
    const alertTimeout = setTimeout(() => {
      alert("This is an alert!");
    }, delayInMilliseconds);

    // Set the duration for how long the alert should be displayed (2 minutes)
    const alertDurationInMilliseconds = 2 * 60 * 1000;

    // Automatically close the alert after the specified duration
    const closeTimeout = setTimeout(() => {
      // Close the alert (you can customize this part)
      alert("Alert will now close.");
      // Clear the alertTimeout to prevent the alert from showing (if it hasn't already)
      clearTimeout(alertTimeout);
    }, alertDurationInMilliseconds);
  }

  // const getNFTs = async (account:any) => {
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/members', {
  //       from: account,
  //     });

  //     if (response.status === 200) {
  //       console.log(response);
  //       setNfts(response.data.nfts);
  //     } else {
  //       // Handle the error case here
  //       console.error('Error:', response.statusText);
  //     }

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }

  // };

  const ContractAddress = "0x3886C79715E975B9EB5adB46f9Ee068DFFa5a7C5";

  let ethereum: any;
  if (typeof window !== "undefined") {
    ethereum = (window as any).ethereum;
  }

  const getNFT = async (account: any) => {
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
    console.log(contract);
    const tx = await contract.balanceOf(accounts[0]);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setNfts(Number(tx));
  };

  return (
    <div className={`flex flex-col justify-center  items-center gap-10 mb-4`}>
      <div className="glassmorphism  p-3 flex items-center justify-between w-[95%] md:w-[80%] px-3 md:px-10  mt-10 ">
        <p className="font  text-2xl  md:text-4xl text-yellow-300 ">
          PokeVerse
        </p>
        <button className="button" onClick={connectWallet}>
          {isWalletConnected() ? (
            <p>{trimAndEllipsis(account[0])}</p>
          ) : (
            "Connect Wallet"
          )}
        </button>
      </div>

      <div
        className={` flex flex-col  lg:flex-row gap-4 w-[95%] md:w-[80%]`}
      >
        <div
          className={` ${
            account.length > 0 && nfts == 0 
              ? ""
              : "blur-[2px] pointer-events-none"
          } lg:w-[40%] glassmorphism border-2 border-red-500 p-6 relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[700px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]`}
        >
          <p className="font text-sm md:text-xl tracking-[7px] text-white mt-3 mb-0">
            Customize NFT with AR{" "}
          </p>
          <Card text={"Enter in AR"} image={pokemon} />
        </div>



        <div
          className={` ${
            account.length > 0 && nfts != 0 && is
              ? ""
              : "blur-[2px] pointer-events-none"
          } lg:w-[60%]  glassmorphism border-2 border-red-500 p-6 relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[700px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]`}
        >
          <p className="font text-sm md:text-xl tracking-[7px] text-white  ">
            Enter in Pokemon Game{" "}
          </p>
          <Card text={"Enter in Game"} image={dragon} />
        </div>
      </div>
    </div>
  );
}
