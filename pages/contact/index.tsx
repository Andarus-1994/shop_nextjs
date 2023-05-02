import styles from "../../styles/Contact.module.scss";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineMail, MdOutlineLocationCity } from "react-icons/md";
export default function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.overlay}></div>
      <h2>Reach out to us!</h2>
      <p>
        <BsTelephone />
        Phone: 0924-232-000
      </p>
      <p>
        <MdOutlineMail /> Email: test2217@yahoo.com
      </p>
      <p>
        {" "}
        <MdOutlineLocationCity /> Address: New Avenue Street nr. 2, N.Y.
      </p>
      <div className={styles.containerInputs}>
        <div>
          <input placeholder="Your name" />
          <input placeholder="Your Email" />
          <input placeholder="Your Phone" />
        </div>
        <div>
          <textarea placeholder="Your message" />
        </div>
      </div>
      <button>
        <span>Send a message</span>
      </button>
    </div>
  );
}
