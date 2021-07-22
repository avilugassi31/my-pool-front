import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';

import { loadMembers } from '../../store/actions/poolActions';
import { poolService } from '../../services/pool.service';
import back from '../../assests/imgs/backTo.png';
import { socketService } from '../../services/socket.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PoolEdit.scss';

export class _PoolEdit extends Component {
    state = {
        member: {
            name: '',
            city: '',
            members: null,
            type: '',
            createdAt: null,
            finishedAt: null,
            email: '',
            phone: null,
           
        },
    };
    async componentDidMount() {
        const { id } = this.props.match.params;
        const member = id
            ? await poolService.getById(id)
            : poolService.getEmptyMember();
        this.setState({ member });
        socketService.setup();
        socketService.emit('user msg', 'msgs');
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState((prevState) => ({
            member: { ...prevState.member, [field]: value || '' },
        }));
    };

    onSaveMember = async (ev) => {
        try {
            ev.preventDefault();
            const member = this.state.member;
            await poolService.saveMember(member);
            const msg = {
                title: `New Member added - ${this.state.member.name}`,
                message: `${this.state.member.name} Just Did a new Membership - ${this.state.member.type}`,
            };
            this.props.members.push(member);
            socketService.emit('add msg', msg);

            this.props.history.push('/pool');
        } catch (err) {
            console.log('err:', err);
            const msg = {
                title: `Cannot Add Member- ${this.state.member.name}`,
                message: `${this.state.member.name} Cannot be add - ${err}`,
            };
            socketService.emit('add msg', msg);
            socketService.on('show msg', ({ title, message }) => {
                toast.error(title, message);
            });
        }
    };
    render() {
        const {
            name,
            city,
            members,
            type,
            createdAt,
            finishedAt,
            email,
            phone,
           
        } = this.state;
        return (
            <section className='edit-page'>
                <div className='edit-container'>
                    <h1>Add A New Member</h1>
                    <form className='pool-edit' onSubmit={this.onSaveMember}>
                        <div className='name-in-form'>
                            <label htmlFor='name'>name</label>
                            <input
                                required
                                type='text'
                                id='name'
                                value={name}
                                onChange={this.handleChange}
                                name='name'
                                placeholder='Member Name Please'
                            />
                        </div>
                        <div className='city-in-form'>
                            <label htmlFor='city'>city</label>
                            <input
                                required
                                type='text'
                                id='city'
                                value={city}
                                onChange={this.handleChange}
                                name='city'
                                placeholder='Member Address Please'
                            />
                        </div>
                        <div className='members-in-form'>
                            <label htmlFor='members'>members</label>
                            <input
                                required
                                type='number'
                                id='members'
                                value={members}
                                onChange={this.handleChange}
                                name='members'
                                placeholder='How Many Members'
                            />
                        </div>
                        <div className='type-in-form'>
                            <label htmlFor='type'>type</label>
                            <select
                                required
                                id='type'
                                value={type}
                                onChange={this.handleChange}
                                name='type'
                            >
                                <option value='single seasonal'>
                                    single seasonal
                                </option>
                                <option value='couple seasonal'>
                                    couple seasonal
                                </option>
                                <option value='3/4 family seasonal'>
                                    3/4 family seasonal
                                </option>
                                <option value='5/6 family seasonal'>
                                    5/6 family seasonal
                                </option>
                                <option value='handicapped seasonal'>
                                    handicapped seasonal
                                </option>
                                <option value='single pensionser seasonal'>
                                    single pensionser seasonal
                                </option>
                                <option value='couple pensionser seasonal'>
                                    couple pensionser seasonal
                                </option>
                                <option value='single monthly'>
                                    single monthly
                                </option>
                                <option value='couple Monthly'>
                                    couple Monthly
                                </option>
                                <option value='3/4 family Monthly'>
                                    3/4 family Monthly
                                </option>
                                <option value='5/6 family Monthly'>
                                    5/6 family Monthly
                                </option>
                                <option value='handicapped Monthly'>
                                    handicapped Monthly
                                </option>
                                <option value='single pensionser Monthly'>
                                    single pensionser Monthly
                                </option>
                                <option value='couple pensionser Monthly'>
                                    couple pensionser Monthly
                                </option>
                            </select>
                        </div>
                        <div className='create-in-form'>
                            <label htmlFor='createdAt'>created At</label>
                            <input
                                required
                                type='date'
                                id='createdAt'
                                value={createdAt}
                                onChange={this.handleChange}
                                name='createdAt'
                            />
                        </div>
                        <div className='finish-in-form'>
                            <label htmlFor='finishedAt'>finishedAt</label>
                            <input
                                required
                                type='date'
                                id='finishedAt'
                                value={finishedAt}
                                onChange={this.handleChange}
                                name='finishedAt'
                            />
                        </div>
                        <div className='email-in-form'>
                            <label htmlFor='email'>Email</label>
                            <input
                                required
                                type='email'
                                id='email'
                                value={email}
                                onChange={this.handleChange}
                                name='email'
                                placeholder='Member Email Adreess'
                            />
                        </div>
                        <div className='phone-in-form'>
                            <label htmlFor='phone'>Phone</label>
                            <input
                                required
                                type='phone'
                                id='phone'
                                value={phone}
                                onChange={this.handleChange}
                                name='phone'
                                placeholder='Member Phone Number'
                            />
                        </div>
                        <button>Save Member</button>
                        <Link to={'/pool'}>
                            <img src={back} alt='' title='Back Home' />
                        </Link>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        members: state.poolReducer.members,
    };
};

const mapDispatchToProps = {
    loadMembers,
};

export const PoolEdit = connect(mapStateToProps, mapDispatchToProps)(_PoolEdit);
