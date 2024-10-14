import './App.css';
import { TheToDo } from './contexts/TheToDo';
import { TheToster } from './contexts/TheToster';
import { Container } from './Container';
import { Toster } from './Toster';
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
  const [tosterState, setTosterState] = useState(false);
  const [tosterMessage, setTosterMessage] = useState();

  function showOrHideFunc(writeMessage) {
    
    setTosterState(true);

    setTosterMessage(writeMessage);

    setTimeout(() =>  {
      setTosterState(false);
    }, 2000);

  };

  return (
    <div className="App">
      <TheToDo.Provider value={{theToDo, setTheToDo}}>
        <TheToster.Provider value={{showOrHideFunc}}>
          <Container/>

          {tosterState ? (<Toster message={tosterMessage}/>) : null}
        </TheToster.Provider>
      </TheToDo.Provider>
    </div>
  );
}

export default App;
