import "./Container.css";
import "./Choices.css"
import { TaskBox } from "./TaskBox";
import { InputBox } from "./InputBox";
import { useState, useEffect, useMemo } from "react";
import { useToDo } from "./contexts/TheToDo";
import { useToast } from "./contexts/TheToast";

export function Container() {

    const {toDos, dispatch} = useToDo();

    const {showOrHideFunc} = useToast();
    const [theInput, setTheInput] = useState("");
    const [typeOfTask, setTypeOfTask] = useState("all");

    let toDosToBeRerended = typeOfTask;

    let completeToDos = useMemo(() => { // rerender تحفظ ما بداخلها، بمعنى لا يستدعي في كل useMemo ال

        return toDos.filter((toDo) => {
            return toDo.isCompleted;
        });

    }, [toDos]); // وهنا في داخل الأري نضع الشيء الذي يستدعى في حالة حدوثه

    let notCompleteToDos = useMemo(() => {

        return toDos.filter((toDo) => {
            return !toDo.isCompleted;
        });

    }, [toDos]);

    switch (true) {
        case (toDosToBeRerended === "complete"):
            toDosToBeRerended = completeToDos;
            break;
        case (toDosToBeRerended === "notComplete"):
            toDosToBeRerended = notCompleteToDos;
            break;
        default:
            toDosToBeRerended = toDos
            break;
    };
    
    let myToDoList = toDosToBeRerended.map((toDo, i) => {
        // return <TaskBox key={i} obj={toDo} receiveFun={
            
        //     function completeOrNot() {
        //         let updateTheCheck = theToDo.map((check, id) => {
        //             if (id == i) {
        //                 // if (check.isCompleted == true) {
        //                 //     check.isCompleted = false;
        //                 // } else {
        //                 //     check.isCompleted = true;
        //                 // }
        //                 check.isCompleted = !check.isCompleted; // والعكس كذلك false إلى true من boolen اختصار لما سبق لتحويل ال
        //             };

        //             return check;
        //         });

        //         setTheToDo(updateTheCheck);
        //     }

        // }/> هذا الكود الذي يعتمد على الأبروبس تم الإستغناء عنه بأستخدام الكونتستس
        
        return <TaskBox key={i} obj={toDo} indexOfTask={i}/>
    });

    useEffect(() => {

        // let storageToDo = JSON.parse(localStorage.getItem("MyToDo")) || []; // فأحضر أري فارغة localStorage في حال لا يوجد شيء في الل
        // setTheToDo(storageToDo);

        dispatch({type: "get"});
        
    }, []); // في حال تركت أقواس الأري فارغة فهي تعمل مرة واحدة عند فتح الصفحة، أما في حال وضع شيء في داخلهم فهي تعمل أثناء تغير ذلك الشيء فقط useEffect ال

    function inputTask(e) {
        setTheInput(e.target.value);
    };
    
    function addTask() {
        // let newTask = {
        //     title: theInput,
        //     desc: "",
        //     isCompleted: false,
        // };

        // let updateTask = [...theToDo, newTask];
        // setTheToDo(updateTask);

        // localStorage.setItem("MyToDo", JSON.stringify(updateTask));

        dispatch({type: "add", payload: {newTitle: theInput}});

        setTheInput("");
        showOrHideFunc("تم إضافة المهمة بنجاح");
    };

    // let storageToDo = JSON.parse(localStorage.getItem("MyToDo"));
    // setTheToDo(storageToDo) سيحدث خطأ لووب لانهائي setTheToDo بهذه الطريقة ووضعته في localStorage في حال جلبت ال

    return (
        <div className="container">
            <h1 style={{textAlign: "center", filter: "drop-shadow(rgb(0, 0, 0) -2px 2px 3px)"}}>مهامي</h1>
            
            <ul className={typeOfTask}>
                <li onClick={() => {setTypeOfTask("notComplete")}}>غير منجز</li>
                <li onClick={() => {setTypeOfTask("complete")}}>منجز</li>
                <li onClick={() => {setTypeOfTask("all")}}>الكل</li>
            </ul>
            
            {myToDoList}

            <InputBox handleButton={addTask} handleInput={inputTask} handleValue={theInput}/>
        </div>
    );
    
}