import axios from "axios";
import { ChangeEvent, useState } from "react";
import styles from "../../styles/Login.module.scss";
import CodeEmailCheck from "./codeEmailCheck";
import ResetPasswordComp from "./resetPassword";
import SendEmail from "./sendEmail";
export default function ResetPassword() {
  const [confirmation, setConfirmation] = useState("");
  const [code, setCode] = useState("");
  const changeConfirmationMessage = (message: string) => {
    setConfirmation(message);
  };

  const changeCode = (code: string) => {
    setCode(code);
  };

  return (
    <div className={styles.container}>
      {code === "" ? (
        confirmation === "" ? (
          <SendEmail setConfirmation={changeConfirmationMessage} />
        ) : (
          <CodeEmailCheck confirmation={confirmation} changeCode={changeCode} />
        )
      ) : (
        <ResetPasswordComp code={code} />
      )}
    </div>
  );
}
