import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import axios from "axios"; // For API calling
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainers from "../components/ChatContainers";
import io from 'socket.io-client';
function Chat(){
    // init
    const socket = useRef();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            if (!localStorage.getItem("chat-app-user")) {
            navigate("/login");
            } else {
            setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
            setIsLoaded(true);
            }
        };
        checkUser();
    }, []);
    
    useEffect(()=>{
        if(currentUser){
            socket.current = io(host);
            socket.current.emit("add-user", currentUser._id);
        }
    }, [currentUser])

    useEffect(()=>{
        const fetchContacts = async () => {
            if(currentUser){
                // Call API
                if (currentUser.isAvatarSet){
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else{
                    navigate("/setAvatar");
                }
            }
        };
        fetchContacts();
    },[currentUser])

    const handleChatChange = (chat) =>{
        setCurrentChat(chat);
    };

    return <Container>
        <div className="container">
            <Contacts contacts = {contacts} currentUser = {currentUser} changeChat = {handleChatChange}></Contacts>
            {
                isLoaded && currentChat === undefined?(
                <Welcome currentUser={currentUser}/>
            ) : (
                <ChatContainers currentChat={currentChat} currentUser={currentUser} socket ={socket}/>
            )}
        </div>
        </Container>;
}

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #FFDE21;
    .container{
        height: 85vh;
        width: 85vw;
        background-color: #997af0;
        display: grid;
        border-radius: 0.5rem;
        grid-template-columns: 25% 75%;
        @media screen and (min-width: 720px) and (max-width: 1080px){
            grid-template-columns: 35% 65%;

        }

    }
`;

export default Chat;