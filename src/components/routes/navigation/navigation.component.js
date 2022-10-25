import { Fragment,useContext } from "react"
import {signOutUser} from '../../../utils/firebase/firebase.utils'
import { Outlet, Link } from "react-router-dom"
import {ReactComponent as CrwnLogo} from '../../../assets/crown.svg';
import { UserContext } from "../../../contexts/user.context";
import { CartContext } from "../../../contexts/cart.context";
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropDown from "../../cart-dropdown/cart-dropdown.component";
import {NavigationContainer,LogoContainer,NavLinksContainer,NavLink} from './navigation.styles.js'

const Navigation = () => {
    const {currentUser} = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext)

    return(
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>
               <NavLinksContainer>
                 <Link className="nav-link" to='/shop'>
                     SHOP
                 </Link>
                 {
                     currentUser ? 
                     (
                         <NavLink as='span' onClick={signOutUser}>SIGN OUT</NavLink>
                     ) 
                     :
                     (
                 <NavLink to='/auth'>
                     SIGN IN
                 </NavLink>
                     )
                 }
                 <CartIcon/>
               </NavLinksContainer>
              {isCartOpen && <CartDropDown/>}
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
}

export default Navigation