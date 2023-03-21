import { React, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { CreateContainer, Header, MainContainer } from './components'
import { useStateValue } from './context/StateProvider'
import { getAllFoodItems } from './utils/firebaseFunctions'
import { actionType } from './context/reducer'

const App = () => {
  const [{}, dispatch] = useStateValue();
  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        fooItems: data,
      })
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <AnimatePresence mode='wait'>
    <Header />
      <div className="w-screen h-auto flex flex-col bg-primary items-center justify-center">
        
        {/* <main className="mt-16 w-full h-full box-border relative min-h-[calc(100vh-120px)]"> */}
          <main className="mt-16 md:mt-24 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
      </AnimatePresence>
    </>
  )
}

export default App