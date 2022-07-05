export interface iUserLogin {
    email:string;
    password:string;
}

export interface iUser extends iUserLogin {
    name?:string;

}

