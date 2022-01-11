import { View } from "moti";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SignInButton() {
  const{signIn} = useAuth();
  return (
    <View style={styles.container}>
      <Button
              onPress={signIn}

        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        title="Entrar com GitHub"
        icon={"github"}
      />
    </View>
  );
}
