import "./TaskBox.css";
import "./Model.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useToDo } from "./contexts/TheToDo";
import { useContext, useState, useEffect, useRef } from "react";
import { useToast } from "./contexts/TheToast";

export function TaskBox({obj, indexOfTask}) {

    // const {theToDo, setTheToDo} = useContext(TheToDo);
    const {toDos, dispatch} = useToDo();

    const {showOrHideFunc} = useToast();

    const [updateTheToDo, setUpdateTheToDo] = useState({title: obj.title, desc: obj.desc});
    const [theDeleteModel, setTheDeleteModel] = useState(false);
    const [theUpdateModel, setTheUpdateModel] = useState(false);

    const elementRef = useRef();

    function handleCheck() {

        // let theCheck = theToDo.map((check, id) => {
        //     if (id === indexOfTask) {
        //         check.isCompleted = !check.isCompleted;
        //     };

        //     check.isCompleted ? showOrHideFunc("تم إنجاز المهمة") : showOrHideFunc("لم يتم إنجاز المهمة بعد");

        //     return check;
        // });

        // setTheToDo (theCheck);

        // localStorage.setItem("MyToDo", JSON.stringify(theCheck));

        dispatch({type: "checkToggle", payload: indexOfTask});

        !toDos[indexOfTask].isCompleted ? showOrHideFunc("تم إنجاز المهمة") : showOrHideFunc("لم يتم إنجاز المهمة بعد");
        
    };

    function handleShowDeleteModel() {

        setTheDeleteModel(true);
        
    };
    function handleCloseDeleteModel() {

        setTheDeleteModel(false);
        
    };
    function handleDelete() {
        
        // let updateTheDelete = theToDo.filter((del, id) => {
        //     // if (id == indexOfTask) {
        //     //     return false
        //     // } else {
        //     //     return true
        //     // }
        //     return id != indexOfTask; // اختصار لما سبق
        // });

        // setTheToDo(updateTheDelete);

        // localStorage.setItem("MyToDo", JSON.stringify(updateTheDelete));

        dispatch({type: "delete", payload: indexOfTask});
        
        handleCloseDeleteModel();

        showOrHideFunc("تم الحذف بنجاح");

    };

    function handleShowUpdateModel() {

        setTheUpdateModel(true);
        
    };
    function handleCloseUpdateModel() {

        setTheUpdateModel(false);
        
    };
    function handleUpdate() {

        // let updates = theToDo.map((toDo, i) => {
        //     if (i === indexOfTask) {
        //         return {...toDo, title: updateTheToDo.title, desc: updateTheToDo.desc};
        //     } else {
        //         return toDo;
        //     }
        // });

        // setTheToDo(updates);

        // localStorage.setItem("MyToDo", JSON.stringify(updates));

        dispatch({type: "update", payload: {updateTheToDo, indexOfTask}})

        handleCloseUpdateModel();

        showOrHideFunc("تم التعديل/الإضافة بنجاح");

    };

    useEffect(() => {

        function handler(event) {
            if (elementRef.current && !elementRef.current.contains(event.target)) {
                handleCloseDeleteModel();
                handleCloseUpdateModel();
            };
        };

        document.addEventListener("mousedown", handler);

    }, []);

    return (
        <>
            {theDeleteModel ? (
                <div className="model">
                    <div className="box-of-model" ref={elementRef}>
                        <p>هل أنت متأكد من حذف هذه المهمة؟</p>
        
                        <button onClick={handleDelete}>نعم متأكد</button>
                        <button onClick={handleCloseDeleteModel}>لا</button>
                    </div>
                </div>
            ) : (null)}

            {theUpdateModel ? (
                <div className="model">
                    <div className="box-of-model" ref={elementRef}>
                        <p>قم بتعديل المهمة أو أضف بعض التفاصيل عليها</p>

                        <form>
                            <input placeholder="العنوان" value={updateTheToDo.title} onChange={(e) => {
                                setUpdateTheToDo({...updateTheToDo, title: e.target.value});
                            }}/>
                            <input placeholder="التفاصيل" value={updateTheToDo.desc} onChange={(e) => {
                                setUpdateTheToDo({...updateTheToDo, desc: e.target.value});
                            }}/>
                        </form>
        
                        <button onClick={handleUpdate}>قم بالتعديل</button>
                        <button onClick={handleCloseUpdateModel}>لا</button>
                    </div>
                </div>
            ) : (null)}
            
            <div className="task-box">
                <div className="left">
                    <span className="delete" title="Delete the task" onClick={handleShowDeleteModel}> <FontAwesomeIcon icon={faTrash} /></span>
                    <span className="edit" title="Edit the task" onClick={handleShowUpdateModel}> <FontAwesomeIcon icon={faEdit} /></span>
                    <span className="check" title="Complete the task" onClick={handleCheck} style={obj.isCompleted ? {backgroundColor: "#006e5a"} : null}> <FontAwesomeIcon icon={faCheck} /></span>
                </div>

                <div className="right">
                    <strong style={obj.isCompleted ? {textDecoration: "line-through"} : null}>{obj.title}</strong>
                    <p style={obj.isCompleted ? {textDecoration: "line-through"} : null}>{obj.desc}</p>
                </div>
            </div>
        </>
    );
    
}