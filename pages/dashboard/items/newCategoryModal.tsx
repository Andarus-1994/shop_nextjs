import axios from "axios";
import styles from "../../../styles/Dashboard/Users.module.scss";

type User = {
  id: number;
  user: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  profile_image: string;
  roles: Array<string> | string;
};

interface ModalProps {
  closeModal: Function;
}

export default function NewCategory({ closeModal }: ModalProps) {
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const createCategory = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const items = await axios.get(process.env.NEXT_PUBLIC_API_URL + "api/newCategory", config);
      const itemsData = items.data;
      console.log(itemsData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      closeModal();
    }
  };
  return (
    <div
      className={styles.userModalContainer}
      onClick={(e) => {
        handleClose(e);
      }}
    >
      <div className={styles.userModal}>
        <h4>New Category</h4>
        <div className={styles.inputBox}>
          <label>Name</label>
          <input placeholder="Category" />
        </div>
        <div className={styles.inputBox}>
          <div>Main Category:</div>
          <select>
            <option>Blousons</option>
          </select>
        </div>
        <div className={styles.inputBox}>
          <button onClick={() => closeModal()}>Cancel</button>
          <button onClick={createCategory}>Create</button>
        </div>
      </div>
    </div>
  );
}
