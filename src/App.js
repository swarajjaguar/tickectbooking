
import Singup from './components/Signup';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Login from './components/Login'
import Homepage from './components/Homepage';
import Navbar from './components/Navbar';
import Profile from './components/profile';
import Protect from './components/Protect';
import Bookbus from './components/Bookbus';
import Busdetails from './components/Busdetails';



function App() {
  return (
    
      <BrowserRouter>
      <div className='App'>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Singup/>}></Route>
        <Route path="/LOG IN" element={<Login/>}></Route>
        <Route path="/homepage" element={<Protect Child={Homepage}/>}></Route>
        <Route path="/profile" element={<Protect Child={Profile}/>}></Route>
        <Route path="/bus" element={<Protect Child={Bookbus}/>}></Route>
        <Route path="/busdetails/:busid" element={<Protect Child={Busdetails}/>}></Route>
        


       
      </Routes>
      </div>
    
      
      </BrowserRouter>
      
     

   
  );
}

export default App;
