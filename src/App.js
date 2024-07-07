import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/navigation/NavigationBar';
import ExamList from './components/exam/ExamList';

function App() {
  return (
    <Router>
      <div>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<ExamList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

