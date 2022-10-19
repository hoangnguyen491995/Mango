import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal } from "antd";
import { useContext } from "react";
import { IoBackspace, IoChevronBack } from "react-icons/io5";
import { APIFastRegister } from "services/FastRegisterCustomer/FastRegisterCustomer";
import { IRegisterCustomer } from "src/components/AddNewTix/Content/DataStructures";
import { messageWarning } from "src/components/MessageAlert";
import { IClientInfo } from "../DataStructures";
interface Props {
  setShowAddNewClient: Function;
  handleChangeTech: Function;
}
export const AddNewClient = ({ setShowAddNewClient, handleChangeTech }) => {
  const apiFastRegister = new APIFastRegister();

  const onFinish = (values: any) => {
    const body: IRegisterCustomer = {
      date: "string",
      empId: 0,
      gender: true,
      firstName: values.firstname,
      lastName: values.lastname,
      phone: values.phone,
      sex: "string",
      portalCode: "string",
      isKid: true,
      rvcNo: Number(process.env.NEXT_PUBLIC_RVC_NO),
    };
    apiFastRegister.FastRegister(body).then((res) => {
      if (res.status == 200) {
        // console.log(res.data);
        const dataClient = {
          customerID: res.data.id,
        };
        res.data.error
          ? messageWarning(res.data.error)
          : (handleChangeTech(dataClient), setShowAddNewClient(false));
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    messageWarning(errorInfo.errorFields[0].errors[0]);
  };
  //class Input
  const classInput =
    "!border-x-0 !border-t-0  !border-b-mango-border-dark !rounded-none !text-center ";
  return (
    <>
      {/* <button onClick={() => setShowAddNewClient(false)}>
        <ArrowLeftOutlined color="black" className="h-1/2 w-full" />
      </button> */}
      <div
        className="w-full text-mango-primary-blue text-center mt-5"
        style={{ height: "35px", fontSize: "15px", fontWeight: "600" }}
      >
        NEW CLIENT
      </div>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex flex-col justify-between "
        style={{ marginTop: "30px" }}
      >
        <div>
          <Form.Item
            name="firstname"
            rules={[{ required: true, message: "First Name Not Null" }]}
          >
            <Input
              placeholder="FIRST NAME*"
              className={classInput}
              id="inputFirstName"
            />
          </Form.Item>
          <Form.Item
            name="lastname"
            rules={[{ required: true, message: "Last Name Not Null" }]}
          >
            <Input
              placeholder="LAST NAME"
              className={classInput}
              id="inputLastName"
            />
          </Form.Item>
          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Phone Number Not Null",
              },
              {
                min: 10,
                max: 10,
                message: "Phone number malformed format",
              },
            ]}
          >
            <Input
              type="number"
              placeholder="PHONE"
              className={`${classInput} `}
              id="inputPhone"
            />
          </Form.Item>
        </div>

        <Form.Item className=" w-full !mb-0" style={{ marginTop: "307px" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="!w-full !bg-mango-primary-blue !border-none mango-shadow "
          >
            <span className="font-bold">SAVE</span>
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
