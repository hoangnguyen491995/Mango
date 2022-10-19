import { Button, Modal, Space } from "antd";
interface Props {
  content: string;
  visible: boolean;
  onOk: any;
  onCancel: any;
}
export const MessagePopup = ({ content, visible, onOk, onCancel }: Props) => {
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      closable={false}
      centered
      footer={null}
    >
      <h2
        className="text-center "
        style={{ font: "normal normal 600 var(--s-18)", color: "#262626" }}
      >
        {content.toLocaleUpperCase()}
      </h2>
      <div className="flex ml-72">
        <Space>
          <Button type="text" className="!font-bold" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="!bg-mango-primary-blue !text-white !border-none !rounded hover:!opacity-50"
            onClick={onOk}
          >
            Continue
          </Button>
        </Space>
      </div>
    </Modal>
  );
};
