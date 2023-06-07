import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import styles from "../../../styles/Dashboard/Users.module.scss";
import { IndexLayout } from "../../../Components/LayoutDashboard";
import CostumeImage from "../../../public/costume.jpg";
import { Table, Tooltip, Pagination, Loading } from "@nextui-org/react";
import { RiDeleteBin4Line } from "react-icons/ri";
import { MdEditNote } from "react-icons/md";
import useDebounce from "../../../Components/Debounce";
import UserModal from "./userModal";
import Notification from "../../../Components/Notification/Message";
import UserDeletionModal from "./deleteUserModal";
interface User {
  id: number;
  user: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  profile_image: string;
  roles: Array<string> | string;
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchUser, setSearchUser] = useState("");
  const debouncedSearch = useDebounce(searchUser, 500);
  const [showModalUser, setShowModalUser] = useState(false);
  const [chosenUser, setChosenUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [userDeletionModal, setUserDeletionModal] = useState({
    visible: false,
    id: 0,
  });

  const fetchUsersList = useCallback(async (currentPage: number, search: string) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const users = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/getUsersList/" + currentPage + "/" + search,
        config
      );
      const usersData = users.data.data;
      setTotalPages(users.data.pages);
      setUsers(usersData);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshUsers = () => {
    fetchUsersList(page, searchUser);
  };

  const closeModal = () => {
    setChosenUser({});
    setShowModalUser(false);
  };

  const closeModalDeletion = () => {
    setUserDeletionModal({
      visible: false,
      id: 0,
    });
  };

  useEffect(() => {
    fetchUsersList(page, debouncedSearch);
  }, [page, fetchUsersList, debouncedSearch]);

  useEffect(() => {
    setPageNumber(1);
    fetchUsersList(1, debouncedSearch);
  }, [debouncedSearch, fetchUsersList]);

  const placeHolderLoading = () => {
    let rows = [];
    for (let i = 0; i < 10; i++) {
      rows.push(
        <Table.Row key={i}>
          <Table.Cell css={{ width: "90px" }}>
            <Loading color={"secondary"} />
          </Table.Cell>
          <Table.Cell>Loading</Table.Cell>
          <Table.Cell>{}</Table.Cell>
          <Table.Cell>{}</Table.Cell>
          <Table.Cell>{}</Table.Cell>
          <Table.Cell>{}</Table.Cell>
          <Table.Cell>{}</Table.Cell>
          <Table.Cell>{}</Table.Cell>
          <Table.Cell>
            <Tooltip content={"DELETE User: "} color="error">
              <RiDeleteBin4Line style={{ color: "red" }} />
            </Tooltip>
          </Table.Cell>
        </Table.Row>
      );
    }
    return rows;
  };

  return (
    <div className={styles.users}>
      <section>
        <h3>Users Management</h3>
        <h4>Administrate users roles</h4>
      </section>
      <div className={styles.rowMenu}>
        <input
          placeholder="Search user..."
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </div>
      <Table id="24" lined headerLined shadow={true} className={styles.grid}>
        <Table.Header>
          <Table.Column>Profile Image</Table.Column>
          <Table.Column>ID</Table.Column>
          <Table.Column>User</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>First Name</Table.Column>
          <Table.Column>Last Name</Table.Column>
          <Table.Column>Address</Table.Column>
          <Table.Column css={{ paddingLeft: "20px" }}>Roles</Table.Column>
          <Table.Column>Action</Table.Column>
        </Table.Header>
        <Table.Body>
          {loading
            ? placeHolderLoading()
            : users.map((user: User, index) => {
                return (
                  <Table.Row key={index}>
                    <Table.Cell css={{ width: "90px" }}>
                      {typeof user.profile_image === "string" ? (
                        <Image
                          src={
                            user.profile_image && user.profile_image !== ""
                              ? user.profile_image
                              : CostumeImage
                          }
                          alt="Profile Image"
                          width={100}
                          height={100}
                        />
                      ) : user.profile_image && typeof user.profile_image === "object" ? (
                        <Image
                          src={URL.createObjectURL(user.profile_image)}
                          alt="Profile Image"
                          width={100}
                          height={100}
                        />
                      ) : (
                        <p>No Image</p>
                      )}
                    </Table.Cell>
                    <Table.Cell>{user.id}</Table.Cell>
                    <Table.Cell css={{ maxWidth: "fit-content" }}>{user.user}</Table.Cell>
                    <Table.Cell css={{ maxWidth: "fit-content" }}>{user.email}</Table.Cell>
                    <Table.Cell css={{ maxWidth: "fit-content" }}>{user.first_name}</Table.Cell>
                    <Table.Cell css={{ maxWidth: "fit-content" }}>{user.last_name}</Table.Cell>
                    <Table.Cell css={{ maxWidth: "100px" }}>
                      <Tooltip
                        content={"Click to copy the address: " + user.address}
                        color="secondary"
                        placement="bottomStart"
                        onClick={() => {
                          navigator.clipboard.writeText(user.address);
                        }}
                        css={{ maxWidth: "200px" }}
                      >
                        {user.address}
                      </Tooltip>
                    </Table.Cell>
                    <Table.Cell css={{ paddingLeft: "20px" }}>
                      {user.roles === "" ? "-" : user.roles}
                    </Table.Cell>
                    <Table.Cell>
                      <Tooltip content={"Edit user: " + user.user}>
                        <MdEditNote
                          onClick={() => {
                            setShowModalUser(true), setChosenUser(user);
                          }}
                          style={{ fontSize: "25px" }}
                        />
                      </Tooltip>
                      <Tooltip content={"DELETE User: " + user.user} color="error">
                        <RiDeleteBin4Line
                          onClick={() => {
                            setUserDeletionModal({
                              visible: true,
                              id: user.id,
                            });
                          }}
                          style={{ marginLeft: "20px", color: "red", fontSize: "20px" }}
                        />
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
        </Table.Body>
      </Table>
      <br />
      <div className={styles.rowMenu}>
        <Pagination
          color="secondary"
          bordered
          size={"lg"}
          total={totalPages}
          onChange={(e) => {
            setPageNumber(e);
          }}
          page={page}
          initialPage={page}
        />
      </div>
      {userDeletionModal.visible === true && (
        <UserDeletionModal
          closeModal={closeModalDeletion}
          id={userDeletionModal.id}
          refreshUsers={refreshUsers}
        />
      )}
      {showModalUser === true && <UserModal user={chosenUser} closeModal={closeModal} />}
      {errorMessage && <Notification message={errorMessage} />}
    </div>
  );
}

Users.PageLayout = IndexLayout;
