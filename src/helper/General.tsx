import moment from "moment";
import { DeclineOnlineBooking } from "services/Appointments/DeclineOnlineBooking";
import { AcceptOnlineBooking } from "services/Appointments/AcceptOnlineBooking";
import { messageSuccess } from "src/components/MessageAlert";
import { DoneAService } from "services/Appointments/DoneAService";
export const DateTimeFormat = (date: any, time: any) => {
  var datetime = "";
  let DateFormat = date.replace(/-/g, "/");

  if (time.substring(6, 8) == "AM") {
    datetime = `${DateFormat} ${time.substring(0, 2)}:${time.substring(
      3,
      5
    )}:00`;
  } else if (
    time.substring(6, 8) == "PM" &&
    Number(time.substring(0, 2)) == 12
  ) {
    datetime = `${DateFormat} ${time.substring(0, 2)}:${time.substring(
      3,
      5
    )}:00`;
  } else {
    datetime = `${DateFormat} ${
      Number(time.substring(0, 2)) + 12
    }:${time.substring(3, 5)}:00`;
  }
  return datetime;
};

export const DateFormat = (datetime: any) => {
  return moment(datetime).format("MM/DD/yyyy");
};

export const handleDeclineOnlineBooking = (
  rvcNo,
  appointmentID,
  employeeID,
  setReFetchData
) => {
  const declineOnlineBooking = new DeclineOnlineBooking();
  try {
    declineOnlineBooking
      .declineOnlineBooking(rvcNo, appointmentID, employeeID)
      .then((res) => {
        if (res.status === 200) {
          messageSuccess("Decline Success!");
          setReFetchData(true);
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const handleComfirmOnlineBooking = (
  rvcNo,
  appointmentID,
  setReFetchData
) => {
  const acceptOnlineBooking = new AcceptOnlineBooking();
  try {
    acceptOnlineBooking
      .acceptOnlineBooking(rvcNo, appointmentID, 0)
      .then((res) => {
        if (res.status === 200) {
          messageSuccess("Confirm Success!");
          setReFetchData(true);
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const handleDoneAService = (
  appointmentDetailID,
  rvcNo,
  employeeId,
  setReFetchData
) => {
  const doneAService = new DoneAService();
  try {
    doneAService.doneAService(appointmentDetailID, rvcNo, 0).then((res) => {
      if (res.status === 200) {
        messageSuccess("Confirm Success!");
        setReFetchData(true);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
export const currencyFormat = (num: Number) => {
  return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const getFormattedPhoneNum = ( input ) =>{
  let output = "(";
  input.replace( /^\D*(\d{0,3})\D*(\d{0,3})\D*(\d{0,4})/, function( match, g1, g2, g3 )
      {
        if ( g1.length ) {
          output += g1;
          if ( g1.length == 3 ) {
              output += ")";
              if ( g2.length ) {
                  output += " " + g2; 
                  if ( g2.length == 3 ) {
                      output += "-";
                      if ( g3.length ) {
                          output += g3;
                      }
                  }
              }
           }
        }
      }       
    );        
  return output;
 }  
