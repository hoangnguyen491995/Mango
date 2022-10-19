export interface IListEvents {
    totalItems:  number;
    totalPages:  number;
    currentPage: number;
    toTalServices: number;
    items:       IItem[];
  }
  
  export interface IItem {
    begins:                string;
    ends:                  string;
    startS:                number;
    endSecond:             number;
    color:                 string;
    resource:              number;
    title:                 string;
    uid:                   number;
    notes:                 string;
    text:                  string;
    border:                string;
    isGroup:               number;
    ticketstatus:          number;
    isTimeOff:             number;
    name:                  string;
    customerID:            number;
    services:              string;
    numGuest:              number;
    appointmentId:         number;
    serviceDateString:     string;
    appointmentStatusName: null;
    appointmentStatusId:   number;
    isBookOnline:          boolean;
    isConfirmOB:           boolean;
    noteEmployeeOff:       string;
    noteApt:               string;
    appointmentDetailId:   number;
    isVIP:                 null;
    isMember:              null;
    isNew:                 null;
    duration:              number;
    durations:             string;
    isRequestTech:         number;
    isGroupAppointment:    number;
    isSpecial:             number;
    comeUp:                number;
    idParty:               number;
    rgb:                   null;
    borderStyle:           null;
    depositAmount:         number;
    isChangeTime:          null;
    appointmentDetailIDs:  string;
    isStartAllSameTime:    boolean;
    nickName:              string;
    imageFileName:         string;
    backGroundColor:       string;
    clientPhone:           string;
  }
  