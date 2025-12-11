
import React, { useEffect, useState } from "react";
import FallingText from "./FallingText";
import catgif from '../../public/lovable-uploads/clemGettingStarted-cropped-oneLoop.gif'

const MadeByHumans = () => {
      const [showGif, setShowGif] = useState(false);
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setShowGif(true);
        }, 8000); // 3 seconds delay
    
        return () => clearTimeout(timer); // cleanup on unmount
      }, []);

  return <section id="made-by-humans" className="w-full bg-background py-0">
      <div className="section-container opacity-0 animate-on-scroll pb-0">

        {/* Removed the pulse-chip button/element that was here */}
        <div className="relative">
     {showGif &&  <div className="absolute z-50 -top-[71px] right-0"><img className="w-[150px]" src={catgif}/></div>}

        <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden relative mt-6 sm:mt-8">

          <div className="bg-no-repeat bg-cover bg-center p-4 sm:p-5 min-h-[250px] sm:min-h-[350px] flex flex-col justify-between" style={{
          backgroundImage: "url('/background-section3.png')"
        }}>
            <div className="flex items-center text-white">
              <img src="/venu-logo.png" alt="VENU Logo" className="h-5 sm:h-8 w-auto mr-3" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            
            <div style={{
            overflow: "hidden",
            maxHeight: "80px",
            marginTop: "40px"
          }}>
              <h2 style={{
              marginBottom: "-30px",
              padding: "0px 0px 100px"
            }} className="text-[50px] sm:text-5xl font-playfair text-white italic mt-0 mx-0 font-thin text-6xl md:text-7xl py-0 px-0 text-center lg:text-7xl">
                <FallingText text="Crafted by Venu" />
              </h2>
            </div>
            
            {/* Background box at the bottom with overflow */}
            <div className="w-[120%] bg-background h-10 rounded-t-lg absolute left-[-10%] bottom-0"></div>
          </div>
        </div>
        </div>
      </div>
    </section>;
};
export default MadeByHumans;
