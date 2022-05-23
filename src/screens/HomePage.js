/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import {authentication,database} from '../firebase.js'
import {getDatabase, ref, set , onValue, child, get, push, update  } from "firebase/database";
import { useState } from 'react';
import { useEffect } from 'react';
function HomePage(props) {

    const [Data,setData] = useState([]);

    useEffect(()=>{

        setInterval(() => {
            FetchData();
           }, 1000)

    },[])
    const [key,setKey]=useState();
    const FetchData = () =>{
         console.log("hiii")
      
         const starCountRef = ref(database, 'BankAcounts/'+props.presentUser.uid);
                onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                let keys =Object.keys(data)
                console.log(data);
                console.log(keys)
                setKey(keys[0]);
                setData(data[keys[0]])
                });
      }

     const User = authentication.currentUser 
  return (
  /*  <div>
    <h1>User Id</h1> 
    <h1>First Name:- {Data.FirstName}</h1>
    <h1>Last Name:- {Data.LastName}</h1>
    <h1>Pphone number:- {Data.MobileNumber}</h1>
    <h1>{props.presentUser.uid}</h1> 
    
    </div>*/
    <Deatils Name={Data.FirstName} LastName={Data.LastName} number={Data.MobileNumber} userid={props.presentUser.uid} k={key}/>

  )
}

function Deatils(props){

    const [value, setValue] =useState('Country');



    const [Name,setName] = useState(props.Name);
    const [LastName,setLastName] = useState(props.LastName);
    const [Number,setNumber] = useState("");
  const [FatherName,setFatherName] =useState("");
    const [Country,setCountry] = useState("India");
    const [State,setStatee] = useState("Andhra Pradesh");
    const [Village,setVillage] = useState("");

    const [ZipCode,setZipCode] = useState("");
    const [CurrentAddress,setCurrentAddress] = useState("India");
    const [CurrentState,setCurrentState] = useState("Andhra Pradesh");

    const [CurrentVillage,setCurrentVillage] = useState("");
    const [CurrentZipCode,setCurrentZipCode] = useState("");
    const [Phonenumber,setPhonenumber] = useState(props.number);
    const [DateOfBirth,setDateOfBirth] = useState("");

    const handleChange = (event) => {
         setCountry(event.target.value);
      };



      const AddDetails=()=>{
        const db = getDatabase();
         update(ref(db, 'BankAcounts/'+props.userid+"/"+props.k), {
         FirstName:  Name,
         LastName:LastName,
         MobileNumber:Phonenumber,
         FatherName:FatherName,
         presentCountry:Country,
        PresentState:State,
        PresentVillage:Village,
        PresentZipCode:ZipCode,
        CurrentCountry:CurrentAddress,
        CurrentState:CurrentState,
        CurrentVillage:CurrentVillage,
        CurrentZipCode:CurrentZipCode,
        PhoneNumber:Phonenumber,
        DateOfBirth:DateOfBirth,
         
       });
      
      }



        const [Data,setData] = useState([]);

    useEffect(()=>{

        setInterval(() => {
            FetchData();
           }, 1000)

    },[])
    const [key,setKey]=useState();
    const FetchData = () =>{
         console.log("hiii")
      
         const starCountRef = ref(database, 'BankAcounts/'+props.userid);
                onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                let keys =Object.keys(data)
                console.log(data);
                console.log(keys)
                setKey(keys[0]);
                setData(data[keys[0]])
                });
      }

    return(
        <div>
                <header id="bank_header" className='container'>
        <h1 id="bank_heading" class="text-center">Bank Details</h1>
        
        <button type="button" class="btn btn-danger" onClick={()=>authentication.signOut()}>Logout</button>
    </header>
     
    <div class="parent_form mt-5">
        <form class="container">
            <div class="form-row">
              <div class="form-group col-md-4">
                <label>First Name</label>
                <input type="text" class="form-control" placeholder="First Name" value={Name} onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Last Name</label>
                <input type="text" class="form-control" placeholder="Last Name" value={LastName} onChange={(e)=>setLastName(e.target.value)}/>
              </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Father's Name</label>
                <input type="text" class="form-control" placeholder="Father's Name" value={FatherName} onChange={(e)=> setFatherName(e.target.value)}/>
              </div>
            </div>
            <div class="form-row">
                <label>Perment address:</label>
            </div>
   
            <div class="form-row">
                <div class="form-group col-md-3">
                    
                    <div class="dropdown">
                        
                        <select value={Country} onChange={handleChange}>
          <option value="AP">India</option>
          <option value="USA">USA</option>
        
        </select>
                      </div>
                </div>
                
                <div class="form-group col-md-3">
                    <div class="dropdown">
                    <select value={State} onChange={(e)=>setStatee(e.target.value)}>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Telangana">Telangana</option>
        
        </select> 
                      </div>
                </div>
                <div class="form-group col-md-3">
                    <input type="text" class="form-control" placeholder="Enter your village" value={Village} onChange={(e)=>setVillage(e.target.value)}/>
                </div>
                <div class="form-group col-md-3">
                    <input type="text" class="form-control" placeholder="Zip code" value={ZipCode} onChange={(e)=>setZipCode(e.target.value)}/>
                </div>
            </div>
            
            <div class="form-row">
                <label>Current address:</label>
            </div>
            <div class="form-row">
                <div class="form-group col-md-3">
                    
                    <div class="dropdown">
                    <select value={CurrentAddress} onChange={(e)=>setCurrentAddress(e.target.value)}>
          <option value="AP">India</option>
          <option value="USA">USA</option>
        
        </select>
                      </div>
                </div>
                <div class="form-group col-md-3">
                    <div class="dropdown">
                    <select value={CurrentState} onChange={(e)=> setCurrentState(e.target.value)}>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
          <option value="Telangana">Telangana</option>
        
        </select> 
                      </div>
                </div>
                <div class="form-group col-md-3">
                    <input type="text" class="form-control" placeholder="Enter your village"  value={CurrentVillage} onChange={(e)=>setCurrentVillage(e.target.value)}/>
                </div>
                <div class="form-group col-md-3">
                    <input type="text" class="form-control" placeholder="Zip code"  value={CurrentZipCode} onChange={(e)=>setCurrentZipCode(e.target.value)}/>
                </div>
            </div>

            <div class="form-row">
                <div class="form-group col-md-6 text-center">
                    <label>Phone Number</label>
                    <input type="number" class="form-control"   value={Phonenumber} onChange={(e)=> setPhonenumber(e.target.value)}/>
                </div>
                <div class="form-group col-md-6 text-center">
                    <label>DOB</label>
                    <input type="date" class="form-control" value={DateOfBirth} onChange={(e)=> setDateOfBirth(e.target.value)}/>
                </div>
            </div>
            
           
          </form>
        <button class="btn btn-success" onClick={AddDetails}>Submit</button>
    </div>

    <div class="mt-5">
        <div class="card container">
            <div class="card-header text-center">
              Account Holder Details
            </div>
            <div class="card-body row">
              <h4 class="col-6">First Name</h4><h4 class="col-6">: {Data.FirstName}</h4>
              <h4 class="col-6">Last Name</h4><h4 class="col-6">:  {Data.LastName}</h4>
              <h4 class="col-6">Father's Name</h4><h4 class="col-6">: {Data.FatherName}</h4>
              <h4 class="col-6">Perment address</h4><h4 class="col-6">:{Data.PresentVillage},{Data.presentCountry},{Data.PresentState},{Data.PresentZipCode}</h4>
              <h4 class="col-6">Current address</h4><h4 class="col-6">:{Data.CurrentVillage},{Data.CurrentCountry},{Data.CurrentState},{Data.CurrentZipCode}</h4>
              <h4 class="col-6">Phone Number</h4><h4 class="col-6">: {Data.PhoneNumber}</h4>
              <h4 class="col-6">DOB</h4><h4 class="col-6">: {Data.DateOfBirth}</h4>
              <h4></h4>
            </div>
            <div class="card-footer text-muted text-center">
                Thank you
            </div>
          </div>
    </div>
        </div>
    )
}

export default HomePage;