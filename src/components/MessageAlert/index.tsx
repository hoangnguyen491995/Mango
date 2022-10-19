import { Button, message, Modal } from "antd";
{
  /* <span className="ml-2 flex items-center justify-center h-full"> */
}
export const messageSuccess = (content) => {
  return message.success({
    content: <span className="ml-2">{content}</span>,
    icon: (
      <div className="h-full w-[50px] text-[8px] font-bold ">
        <div className="swal2-icon swal2-success swal2-icon-show">
          <div
            className="swal2-success-circular-line-left"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          />
          <span className="swal2-success-line-tip" />{" "}
          <span className="swal2-success-line-long" />
          <div className="swal2-success-ring" />{" "}
          <div
            className="swal2-success-fix"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          />
          <div
            className="swal2-success-circular-line-right"
            style={{ backgroundColor: "rgb(255, 255, 255)" }}
          />
        </div>
      </div>
    ),
    className: "customMessage",
  });
};

export const messageWarning = (content) => {
  return message.warning({
    content: <span className="ml-2">{content}</span>,
    icon: <img src="/assets/imgs/warning_Icon.svg" className="h-10 w-10" />,
    className: "customMessage",
  });
};
