import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";
import { api } from "../../Services/api";
import { useEffect, useState } from "react";

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
