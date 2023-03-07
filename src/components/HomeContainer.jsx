import React from 'react'
import DeliveryBoy from '../img/delivery.png'
// import HeroBg from '../img/heroBg.png'
import { heroData } from '../utils/data.js'

const HomeContainer = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
            <div className="py-2 flex-1 flex flex-col items-start justify-start gap-5">
                <div className="flex items-center justify-center gap-2 bg-purple-300 px-4 py-1 rounded-full">
                    <p className="text-base text-purple-500 font-semibold">
                        Bike Delivery
                    </p>
                    <div className="w-8 h-8 rounded-full bg-white overflow-hidden shadow-xl">
                        <img src={DeliveryBoy} className="w-full h-full object-contain" alt="delivery-boy" />
                    </div>
                </div>

                <p className="text-[2rem] lg:text-[4rem] font-bold tracking-wide text-headingColor">
                    Get your food delivered in Minutes.
                </p>
                <p className=" text-base text-center text-textColor md:text-left md:w-[80%]">
                    Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from
                    45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden Sydney College
                    in Virginia, looked up one of the more obscure Latin words
                </p>
                <button type="button" className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg py-2 px-4 w-full md:w-auto transition-all ease-in-out duration-100 hover:shadow-lg">
                    Order Now
                </button>
            </div>
            <div className="py-2 flex flex-1 items-center relative">
                {/* <img
                    src={HeroBg}
                    className="h-420 ml-auto w-full lg:w-auto lg:h-685"
                    alt="hero-background" /> */}

                <div className="w-full h-full gap-4 flex-wrap drop-shadow-md left-0 top-0 flex items-center justify-center absolute py-4">
                    {heroData && heroData.map(n => (
                        <div key={n.id} className="w-150 lg:w-190 min-w-[190px] mt-8 p-4 items-center justify-center bg-cardOverlay rounded-2xl flex flex-col backdrop-blur-md">
                        <img src={n.imageSrc} className="w-20 lg:w-30 -mt-10 lg-mt-16" alt="Ice-Cream-I1" />
                        <p className="text-base lg:text-base lg:mt-4 mt-4 font-semibold text-textColor">
                            {n.name}
                        </p>
                        <p className="text-[12px] lg:text-sm px-2 my-1 lg:my-2 font-semibold text-lightTextGray">
                            {n.desc}
                        </p>
                        <p className="text-base font-semibold text-headingColor">
                            <span className="text-base text-red-600">₹</span>
                            {n.price} 
                        </p>
                    </div>
                    ))}
                </div>
            </div>

        </section>
    )
}

export default HomeContainer