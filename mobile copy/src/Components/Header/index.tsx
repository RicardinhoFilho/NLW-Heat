import React from "react";
import LogoSvg from "../../assets/logo.svg";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { UserPhoto } from "../UserPhoto";
export function Header() {
  return (
    <View style={styles.container}>
      <LogoSvg />

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
      <UserPhoto
        imageUri={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzkpCpj63hQ7d8prHgptZFHu09UqRZEvp65A76zKsfFyWG3Xwj02FXfcQT4WSIwS2-UIU&usqp=CAU"
        }
        sizes={"NORMAL"}
      />
    </View>
  );
}
