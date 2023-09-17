import PokeSlider from '@/components/PokeSlider'
import React from 'react'

const game = () => {
  return (
    <div className="flex justify-center flex-col items-center h-full mt-[50px] py-7">
    <div className="glassmorphism w-[90%] md:w-[70%] flex justify-center items-center py-4 my-7 tracking-[3px] text-[15px] md:text-[40px] text-yellow-200 font "> Get your Character NFT</div>
  <div className="glassmorphism  w-[90%] md:w-[70%] flex justify-center items-center py-[90px]">
    <div className="w-[600px] flex justify-center flex-col">
     <PokeSlider/>
    </div>
  </div>
</div>


  )
}

export default game