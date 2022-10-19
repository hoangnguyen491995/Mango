import React, { useEffect, useState } from "react";
import LableInput from "../LableInput";
import DonutChart from "./DonutChart";
import { Input } from "antd";
import Gallery from "./Gallery";
import GalleryFamily from "./GalleryFamily"
import MoreInformation from "./CustomerMoreInfo/MoreInformation";

const { TextArea } = Input;

function Profile({ customerInfor, customerId, setParamData, techHistory }) {
  const [textNote, setTextNote] = useState<string>();
  const [firstName, setFirstName] = useState<string>(customerInfor.firstName);
  const [lastName, setLastName] = useState<string>(customerInfor.lastName);
  const [email, setEmail] = useState<string>(customerInfor.email);
  const [phone, setPhone] = useState<string>(customerInfor.workPhone);
  const [birthDay, setBirthday] = useState<string>(customerInfor.birthday);
  const [address, setAddress] = useState<string>(customerInfor.address);
  const [city, setCity] = useState<string>(customerInfor.city);
  const [state, setState] = useState<string>(customerInfor.state);
  const [zip, setZip] = useState<number>(customerInfor.zip);

  useEffect(() => {
    let body = {
      customerID: customerId,
      firstName: firstName,
      lastName: lastName,
      birthday: birthDay,
      contactPhone: phone,
      isVerifyPhoneWithMango: true,
      isChangePhone: true,
      isChild: true,
      email: email,
      notes: textNote,
      favouritePolish: "",
      favouriteTechs1: "",
      favouriteTechs2: "",
      favouriteTechs3: "",
      rating: 0,
      address: address,
      city: city,
      state: state,
      zip: zip,
    };
    setParamData(body);
  }, [
    textNote,
    firstName,
    lastName,
    email,
    phone,
    birthDay,
    address,
    city,
    state,
    zip,
  ]);

  return (
    <div className="flex w-full h-full pl-10  pt-2 bg-mango-bg-gray-light">
      <div className=" w-1/3  pr-4 border-r border-mango-gray-4  ">
        <div className="w-full space-y-4">
          <LableInput
            label="First Name"
            value={firstName}
            type=""
            onChange={setFirstName}
          />
          <LableInput
            label="Last Name"
            value={lastName}
            type=""
            onChange={setLastName}
          />
          <LableInput
            label="Email"
            value={email}
            type=""
            placeholder="N/A"
            onChange={setEmail}
          />
          <LableInput
            label="Phone (Log In ID)"
            value={phone}
            type=""
            placeholder="N/A"
            onChange={setPhone}
            maxLength={14}
          />
          <LableInput
            label="Date of Birth"
            value={birthDay}
            type=""
            placeholder="N/A"
            onChange={setBirthday}
          />
          <LableInput
            label="Address"
            value={address}
            type=""
            placeholder="N/A"
            onChange={setAddress}
          />
          <LableInput
            label="City"
            value={city}
            type=""
            placeholder="N/A"
            onChange={setCity}
          />
          <LableInput
            label="State"
            value={state}
            type=""
            placeholder="N/A"
            onChange={setState}
          />
          <LableInput
            label="Zip"
            value={zip}
            type=""
            placeholder="N/A"
            onChange={setZip}
          />
        </div>
        <MoreInformation customerId={customerId} />
        <div className="chart-container w-full">
          <div className="flex">
            <span className="text-mango-gray-5 text-lg font-semibold">
              TOTAL VISIT STATS: 3
            </span>
          </div>

          <DonutChart customerId={customerId} />
        </div>
      </div>

      <div className=" w-1/3 px-4 border-r border-mango-gray-4  ">
        <div className="flex tiltle-service">
          <span className=" w-full flex py-2 text-mango-gray-5 text-lg font-bold">
            SERVICES
          </span>
        </div>

        <div className="w-full space-y-4 cursor-default">
          <LableInput
            label="Favorite Polish"
            value={customerInfor.favouritePolish || "N/A"}
            disable={true}
          />
          <LableInput
            label="Favorite Techs"
            value={customerInfor.favouriteTech || "N/A"}
            disable={true}
          />
          <LableInput
            label="Favorite Services"
            value={customerInfor.FavouriteTechs3 || "N/A"}
            disable={true}
          />
          <LableInput
            label=""
            value={customerInfor.FavouriteTechs1 || "N/A"}
            disable={true}
          />
          <LableInput
            label=""
            value={customerInfor.FavouriteTechs3 || "N/A"}
            disable={true}
          />
          <LableInput
            label=""
            value={customerInfor.FavouriteTechs3 || "N/A"}
            disable={true}
          />
          <LableInput
            label="Number of visits"
            value={customerInfor.favouritePolish || "0"}
            disable={true}
          />
          <LableInput
            label="Total Spending YTD"
            value={`${customerInfor.totalSpentByYear || "0.00"} `}
            disable={true}
          />
        </div>
        <div className="flex text-mango-text-medium mt-3 mb-1">Notes</div>
        <TextArea
          className="text-input-area "
          rows={4}
          placeholder="Notes"
          maxLength={1000}
          value={textNote}
          onChange={(e) => setTextNote(e.target.value)}
        />
        <div>
          <span className=" w-full mt-2 flex py-2 text-mango-gray-5 text-lg font-semibold">
            GALLERY
          </span>
          <Gallery customerId={customerId} />

          <div>
            <span className=" w-full flex py-2 text-mango-gray-5 text-lg font-semibold">
              TECH HISTORY
            </span>
            <div className="flex">
              <span className="text-lable flex">
                {techHistory.map((tech, index) => (
                  <span key={index}>
                    {" "}
                    {`${index > 1 ? "," : ""} ${tech.employeeName} (${
                      tech.total
                    })`}{" "}
                  </span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-1/3  mx-3">
        <div className="flex tiltle-service">
          <span className=" w-full flex py-2 text-mango-gray-5 text-lg font-bold">
            FAMILY MEMBER
          </span>
        </div>
        <div className="w-full space-y-4">
          <LableInput label="First Name" value="asas" />
          <LableInput label="Last Name" value="N/A" />
          <LableInput label="Email" value="N/A" />
          <LableInput label="Phone (Log In ID)" value="N/A" />
          <LableInput label="Date of Birth" value="N/A" />
          <LableInput label="Address" value="N/A" />
          <LableInput label="City" value="N/A" />
          <LableInput label="State" value="N/A" />
          <LableInput label="Zip" value="N/A" />
        </div>
        <span className=" w-full mt-4 mb-3 flex py-2 text-mango-gray-5 text-lg font-semibold">
          GALLERY
        </span>
        <GalleryFamily customerId={customerId} />
      </div>
    </div>
  );
}

export default Profile;
