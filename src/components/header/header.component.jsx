import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import {selectCartHidden} from "../../redux/cart/cart.selectors";
import {selectCurrentUser} from "../../redux/user/user.selectors";

import {ReactComponent as Logo} from "../../assets/crown.svg";
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles';
import {signOutStart} from "../../redux/user/user.actions";

const Header = ({currentUser, hidden, signOutStart}) => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo'/>
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/shop'>
                SHOP
            </OptionLink>
            <OptionLink to='/contact'>
                CONTACT
            </OptionLink>
            {
                currentUser ?
                    // This ~to='/'~ doesn't do absolutely nothing, as I'm using ~as='div'~
                    // But it wouldn't stop bothering me about it being empty
                    (<OptionLink to='/' as='div' onClick={signOutStart}>SIGN OUT</OptionLink>)
                    :
                    (<OptionLink to='/sign'>SIGN IN</OptionLink>)
            }
            <CartIcon/>

        </OptionsContainer>
        {
            hidden ? null : <CartDropdown/>
        }
    </HeaderContainer>
);

// State is the top level root reducer
// This is what turns the state into props (map to props duh)
// Dont forget to access the props in the declaration - this case const Header
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
    signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);