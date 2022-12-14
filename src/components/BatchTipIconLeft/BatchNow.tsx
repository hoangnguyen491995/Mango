// @flow
import React, { useState } from "react";
import ContentBatchNow from "./ContentBatchNow";

type Props = {};
const BatchNow = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    
  };
  return (
    <div>
    <div className="absolute opacity-90  rounded-r-md bg-mango-primary-blue bottom-16 p-2 ml-1 hover:w-36 hover:cursor-pointer" 
      onClick={showModal} 
      onMouseEnter = {()=> setIsHover(true)} 
      onMouseLeave={() => setIsHover(false)}>
      <div className="flex justify-between"  >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="23.855"
          height="23.483"
          viewBox="0 0 23.855 23.483"
        >
          <g id="Batch" transform="translate(0.2 -0.895)">
            <g id="Batch-2" data-name="Batch" transform="translate(-0.2 0.895)">
              <g id="H4" transform="translate(0 0)">
                <g id="Layer_62" data-name="Layer 62">
                  <path
                    id="Path_7785"
                    data-name="Path 7785"
                    d="M23.655,13.185l-6.617-3.109.149-.4.746-.05a1.07,1.07,0,0,0,1.02-1.07V7.513a1.07,
                    1.07,0,0,0-1.02-1.07l-.746-.05a8.284,8.284,0,0,0-.4-.995l.5-.547h0a1.144,1.144,0,0,0,
                    .274-.721,1.07,1.07,0,0,0-.323-.771h0l-.721-.721a1.07,1.07,0,0,0-.771-.323,1.144,1.144,0,
                    0,0-.721.274l-.547.5a7.04,7.04,0,0,0-.995-.423V1.916A1.07,1.07,0,0,0,12.362.9h-1.02a1.07,
                    1.07,0,0,0-1.095,1.02v.746a5.92,5.92,0,0,0-.995.4l-.547-.5h0a1.194,1.194,0,0,0-.746-.274.97.97,
                    0,0,0-.746.323l-.746.721h0a1.194,1.194,0,0,0-.323.771,1.045,1.045,0,0,0,.3.721h0l.473.547a6.915,
                    6.915,0,0,0-.4.995H5.77A1.1,1.1,0,0,0,4.725,7.463v1.02A1.1,1.1,0,0,0,5.77,9.578h.721a2.189,2.189,
                    0,0,1,.124.373L-.2,13.185h0l3.01,1.393L-.2,16h0l3.01,1.418,1.667-.8L3.133,16l1.343-.622L6.143,
                    14.6l-1.667-.8-1.343-.622,2.985-1.393a.174.174,0,0,0-.025.124.97.97,0,0,0,
                    .323.746l.149.174.572.572a1.194,1.194,0,0,0,.771.323h.1l.672-.3.5-.448.249.1a4.677,4.677,0,0,0,
                    .746.3l.05.746a1.1,1.1,0,0,0,1.07,1.02h1.045a1.094,
                    1.094,0,0,0,1.07-1.045l.05-.721.7-.274.3-.149.547.5h0a.2.2,0,0,0,.1.1l.348.149.274.05a1.07,
                    1.07,0,0,0,.771-.323h0l.522-.547.2-.2h0a.97.97,0,0,0,.323-.746v-.075l2.811,
                    1.318-1.368.622-1.642.8-1.343.622L14.327,16,11.74,17.214,9.153,16l-1.667-.771L5.82,
                    16l1.667.771,4.254,1.99,4.254-1.99L17.66,16l1.318-.622L20.347,16,19,16.617l-1.667.8-5.6,
                    2.612-5.6-2.612-1.667.771,7.264,3.383L19,18.184l1.642-.771L23.655,
                    16h0l-1.368-.647-1.642-.771ZM16.118,9.329a6,6,0,0,1-.373.821h0a1.343,
                    1.343,0,0,0-.124.522,1.094,1.094,0,0,0,.274.721h0l.5.547-.448.448-.224.224-.547-.5h0a.97.97,0,0
                    ,0-.721-.274,1.02,1.02,0,0,0-.522.124l-.821.348h0a.647.647,0,0,0-.323.149,1.119,1.119,0,0,
                    0-.473.821v.721h-.97l-.05-.721a1.045,1.045,0,0,0-.5-.871l-.274-.124h0a3.383,3.383,0,0,
                    1-.821-.348h0a1.02,1.02,0,0,0-.522-.124,1.094,1.094,0,0,
                    0-.721.274h0l-.547.473-.249-.249-.423-.4.5-.547a1.02,1.02,0,0,0,.274-.721.945.945,0,0,
                    0-.124-.522h0a8.582,8.582,0,0,1-.348-.846,1.07,1.07,0,0,0-.97-.771l-.721-.05V7.513h.721a1.1,1.1,0,
                    0,0,1-.771h0A3.557,3.557,0,0,1,7.909,5.9a.871.871,0,0,0,.124-.5,1.194,1.194,0,0,0-.274-.746h0L7.287,
                    4.13l.647-.672.547.5h0A1.144,1.144,0,0,0,9.2,4.23a1.343,1.343,0,0,0,.522-.124h0a5.025,5.025,0,0,1
                    ,.846-.348h0a1.07,1.07,0,0,0,.771-1V2.041h.945l.05.721a1.07,1.07,0,0,0,.771.97h0a5.149,5.149,0,0,
                    1,.846.373h0a1.144,1.144,0,0,0,.5.124,1.194,1.194,0,0,0,
                    .746-.274h.025l.5-.473.672.672-.5.547h0a1.094,1.094,0,0,0-.249.7,1.343,1.343,0,0,0,.124.522h0a4.776,
                    4.776,0,0,1,.348.821,1.1,1.1,0,0,0,1,.8h.7v.945l-.721.05h0A1.02,1.02,0,0,0,16.118,9.329Z"
                    transform="translate(0.2 -0.895)"
                    fill="#fff"
                  />
                  <path
                    id="Path_7786"
                    data-name="Path 7786"
                    d="M37.081,14.7a3.706,3.706,0,0,0-2.612,1.094h0a3.582,3.582,0,0,0-1.07,2.587,3.681,3.681,0,0,0,1.07,
                    2.612,3.035,3.035,0,0,0,.8.6,3.706,3.706,0,0,0,3.532.05,3.184,3.184,0,0,0,.871-.647,3.706,3.706,0,
                    0,0,1.094-2.612A3.738,3.738,0,0,0,37.081,14.7Zm1.791,5.5h0a2.562,2.562,0,0,1-1.592.746h-.572a2.55,
                    2.55,0,0,1-1.443-4.328h0A2.562,2.562,0,0,1,38.872,20.2Z"
                    transform="translate(-25.042 -11.266)"
                    fill="#fff"
                  />
                  <path
                    id="Path_7787"
                    data-name="Path 7787"
                    d="M77,68.071l1.343.622,1.343-.647.3.647.3-.647L78.642,67.3Z"
                    transform="translate(-57.796 -50.782)"
                    fill="#fff"
                  />
                  <path
                    id="Path_7788"
                    data-name="Path 7788"
                    d="M82.4,70.947l1.343.647.3-.647-.3-.647Z"
                    transform="translate(-61.853 -53.036)"
                    fill="#fff"
                  />
                  <path
                    id="Path_7789"
                    data-name="Path 7789"
                    d="M13.567,64.1l-1.667.8,1.667.771,1.667-.771Z"
                    transform="translate(-8.89 -48.378)"
                    fill="#fff"
                  />
                  <path
                    id="Path_7790"
                    data-name="Path 7790"
                    d="M21.61,56.622,20.267,56l-1.667.771,1.343.622Z"
                    transform="translate(-13.923 -42.293)"
                    fill="#fff"
                  />
                  <path
                    id="Path_7791"
                    data-name="Path 7791"
                    d="M-.2,68.693h0l11.94,5.572h0l11.915-5.572h0l-1.368-.647-.3.647-.3.647-1.343-.647-8.607,4.03-8.607-4.03,1.343-.622L2.81,67.3Z"
                    transform="translate(0.2 -50.782)"
                    fill="#fff"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
        { isHover && <span
          className="  inline-flex h-0 pl-2 text-sm  text-white
           duration-300 hover:block underline ">
          BATCH NOW 
        </span>}
      </div>
      </div>
      <ContentBatchNow
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default BatchNow;
