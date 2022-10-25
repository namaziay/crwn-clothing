import {CartDropDownContainer,EmptyMessage,CartItems} from './cart-component.styles.js'
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const CartDropDown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
      navigate('/checkout')
    }

    return(
        <CartDropDownContainer>
        <CartItems>
          {
            cartItems.length ?
            (cartItems.map(item => (
            <CartItem key={item.id} cartItem={item} />
            ) )) : (
              <EmptyMessage>Your cart is empty</EmptyMessage>
            )
          }
         </CartItems>   
        <Button style={{fontSize:'0.75rem'}} onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
      </CartDropDownContainer>
    )
}

export default CartDropDown