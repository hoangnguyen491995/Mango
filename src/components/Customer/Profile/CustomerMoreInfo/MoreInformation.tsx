import React, { useEffect, useState } from "react";
import AddMoreInFo from "./AddMoreInFo";
import { CustomerMoreInfoDetail } from "../../DataStructures/DataInterfaces";
import { GetCustomerMoreInfo } from "services/Customers/GetCustomerMoreInfo";
import moment from "moment";
import CancelPopover from "./CancelPopover";
import EditMoreInfo from "./EditMoreInFo"

interface IProps{
  customerId: Number
}

function MoreInformation({ customerId }: IProps)  {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalVisibleEditPopover, setIsModalVisibleEditPopover] = useState<boolean>(false);
  const getCustomerMoreInfo = new GetCustomerMoreInfo()

  const [moreInfo, setMoreInfo] = useState<CustomerMoreInfoDetail[]>([]);
  const [customerEdit, setCustomerEdit] = useState<CustomerMoreInfoDetail>()


  const [reload, setReload] = useState<boolean>(false);


  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const showEditPopover = () => {
    setIsModalVisibleEditPopover(true);
  };
  const handleOkEditPopover  = () => {
    setIsModalVisibleEditPopover(false);
  };
  const handleCancelEditPopover  = () => {
    setIsModalVisibleEditPopover(false);
  };

  const handleClickEditIcon = (item) => {
    // console.log("item", item);
    
    setCustomerEdit(item)
    showEditPopover()
  }

  useEffect(() => {
    try {
    
      getCustomerMoreInfo.getCustomerMoreInfo(customerId).then((res) => {
        if (res.status === 200) {
          setMoreInfo(res.data.data);
          setReload(false)
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [customerId,reload]);

  return (
    <>
    <div>
 
      <div
        className="flex justify-between  mt-3 "
       
      >
        <span className="text-mango-gray-5 text-lg font-semibold cursor-default" >
          {" "}
          MORE INFORMATION
        </span>
        <div className="flex text-mango-primary-blue font-bold cursor-pointer"
         onClick={showModal}
        >      
             <img
            className="mr-1 h-6 w-6"
            src="/assets/imgs/Clients/info-plus.svg"
            alt="image close"
          />

          <span className="text-center text-ms">ADD INFO</span>
        </div>
      </div>

      <div className="overflow-y-auto h-[112px] p-2  w-full border border-mango-gray-300 rounded-sm bg-white">
      { moreInfo.length > 0 &&  moreInfo.map( (item, index)=> (
        <div className="flex h-11 px-2 text-center items-center row-more-info cursor-default">
          <div className="w-2/6 flex">
           <CancelPopover customerId = {customerId} id = {item.id} setReload={setReload}/>
          
            <span className="ml-2">{item.title}</span>
          </div>
          <div className="w-1/6">{moment(item.createDate).format("DD-MM-yyyy")}</div>
          <div className="w-2/6">{item.desciption}</div>
          <div className="w-1/6 flex !justify-end"
           onClick={()=>handleClickEditIcon(item)}>
            <img
              src="/assets/imgs/020_Pencil13-13.svg"
              alt="error"
              className="h-6"
            />
          </div>
        </div>
   
        ))
      }
      </div>
      <AddMoreInFo
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        customerId={customerId}
        setReload={setReload}
      />
      <EditMoreInfo
        visible={isModalVisibleEditPopover}
        onOk={handleOkEditPopover}
        onCancel={handleCancelEditPopover}
        
        setReload={setReload}
        customerEdit={customerEdit}
      />


    </div>
   
    </>
  );
}

export default MoreInformation;
