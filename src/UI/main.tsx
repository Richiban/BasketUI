/// <reference path="../Domain/basket.ts" />
/// <reference path="../Domain/product.ts" />
/// <reference path="../../node_modules/react/dist/react.js" />
/// <reference path="../../node_modules/react-dom/dist/react-dom.js" />
/// <reference path="../../typings/index.d.ts" />

type AddToBasket = (it : any) => void

class BasketViewModel extends React.Component
{
    state : { basket : Basket }

    constructor(props : {basket : Basket})
    {
        super(props);
        this.state = {
            basket : props.basket
        }
    }

    render()
    {
        return <ul id="Basket">
            {this.state.basket.items.map(bi => <BasketItemViewModel key={bi.product.id} productName={bi.product.name}/>)}
        </ul>
    }
}

class BasketItemViewModel extends React.Component
{
    state: {
        productName: string
    }

    constructor(props: { productName: string })
    {
        super(props)

        this.state = {
            productName : props.productName
        }
    }

    render() {
        return <li>
            {this.state.productName}
        </li>
    }
}

class ProductViewModel extends React.Component
{
    state : {productId : number, name : string}
    addToBasket : AddToBasket

    constructor(props : {productId : number, productName : string, addToBasket : AddToBasket})
    {
        super(props)
        this.state = {
            productId: props.productId,
            name : props.productName
        }
        
        this.addToBasket = props.addToBasket
    }

    render() {
        return (
            <li data-productId={this.state.productId}>
                {this.state.name}
                <button onClick={() => this.addToBasket(this.state.productId)}>
                    Add to basket
                </button>
            </li>);
    }
}

class ProductList extends React.Component
{
    state : { products : Product[] }
    addToBasket : AddToBasket

    constructor(public props : {allProducts : Product[], addToBasket: AddToBasket})
    {
        super(props)
        this.state = { products : props.allProducts }
        this.addToBasket = props.addToBasket
    }

    render() {
        return <ul id="ProductList">
            {this.state.products.map(p =>
                <ProductViewModel key={p.id} productId={p.id} productName={p.name} addToBasket={this.addToBasket} />}
        </ul>
    }
}

class App extends React.Component 
{
    basket = new Basket(1, [])
    productRepository = new ProductRepository()

    constructor(props : any)
    {
        super(props)
    }

    addToBasket : AddToBasket = (x) => {
        console.log("Adding to basket: " + x)
    }

    render() {
        return (
            <div>
                <ProductList allProducts={this.productRepository.getAll()} addToBasket={this.addToBasket} />
                <BasketViewModel basket={this.basket} />
            </div>
        );
    }
}

function loadProducts() {
    console.log("loading products")
    
    ReactDOM.render(<App/>, document.getElementById("app")!)
}

function start() {
    loadProducts();
}

start();