/// <reference path="product.ts" />

type BasketId = number

interface BasketItem {
    product : Product
}

class Basket {
    constructor(public id : BasketId, public items : BasketItem[]) {}

    addProduct(newItem : Product) : void {
        const basketItem = { product: newItem }
        this.items.push(basketItem)
    }
}