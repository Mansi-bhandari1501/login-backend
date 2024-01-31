import './App.css';
import Login from './login';
import Signup from './sign-up';
import { Routes,Route } from "react-router-dom";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/react-toastify.css';
function App() {
  return (
    <div className="App">
     <Routes>
      
      {/* <Route path='/' element={<Section1 />}/> */}
      <Route path='/' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
{/* <ToastContainer /> */}

     </Routes>
  
    </div>
  );
}

export default App;
