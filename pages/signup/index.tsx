import { useState, ChangeEvent, useRef, useEffect } from "react"
import styles from "../../styles/Signup.module.scss"
import { RiUserUnfollowLine } from "react-icons/ri"
import axios from "axios"

export default function Signup() {
  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    user: "",
    password: "",
    password2: "",
    profile_image: "",
    role: "guest",
  })
  const [userError, setUserError] = useState({
    email: "",
    user: "",
    password: "",
    password2: "",
  })
  const [loading, setLoading] = useState(false)
  const [register, setRegister] = useState("")
  const userRef = useRef<HTMLInputElement>(null)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    setUser({
      ...user,
      [e.target.name]: value,
    })
    if (e.target.name === "user") {
      if (value.length < 4) {
        setUserError((userError) => ({
          ...userError,
          user: "User must be atleast 4 letters!",
        }))
      } else {
        setUserError((userError) => ({
          ...userError,
          user: "",
        }))
      }
    }
    if (e.target.name === "password") {
      if (value.length < 6) {
        setUserError((userError) => ({
          ...userError,
          password: "User must be atleast 6 letters!",
        }))
      } else {
        setUserError((userError) => ({
          ...userError,
          password: "",
        }))
      }
    }
    if (e.target.name === "password2") {
      if (value !== user.password) {
        setUserError((userError) => ({
          ...userError,
          password2: "Password doesn't match",
        }))
      } else {
        setUserError((userError) => ({
          ...userError,
          password2: "",
        }))
      }
    }
  }
  const createUser = async () => {
    if (user.user && user.password && user.password2) {
      setLoading(true)
      try {
        const userCreation = await axios.post(process.env.NEXT_PUBLIC_API_URL + "api/auth/register", user)
        const userCreationResp = userCreation.data
        if (userCreationResp.message) {
          setRegister(userCreationResp.message)
        }
        localStorage.setItem("token", userCreationResp.token)
      } catch (e: any) {
        setLoading(false)
        if (e.response.data.errors) {
          const errorsNames = Object.keys(e.response.data.errors)
          for (const key of errorsNames) {
            setUserError((userError) => ({
              ...userError,
              [key]: e.response.data.errors[key],
            }))
          }
        }
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    userRef.current?.focus()
  }, [])
  return (
    <div className={styles.container}>
      <section className={styles.signup}>
        {register ? (
          <h3>
            <span>Successfully registered!</span> <br /> Check your email for validation.
          </h3>
        ) : (
          <div className={styles.rightSide + " " + styles.signup}>
            <div className={styles.loginForm}>
              <h3>Sign up</h3>
              <div className={styles.row}>
                <div className={styles.formInput}>
                  <label>User*</label>
                  <input name="user" onChange={handleChange} value={user.user} placeholder="Username" type="text" ref={userRef} />
                  <div className={styles.error}>{userError.user}</div>
                </div>
                <div className={styles.formInput}>
                  <label>Email*</label>
                  <input name="email" onChange={handleChange} value={user.email} type="email" placeholder="Ex: andrei@yahoo.com" />
                  <div className={styles.error}>{userError.email}</div>
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.formInput}>
                  <label>Password*</label>
                  <input name="password" onChange={handleChange} value={user.password} type="password" placeholder="Password" />
                  <div className={styles.error}>{userError.password}</div>
                </div>
                <div className={styles.formInput}>
                  <label>Retype password*</label>
                  <input name="password2" onChange={handleChange} value={user.password2} type="password" placeholder="Password" />
                  {userError.password2 && (
                    <div className={styles.error}>
                      {userError.password2} <RiUserUnfollowLine />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.formInput}>
                  <label>First Name:</label>
                  <input name="first_name" onChange={handleChange} value={user.first_name} type="text" placeholder="First Name" />
                </div>
                <div className={styles.formInput}>
                  <label>Last Name:</label>
                  <input name="last_name" onChange={handleChange} value={user.last_name} type="text" placeholder="Last Name" />
                </div>
              </div>
              <div className={styles.formInput} style={{ width: "100%" }}>
                <label>Address:</label>
                <input name="address" onChange={handleChange} value={user.address} type="text" placeholder="Ex: City, Street, etc." />
              </div>
              <button onClick={createUser} className={loading ? styles.disabled : ""} disabled={loading}>
                {loading ? "Registering..." : "Sign Up"}
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
