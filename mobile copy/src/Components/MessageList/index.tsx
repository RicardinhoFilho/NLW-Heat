import React from "react";
import { ScrollView, Text } from "react-native";
import { Message } from "../Message";
import { styles } from "./styles";

import{MESSAGES_EXAMPLE} from "../../utils/messages"
const teste = MESSAGES_EXAMPLE[0];
export function MessageList() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"//Tirar teclado ao tocar na lista
    >
    <Message data={MESSAGES_EXAMPLE[0]}/>
    <Message data={MESSAGES_EXAMPLE[1]}/>
    <Message data={MESSAGES_EXAMPLE[3]}/>
    </ScrollView>
  );
}
