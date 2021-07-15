import React from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../store/actions/userActions';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { socketService } from '../../services/socket.service';
import logo from '../../assests/imgs/logo.png';
import userImg from '../../assests/imgs/users.png';
import signup from '../../assests/imgs/signup.png';
import dashboard from '../../assests/imgs/dashboard.png';
import './AppHeader.scss';

class _AppHeader extends React.Component {
    componentDidMount() {
        if (!this.props.user) {
            this.props.loadUser();
        }
        socketService.setup();
        socketService.emit('user msg', 'msgs');
        socketService.on('show msg', ({ title, message }) => {
            toast.success(title, message);
        });
    }
    componentWillUnmount() {
        socketService.off('user msg', 'msgs');
    }
    render() {
        const { user, loggedInUser } = this.props;
        if (loggedInUser) {
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
                                    <img src={userImg} alt='' />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to='/login'>
                                    <img src={signup} alt='' />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to='/dashboard'>
                                    <img src={dashboard} alt='' />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to={'/user/' + loggedInUser._id}>
                                    <img src={user.imgUrl} alt='' />
                                </NavLink>
                            </li>
                        </ul>
                        <ToastContainer />
                    </div>
                </section>
            );
        } else {
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
                                    <img src={userImg} alt='' />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to='/login'>
                                    <img src={signup} alt='' />
                                </NavLink>
                            </li>
                            <li>
                                <NavLink exact to='/dashboard'>
                                    <img src={dashboard} alt='' />
                                </NavLink>
                            </li>
                        </ul>
                        <ToastContainer />
                    </div>
                </section>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        loggedInUser: state.userReducer.loggedInUser,
    };
};

const mapDispatchToProps = {
    loadUser,
};

export const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AppHeader);
