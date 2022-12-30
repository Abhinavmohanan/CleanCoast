import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import { Collect } from './Components/Collect/Collect';
import Homepage from './Components/Homepage/Homepage';
import { Navbar } from './Components/Navbar/Navbar';
import { Report } from './Components/Report/Report';
import { AuthUserProvider } from './Context/AuthContext';

function App() {
  return (
   <>

  <AuthUserProvider>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/report" element={<Report/>}/>
    <Route path="/collect" element={<Collect/>}/>
  </Routes>
  </BrowserRouter>
  </AuthUserProvider>
   </>
  );
}

export default App;
