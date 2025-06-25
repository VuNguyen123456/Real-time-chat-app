import React, {useState, useEffect, useReducer} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import errorLoading from "../assets/error-loading.gif";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { setAvatarRoute } from "../utils/APIRoutes";
import { Buffer } from "buffer";
import lel from '../assets/lel.png';
export default function SetAvatar(){

    // const api = "https://api.multiavatar.com/45678945";
    const api = "https://api.dicebear.com/7.x/bottts/svg";
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);

    const toastOption = {
      position: "bottom-left",
      autoClose: 4000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    }

    useEffect(()=>{
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }
    }, []);

    const setProfilePicture = async () => {
        if(selectedAvatar === undefined){
            toast.error("Please chose a fighter", toastOption);
        }
        else{
            const user = await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} = await axios.post(`${setAvatarRoute}/${user._id}`,{
                image: avatars[selectedAvatar],
            });
            console.log(data);
            if(data.isSet){
                user.isAvatarSet = true;
                user.avatarImg = data.image;
                localStorage.setItem("chat-app-user", JSON.stringify(user));
                navigate('/')
            }
            else{
                toast.error("Error chosing fighter, try again Bruh", toastOption);
            }
        }
    };
    useEffect(() => {
        const fetchAvatars = async () => {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const seed = Math.random().toString(36).substring(7);
                const img = await axios.get(`${api}?seed=${seed}`);
                const buffer = new Buffer(img.data);
                data.push(buffer.toString("base64"));
            }
            setAvatars(data);
            setIsLoading(false);
        };
        fetchAvatars();
    }, []);

    return (
        <>
        {
            isLoading ? <Container>
                <img src={errorLoading} alt = "loader" className="loader"/>
            </Container> : (
            <Container>
                <div className="title-container">
                    <h1>Which Vuker do you want to become ?</h1>
                </div>
                <div className="avatars">
                    {
                        avatars.map((avatar, index)=>{
                            return(
                                <div 
                                    key={index}
                                    className={`avatar ${
                                    selectedAvatar === index ? "selected" : ""
                                }`}>
                                    <img 
                                    src={`data:image/svg+xml;base64,${avatar}`} 
                                    alt = "avatar"
                                    onClick={()=>setSelectedAvatar(index)}
                                    />
                                </div>
                            );
                        })
                    }
                </div>
                <button className="submit-button" onClick={setProfilePicture}>The Chosen One</button>
            </Container>
            )
        }
            <ToastContainer />
        </>
    )
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    text-align: center;
     background-image: url(${lel});
    .loader{
        max-inline-size: 100%;
    }
    background-repeat: no-repeat;     
    background-size: cover;             
    background-position: center;        
    .title-container{
        h1{
            color: #997af0;
        }
    }
    .avatars{
        display:flex;
        gap: 2rem;
        background-color:rgb(33, 151, 255);
        padding: 3rem;
        border-radius:505px;
        .avatar{
            border: 0.4rem solid transparent;
            padding: 0.4rem;
            border-radius: 5rem;
            display: flex;
            justify-content: center;
            transition: 0.3s ease-in-out;
            img{
                height: 6rem;
            }
        }
        .selected{
            border: 0.4rem solid #997af0;
        }
    }
    .submit-button {
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
`;