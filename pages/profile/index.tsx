import axios from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlineLoading3Quarters, AiOutlineUpload } from "react-icons/ai";
import Image from "next/image";
import styles from "../../styles/Profile.module.scss";
import stylesUtils from "../../styles/utils/Loading.module.scss";
import CostumeImage from "../../public/costume.jpg";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { userTrigger } from "../../store/reducers/userReducer";

export default function Profile() {
  interface userProfile {
    id: number;
    user: string;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    profile_image: string | File;
    role: Array<string>;
  }

  const [profile, setProfile] = useState<userProfile>({
    id: 0,
    user: "",
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    profile_image: "",
    role: [],
  });
  const [verifyAccount, setVerifyAccount] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loadingButton, setLoadingButton] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const imageInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.value);

  const updateProfile = async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    };
    try {
      setLoadingButton(true);
      const formData = new FormData();
      formData.append("user", JSON.stringify(profile));
      formData.append("profile_image", profile.profile_image);
      const updateProfile = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "api/updateProfile",
        formData,
        config
      );
      const updatedProfile = updateProfile.data;
      dispatch(userTrigger(updatedProfile.info));
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      setLoadingButton(false);
      setDisableButton(true);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user) {
      setProfile(user);
      setLoading(false);
    }
  }, [user]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setDisableButton(false);
    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDisableButton(false);
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        return;
      }
      // changing the image profile (File)
      setProfile((prevProfile) => ({
        ...prevProfile,
        profile_image: selectedFile,
      }));
    }
  };

  // view starts here
  return (
    <div className={styles.fullSpace}>
      {loading ? (
        <div className={stylesUtils.fullLoading}>
          {" "}
          <AiOutlineLoading3Quarters />{" "}
        </div>
      ) : (
        <section className={styles.container}>
          <div className={styles.flexProfile}>
            <div className={styles.profileItemsList}>
              <h3>Your recent bought items:</h3>
              <div className={styles.items}>
                <div className={styles.item}>
                  <Image src={CostumeImage} alt="Costume" />
                  <p>Costume 1</p>
                </div>
                <div className={styles.item}>
                  <Image src={CostumeImage} alt="Costume" />
                  <p>Costume 1</p>
                </div>
                <div className={styles.item}>
                  <Image src={CostumeImage} alt="Costume" />
                  <p>Costume 1</p>
                </div>
              </div>
            </div>
            <div className={styles.profileBox}>
              <div className={styles.profileImage}>
                {typeof profile.profile_image === "string" || !!!profile.profile_image ? (
                  <Image
                    src={profile.profile_image ? profile.profile_image : CostumeImage}
                    alt="Profile Image"
                    width={100}
                    height={100}
                  />
                ) : typeof profile.profile_image === "object" ? (
                  <Image
                    src={URL.createObjectURL(profile.profile_image)}
                    alt="Profile Image"
                    width={100}
                    height={100}
                  />
                ) : (
                  <p>No Image</p>
                )}

                <input
                  accept="image/*"
                  type="file"
                  ref={imageInput}
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
                <label htmlFor="select-image">
                  <button
                    className={styles.profileImageCover}
                    onClick={() => {
                      imageInput.current?.click();
                    }}
                  >
                    <AiOutlineUpload />
                  </button>
                </label>
              </div>
              <h3>Profile Settings</h3>
              <div className={styles.profileInputFlex}>
                <div className={styles.flexProfile}>
                  <div className={styles.profileInputGroup}>
                    <label> First Name:</label>
                    <input name="first_name" value={profile.first_name} onChange={handleInput} />
                  </div>
                  <div className={styles.profileInputGroup}>
                    <label> Last Name:</label>
                    <input name="last_name" value={profile.last_name} onChange={handleInput} />
                  </div>
                </div>
                <div className={styles.flexProfile}>
                  <div className={styles.profileInputGroup}>
                    <label> Username:</label>
                    <input name="user" disabled={true} value={profile.user} />
                  </div>
                  <div className={styles.profileInputGroup}>
                    <label> Email Address:</label>
                    <input name="email" disabled={true} value={profile.email} />
                  </div>
                </div>
                <div className={styles.flexProfile}>
                  <div className={styles.profileInputGroup}>
                    <label> Address:</label>
                    <input name="address" value={profile.address} onChange={handleInput} />
                  </div>
                </div>
                {!verifyAccount && (
                  <p className={styles.error}>Check your email for account validation!</p>
                )}
                <button
                  onClick={updateProfile}
                  className={loadingButton || disableButton ? styles.disabled : ""}
                  disabled={loadingButton || disableButton}
                >
                  {loadingButton ? "Updating..." : "Update profile"}
                </button>
              </div>
              <div className={styles.role}>
                {profile.role &&
                  profile.role.map((role, index) => {
                    return (
                      <h4 key={index} className={role === "admin" ? styles.admin : styles.guest}>
                        {" "}
                        {role}{" "}
                      </h4>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
