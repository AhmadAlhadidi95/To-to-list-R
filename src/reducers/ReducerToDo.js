export function reducerToDo(currentToDoState, action) {

    switch (action.type) {
        case "add": {
            let newTask = {
                title: action.payload.newTitle,
                desc: "",
                isCompleted: false,
            };
    
            let updateTask = [...currentToDoState, newTask];
            localStorage.setItem("MyToDo", JSON.stringify(updateTask));

            return updateTask;
        };

        case "delete": {
            let updateTheDelete = currentToDoState.filter((del, id) => {
                return id != action.payload;
            });
            
            localStorage.setItem("MyToDo", JSON.stringify(updateTheDelete));

            return updateTheDelete;
        };

        case "check": {
            
        };

        case "update": {
            let updates = currentToDoState.map((toDo, i) => {
                if (i === action.payload.indexOfTask) {
                    return {...toDo, title: action.payload.updateTheToDo.title, desc: action.payload.updateTheToDo.desc};
                } else {
                    return toDo;
                }
            });
    
            localStorage.setItem("MyToDo", JSON.stringify(updates));

            return updates;
        };

        case "checkToggle": {
            let theCheck = currentToDoState.map((check, id) => {
                if (id === action.payload) {
                    // check.isCompleted = !check.isCompleted; // This is wrong because it’s make mutation

                    let toggle = {...check, isCompleted: !check.isCompleted};

                    return toggle;
                };
    
                return check;
            });
    
            localStorage.setItem("MyToDo", JSON.stringify(theCheck));

            return theCheck;
        };

        case "get": {
            let storageToDo = JSON.parse(localStorage.getItem("MyToDo")) || [];

            return storageToDo;
        }

        default: {
            throw Error("Unknown action " + action.type);
        };
    }

}