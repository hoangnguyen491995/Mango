// @flow
import { Button, Form, Input, Popover } from "antd";
import * as React from "react";
import { APIFastRegister } from "services/FastRegisterCustomer/FastRegisterCustomer";
import { IRegisterCustomer } from "../AddNewTix/Content/DataStructures";
import { messageSuccess, messageWarning } from "../MessageAlert";
type Props = {};
const classInput =
  "!border-x-0 !border-t-0  !border-b-mango-border-dark !rounded-none !text-center ";
export const AddNewClient = (props: Props) => {
  const [showAddNewClient, setShowAddNewClient] =
    React.useState<boolean>(false);
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
      rvcNo: 1,
    };
    apiFastRegister.FastRegister(body).then((res) => {
      if (res.status == 200) {
        setShowAddNewClient(false);
        res.data.error
          ? messageWarning(res.data.error)
          : messageSuccess("Succesful");
      }
    });
  };
  const onFinishFailed = (errorInfo: any) => {
    messageWarning(errorInfo.errorFields[0].errors[0]);
  };
  const handleShowAddNewClient = (value) => {
    setShowAddNewClient(value);
  };

  return (
    <Popover
      onVisibleChange={handleShowAddNewClient}
      visible={showAddNewClient}
      content={
        <>
          <div className="w-[250px] p-[10px]">
            <p className={`font-bold text-mango-primary-blue text-center`}>
              RESGISTER NEW CLIENT
            </p>
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="flex flex-col justify-between "
            >
              <div>
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
                  {" "}
                  <Input
                    type="number"
                    placeholder="10 DIGIT PHONE NUMBER"
                    className={classInput}
                  />
                </Form.Item>
                <Form.Item
                  name="firstname"
                  rules={[{ required: true, message: "First Name Not Null" }]}
                >
                  <Input placeholder="First Name*" className={classInput} />
                </Form.Item>

                <Form.Item
                  name="lastname"
                  rules={[{ required: true, message: "Last Name Not Null" }]}
                >
                  <Input placeholder="Last Name*" className={classInput} />
                </Form.Item>
              </div>
              <Form.Item className="w-full ">
                <div className="w-full !flex !justify-between">
                  <Button
                    type="primary"
                    className="!w-[48%] !bg-mango-primary-orange !border-none mango-shadow "
                    onClick={() => setShowAddNewClient(false)}
                  >
                    <span className="font-bold">CANCEL</span>
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="!w-[48%] !bg-mango-primary-blue !border-none mango-shadow "
                  >
                    <span className="font-bold">CONFIRM</span>
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </>
      }
      placement="bottomLeft"
      trigger="click"
    >
      <button
        className="border-2  border-mango-pink  text-mango-pink text-[16px]
        hover:bg-mango-pink-100 rounded-[4px] w-[145px] h-[45px] button-client"
        style={{ boxShadow: "0px 0px 15px #0000004d" }}
      >
        ADD NEW +
      </button>
    </Popover>
  );
};
