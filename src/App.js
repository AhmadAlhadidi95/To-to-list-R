import './App.css';
import { TheToDo } from './contexts/TheToDo';
import { Container } from './Container';
import { useState } from "react";

let myToDo = [
  // {
  //     title: "قرأة كتاب",
  //     desc: "قرأة عشر صفحات",
  //     isCompleted: false,
  // },
  // {
  //     title: "أكل الفواكه",
  //     desc: "خمسة تين وإثنان تفاح",
  //     isCompleted: false,
  // },
];

function App() {

  const [theToDo, setTheToDo] = useState(myToDo);

  return (
    <div className="App">
      <TheToDo.Provider value={{theToDo, setTheToDo}}>
        <Container/>
      </TheToDo.Provider>
    </div>
  );
}

export default App;
