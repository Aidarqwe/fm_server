export default class UserDto {
    account_id: number;
    name: string;
    gender: string;
    birthdate: Date;
    city: string;
    search_goal: string;
    isImageApproved: boolean;
    isSubscribed: boolean;

    constructor(user: any, isImageApproved: boolean, isSubscribed: boolean) {
        this.account_id = user.account_id;
        this.name = user.name;
        this.gender = user.gender;
        this.birthdate = user.birthdate;
        this.city = user.city;
        this.search_goal = user.search_goal;
        this.isImageApproved = isImageApproved;
        this.isSubscribed = isSubscribed;
    }
}