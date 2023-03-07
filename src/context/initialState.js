import { fetchUser } from '../utils/fetchLocalStorageData'

const userInfo = fetchUser();

// Defining initial states for user, foodItems...
export const initialState = {
    user: userInfo,
    foodItems: null,

}

