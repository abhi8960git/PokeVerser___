import React, { useState, useEffect } from "react";
import Image from "next/image";
import pokemon from "../public/20048-2-pikachu-hd.png";
import Button from "./Button";
import { useRouter } from "next/router";
import Loader from "./Loader";

interface Text {
  text: string;
}

const Card = (props: any) => {
  var { text, image } = props;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      if (text === "Enter in AR") {
        // router.push("/vrnft");
        window.location.href= 'https://dapp-thon-seven.vercel.app'
      } else {
        router.push("./game");
      }
    }, 1000);
  };

  useEffect(
    (): ReturnType<React.EffectCallback> => {
      const handleRouteChangeStart = () => {
        setLoading(true);
      };

      const handleRouteChangeComplete = () => {
        setLoading(false);
      };

      router.events.on("routeChangeStart", handleRouteChangeStart);
      router.events.on("routeChangeComplete", handleRouteChangeComplete);

      return () => {
        router.events.off("routeChangeStart", handleRouteChangeStart);
        router.events.off("routeChangeComplete", handleRouteChangeComplete);
      };
    },
    [router]
  );

  return (
    <>
      <div className="border-2 border-white mt-[90px] w-[100px] h-[100px]   md:w-[350px] md:h-[350px] rounded-full flex items-center justify-center shadow image-animation  ">
        <Image width={900} src={image} alt="pikachu" className="p-2 " />
      </div>
      <Button text={text} onClick={handleClick} />
    
    </>
  );
};

export default Card;
