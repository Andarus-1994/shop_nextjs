import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/Login.module.scss";
export default function EmailValidation(props: any) {
  const router = useRouter();
  const { token } = router.query;
  console.log(props.answer);
  const { answer } = props;

  return (
    <div className={styles.container}>
      <h3 className={answer.status ? styles.verified : styles.alreadyVerified}>
        {answer.message}
      </h3>
    </div>
  );
}

export async function getServerSideProps(context: { params: any }) {
  const { params } = context;
  const { token } = params;
  const verifyUser = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "api/auth/verify/" + token
  );
  const answer = verifyUser.data;
  console.log(answer);
  return {
    props: {
      // Pass id as key here, remember that the file name is [id].tsx
      answer: answer,
    }, // will be passed to the page component as props
  };
}
