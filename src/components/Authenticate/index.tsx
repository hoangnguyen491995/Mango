import { Button, Checkbox, Col, Form, Input, message, Row, Space } from "antd";
import { useRouter } from "next/router";
import { Login } from "services/Authenticate/login";
import { getProviders, getSession, signIn } from "next-auth/react";

import Cookies from "js-cookie";
import { messageSuccess, messageWarning } from "../MessageAlert";
import Link from "next/link";

interface IProfile {
  userName: string;
  password: string;
  deviceName: string;
}
export const SignIn = () => {
  const router = useRouter();
  const apiLogin = new Login();

  const onFinish = (values: IProfile) => {
    // signIn(values);

    apiLogin.login(values).then((res) => {
      if (res.status == 200) {
        const cookie = {
          url: "/",
          name: "token",
          value: res.data.token,
          expirationDate: 24 * 30 * 60 * 60,
        };
        //Pass data Access Token to Electron Storage
        // ipcRenderer.send("accessToken", res.data.token);
        localStorage.setItem("AccessToken", res.data.token);

        Cookies.set("token", res.data.token);
        Cookies.set("infoSalon", res.data.data.rvcName);
        messageSuccess("Login Success");
        Cookies.set("token", res.data.token) && router.push("/home");
      } else messageWarning("Login Failed");
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    // // console.log("Failed:", errorInfo);
  };
  return (
    <Row className="h-screen">
      <Col
        span={12}
        className=" flex item-center h-full w-full justify-between bg-mango-primary-blue "
        style={{ backgroundColor: "#00BED6" }}
      >
        <div className="flex m-auto h-full w-full">
          <img src="/assets/imgs/mangoforsalon.png" className="m-auto" />
        </div>
      </Col>
      <Col span={12} className="w-full h-full">
        <div className="w-full h-full ">
          <h1 className="w-full text-3xl  text-center">SIGN IN</h1>
          <div
            className="border border-black rounded-md h-[550px] w-[440px] mx-auto px-6   text-center"
            style={{ padding: "24px" }}
          >
            <div
              className="border-dashed border rounded-sm border-black h-full w-full"
              style={{ padding: "16px" }}
            >
              <h1 className="w-full text-mango-primary-blue font-semibold text-3xl">
                Welcome to MANGO SIGN IN
              </h1>
              <h2 className="text-xl text-mango-text-light">The Login Panel</h2>
              <Form
                name="basic"
                labelCol={{ span: 0 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                size="large"
              >
                <Form.Item
                  name="userName"
                  className="!w-full"
                  normalize={(value) => (value || "").toUpperCase()}
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input
                    className="!w-full !border-b actice:!border-x-0"
                    placeholder="EMAIL ADDRESS*"
                  />
                </Form.Item>

                <Form.Item
                  normalize={(value) => (value || "").toUpperCase()}
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password
                    className="!w-full !border-b actice:!border-x-0"
                    placeholder="PASSWORD*"
                  />
                </Form.Item>
                <Form.Item
                  name="deviceName"
                  normalize={(value) => (value || "").toUpperCase()}
                  rules={[
                    {
                      required: true,
                      message: "Please input your device name!",
                    },
                  ]}
                >
                  {/* <Input.Password /> */}
                  <Input
                    className="!w-full !border-b actice:!border-x-0"
                    placeholder="DEVICE NAME (MAC,IPAD,HP,V.V...)*"
                  />
                </Form.Item>

                <p className="font-semibold text-right">Forgot Password</p>

                <Form.Item className="w-full ">
                  <Button
                    className="!bg-mango-primary-blue w-4/5 !font-bold  !mx-5 !text-white !rounded-md"
                    htmlType="submit"
                  >
                    CONFIRM
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <Row className="w-full mt-4">
            <div className="ml-auto mr-auto flex">
              <span className="mr-2">©2020 MANGO POWERED BY </span>
              <img src="/assets/imgs/enrichcologo.svg" className="h-5 " />
            </div>
          </Row>
        </div>
      </Col>
    </Row>
  );
};
