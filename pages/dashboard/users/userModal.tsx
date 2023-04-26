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

interface UserProps {
  user: User | {};
  closeModal: Function;
}

export default function UserModal({ user, closeModal }: UserProps) {
  console.log("works", user);
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
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
        <h4>Edit User Profile</h4>
        <div className={styles.inputBox}>
          <label>User</label>
          <input placeholder="User" disabled={true} />
        </div>
        <div className={styles.inputBox}>
          <label>Email</label>
          <input placeholder="Email" disabled={true} />
        </div>
        <div className={styles.inputBox}>
          <label>First Name</label>
          <input placeholder="First Name" />
        </div>
        <div className={styles.inputBox}>
          <label>Last Name</label>
          <input placeholder="Last Name" />
        </div>
        <div className={styles.inputBox}>
          <label>Address</label>
          <input placeholder="Address" />
        </div>
        <div className={styles.inputBox}>
          <label>Role</label>
          <select>
            <option>Super-Admin</option>
            <option>Admin</option>
            <option>Guest</option>
          </select>
        </div>
        <div className={styles.inputBox}>
          <button>Cancel</button>
          <button>Apply</button>
        </div>
      </div>
    </div>
  );
}
