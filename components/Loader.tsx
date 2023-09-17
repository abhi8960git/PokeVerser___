import React from "react";
import Image from "next/image";
import loader from "../public/22-PM-unscreen(1).gif";
import { TypeAnimation } from "react-type-animation";
const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="lg:w-[50%] w-[80%] h-[400px] md:h-[500px] glassmorphism flex flex-col justify-center items-center  ">
        <Image src={loader} alt="loader"></Image>
        <TypeAnimation
        className="text-yellow-200 text-4xl font tracking-[5px] "
          sequence={[
            "Loading ", // Types 'One'
            1000, // Waits 1s
            "Loading .",
            1000,
            "Loading ..",
            1000,
            "Loading ...", // Deletes 'One' and types 'Two'
           
            () => {
              console.log("Sequence completed");
            },
          ]}
          wrapper="span"
          cursor={false}
          repeat={Infinity}
          style={{ fontSize: "2em", display: "inline-block" }}
        />
      </div>
    </div>
  );
};

export default Loader;
