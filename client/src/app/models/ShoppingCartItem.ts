export class ShoppingCartItem {
    public constructor(
        public id?: number,
        public idProduct?: number,  
        public amount?:number,
        public totalPrice?: number | string,
        public idUser?:number,
        public idShoppingCart?:number | null,
        public orderingDate?:Date,
        public numOfItems?:number,
        public finalPrice?: number | string,
        public idCategory?: number
    ){}

}

export class PopularAndNew {
    public constructor(
        public picture?: string,
        public idCategory?: number,
        public mostPopular?: number | null  
    ){}

}
