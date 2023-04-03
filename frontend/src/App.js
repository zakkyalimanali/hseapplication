import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Layout from './components/Layout';
import Staff from './pages/Staff';
import Incident from './pages/Incident';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='staff' element={<Staff/>} />
            <Route path='incident' element={<Incident/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
