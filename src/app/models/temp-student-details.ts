import { EducationDetails } from "./education-details";

export class TempStudentDetails {
    fullName: string = '';
    dob: string = '';
    email: string = '';
    telephone1: string = '';
    telephone2: string = '';
    addressLine1: string = '';
    addressLine2: string = '';
    addressLine3: string = '';
    gender: string = '';
    nationality: string = '';
    civilStatus: string = '';
    nic: string = '';
    description: string = '';
    courseId: any;
    branchId: any;
    courseTypeId: any;
    educationalQualificationList: EducationDetails[] = [];
}