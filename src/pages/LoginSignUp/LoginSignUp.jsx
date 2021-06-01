import { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { login, signUp } from '../../store/actions/userActions';
// import camera from '../../services/camera.service';
import { UploadImage } from '../../cmps/UploadImage/UploadImage';
import { uploadImg } from '../../services/img-upload.service';
import './LoginSignUp.scss';

class _LoginSignUp extends Component {
    state = {
        imgUrl: null,
    };
    componentDidMount() {
        // console.log(this.props);
    }
    setSignup = async (ev) => {
        ev.preventDefault();
        var { imgUrl, username, password, fullname } = this.props.user;
        console.log('username in login cmp:', username)
        imgUrl = this.state.imgUrl;
        username = ev.target[1].value;
        password = ev.target[2].value;
        fullname = ev.target[3].value;
        await this.props.signUp(imgUrl, username, password, fullname);
        this.props.history.push('/pool');
    };
    setLogin = async (ev) => {
        ev.preventDefault();
        this.props.loggedUser.username = ev.target[0].value;
        this.props.loggedUser.password = ev.target[1].value;
        console.log(this.props.loggedUser, 'loggedUser');
        await this.props.login(this.props.loggedUser);
        this.props.history.push('/pool');
    };
    onChangeToLogin() {
        var divLogin = document.querySelector('.login-page');
        var divSignup = document.querySelector('.signup-page');
        divSignup.classList.toggle('isShown');
        var div = divLogin.classList.toggle('isShown');
        if (div) {
            document.querySelector('.change-shown').innerHTML =
                'Already A Member?';
        } else {
            document.querySelector('.change-shown').innerHTML =
                'Not A Member!!!';
        }
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState({ [field]: value });
    };

    onUploadImage = async (ev) => {
        const img = await uploadImg(ev);
        var imgUrl = img.url;
       return this.setState({ imgUrl });
      
    };
    render() {
        const { username, password, fullname } = this.props.user;
        return (
            <section className='signup-login-page'>
                <AppHeader />
                <div className='signup-page'>
                    <h1>SignUp</h1>
                    <form className='signup' onSubmit={this.setSignup}>
                        <UploadImage
                            onUploadImage={this.onUploadImage}
                            // onChange={this.handleChange}
                        />
                        <label htmlFor='username'>username</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={this.handleChange}
                            name='username'
                        />
                        <label htmlFor='password'>password</label>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            value={password}
                            onChange={this.handleChange}
                        />
                        <label htmlFor='fullname'>fullname</label>
                        <input
                            type='text'
                            id='fullname'
                            name='fullname'
                            value={fullname}
                            onChange={this.handleChange}
                        />
                        <button>signup</button>
                    </form>
                </div>
                <div className='login-page isShown'>
                    <h1>Login</h1>
                    <form className='login' onSubmit={this.setLogin}>
                        <label htmlFor='username'>username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={this.props.loggedUser.username}
                            required
                        />
                        <label htmlFor='password'>password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={this.props.loggedUser.password}
                            required
                        />
                        <button>login</button>
                    </form>
                </div>
                <button className='change-shown' onClick={this.onChangeToLogin}>
                    Already A Member?
                </button>
            </section>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        loggedInUser: state.userReducer.loggedInUser,
        loggedUser: state.userReducer.loggedUser,
    };
};

const mapDispatchToProps = {
    login,
    signUp,
};

export const LoginSignUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_LoginSignUp);
