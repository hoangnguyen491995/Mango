import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Modal } from "antd";
import { useContext } from "react";
import { IoBackspace, IoChevronBack } from "react-icons/io5";
import { APIFastRegister } from "services/FastRegisterCustomer/FastRegisterCustomer";
import { messageWarning } from "src/components/MessageAlert";
import styled from "styled-components";
import { IRegisterCustomer } from "../../DataStructures";
import { ShowContent, type } from "../../helper";
import TixContext from "../../TixContext";

const InputUAT = styled.input`
  outline: none;
`;
const LabelUAT = styled.label`
  :after {
    content: "*";
    color: red;
  }
`;
export const AddNewClient = ({ setShowAddNewClient }) => {
  const tixCT = useContext(TixContext)[0];
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
        res.data.error
          ? messageWarning(res.data.error)
          : (setShowAddNewClient(false),
            tixCT.setIdClientTix(res.data.id),
            (tixCT.dataItemTix[tixCT.idAppt].customerID = res.data.id),
            (tixCT.dataItemTix[tixCT.idAppt].name =
              res.data.cus.firstName + " " + res.data.cus.lastName),
            tixCT.setShowContent(ShowContent(type.ShowSearchServiceItem)));
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    messageWarning(errorInfo.errorFields[0].errors[0]);
  };
  //class Input
  const classInput =
    "!border-x-0 !border-t-0  !border-b-mango-border-dark !rounded-none !text-center !text-[18px] !leading-[27px] !h-[30px]  ";
  return (
    <div className="h-full w-full relative ">
      <button onClick={() => setShowAddNewClient(false)}>
        <img src="/assets/imgs/left-arrow.svg" />
      </button>
      <div className="w-[80%] h-full  mx-auto flex flex-col justify-center">
        <h1 className="w-full text-mango-primary-blue text-xl text-center font-bold">
          NEW CLIENT
        </h1>
        <Form
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col justify-between !mt-20 h-full "
        >
          <div className="mb-1">
            <Form.Item
              name="firstname"
              className="relative "
              rules={[{ required: true, message: "First Name Not Null" }]}
            >
              <InputUAT
                placeholder="First Name*"
                className={classInput + " w-full"}
                style={{ borderBottom: "1px solid gray" }}
              />
            </Form.Item>
            <Form.Item
              name="lastname"
              rules={[{ required: true, message: "Last Name Not Null" }]}
            >
              <div className="border-b border-mango-border-dark">
                <Input
                  placeholder="Last Name"
                  className={classInput}
                  bordered={false}
                />
              </div>
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
              <div className="border-b border-mango-border-dark">
                <Input
                  type="number"
                  placeholder="Phone"
                  bordered={false}
                  className={classInput + " !text-mango-text-medium"}
                />
              </div>
            </Form.Item>
          </div>

          <Form.Item className="w-full ">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full !h-[40px] !rounded-[4px] !bg-mango-primary-blue !border-mango-primary-blue mango-shadow absolute bottom-[-4px] "
            >
              <span className="font-bold">SAVE</span>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
