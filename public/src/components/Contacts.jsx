import React, {useState, useEffect} from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
export default function Contacts({contacts, currentUser, changeChat}){
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImg, setCurrentUserImg] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);
//      useEffect(() => {
//     const loadUser = () => {
//       const data = JSON.parse(localStorage.getItem("chat-app-user"));
//       if (data) {
//         setCurrentUserName(data.username);
//         setCurrentUserImg(data.avatarImg); // Use the exact key your data uses
//       }
//     };
//     loadUser();
//   }, []);
    
    // useEffect(() => {
    //     console.log("Contacts:", contacts);
    // }, [contacts]);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImg(currentUser.avatarImg);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    return <>
    {
        currentUserImg && currentUserName && (
            <Container>
                <div className="brand">
                    <img src={Logo} alt = "logo"/>
                    <h3>Vuker</h3>
                </div>
                <div className="contacts">
                    {contacts.map((contact, index) => {
                        return (
                        <div
                            className={`contact ${index === currentSelected ? "selected" : ""}`}
                            key = {index}
                            onClick={()=> changeCurrentChat(index, contact)}
                        >
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${contact.avatarImg}`}
                                    alt="avatar"
                                />
                            </div>
                            <div className="username">
                                <h3>{contact.username}</h3>
                            </div>
                        </div>
                        );
                    })}
                </div>
                <div className="current-user">
                    <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${currentUserImg}`}
                                    alt="avatar"
                                />
                            </div>
                            <div className="username">
                                <h2>{currentUserName}</h2>
                            </div>
                </div>
            </Container>
        )
    }</>;

}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #997af0;
  border-radius = 1rem;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    border-radius = 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    border-radius = 1rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 2rem;
      }
    }
    .contact {
      background-color: rgb(33, 151, 255);
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 1rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
    .selected {
      background-color: rgb(122, 167, 244);
    }
  }

  .current-user {
    background-color:rgb(122, 167, 244);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border-top-right-radius: 1rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 2rem;
        }
      }
    }
  }
`;
// Get add contact from data base
