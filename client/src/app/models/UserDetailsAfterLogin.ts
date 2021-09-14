export class UserDetailsAfterLogin {
    public constructor(
        public token?: string,
        public role?: number,
        public userName?: string,
    ){}

}