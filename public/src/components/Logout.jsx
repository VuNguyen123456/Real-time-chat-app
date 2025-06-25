import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff} from 'react-icons/bi';

export default function Logout({currentChat}){
    const navigate = useNavigate();
    const handleClick = async()=>{
        localStorage.clear();
        navigate("login");
    };
    return <Button onClick={handleClick}>
        <BiPowerOff>die now</BiPowerOff>
        </Button>
}

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radious: 0.5rem;
    background-color:rgb(122, 167, 244);
    border: none;
    cursor: pointer;
    svg{
        font-size: 1.3rem;
        color: white;
    }
`;