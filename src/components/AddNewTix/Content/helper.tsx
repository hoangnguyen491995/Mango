import moment from "moment";
import { APIEmpAssignSer } from "services/EmpAssignSer/EmpAssignSer";
import { ListServiceWithTech } from "./DataStructures";

export const getTimeNearest12H = () => {
  const d = new Date();
  const roundMinutes = (Math.ceil((d.getMinutes() * 60) / 300) * 300) / 60; // làm tròn lên 5 phút
  let addHour = 0;
  if (roundMinutes == 60) {
    addHour = 1;
  }
  const getMinutes =
    roundMinutes < 10
      ? `0${roundMinutes}`
      : roundMinutes == 60
      ? "00"
      : roundMinutes;
  const setAMPM = d.getHours() + addHour >= 12 ? " PM" : " AM";
  const convert12HHour =
    d.getHours() + addHour >= 12
      ? d.getHours() + addHour - 12
      : d.getHours() + addHour;
  const getHour = convert12HHour < 10 ? "0" + convert12HHour : convert12HHour;
  return getHour + ":" + getMinutes + setAMPM;
};

export const convert12HToSec = (time: string) => {
  let result = 0;

  const AMPM = time.slice(-2);
  const h = Number(time.slice(0, 2));
  if (AMPM == "PM") {
    result = (h + 12) * 3600;
  } else {
    result = h * 3600;
  }
  result += Number(time.slice(3, 5)) * 60; // minutes
  if (result >= 86400) {
    result = result - 86400;
  }
  return result;
};
export const convertSecTo12H = (sec: number) => {
  const h = sec / 3600 >= 12 ? sec / 3600 - 12 : sec / 3600;
  const m = (sec % 3600) / 60;
  const AMPM = sec / 3600 >= 12 ? "PM" : "AM";
  const h12 = Math.floor(h) < 10 ? "0" + Math.floor(h) : Math.floor(h);
  return h12 + ":" + (m < 10 ? "0" + m : m) + " " + AMPM;
};

export const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.map((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};
export const OBJtoXML = (obj) => {
  var xml = "";
  for (var prop in obj) {
    xml += obj[prop] instanceof Array ? "" : "<" + prop + ">";
    if (obj[prop] instanceof Array) {
      for (var array in obj[prop]) {
        xml += "<" + prop + ">";
        xml += OBJtoXML(new Object(obj[prop][array]));
        xml += "</" + prop + ">";
      }
    } else if (typeof obj[prop] == "object") {
      xml += OBJtoXML(new Object(obj[prop]));
    } else {
      xml += obj[prop];
    }
    xml += obj[prop] instanceof Array ? "" : "</" + prop + ">";
  }
  var xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
  return xml;
};
export const type = {
  ShowSelectTimeTix: "ShowSelectTimeTix",
  ShowSelectTech: "ShowSelectTech",
  ShowInfoClient: "ShowInfoClient",
  ShowSearchClient: "ShowSearchClient",
  ShowSearchServiceItem: "ShowSearchServiceItem",
  ShowSelectDuration: "ShowSelectDuration",
  ShowOpenItem: "ShowOpenItem",
};

export const ShowContent = (action) => {
  const showContent = {
    showSelectTimeTix: false,
    showSearchServiceItem: false,
    showSelectDuration: false,
    showInfoClient: false,
    showSearchClient: false,
    showSelectTech: false,
    showOpenItem: false,
  };

  switch (action) {
    case type.ShowInfoClient:
      showContent.showInfoClient = true;
      break;
    case type.ShowSearchClient:
      showContent.showSearchClient = true;
      break;
    case type.ShowSearchServiceItem:
      showContent.showSearchServiceItem = true;
      break;
    case type.ShowSelectDuration:
      showContent.showSelectDuration = true;
      break;
    case type.ShowSelectTech:
      showContent.showSelectTech = true;
      break;
    case type.ShowSelectTimeTix:
      showContent.showSelectTimeTix = true;
      break;
    case type.ShowOpenItem:
      showContent.showSearchServiceItem = true;
      showContent.showOpenItem = true;
    default:
      break;
  }

  return showContent;
};
export const checkAssignEmp = (itemId, empId) => {
  const dataCheckAssgin = new APIEmpAssignSer();
  const body = {
    itemId: itemId,
    empId: empId,
  };
  return dataCheckAssgin.EmpAssignSer(body).then((res) => {
    if (res.status === 200) {
      return res.data.result.message;
    }
  });
};
export const changeStartallsametime = (
  idAppt,
  dataItemTix,
  startDateTix,
  startTimeTix,
  idTech
) => {
  if (dataItemTix[idAppt].isStartAllSameTime) {
    //Change start all same time
    const dataFilterbyIdEmp = dataItemTix[idAppt].listWithTech.filter(
      (item) => item.employeeID === idTech
    )[0];

    if (dataFilterbyIdEmp && dataFilterbyIdEmp.listServiceWithTech.length > 0) {
      dataFilterbyIdEmp.listServiceWithTech.map((item) => {
        var dataStartTime = startTimeTix;
        const dataStartTimeStr = dataStartTime;

        const dataEndTimeStr = moment(dataStartTimeStr)
          .add(item.duration, "minutes")
          .format("MM-DD-YYYY hh:mm A");
        item.startTime = dataStartTimeStr;
        item.endTime = dataEndTimeStr;
      });
    }
  }
};
export const changeStartOOAT = (
  idAppt,
  dataItemTix,
  startDateTix,
  startTimeTix,
  idTech
) => {
  if (!dataItemTix[idAppt].isStartAllSameTime) {
    //Change start OOAT
    const dataFilterbyIdEmp = dataItemTix[idAppt].listWithTech.filter(
      (item) => item.employeeID === idTech
    )[0];
    if (dataFilterbyIdEmp && dataFilterbyIdEmp.listServiceWithTech.length > 0) {
      dataFilterbyIdEmp.listServiceWithTech.map((item, index) => {
        const dataLastTime: ListServiceWithTech =
          dataFilterbyIdEmp.listServiceWithTech[index - 1];

        var dataStartTime = startTimeTix;
        if (dataLastTime) {
          // Nếu tồn tại item service cuối cùng
          dataStartTime = dataLastTime.endTime;
        }

        const dataStartTimeStr = dataStartTime;
        console.log(dataStartTime);

        const dataEndTimeStr = moment(dataStartTimeStr)
          .add(item.itemDur, "minutes")
          .format("MM-DD-YYYY hh:mm A");

        item.startTime = dataStartTimeStr;
        item.endTime = dataEndTimeStr;
      });
    }
  }
};
export const convert12HToSecSelectTime = (time: string) => {
  let result = 0;
  if (
    time.slice(time.length - 2, time.length) == "PM" &&
    Number(time.slice(0, 2)) != 12
  ) {
    result = (Number(time.slice(0, 2)) + 12) * 3600;
  } else {
    result = Number(time.slice(0, 2)) * 3600;
  }
  result += Number(time.slice(3, 5)) * 60; // minutes
  return result;
};
