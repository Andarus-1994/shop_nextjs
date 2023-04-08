import styles from "../../styles/Login.module.scss";
import { ChangeEvent, useState } from "react";
import axios from "axios";

interface SendEmailProps {
  setConfirmation: (message: string) => void;
}

export default function SendEmail({ setConfirmation }: SendEmailProps) {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const sendEmail = async () => {
    try {
      setLoading(true);
      const resetResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/auth/sendPasswordReset",
        { email: email }
      );
      const reset = resetResponse.data;
      if (reset.error) {
        setError(reset.error);
      }
      if (reset.message) {
        setConfirmation(reset.message);
      }
      console.log(reset);
    } catch (e: any) {
      console.log(e.message);
    } finally {
      console.log("Email sent.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.signup}>
        <div className={styles.rightSide + " " + styles.signup}>
          <div className={styles.loginForm}>
            <h3>Reset Password</h3>
            <div className={styles.formInput}>
              <label>Email</label>
              <input name="user" onChange={handleChange} value={email} type="text" />
              <div className={styles.error}>{error}</div>
            </div>
            <button
              onClick={sendEmail}
              className={loading ? styles.disabled : ""}
              disabled={loading}
            >
              {loading ? "Sending email..." : "Reset Password"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
