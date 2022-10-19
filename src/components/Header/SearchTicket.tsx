import { Input, List, Popover, Select } from "antd";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { GetInfoShedulerDetail } from "services/GetAppointmentShedulerDetail/GetAppointmentShedulerDetail";
import { APIGetClientByFilter } from "services/GetListWithFilter/GetListWithFilter";
import UseSearch from "src/utils/UseSearch";
import { TableListTicketByIdClient } from "./TableListTicketByIdClient";
import styled from "styled-components";

const InputSearchTicket = styled.div`
  [type="text"]:focus,
  [type="email"]:focus,
  [type="url"]:focus,
  [type="password"]:focus,
  [type="number"]:focus,
  [type="date"]:focus,
  [type="datetime-local"]:focus,
  [type="month"]:focus,
  [type="search"]:focus,
  [type="tel"]:focus,
  [type="time"]:focus,
  [type="week"]:focus,
  [multiple]:focus,
  textarea:focus,
  select:focus {
    --tw-ring-shadow: none;
  }
`;
export interface IClientList {
  customerID: number;
  rcpCustomer: null;
  customerCode: null;
  firstName: null;
  lastName: null;
  birthday: Date | null;
  contactPhone: string;
  workPhone: null;
  email: string;
  title: null;
  address: null;
  notes: null;
  customerName: string;
  city: null;
  state: null;
  zip: null;
  totalSpentByYear: number;
  country: null;
  imageFileName: null | string;
  joinDate: null;
  passwordLoginWeb: null;
  visitCount: null;
  fristVist: null;
  lastVisit: Date;
  favouritePolish: null;
  favouriteTechs1: string;
  favouriteTechs2: string;
  favouriteTechs3: string;
  favouriteTech: string;
  notesApp: null;
  coupon: string;
  rewardsPoint: number;
  rating: number;
  memberStatus: string;
  isKid: null;
  isChild: boolean | null;
  ratingDate: null;
  rewardsMember: null;
  isClientVerify: null;
  memberID: null;
  verification: null;
  isVerifyPhoneWithMango: null;
  isChangePhoneWhenReward: null;
  isChangePhone: boolean;
  visitCountByYear: null;
  isBlackList: boolean;
  isDeleted: null;
  atRisk: null;
  isVip: null;
  totalAmount: null;
  customerType: string;
}

type Props = {};
export const SearchTicket = (props: Props) => {
  const [dataClientList, setDataClientList] = useState<Array<IClientList>>([]);
  const [valueSearch, setValueSearch] = useState<string>("");
  const value = UseSearch(valueSearch, 500);
  const [idClient, setIdClient] = useState<number>(0);
  const dataClientListByFilter = new APIGetClientByFilter();
  const [showListTicket, setShowListTicket] = useState<boolean>(false);
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);

  useEffect(() => {
    if (value.length > 0) {
      const body = {
        loadIndex: 100,
        customerName: valueSearch,
        sortType: 0,
      };
      dataClientListByFilter.GetClientByFilter(body).then((res) => {
        if (res.status == 200) {
          setDataClientList(res.data);
        }
      });
    }
  }, [value]);
  const handleSearch = (value) => {
    setShowListTicket(false);
    setValueSearch(value);
  };
  const handleClickClient = (idClient) => {
    setValueSearch("");
    setShowListTicket(true);
    setIdClient(idClient);
  };
  return (
    <>
      <Popover
        trigger="click"
        content={
          <>
            {showListTicket ? (
              <TableListTicketByIdClient idClient={idClient} />
            ) : (
              <List
                className="max-h-60 w-[600px]  bg-white overflow-auto"
                dataSource={dataClientList}
                renderItem={(item: IClientList, index) => (
                  <List.Item
                    key={index}
                    className="flex justify-between cursor-pointer "
                    onClick={() => handleClickClient(item.customerID)}
                  >
                    <div>{item.customerName}</div>
                    <div className="mr-4">{item.contactPhone}</div>
                  </List.Item>
                )}
              />
            )}
          </>
        }
      >
        <InputSearchTicket>
          <div
            className="lg:flex w-[200px] justify-center items-center focus:outline-0 pr-2  
          h-[40px]  md:hidden  sm:hidden rounded-lg  bg-white relative"
          >
            <input
              className=" rounded-l-lg text-ms border-none w-full"
              type="search"
              autoComplete="off"
              spellCheck="false"
              placeholder="Search ticket"
              onFocus={() => {
                setIdClient(0);
                setIsFocusInput(true);
              }}
              onBlur={() => setIsFocusInput(false)}
              onChange={(e) => handleSearch(e.target.value)}
              value={valueSearch}
            ></input>
            <div className="search-icon  text-gray-800  rounded-lg ">
              {isFocusInput ? (
                <svg
                  className=" mb-2 mr-2"
                  width="20"
                  height="20"
                  viewBox="0 0 12 12"
                  fill="gray"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 
              0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 
              1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                  />{" "}
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 19L13 13M15 8C15 8.91925 14.8189 9.82951 14.4672 10.6788C14.1154 11.5281 13.5998
           12.2997 12.9497 12.9497C12.2997 13.5998 11.5281 14.1154 10.6788 14.4672C9.82951 14.8189 8.91925
            15 8 15C7.08075 15 6.1705 14.8189 5.32122 14.4672C4.47194 14.1154 3.70026 13.5998 3.05025
             12.9497C2.40024 12.2997 1.88463 11.5281 1.53284 10.6788C1.18106 9.82951 1 8.91925 1 8C1
              6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637
               1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                    stroke="gray"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        </InputSearchTicket>
      </Popover>
    </>
  );
};
