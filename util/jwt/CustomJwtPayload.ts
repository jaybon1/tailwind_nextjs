export default class CustomJwtPayload {
    exp:number;
    user_name:string;
    authorities:string[];
    jti:string;
    client_id:string;
    scope:string[];

    constructor(exp: number, user_name: string, authorities: string[], jti: string, client_id: string, scope: string[]) {
        this.exp = exp;
        this.user_name = user_name;
        this.authorities = authorities;
        this.jti = jti;
        this.client_id = client_id;
        this.scope = scope;
    }
}