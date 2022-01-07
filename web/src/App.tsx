import React, { useContext, useState } from "react";

import styles from "./App.module.scss";
import { LoginBox } from "./Components/LoginBox";
import { MessageList } from "./Components/MessageList";
import { SendMessageForm } from "./Components/SendMessageForm";
import { AuthContext } from "./Contexts/auth";
function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
}

export { App };
