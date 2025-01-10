
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import './App.css';
import ComponentUI from './ComponentUI';
import Form from './Form';
import TodoList from "./TodoList";
import WeatherComponents from "./WeatherApp/WeatherComponents";
import Quiz from "./QuizApp/Quiz";
import TypeGame from "./TypeTestApp/TypeGame";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
          <Link to="/component">Components</Link>
          </li>
          <li>
          <Link to="/form">Form</Link>
          </li>
          <li>
          <Link to="/todolist">To-Do List</Link>
          </li>
           <li>
          <Link to="/weatherApp">Weather App</Link>
          </li> 
           <li>
          <Link to="/quiz">Quiz</Link>
          </li> 
          <li>
          <Link to="/Typegame">TypeGame</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/component" element={<ComponentUI/>} />
        <Route path="/form" element={<Form />} />
        <Route path="/todolist" element={<TodoList />}/>
        <Route path="/weatherApp" element={<WeatherComponents/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/Typegame" element={<TypeGame/>}/>


      </Routes>
    </Router>
  );
}

export default App;
