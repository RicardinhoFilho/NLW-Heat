import React from "react";
import LogoSvg from "../../assets/logo.svg";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { UserPhoto } from "../UserPhoto";
import { useAuth } from "../../hooks/auth";
export function Header() {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />

      {user && (
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText} onPress={signOut}>
            Sair
          </Text>
        </TouchableOpacity>
      )}
      <UserPhoto imageUri={user?.avatar_url} sizes={"NORMAL"} />
    </View>
  );
}
