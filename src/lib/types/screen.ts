
import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/** REACT APP STATE  */
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPageState;
    ordersPage: OrdersPageState;
}


/** HOMPAGAE */
export interface HomePageState {
    finishedOrders: any;
    processOrders: any;
    pausedOrders: any;
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

/** PRODUCTS PAGE */
export interface ProductsPageState {
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}

/** ORDERS PAGE */

export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}