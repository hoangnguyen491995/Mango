// @flow
import { LoginOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { messageWarning } from "src/components/MessageAlert";
type Props = {};
export const Logout = (props: Props) => {
  const router = useRouter();
  const [isLogout, setIsLogout] = useState<boolean>(false);
  useEffect(() => {
    const accessTokens = localStorage.getItem("AccessToken");

    if (accessTokens) {
      (router.pathname == "/workspace" || router.pathname == "/login") &&
        router.push("/home");
    } else if (router.pathname != "/workspace") {
      // messageWarning("Logout Device");
      router.push("/login");
    }
  }, [isLogout]);
  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    setIsLogout(!isLogout);
  };
  return (
    <LoginOutlined
      style={{ color: "white", fontSize: "30px" }}
      onClick={handleLogout}
    />
  );
};
