import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../../styles/Dashboard/Users.module.scss";
import { IndexLayout } from "../../../Components/LayoutDashboard";
import CostumeImage from "../../../public/costume.jpg";
import { Table, Tooltip, Pagination, Loading } from "@nextui-org/react";
import { RiDeleteBin4Line } from "react-icons/ri";
interface User {
  id: number;
  user: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  profile_image: string;
  roles: Array<string>;
}
export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const fetchUsersList = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const users = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/getUsersList/" + page,
        config
      );
      const usersData = users.data.data;
      setTotalPages(users.data.pages);
      setUsers(usersData);
      console.log(users);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className={styles.users}>
      <h3>Users List</h3>
      <Table id="24" lined headerLined shadow={true} className={styles.grid}>
        <Table.Header>
          <Table.Column>Profile Image</Table.Column>
          <Table.Column>ID</Table.Column>
          <Table.Column>User</Table.Column>
          <Table.Column>Email</Table.Column>
          <Table.Column>First Name</Table.Column>
          <Table.Column>Last Name</Table.Column>
          <Table.Column>Address</Table.Column>
          <Table.Column width={120}>Roles</Table.Column>
          <Table.Column>Action</Table.Column>
        </Table.Header>
        <Table.Body>
          {users.map((user: User, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>
                  <Image
                    src={user.profile_image ? user.profile_image : CostumeImage}
                    alt="UserImage"
                    width={100}
                    height={100}
                  />
                </Table.Cell>
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.user}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.first_name}</Table.Cell>
                <Table.Cell>{user.last_name}</Table.Cell>
                <Table.Cell>
                  <Tooltip content={user.address} color="primary" placement="topStart">
                    {user.address}
                  </Tooltip>
                </Table.Cell>
                <Table.Cell>{user.roles} test</Table.Cell>
                <Table.Cell>
                  <Tooltip content={"DELETE User: " + user.user} color="error">
                    <RiDeleteBin4Line
                      style={{ color: "red" }}
                      onClick={() => console.log(user.id)}
                    />
                  </Tooltip>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      <br />
      <div className={styles.bottomMenu}>
        {loading ? <Loading color={"secondary"} /> : ""}
        <Pagination
          color="secondary"
          bordered
          size={"lg"}
          total={totalPages}
          onChange={(e) => {
            setPageNumber(e);
          }}
          initialPage={page}
        />
      </div>
    </div>
  );
}

Users.PageLayout = IndexLayout;
