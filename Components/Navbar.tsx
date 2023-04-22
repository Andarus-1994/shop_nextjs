import Link from "next/link";
import styles from "../styles/Nav.module.scss";
import { useRouter } from "next/router";
import { IoIosHome, IoMdGift } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import { FaUserShield, FaUserEdit } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginTrigger } from "../store/reducers/loginReducer";
import axios from "../node_modules/axios";
import { userTrigger } from "../store/reducers/userReducer";
interface userProfile {
  id: number;
  user: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  profile_image: string;
  role: Array<string>;
}

export default function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navigationRoutes, setNavigationRoutes] = useState([
    { route: "Home", icon: <IoIosHome />, special: false },
    { route: "Items", icon: <MdDashboard />, special: false },
    { route: "Gifts", icon: <IoMdGift />, special: false },
    { route: "Sales", icon: <GiPayMoney />, special: true },
    { route: "Contact", icon: "", special: false },
    { route: "Login", icon: <FaUserShield />, special: true },
  ]);
  const login = useSelector((state: any) => state.login.value);
  const user = useSelector((state: any) => state.user.value);
  const navigation = useSelector((state: any) => state.nav.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(loginTrigger(false));
    router.push("/login");
  };

  const getRoutesWithLogged = () => {
    let routes = [];
    if (login) {
      routes = navigationRoutes.map((route) => {
        if (route.route === "Login") {
          return { ...route, route: "Logout" };
        }
        return route;
      });
      if (!routes.find((route) => route.route === "Profile")) {
        routes[routes.length] = routes[routes.length - 1];
        routes[routes.length - 2] = { route: "Profile", icon: <FaUserEdit />, special: false };
      }

      if (
        user.permissions &&
        user.permissions.find((permission: string) => permission === "view admin page") &&
        !routes.find((route) => route.route === "Dashboard")
      ) {
        routes[routes.length] = routes[routes.length - 1];
        routes[routes.length - 2] = { route: "Dashboard", icon: <BsShieldCheck />, special: true };
      }
    } else {
      routes = navigationRoutes.map((route) => {
        if (route.route === "Logout") {
          return { ...route, route: "Login" };
        }
        return route;
      });

      routes = routes.filter(function (route) {
        return route.route !== "Dashboard" && route.route !== "Profile";
      });
    }
    return routes;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    if (localStorage.getItem("token")) {
      dispatch(loginTrigger(true));
    } else {
      dispatch(loginTrigger(false));
    }
    let routes = getRoutesWithLogged();
    setNavigationRoutes(routes);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login, user, dispatch]);

  useEffect(() => {
    if (navigation) {
      setScrollPosition(10);
    } else {
      setScrollPosition(0);
    }
  }, [navigation]);

  const getProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      const fetchProfile = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "api/getProfile",
        config
      );
      const profileData = fetchProfile.data;
      const profile = profileData.info;
      dispatch(userTrigger(profile));
    } catch (e: any) {
      console.log(e.message);
      if (e.response && e.response.data.message === "Unauthenticated.") {
        localStorage.removeItem("token");
        dispatch(loginTrigger(false));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile();
    }
  }, [getProfile, login]);

  return (
    <div className={[styles.navigation, scrollPosition === 0 ? styles.top : ""].join(" ")}>
      <div className={styles.logo}>
        <Link href={"/"}>Shopius</Link>
      </div>
      <nav>
        {navigationRoutes.map((singleRoute, id) => {
          return (
            <div className={styles.navItem} key={id}>
              {singleRoute.route === "Logout" ? (
                <Link href={""} onClick={logout}>
                  {" "}
                  Logout{" "}
                </Link>
              ) : (
                <Link
                  href={
                    singleRoute.route === "Home" ? "/" : "/" + singleRoute.route.toLocaleLowerCase()
                  }
                  replace
                  className={
                    (singleRoute.route === "Home"
                      ? router.pathname == "/"
                        ? styles.active
                        : ""
                      : router.pathname === "/" + singleRoute.route.toLocaleLowerCase()
                      ? styles.active
                      : router.pathname.includes("/" + singleRoute.route.toLocaleLowerCase()) &&
                        singleRoute.route.toLocaleLowerCase() === "dashboard"
                      ? styles.active
                      : "") +
                    " " +
                    (singleRoute.special ? styles.special : "")
                  }
                >
                  <span>{singleRoute.icon}</span> {singleRoute.route}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
