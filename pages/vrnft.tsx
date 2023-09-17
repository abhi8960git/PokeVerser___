import React, { useState } from "react";
import Image from "next/image";
import logo from "../public/output-onlinegiftools.gif";
import metamask from "../public/metamask-seeklogo.com.svg";
import spheron from "../public/icon-spheron-network.png";
import link from "../public/output-onlinegiftools(1).gif";
import nft from "../public/png-image.png";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Router, { useRouter } from "next/router";

import Web3 from "web3";
import Dropzonee from "@/components/Dropzone";
import axios from "axios";
import {ethers} from 'ethers';
import ABI from "../public/ABI.json";

export default function App() {
  const router = useRouter();
  const [accounts, setAccounts] = useState([]);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  console.log("in_file_vrnft", file, name, description);
  const [ipfsLink, setIpfsLink] = useState(null);
  const [uploadState, setUploadState] = useState<
    "Uploading" | "Upload Failed" | "Uploaded" | "Upload"
  >("Upload");

  // wallet function

  // const connectWallet = async () => {
  //   if (window.ethereum) {
  //     try {
  //       await window.ethereum.request({ method: "eth_requestAccounts" });
  //       const web3 = new Web3(window.ethereum);
  //       const accounts = await web3.eth.getAccounts();
  //       setAccounts(accounts);
  //       console.log(accounts);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  const isWalletConnected = () => {
    return accounts.length > 0;
  };

  function trimString(str: any) {
    if (str.length > 9) {
      const center = Math.floor(str.length / 2);
      str = str.substring(0, center - 1) + "." + str.substring(center + 2);
    }
    return str;
  }

  // dropzone handle submit function



  // Function to handle changes in the Name input field
  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  // Function to handle changes in the Description input field
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };

  // Mint NFT part

  const ContractAddress = "0x3886C79715E975B9EB5adB46f9Ee068DFFa5a7C5";

  let ethereum: any;
  if (typeof window !== "undefined") {
    ethereum = (window as any).ethereum;
  }

  const mintNFT = async (link:any) => {
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

    if(link){
      const tx = await contract.awardItem(link);
      await tx.wait();
    }else{
      alert("Token URI is empty");
    }
    
  };

  // Mint NFT Function
  const MintNFT = async () => {
    if (!name || !description) {
      alert('Data is empty');
      return;
    }

    setLoading(true); // Set loading to true before making the API calls

    setTimeout(async () => {
      try {
        const jsonData = {
          image: file,
          name: name,
          description: description,
        };

        const response = await axios.post('https://abhishek3.onrender.com/upload/json', jsonData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log(response);

        const data = await axios.get('https://abhishek3.onrender.com/api/upload/json');
        console.log(data);
        setIpfsLink(data.data.url);

        mintNFT(ipfsLink);

        setLoading(false); // Set loading to false after the API calls are complete
      } catch (error) {
        console.error(error);
        setLoading(false); // Set loading to false if there's an error
      }
    }, 1000); // Introduce a 1-second delay before making the API calls
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex justify-center flex-col items-center h-full mt-[50px] py-7">
      <div className="glassmorphism w-[90%] md:w-[70%] flex justify-center items-center py-4 my-7 tracking-[3px] text-[18px] md:text-[40px] text-yellow-200 font ">
        {" "}
        Get Your NFT Here
      </div>
      <div className="glassmorphism w-[90%] md:w-[70%] flex justify-center items-center py-[90px]">
        <div className="w-[600px] flex justify-center flex-col">
          <div className="flex flex-col items-center mx-7 gap-4">
            { <Dropzonee setFile={setFile} />}

            <div className="form-item glassmorphism w-full mt-4">
              <input
                className="w-full"
                type="text"
                id="name"
                autoComplete="off"
                required
                value={name}
                onChange={handleNameChange}
              />
              <label>Name</label>
            </div>

            <div className="form-item glassmorphism w-full">
              <input
                className="w-full"
                type="text"
                id="description"
                autoComplete="off"
                required
                value={description}
                onChange={handleDescriptionChange}
              />
              <label>Description</label>
            </div>
          </div>
          <div className="mx-8 text-xl uppercase flex justify-evenly mt-7">
            <button
              className="flex text-white gap-2 glassmorphism p-3 button-mint "
              onClick={MintNFT}
            >
              MINT YOUR NFT
              {/* <Image width={30} src={spheron} alt="logo" /> */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
