import styles from "../../styles/Login.module.scss";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface ResetPasswordProps {
  code: string;
}

export default function ResetPasswordComp({ code }: ResetPasswordProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "password") setPassword(e.target.value);
    else setPassword2(e.target.value);
  };

  const resetPassword = async () => {
    try {
      setLoading(true);
      const resetResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/auth/resetPassword",
        { password: password, password_confirmation: password2, code: code }
      );
      const reset = resetResponse.data;
      if (reset.message) {
        setMessage(reset.message);
        setTimeout(() => {
          router.push("/login");
        }, 3500);
      }
    } catch (e: any) {
      console.log(e.message);
      if (e.response.data.errors.code) {
        setError(e.response.data.errors.code[0]);
      }
      if (e.response.data.errors.password) {
        setError(e.response.data.errors.password[0]);
      }
    } finally {
      console.log("reset password end");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.signup}>
        <div className={styles.rightSide + " " + styles.signup}>
          {message ? (
            <div>
              <div style={{ fontSize: "24px", color: "black", textAlign: "center" }}>{message}</div>
              <div style={{ fontSize: "24px", color: "black", textAlign: "center" }}>
                Redirecting...
              </div>
            </div>
          ) : (
            <div className={styles.loginForm}>
              <h3>Reset your password</h3>
              <div className={styles.formInput}>
                <label>New Password</label>
                <input name="password" onChange={handleChange} value={password} type="text" />
              </div>
              <div className={styles.formInput}>
                <label>Retype New Password</label>
                <input name="password2" onChange={handleChange} value={password2} type="text" />
                <div className={styles.error}>{error}</div>
              </div>
              <button
                onClick={resetPassword}
                className={loading ? styles.disabled : ""}
                disabled={loading}
              >
                {loading ? "Checking..." : "Confirm"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
