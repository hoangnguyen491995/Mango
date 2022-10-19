import React, {useEffect, useState, useContext} from 'react'
import {  Col, Modal } from "antd";
import HomeContext from '../../HomeContext';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import { ListAppointmentDetail } from '../../IterfaceStructures';

import cc from "classnames";


interface IProps {
  visible: boolean,
  onOk: any,
  onCancel: any,
  appointment: ListAppointmentDetail
  
}

function ModalRebook({visible, 
  onOk, 
  onCancel, 
  appointment, 
  // employeeName, 
  // customerName, 
  // appointmentId, 
  // appointmentStatusID, 
  // rvcNo
}: IProps) {
   
    const bookContext = useContext(HomeContext)[0];
    useEffect(()=>{
      appointment && bookContext.setTechName(appointment.employeeName)
    }, [appointment])
  
  
    
  return (
    <Modal
      visible={visible}
      onOk={onOk}
      // onCancel={onCancel}
      width={1000}
      className="modal-rebook"
      centered
    
      footer={null}
      closable={false}
      maskClosable= {true}
    >
     {appointment && <div className="flex h-[500px] ">
        <Col className="w-2/4 pr-6 overflow-auto  ">
          {/* <LeftContent onOk={onOk} onCancel={onCancel} /> */}
          <LeftContent appointment = {appointment}/>
        </Col>
        
        <Col className="w-2/4 pl-6 ">
          <RightContent 
          onCancel= {onCancel} 
          appointment = {appointment}
          
          />
        </Col>
      </div>}
    </Modal>
  )
}


export default ModalRebook