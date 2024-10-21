import './App.css';
import { ToDoProvider } from './contexts/TheToDo';
import { TheToastProvider } from './contexts/TheToast';
import { Container } from './Container';

function App() {
  return (
    <div className="App">
      <ToDoProvider>
        <TheToastProvider>
          <Container/>
        </TheToastProvider>
      </ToDoProvider>
    </div>
  );
}

export default App;
