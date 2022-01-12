import React, { useState } from "react";
import { Alert, Keyboard, TextInput, View , KeyboardAvoidingView,Platform} from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMesage] = useState(false);

  async function handleMessageSubmit(){
    const messageFormated = message.trim();

    if(messageFormated.length > 0){
      setSendingMesage(true);
      await api.post('/messages',{message:messageFormated})

      setMessage("");
      Keyboard.dismiss();
      setSendingMesage(false);
      Alert.alert('Menssagem enviada com sucesso!');
    }else{
      Alert.alert('Escreva a menssagem para enviar')
    }

  }

  return (
    <KeyboardAvoidingView style={{flex:1}}
    
      behavior={Platform.OS === 'ios'? "padding" : undefined}
    >
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
        multiline
      />
      <Button
        title="ENVIAR MENSSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        isLoading={sendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
    </KeyboardAvoidingView>
  );
}
