export interface INotify {
  customerName:           string;
  strAptStart:            string;
  strAptEnd:              null;
  appointmentID:          number;
  appointmentSubject:     string;
  customerID:             number;
  serviceDate:            Date;
  startTime:              Date;
  endTime:                Date;
  employeeID:             number;
  aptEmployeeID:          number;
  appointmentStatusID:    number;
  isPackage:              boolean | null;
  waitingList:            boolean;
  recurringAppointmentID: null;
  totalAmount:            number;
  totalPaid:              null;
  isWorking:              boolean;
  checkinTime:            null;
  isProduct:              boolean | null;
  isReminder:             boolean;
  barcodeTicket:          string;
  isGroup:                boolean | null;
  referenceAppointmentID: null;
  originalAppointmentID:  number| null;
  bookType:               number ;
  depositAmount:          number;
  pushingStatus:          boolean;
  isModifying:            boolean;
  isNew:                  boolean;
  isDeleted:              boolean;
  lastChange:             null;
  deleteReason:           null;
  isDelete:               boolean;
  crearteBy:              string;
  lastChangeBy:           string;
  createDate:             Date;
  outService:             null;
  inService:              boolean | null;
  isTagFriend:            boolean;
  isAddGuest:             boolean;
  isParty:                boolean;
  idParty:                boolean;
  checkNo:                null;
  aptMain:                null;
  needChange:             null;
  isRequest:              boolean | null;
  aptStartTime:           Date;
  aptEndTime:             Date;
  aptSalon:               boolean;
  orgCheckNo:             null;
  aptComment:             null;
  rvcNo:                  number;
  isFullTurn:             boolean;
  indexNum:               null;
  isCreateAndChange:      boolean;
  isBookOnline:           boolean;
  isConfirmOB:            boolean;
  isCountTurn:            boolean | null;
  empsMarkAsRead:         boolean | null;
  isMarkAsRead:           boolean;
  clientName:             string;
  clientPhone:            string;
  isVip:                  boolean;
  totalDuration:          number;
}

export interface IColorDescription {
  backGroundColor: string;
  fontColor:       string;
  isDefault:       boolean;
  description:     string;
}