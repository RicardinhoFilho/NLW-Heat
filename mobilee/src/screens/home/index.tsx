import React from "react";

import {View, Text} from "react-native";
import { Button } from "../../Components/Button";
import { Header } from "../../Components/Header";
import { MessageList } from "../../Components/MessageList";
import { SendMessageForm } from "../../Components/SendMessageForm";
import { SignInButton } from "../../Components/SignIn";

import {styles} from "./styles";


export function Home(){
   return(
        <View style={styles.container}> 
            <Header/>
            <MessageList/>
            <SignInButton/>
        </View>

    )
}