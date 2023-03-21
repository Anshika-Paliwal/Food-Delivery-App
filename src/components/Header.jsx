import React, { useState } from 'react'
import Logo from '../img/logo.png'
import Avatar from '../img/avatar.png'
import { HiShoppingCart } from 'react-icons/hi'
import { MdAdd, MdLogout } from 'react-icons/md'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'


const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user }, dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false);

    const login = async () => {
        // We get all the login data from stateContext
        if (!user) {
            const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));
        }
        else {
            setIsMenu(!isMenu);
        }
    };

    // Update stateprovider, local storage and hide the menu
    const logout = () => {
        setIsMenu(false);
        localStorage.clear();

        dispatch({
            type: actionType.SET_USER,
            user: null
        });
    };

    return (
        <header className="fixed bg-primary drop-shadow-lg z-50 w-screen p-3 px-4 md:p-5 md:px-16">

            {/* For desktop and Tablets View */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={'/'} className="flex items-center gap-2">
                    <img src={Logo} className="w-14 object-cover rounded-full" alt="logo"></img>
                    <p className="text-headingColor text-xl font-bold">Food Mart</p>
                </Link>

                <div className="flex items-center gap-8">
                    <motion.ul initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-8">
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Home
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Menu
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            About Us
                        </li>
                        <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            Service
                        </li>
                    </motion.ul>

                    <div className="relative flex items-center justify-center">
                        <HiShoppingCart className="text-textColor text-2xl cursor-pointer" />
                        <div className="absolute -top-1 -right-4 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold"></p>
                        </div>
                    </div>

                    <div className="ralative">
                        <motion.img
                            whileTap={{ scale: 0.6 }}
                            src={user ? user.photoURL : Avatar}
                            className="w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
                            alt="userprofile" referrerPolicy="no-referrer"
                            onClick={login} />

                        {
                            isMenu && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-20 right-4">
                                    {user && user.email === "paliwal.anshika2028@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duratio-100 ease-in-out text-textColor text-base" onClick={() => setIsMenu(false)}>
                                                New Item <MdAdd />
                                            </p>
                                        </Link>
                                    )}
                                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duratio-100 ease-in-out text-textColor text-base first-letter"
                                     onClick={logout}>
                                        Logout <MdLogout />
                                    </p>
                                </motion.div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* For Mobile View */}
            <div className="flex items-center justify-between md:hidden w-full h-full">
                <div className="relative flex items-center justify-center">
                        <HiShoppingCart className="text-textColor text-2xl cursor-pointer" />
                        <div className="absolute -top-1 -right-4 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold"></p>
                        </div>
                    </div>

                    <Link to={'/'} className="flex items-center gap-2">
                    <img src={Logo} className="w-14 object-cover rounded-full" alt="logo"></img>
                    <p className="text-headingColor text-xl font-bold">Food Mart</p>
                </Link>

                <div className="ralative">
                    <motion.img
                        whileTap={{ scale: 0.6 }}
                        src={user ? user.photoURL : Avatar}
                        className="w-10 h-10 min-w-[40px] min-h-[40px] drop-shadow-2xl cursor-pointer rounded-full"
                        alt="userprofile" referrerPolicy="no-referrer"
                        onClick={login} />

                    {
                        isMenu && (
                            <div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-20 right-4">
                                {user && user.email === "paliwal.anshika2028@gmail.com" && (
                                    <Link to={"/createContainer"}>
                                        <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all 
                                        duratio-100 ease-in-out text-textColor text-base" onClick={() => setIsMenu(false)}>
                                            New Item <MdAdd />
                                        </p>
                                    </Link>
                                )}

                                <ul className="flex flex-col">
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all 
                                    ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={() => setIsMenu(false)}>
                                        Home
                                    </li>
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all 
                                    ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={() => setIsMenu(false)}>
                                        Menu
                                    </li>
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all 
                                    ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={() => setIsMenu(false)}>
                                        About Us
                                    </li>
                                    <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all 
                                    ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2" onClick={() => setIsMenu(false)}>
                                        Service
                                    </li>
                                </ul>

                                <p className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-slate-200 gap-3 cursor-pointer hover:bg-slate-300 transition-all duratio-100 ease-in-out text-textColor text-base first-letter" 
                                 onClick={logout}>
                                    Logout <MdLogout />
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    )
}

export default Header