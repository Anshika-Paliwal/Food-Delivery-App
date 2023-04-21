import React from 'react'
import HomeContainer from './HomeContainer'


const MainContainer = () => {
  return (
    <div className="items-center justify-center flex flex-col w-full h-auto">
      <HomeContainer />

      <section className="w-full bg-red-500">
        <div className="w-full flex items-center justify-between">
          <p className="bg-white">Heullo</p>
        </div>
      </section>
    </div>
  )
}



export default MainContainer