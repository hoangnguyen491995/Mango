import { Button, Col, Form, Input, Row } from "antd";
import { useRouter } from "next/router";


const Workspace = () => {
  const router = useRouter();
  const onFinish = (values: any) => {
    // console.log("Success:", values);
    return router.push("/login");
  };
  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
  };


  return (
    <div className="h-full w-full flex ">
      <div className="m-auto">
        <div
          className="border border-mango-border-dark rounded-md h-[300px] w-[600px] shadow-xl mx-auto mt-16"
          style={{ padding: "24px" }}
        >
          <h1 className="w-full text-mango-primary-blue font-semibold">
            Enter URL Server
          </h1>
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
              initialValue={"backend_bd.enrichcous.com:4443"}
              name="workspace"
              className="!w-full"
              rules={[
                {
                  // required: true,
                  message: "Please input your workspace url!",
                },
              ]}
            >
              <Input
                className="!w-full !border-b actice:!border-x-0"
                placeholder="your-workspace-url"
              />
            </Form.Item>

            <Form.Item className="w-full ">
              <Button
                className="!bg-mango-primary-blue w-4/5 !font-bold  !mx-5 !text-white !rounded-md"
                htmlType="submit"
              >
                CONTINUE
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className=" w-full flex mt-3">
          <Row className="mx-auto flex ">
            <span className="mr-2">©2020 MANGO POWERED BY </span>
            <img src="/assets/imgs/enrichcologo.svg" className="h-5 " />
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Workspace;
