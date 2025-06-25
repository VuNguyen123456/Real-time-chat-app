import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg"
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";
function Login(){
    // Initializing the states
    const navigate = useNavigate();
    const [values, setValues] = useState({
      username: "",
      password: "",
    });
    // The validation notification
    const toastOption = {
      position: "bottom-left",
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    }

    useEffect(()=> {
          if(localStorage.getItem('chat-app-user')){
            navigate('/')
          }
    }, [])

    // When submit the form this is called
    const handleSubmit = async (event)=>{
        event.preventDefault();
        if(handleValidation()){
          console.log("in validation", loginRoute)
          const {password, username} = values;
          const {data} = await axios.post(loginRoute,{
            username,
            password,
          });
          if(data.status === false){
            toast.error(data.msg, toastOption)
          }
          if(data.status === true){
            localStorage.setItem('chat-app-user', JSON.stringify(data.user))
            navigate("/");
          }
        }
    };
    // Check is the 2 pass match up if not then notify them
    const handleValidation = ()=>{
      const {password, username} = values;
      if(password ===""){
        toast.error("Bruh we need your username and password.", toastOption);
        return false
      }
      else if (username.length === ""){
        toast.error("Bruh we need your username and password.", toastOption);
        return false
      }
      return true
    }
    // When the form changes this is called (every time you type in the input box)
    const handleChange = (event)=>{
      setValues({ ...values, [event.target.name]: event.target.value });
    };
    // The form html/css
    return (
        <>
            <FormContainer>
                <form onSubmit={(event)=> handleSubmit(event)}>
                    <div className = "brand">
                        <img src = {Logo} alt = "Logo"/>
                        <h1>Vukering You</h1>
                    </div>
                    <input 
                        type = "text" 
                        placeholder="Username" 
                        name="username" 
                        onChange={(e)=>handleChange(e)}
                        min = "4"
                    />
                    <input 
                        type = "password" 
                        placeholder="Password" 
                        name="password" 
                        onChange={(e)=>handleChange(e)}
                    />
                    <button type="submit">Vukering in</button>
                    <span>
                        Isn't a Vukerism yet ? <Link to="/register">Become</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  text-align: center;
  background-color: #FFDE21;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color:rgb(33, 151, 255);
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #997af0;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
    &::placeholder{
        color: white;
        opacity 1;
    }
  }
  button {
    background-color: #FFDE21;
    color: #997af0;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: #997af0;
      color: #FFDE21;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    align-items: center;
    justify-content: center;
    a {
      color: #FFDE21;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;

