import logo from './logo.svg';
import Navbaar from './components/header/Navbaar';
import Newnav from './components/Newnavbaar/Newnav';
import Maincomp from './components/home/Maincomp';
import Footer from './components/footer/Footer';
import SignUp from './components/signup_sigin/SignUp';
import Sign_in from './components/signup_sigin/Sign_in';
import {Routes,Route} from "react-router-dom";
import Cart from './components/cart/Cart';
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import {useState,useEffect} from 'react';
import './App.css';

function App() {

  const [data,setData] = useState(false);


  useEffect(()=>{
    setTimeout(()=>{
      setData(true)
    },2000)
  },[])

  return (

    



    <>

    {
      data ? (
        <>
        <Navbaar/>
      <Newnav/>
      <Routes>
        <Route path='/' element={<Maincomp/>} />
        <Route path='/login' element={<Sign_in/>} />
        <Route path='/register' element={<SignUp/>} />
        <Route path='/getproductsone/:id' element={<Cart/>} />
        <Route path='/buynow' element={<Buynow/>} />
      </Routes>
      <Footer/>
        </>
      ) : (
        <div className='circle'>
          <CircularProgress/>
          <h2>Loading...</h2>
        </div>
      )
    }



      
    </>
  );
}

export default App;
