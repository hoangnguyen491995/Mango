import React, { useState, useEffect } from 'react'
import { DatePicker, DatePickerProps} from "antd";
import moment from "moment"; 
import styled from "styled-components";

const DatePickerWrap = styled.div`
.ant-picker-input input {
    text-align: center;
    font-weight: bold;
    color: rgb(6 182 212);
    cursor: pointer;
    padding: 0px;
    width: 180px;
  
    border-style: none;
 
  },
`;

const { RangePicker } = DatePicker;
interface Props {
    typeFilter: string
  }

const customRangeStartEndFormat :any = (date) => {
    const Month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const Date = [
      "Sun",
      "Mon",
      "Tues",
      "Wed",
      "Thurs",
      "Frid",
      "Sat",
    ];
   
    if (date) {
      const getDate = Date[date.day()];
      const getMonth = Month[date.month()].slice(0, 3);
      const getDay = date.date();
      const getYear = date.year();
      const dateFormat = 
        getDate + " " + getDay  + " " +  getMonth + ", " + getYear
      return dateFormat;
    }
  };



function CalendarRange({typeFilter} : Props) {
    const  [dateStart, setDateStart] = useState<Date>(new Date())
    const  [dateEnd, setDateEnd] = useState(moment())
    const handleTypeDay = () => {
      setDateStart(new Date())
      setDateEnd(moment().clone().add('days',1))
    }
    const handleTypeWeek = () => {
      setDateStart(new Date())
      setDateEnd(moment().clone().add('days',7))
    }
    const handleTypeMonth = () => {
      setDateStart(moment().startOf('month').toDate())
      setDateEnd(moment().endOf('month'))
    }
    const handleTypeYear = () => {
      setDateStart(moment().startOf('years').toDate())
      setDateEnd(moment().endOf('years'))
    }

    useEffect(() => {
        {typeFilter == "DAY" ? handleTypeDay() :
        (typeFilter == "WEEK" ? handleTypeWeek() :
        (typeFilter == "MONTH" ? handleTypeMonth():
        handleTypeYear()))
      }}, [typeFilter]);
    
  return (
    <div className='range-list-batch'>
      <DatePickerWrap>
      <RangePicker
          size="large"
          defaultValue={[moment(dateStart), moment(dateEnd)]}
          format={customRangeStartEndFormat}
          value={[moment(dateStart), moment(dateEnd)]}
          suffixIcon={false}
          disabled
        />
      </DatePickerWrap>
    </div> 
  )
}

export default CalendarRange