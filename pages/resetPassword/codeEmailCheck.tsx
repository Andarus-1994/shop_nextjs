import styles from "../../styles/Login.module.scss";
import { ChangeEvent, useState } from "react";
import axios from "axios";

interface CodeEmailProps {
  confirmation: string;
  changeCode: (code: string) => void;
}

export default function CodeEmailCheck({ confirmation, changeCode }: CodeEmailProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const checkCode = async () => {
    try {
      setLoading(true);
      const resetResponse = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/auth/checkCode",
        { code: code }
      );
      const reset = resetResponse.data;
      if (reset.message) {
        setError("");
        changeCode(code);
      }
      if (reset.error) {
        setError(reset.error);
      }
      console.log(reset);
    } catch (e: any) {
      if (e.response.data.errors.code[0]) {
        setError(e.response.data.errors.code[0]);
      }
    } finally {
      setLoading(false);
      console.log("Done checking code!");
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.signup}>
        <div className={styles.rightSide + " " + styles.signup}>
          <div className={styles.loginForm}>
            <h3>{confirmation}</h3>
            <div className={styles.formInput}>
              <label>Code</label>
              <input name="code" onChange={handleChange} value={code} type="text" />
              <div className={styles.error}>{error}</div>
            </div>
            <button
              onClick={checkCode}
              className={loading ? styles.disabled : ""}
              disabled={loading}
            >
              {loading ? "Checking code..." : "Proceed"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
