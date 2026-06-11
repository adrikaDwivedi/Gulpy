import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEYS = {
    DAILY_GOAL : 'daily_goal',
    CURRENT_INTAKE : 'current_intake',
    WATER_LOGS : 'water_logs'
}

export const saveItem = async(key , value) =>{
    try {
        await AsyncStorage.setItem(
            key,
            JSON.stringify(value)
        );
    } catch (error) {
        console.log("Save Error: " , error);       
    }
};

export const getItem = async(key) =>{
    try {
        const value = await AsyncStorage.getItem(key);

        return value ? JSON.parse(value) : null;
    } catch (error) {
        console.log("Get Error: " , error);
        return null;
    }
}

export const removeItem = async(key) =>{
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log("Remove Error: " , error);        
    }
}