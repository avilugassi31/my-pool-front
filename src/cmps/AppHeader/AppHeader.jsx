import React from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/userActions';
import { NavLink } from 'react-router-dom';
import logo from '../../assests/imgs/logo.png';
import user from '../../assests/imgs/users.png';
import signup from '../../assests/imgs/signup.png';

import './AppHeader.scss';

class _AppHeader extends React.Component {
    componentDidMount() {
        // this.props.loadUser()
        console.log(this.props.user);
    }
    render() {
        return (
            <section className='App-Header'>
                <div className='first-child'>
                    <NavLink exact to='/'>
                        <img src={logo} alt='' className='logo' />
                    </NavLink>
                </div>
                <div className='second-child'>
                    <ul>
                        <li>
                            <NavLink exact to='/pool'>
                                <img src={user} alt='' />
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact to='/'>
                                <img src={signup} alt='' />
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    };
};

const mapDispatchToProps = {
    loadUser,
};

export const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AppHeader);
