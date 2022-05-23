import logo from './logo.svg';
import './App.css';
import {
  useNavigate ,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
 
import Loading from '../src/screens/Loading';

 
import  PhoneLogin from './screens/Mainscreen';
import HomePage from './screens/HomePage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      

 
          
          <Route path="/" element={<Loading />} />
          <Route path="/Mainscreen" element={<PhoneLogin />} />
          <Route path="/Home" element={<HomePage />} />
         
         
    </Routes>
  </BrowserRouter>
  );
}

export default App;
