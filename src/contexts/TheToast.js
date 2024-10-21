import { Toast } from "../Toast";
import { createContext, useState, useContext } from "react";

const TheToast = createContext();

export const TheToastProvider = ({children}) => {

    const [toastState, setToastState] = useState(false);
    const [toastMessage, setToastMessage] = useState();

    function showOrHideFunc(writeMessage) {
    
        setToastState(true);
    
        setToastMessage(writeMessage);
    
        setTimeout(() =>  {
            setToastState(false);
        }, 2000);
        
    };

    return (
        <TheToast.Provider value={{showOrHideFunc}}>
            {children}
            {toastState ? (<Toast message={toastMessage}/>) : null}
        </TheToast.Provider>
    );

}

export const useToast = () => {
    return useContext(TheToast);
};