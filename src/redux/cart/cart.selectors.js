import { createSelector } from 'reselect';

//there are 2 ways selectors, one is input selector and another is output selector

//The first one Input selector
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartItemCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumalatedQuantity,cartItem) => accumalatedQuantity + cartItem.quantity ,
        0        
    )
)