import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, getAllMessagesRoute  } from "../utils/APIRoutes";
import {v4 as uuidv4} from "uuid";

export default function ChatContainers({currentChat, currentUser, socket}){
    
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    useEffect(() => {
        const fetchAllMsg = async () => {
            // if (!currentUser || !currentChat) return;
            if(currentChat){
            const response = await axios.post(getAllMessagesRoute, {
            from: currentUser._id,
            to: currentChat._id,
            })
            setMessages(response.data);
            }
        }
        fetchAllMsg();
    },[currentChat])
    
    const handleSendMsg = async (msg) => {
        // alert(msg);
        if (!currentUser || !currentChat) return;
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });
        socket.current.emit("send-msg", {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({fromSelf:true, message: msg});
        setMessages(msgs);
    };

    useEffect(() => {
        if(socket.current){
            socket.current.on("msg-receive", (msg) => {
                setArrivalMessage({fromSelf: false, message: msg});
            });
        }
    }, []);


    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() =>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages]);

    return (
        <>
        {
        currentChat && (    
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img
                            src={`data:image/svg+xml;base64,${currentChat.avatarImg}`}
                            alt="avatar"
                        />
                    </div>
                    <div className="username">
                        <h3>{currentChat.username}</h3>
                    </div>
                </div>
                <Logout></Logout>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message) => {
                        return (
                            <div ref = {scrollRef} key = {uuidv4()}>
                            <div className={`message ${message.fromSelf ? "sended":"received"}` }>
                            <div className="content">
                                <p>
                                    {message.message}
                                </p>
                            </div>
                            </div>
                            </div>
                        )
                    })
                }
            </div>
            <ChatInput handleSendMsg = {handleSendMsg}/>
        </Container>
        )}
        </>
    )
};


const Container = styled.div`
    display: grid;
    grid-template-rows: 10% 78% 12%
    padding-top: 1rem;
    gap: 0.1rem;
    overflow: hidden;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        grid-auto-rows: 15% 70% 15%;
    }
    .chat-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 2rem;
        .user-detail{
            display: flex;
            align-items: center;
            gap: 1rem;
            .avatar{
                img{
                    height: 3rem;
                }    
            }
            .username{
                h3{
                    color: white;
                }
            }

        }
    }
    .chat-messages{
        padding: 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color:rgb(0, 0, 0);
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .message{
            display: flex;
            align-items: center;
            .content{
            max-width: 40%;
            overflow-wrap: break-word;
            padding: 1rem;
            border-radius: 1rem;
            font-size: 1.1rem
            color: rgb(122, 167, 244);
            }
        }
        .sended {
            justify-content: flex-end;
            .content {
                background-color: rgb(122, 167, 244);
            }
        }
        .received {
            justify-content: flex-start;
            .content {
                background-color: rgb(122, 167, 244);
            }
        }
    }
`;