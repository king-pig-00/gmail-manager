// export interface User {
//     id: string | null;
//     companyUniqueID: null | string;
//     email: string;
//     emailConfirmed: boolean;
//     passwordHash: null | string;
//     securityStamp: null | string;
//     phoneNumber: null | string;
//     phoneNumberConfirmed: boolean;
//     twoFactorEnabled: boolean;
//     lockoutEndDateUtc: null | string;
//     lockoutEnabled: boolean;
//     accessFailedCount: number;
//     userName: null | string;
//     password: null | string;
//     isActive: null | boolean;
//     roleId: null | string;
//     firstName: string;
//     lastName: string;
//     createdBy: null | string;
//     createdDate: null | string;
//     modifiedBy: null | string;
//     modifiedDate: null | string;
//     address: null | string;
//     isEmailDeleted: null | string;
//     address2: null | string;
//     city: null | string;
//     stateId: null | number;
//     countryId: null | number;
//     zipcode: null | string;
//     nickName: null | string;
//     isAllowuserInvoice: null | boolean;
//     allowInvoice: null | boolean;
//     userWebsite: null | string;
//     profilePicture: null | string;
//     profilePicturePath: null | string;
//     profilePictureUploadedFileName: null | string;
//     isEmployee: null | boolean;
//     isCMSuser: null | boolean;
//     navigateToken: null | string;
//     b2CUserId: null | string;
// }

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
}
