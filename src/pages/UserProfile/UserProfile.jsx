import { Component } from 'react';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import './UserProfile.scss';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/userActions';

export class _UserProfile extends Component {
    state = {
        // user: null,
    };
    componentDidMount = async () => {
        // const id = this.props.loggedInUser._id;
        // const user = await userService.getById(id);
        // this.setState({ user });
        // console.log(this.state.user);
    };
    setLogout = async () => {
        await this.props.logout();
        this.props.history.push('/');
    };
    render() {
        const { loggedInUser } = this.props;
        return (
            loggedInUser && (
                <section className='user-profile'>
                    <AppHeader />
                    <div className='user-page'>
                        <img src={loggedInUser.imgUrl} alt='' />
                        <h1>hello {loggedInUser.fullname}</h1>
                        <button onClick={this.setLogout}>Logout</button>
                    </div>
                </section>
            )
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        loggedInUser: state.userReducer.loggedInUser,
    };
};

const mapDispatchToProps = {
    logout,
};

export const UserProfile = connect(
    mapStateToProps,
    mapDispatchToProps
)(_UserProfile);
