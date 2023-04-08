import Link from "next/link";
import { useState, ChangeEvent, useRef, useEffect } from "react";
import styles from "../../styles/Login.module.scss";
import stylesUtils from "../../styles/utils/Loading.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { loginTrigger } from "../../store/reducers/loginReducer";
import axios from "axios";
import { useRouter } from "next/router";
export default function Login() {
  const [user, setUser] = useState({ user: "", password: "" });
  const [loading, setLoading] = useState(false);
  const userRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };
  const [error, setError] = useState("");
  const login = useSelector((state: any) => state.login.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const login = await axios.post(process.env.NEXT_PUBLIC_API_URL + "api/auth/login", user);
      const checkLogin = login.data;
      if (checkLogin.status) {
        setError("");
        dispatch(loginTrigger(true));
        localStorage.setItem("token", checkLogin.token);
      }
    } catch (e: any) {
      if (e.response.data.status === false && !e.response.data.errors) {
        setError(e.response.data.message);
      }
      if (e.response.data.status === false && e.response.data.errors) {
        if (e.response.data.errors.user) {
          setError(e.response.data.errors.user);
        } else if (e.response.data.errors.password) {
          setError(e.response.data.errors.password);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userRef.current?.focus();
    if (login) {
      router.push("/profile");
    }
  }, [login, router]);

  return (
    <div className={styles.container}>
      {login ? <div className={stylesUtils.fullLoading}></div> : null}
      <section>
        <div className={styles.leftSide}>
          <div className={styles.overlay}></div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.loginForm}>
            <h3>Login</h3>
            <div className={styles.formInput}>
              <label>User</label>
              <input
                name="user"
                onChange={handleChange}
                value={user.user}
                type="text"
                ref={userRef}
              />
            </div>
            <div className={styles.formInput}>
              <label>Password</label>
              <input
                name="password"
                onChange={handleChange}
                value={user.password}
                type="password"
              />
            </div>
            <div className={styles.error}>{error}</div>
            <button
              onClick={handleLogin}
              className={loading ? styles.disabled : ""}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
            <p>
              Don&apos;t have an account? <Link href={"signup"}>Sign Up</Link>. <br />
              Forgot your password? <Link href={"resetPassword"}>Click here to reset it</Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
