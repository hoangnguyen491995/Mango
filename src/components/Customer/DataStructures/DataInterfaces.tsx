import { StringMap } from "i18next";

export interface CustomerInformation {
totalSpentByYear: number,
    redeem: String,
    rewardsPoint: Number;
  customerID: number;
  firstName: string;
  lastName: string;
  customerName: string;
  sex: boolean;
  birthday: string | null;
  lastestUpdate: string | null;
  contactPhone: string;
  workPhone: string | null;
  email: string;
  title: string | null;
  address: string | null;
  notes: string | null;
  city: string | null;
  state: string | null;
  zip: string;
  country: string | null;
  imageFileName: string | null;
  favouriteTechs1: string | null;
  favouriteTechs2: string | null;
  favouriteTechs3: string | null;
  favouriteTech: string;
  rating: number | null;
  isKid: boolean | null;
  isChild: boolean;
  memberID: string;
  coupon: string;
  joinDate: Date;
  passwordLoginWeb: string | null;
  lastVisit: string | null;
  favouritePolish: string | null;
  isVip: boolean | null;
  totalAmount: number | null;
  isChangePhone: boolean | null;
  atRisk: string | null;
  isVerifyPhoneWithMango: boolean;
}

export interface CustomerMoreInfo {
  data: CustomerMoreInfoDetail[];
  total_count: number;
  limit: null;
}

export interface CustomerMoreInfoDetail {
  id: number;
  customerId: number;
  title: string;
  desciption: string;
  rvcNo: number;
  createBy: null;
  createDate: Date;
}

export interface ClientTotal {
  typeName: string;
  bookType: number;
  total: number;
  color: string;
  percentage: string;
}

export interface DataChart {
  x: string;
  y: number;
//   percent: string;
  color: string;
}
export interface DataInFoChart {
    label: string,
    values: DataChart[]
  }
  

  export interface ImageGallery {
    id:            number;
    imageName:     string;
    customerId:    number;
    imageUrl:      string;
    imageUrl2:     string;
    createdDate:   Date;
    description:   string;
    appointmentId: null | number;
}
export interface TechHistory {
  employeeID:   number;
  employeeName: string;
  total:        number;
}