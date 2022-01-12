import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import { Message, MessageProps } from "../Message";
import { styles } from "./styles";
import {io} from "socket.io-client";

import{MESSAGES_EXAMPLE} from "../../utils/messages"
import { api } from "../../services/api";
let messagesQueque: MessageProps[] = [];
const socket = io(String(api.defaults.baseURL));
socket.on('new_message', (newMessage)=>{
  messagesQueque.push(newMessage);
  console.log(newMessage);
})
export function MessageList() {

  const [currentMessages, setCurrentMessages] = useState<MessageProps[]>([]);


  useEffect(()=>{
    async function fetchMessages(){
      const messagesResponse = await api.get<MessageProps[]>('/messages/last3');
      setCurrentMessages(messagesResponse.data);
    }
    fetchMessages();

  },[])

  useEffect(()=>{
    const timer = setInterval(()=>{
      if(messagesQueque.length > 0){
          setCurrentMessages(prevState=> [messagesQueque[0], prevState[0], prevState[1]]);
          messagesQueque.shift();
      }
    },3000)

    return ()=> clearInterval(timer);

  },[]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"//Tirar teclado ao tocar na lista
    >
      {
        currentMessages.map((msg)=>   <Message data={msg}/>)
      }
  
    </ScrollView>
  );
}
