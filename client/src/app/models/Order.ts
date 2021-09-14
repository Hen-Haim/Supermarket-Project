export class Order {
    public constructor(
        public idShoppingCart?:number,
        public cityToDeliver?: string,
        public streetToDeliver?: string,
        public shippingDate?: Date,
        public cardLastDigits?: number,
        //extras
        public creditCardNumber?: number,
        public cardCompany?: string,
        public month?: number,
        public year?: number,
    ){}
}


export class AmountsForHome {
    public constructor(
        public numOfProducts?:number,
        public numOfOrders?: number,
        public numOfUsers?: number
    ){}

}