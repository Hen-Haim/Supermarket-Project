export class UserDetails {
    public constructor(
        public id?: number,
        public userName?: string,
        public password?: string | number,
        public confirmPassword?: string | number,
        public firstName?: string,
        public lastName?: string,
        public city?: string,
        public street?: string,
        public role?: number,
    ){}

}