import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageForm() {
    const[message,setMessage] = useState("");
    const[sendingMessage, setSendingMesage] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        maxLength={140}
        onChangeText={setMessage}
        value={message}
      />
      <Button
        title="ENVIAR MENSSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        disabled={sendingMessage}
      />
    </View>
  );
}
