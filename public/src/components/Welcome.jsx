import React from "react";
import styled from "styled-components";
import minion from "../assets/minion-welcome.gif";
import robot from "../assets/robot.gif";

export default function Welcome({ currentUser }) {
    if (!currentUser) return null;

    return (
        <Container>
            <img src={minion} alt ="Welcome"/>
            <h1>
                Welcome to the nation, <span>{currentUser.username}</span>
            </h1>
            <h3>Select a chat to start Messaging</h3>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height: 20rem;    
    }
    span{
        color: rgb(33, 151, 255);
    }
`;
