import { Col, Row } from "antd";
import { useState } from "react";
import { BiX } from "react-icons/bi";
import { theme } from "tailwind.config";

function AddClientService() {
  const [colorIcon, setColorIcon] = useState<boolean>(false);
  return (
    <div>
      <Row className="mt-2" justify="space-between">
        <Col span={24}>
          <div className="flex ml-2">
            <img
              className="w-[25px] h-[25px] mr-2"
              src={`${process.env.NEXT_PUBLIC_DOMAIN_API_UAT_MANGO}/Content/mango/General Assets/SVG/CheckOut/New24px-cancel-service-01.svg
          `}
            />
            <span className="text-lg ml-2">OWNER</span>
            <svg
              onClick={() => setColorIcon(!colorIcon)}
              style={{
                color: colorIcon
                  ? ""
                  : `${theme.extend.colors["mango-primary-red"]}`,
              }}
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              color="gray"
              className="w-[32px] h-[32px] "
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 360a16 16 0 01-9-2.78c-39.3-26.68-56.32-45-65.7-56.41-20-24.37-29.58-49.4-29.3-76.5.31-31.06
               25.22-56.33 55.53-56.33 20.4 0 35 10.63 44.1 20.41a6 6 0 008.72 0c9.11-9.78 23.7-20.41 44.1-20.41 30.31 
               0 55.22 25.27 55.53 56.33.28 27.1-9.31 52.13-29.3 76.5-9.38 11.44-26.4 29.73-65.7 56.41A16 16 0 01256 360z"
              ></path>
            </svg>
          </div>
        </Col>
      </Row>
      <Row className="mt-2" justify="space-between">
        <Col span={8}>
          <div className="flex ml-2 ">
            <BiX
              style={{
                width: "26px",
                height: "26px",
                color: `${theme.extend.colors["mango-orange"]}`,
              }}
            />
            <span className="text-lg ml-2">CC FEE</span>
          </div>
        </Col>
        <Col span={16}>
          <div className="flex justify-end ">
            <span className="font-semibold text-xl text-zinc-500 mx-4">
              $123.00
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
export default AddClientService;
