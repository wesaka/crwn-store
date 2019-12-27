import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import './header.styles.scss';
import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>
                SHOP
            </Link>
            <Link className='option' to='/contact'>
                CONTACT
            </Link>
            {
                currentUser ?
                    (<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>)
                    :
                    (<Link className='option' to='/sign'>SIGN IN</Link>)
            }
            <CartIcon/>

        </div>
        {
            hidden ? null : <CartDropdown/>
        }
    </div>
);

// State is the top level root reducer
// This is what turns the state into props (map to props duh)
// Dont forget to access the props in the declaration - this case const Header
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);