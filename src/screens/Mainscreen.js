/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React,{useState,useEffect} from 'react'




import { authentication ,database } from '../firebase';
import { RecaptchaVerifier , signInWithPhoneNumber} from "firebase/auth";

import {getDatabase, ref, set , onValue, child, get, push, update  } from "firebase/database";


import HomePage from './HomePage';
 
 
import App from './../App';





function Mainscreen() {

  const contrycode = "+91";
  const [Number,setNumber] =useState('+91');
  const [ExpandForm,setExpandForm] = useState(false);
  const [Otp,setOtp] = useState("");
  const [Name,setName] =useState("");
  const [LastName,setLastName] =useState("");

  const generateRecaptcha = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("prepared phone auth process",response);
      }
    }, authentication);
    

  }

const requestOtp=(e)=>{
    e.preventDefault();
    if(Number.length>=10){
      setExpandForm(true);
      generateRecaptcha()
      let appVerifier = window.recaptchaVerifier;
 
      signInWithPhoneNumber(authentication, Number, appVerifier)
          .then((confirmationResult) => {
        
            window.confirmationResult = confirmationResult;
            // ...
          }).catch((error) => {
           console.log(error)
          });
    }
}

  const verifyotp=(e)=>{
    

    if(Otp.length===6){

      let confirmationResult = window.confirmationResult;

      confirmationResult.confirm(Otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user)

        
          const db = getDatabase();
           push(ref(db, 'BankAcounts/'+user.uid), {
            FirstName:  Name,
            LastName:LastName,
            MobileNumber:Number,
            
          });
         
        
          
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
      });

    }

  }
  const [Screen,setScreen] =useState(0);

  return (
   <div>
      <header class="header_">
    <h1 class="heading_ container">Login Form</h1>
  </header>
 
  {Screen===0?

    <div class="form_div">
     <form onSubmit={requestOtp}>
      <input type="text" placeholder="First Name" required value={Name} onChange={(e)=>setName(e.target.value)}/>
      <input type="text" placeholder="Last Name" required value={LastName} onChange={(e)=>setLastName(e.target.value)}/>
      <input type="text" placeholder="Phone Number" required value={Number} onChange={(e)=>setNumber(e.target.value)}/>
     
     
     {ExpandForm===false?
     
                <button class="btn btn-success">request OTP</button>
            : <>

              <input type="number" placeholder="Enter OTP" required value={Otp} onChange={(e)=>setOtp(e.target.value)}/>
               
          
              </>
      
  }
<div id="sign-in-button"></div>
</form>
    <button onClick={()=>setScreen(1)}>Already have an Acount</button>
  </div>:
  <>
  <Signin/>
  <button onClick={()=>setScreen(0)}>Create a new Acount</button>

  </>
   
    


  } 


   
 
  <button class="btn btn-success" onClick={verifyotp}>submit</button>
   </div>
   
 
  );

}

function Signin(props) {

  const contrycode = "+91";
  const [Number,setNumber] =useState('+917993031882');
  const [ExpandForm,setExpandForm] = useState(false);
  const [Otp,setOtp] = useState("");
  
 
  const generateRecaptcha = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("prepared phone auth process",response);
      }
    }, authentication);
    

  }

const requestOtp=(e)=>{
    e.preventDefault();
    if(Number.length>=10){
      setExpandForm(true);
      generateRecaptcha()
      let appVerifier = window.recaptchaVerifier;
 
      signInWithPhoneNumber(authentication, Number, appVerifier)
          .then((confirmationResult) => {
        
            window.confirmationResult = confirmationResult;
            // ...
          }).catch((error) => {
           console.log(error)
          });
    }
}

  const verifyotp=(e)=>{
    

    if(Otp.length===6){

      let confirmationResult = window.confirmationResult;

      confirmationResult.confirm(Otp).then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user)

        
          
          
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
      });

    }

  }

  return(
    <div class="form_div">
    <form onSubmit={requestOtp}>
      <input type="text" placeholder="Phone Number" required value={Number} onChange={(e)=>setNumber(e.target.value)}/>
    
    
    {ExpandForm===false?
    
               <button class="btn btn-success">request OTP</button>
           : <>

             <input type="number" placeholder="Enter OTP" required value={Otp} onChange={(e)=>setOtp(e.target.value)}/>
              
         
             </>
     
 }
<div id="sign-in-button"></div>
</form>
   <button class="btn btn-success" onClick={verifyotp}>submit</button>
 </div>
  )
  
}
const  PhoneLogin=()=>{
    const [presentUser,setPresentUser] = useState(null);
    var us=false;
    useEffect(()=>{
      authentication.onAuthStateChanged(user =>{
        if(user){
        setPresentUser( 
         user
    )
    us=true;
  
      }
      else{
        setPresentUser(null);
      }
      })
    },[])
     console.log(presentUser)
    return (
      <div>
        <center>
          {presentUser? <HomePage presentUser={presentUser}/> : <Mainscreen/> }
        </center>
      </div>
    )
  }
  
export default PhoneLogin;