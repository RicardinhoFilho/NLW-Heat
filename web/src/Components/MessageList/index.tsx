import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";
import { api } from "../../Services/api";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Message = {
  id: string;
  text: string;
  user: {
    avatar_url: string;
    nome: string;
  };
};

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = io("http://localhost:4000");

  const messagesQueue: Message[] = [];

  socket.on("new_message", (newMessage) => {
    //console.log(newMessage);
    messagesQueue.push(newMessage);
  });

  useEffect(() => {
      const timer = setInterval(()=>{
        if(messagesQueue.length > 0){
          setMessages((prevState)=>[messagesQueue[0], prevState[0], prevState[1]].filter(Boolean))
          messagesQueue.shift()
        }
      },3000)
  },[])

  useEffect(() => {
    api.get<Message[]>("/messages/last3").then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt={"do-while-2021"} />
      <ul className={styles.messageList}>
        {messages.map((message) => {
          return (
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.nome} />
                </div>

                <span>{message.user.nome}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
