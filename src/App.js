// C:\Users\Developer\Desktop\Greeks Force\mobileproject\src\App.js
import './App.css';
import Navbar from './Components/Navbar';
import RoutineCard from './Components/RoutineCard';
// import SearchContainer from './Components/Search';
import TaskList from './Components/taskList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <RoutineCard />
      {/* <SearchContainer /> */}
      <TaskList />
    </div>
  );
}

export default App;
