import React from 'react'
import { useState, useStateValue } from 'react'
import { motion } from "framer-motion"
import { MdFastfood, MdCloudUpload, MdDelete, MdFoodBank } from "react-icons/md"
import { FaRupeeSign } from "react-icons/fa"
import { categories } from '../utils/data.js'
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "../firebase.config"
import { saveItem } from '../utils/firebaseFunctions.js'
import Loader from '../components/Loader'
import { actionType } from '../context/reducer'
import { getAllFoodItems } from '../utils/firebaseFunctions'

const CreateContainer = () => {
  const [{foodItems}, dispatch] = useStateValue();
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = (e) => {
    setIsLoading(true);
    // For single image
    const imageFile = e.target.files[0];
    // Creating storage reference 
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on('state_changed', (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    }, (error) => {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading Image: Try again 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 5000);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL);
        setFields(true);
        setIsLoading(false);
        setMsg("Image uploaded successfully!🎉");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false)
        }, 5000);
      })
    })
  }

  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image deleted successfully! 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false)
      }, 5000);
    })

  }

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if ((!imageAsset || !title || !calories || !price || !category)) {
        setFields(true);
        setMsg("Required fields must be filled. 🙇");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 5000);
      }
      else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        }
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully! 😊");
        clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false)
        }, 5000);
      }

    } catch (error) {
      console.log(error);
      setFields(true)
      setMsg("Error while saving Image: Try again 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 5000);
    }
    fetchData();
  }

  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select a Category");
  }

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        fooItems: data,
      })
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] flex flex-col items-center justify-center p-4 border border-gray-300 rounded-lg gap-4">
        {
          fields && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full p-2 rounded-lg text-center text-base font-semibold ${alertStatus === 'danger'
                ? 'bg-red-400 text-red-800'
                : 'bg-emerald-400 text-emerald-800'} `}>
              {msg}
            </motion.p>
          )}

        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-xl text-gray-600" />
          <input type="text" required value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Mention the title..."
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor" />
        </div>

        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full text-base border-b-2 border-bottom-200 p-2 rounded-md cursor-pointer border-none outline-none">
            <option value="others" className="bg-white">Select a Category</option>
            {categories && categories.map(item => (
              <option key={item.id} className="text-base border-0 outline-none capitalize bg-Gray text-headingColor" value={item.urlParamName}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="group items-center justify-center flex flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ?
            <Loader /> :
            <>
              {!imageAsset ?
                (
                  <>
                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2">
                        <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                        <p className="text-gray-500 hover:text-gray-700">
                          Click here to Upload...
                        </p>
                      </div>
                      <input type="file" name="uploadimage" accept="image/*" onChange={uploadImage} className="w-0 h-0" />
                    </label>
                  </>
                )
                :
                (
                  <>
                    <div className="relative h-full">
                      <img src={imageAsset} alt="Uploaded an Img" className="w-full h-full object-cover" />
                      <button type="button" className="absolute bottom-3 right-3 p-3 rounded-full bg-orange-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out"
                        onClick={deleteImage}>
                        <MdDelete className="text-white" />
                      </button>
                    </div>
                  </>
                )
              }
            </>
          }
        </div>

        <div className="w-full items-center flex flex-col md:flex-row gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input type="text" required value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Calories Count" className="w-full h-full text-textColor text-lg bg-transparent border-none outline-none placeholder:text-gray-400" />
          </div>
        </div>

        <div className="w-full items-center flex flex-col md:flex-row gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <FaRupeeSign className="text-gray-700 text-lg" />
            <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="w-full h-full text-textColor text-lg bg-transparent border-none outline-none placeholder:text-gray-400" />
          </div>
        </div>

        <div className="flex w-full items-center">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-green-500 px-12 py-2 rounded-lg text-lg yext-white font-semibold"
            onClick={saveDetails}>
            Save
          </button>
        </div>

      </div>
    </div>
  )
}

export default CreateContainer