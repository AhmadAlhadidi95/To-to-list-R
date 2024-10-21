import { createContext, useContext, useReducer } from "react";
import { reducerToDo } from "../reducers/ReducerToDo";

export const TheToDo = createContext([]);

export const ToDoProvider = ({children}) => {

    const [toDos, dispatch] = useReducer(reducerToDo, []);

    return (
        <TheToDo.Provider value={{toDos, dispatch}}>
            {children}
        </TheToDo.Provider>
    );

};

export const useToDo = () => {
    return useContext(TheToDo);
};