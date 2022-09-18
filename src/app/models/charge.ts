export class Charge {
    email: string = '';
    token: string = '';
    amount: any;

    constructor(email: string, token: string, amount: any) {
        this.email = email;
        this.token = token;
        this.amount = amount;
    }
}