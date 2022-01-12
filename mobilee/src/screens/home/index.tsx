import React from "react";

import {View, Text} from "react-native";
import { Button } from "../../Components/Button";
import { Header } from "../../Components/Header";
import { MessageList } from "../../Components/MessageList";
import { SendMessageForm } from "../../Components/SendMessageForm";
import { SignInButton } from "../../Components/SignIn";
import { useAuth } from "../../hooks/auth";

import {styles} from "./styles";


export function Home(){

    const{user} = useAuth();

   return(
        <View style={styles.container}> 
            <Header/>
            <MessageList/>
            {user? <SendMessageForm/> : <SignInButton/>}
            
        </View>

    )
}