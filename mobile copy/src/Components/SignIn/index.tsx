import { View } from "moti";
import React from "react";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SignInButton() {
  return (
    <View style={styles.container}>
      <Button
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        title="Entrar com GitHub"
        icon={"github"}
      />
    </View>
  );
}
