import styles from "./styles.module.scss";
import { VscGithubInverted } from "react-icons/vsc";
import{AuthContext} from "../../Contexts/auth"
import { useContext } from "react";




export function LoginBox() {
 
    const{signInUrl,user} = useContext(AuthContext);
  return (
    <h1>
      <div className={styles.loginBoxWrapper}>
        <strong>Entre e compartilhe sua menssagem</strong>
        <a href={signInUrl} className={styles.signInWithGithub}>
          <VscGithubInverted size={24} />
          Entrar com Github
        </a>
      </div>
    </h1>
  );
}
