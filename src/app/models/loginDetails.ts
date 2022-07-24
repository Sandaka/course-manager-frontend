import { ApplicationFeatures } from "./applicationFeatures";

export class LoginDetails{
    smsUserId: any;
    userPkgCode: string = '';
    roleName: string = '';
    userName: string = '';
    subscriptionId: any;
    subscriptionName: string = '';
    accountUrl: string = '';
    applicationFeatures: ApplicationFeatures[] = [];
}