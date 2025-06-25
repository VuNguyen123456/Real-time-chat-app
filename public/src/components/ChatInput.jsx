import React, {useState} from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import {IoMdSend} from 'react-icons/io';
import {BsEmojiAngryFill} from 'react-icons/bs';
export default function ChatInput({handleSendMsg}){
    const [showEmojiPicker, setshowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerhideShow = () => {
        setshowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (emojiObject) => {
        setMsg((prev) => prev + emojiObject.emoji);
    };

    const sendChat = (event) => {
      event.preventDefault();
      if(msg.length > 0){
        handleSendMsg(msg);
        setMsg('');
      }
    }

    return (
      <Container>
        {showEmojiPicker && (
          <div className="emoji-picker-container">
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <div className="button-container">
          <div className="emoji">
            <BsEmojiAngryFill onClick={handleEmojiPickerhideShow} />
          </div>
        </div>
        <form className="input-container" onSubmit={(e) => {sendChat(e)}}>
          <input
            type="text"
            placeholder="Type your message here"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
          />
          <button type="submit">
            <IoMdSend />
          </button>
        </form>
      </Container>
    );
}
const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: #997af0;
  padding: 0 2rem;
  height: 100px; /* Optional: fixed height for consistency */
  gap: 1rem;
  @media screen and (min-width: 720px) and (max-width: 1080px){
    padding: 0 1rem;
    gap: 1rem;
  }
  .emoji-picker-container {
    position: absolute;
    bottom: 100%;
    right: 3rem;
    z-index: 100;
    .emoji-picker-react {
      background-color: #080420;
      box-shadow: 0 5px 10px #997af0;
      border-color: #997af0;
    }
  }

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    .emoji {
      svg {
        font-size: 1.5rem;
        color: #ffde21;
        cursor: pointer;
      }
    }
  }

  .input-container {
    flex: 1;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #080420;
    padding: 0.5rem 1rem;

    input {
      flex: 1;
      background-color: transparent;
      color: white;
      border: none;
      font-size: 1.2rem;
      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 1rem;
      border-radius: 2rem;
      background-color: #9a86f3;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      @media screen and (min-width: 720px) and (max-width: 1080px){
        padding: 0.3rem 1rem;
        svg{
          font-size: 1rem;
        }
      }

      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
