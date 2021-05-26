import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadMembers } from '../../store/actions/poolActions';
import { poolService } from '../../services/pool.service';
import home from '../../assests/imgs/home.png';
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
        },
    };
    async componentDidMount() {
        this.props.loadMembers();
        const { id } = this.props.match.params;
        const member = id
            ? await poolService.getById(id)
            : poolService.getEmptyMember();
        this.setState({ member });
        console.log(this.props);
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
            socketService.emit('add msg', msg);
            this.props.members.push(member);
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
        const { name, city, members, type, createdAt, finishedAt } = this.state;
        return (
            <div className='edit-container'>
                <form className='pool-edit' onSubmit={this.onSaveMember}>
                    <label htmlFor='name'>name</label>
                    <input
                        required
                        type='text'
                        id='name'
                        value={name}
                        onChange={this.handleChange}
                        name='name'
                    />
                    <label htmlFor='city'>city</label>
                    <input
                        required
                        type='text'
                        id='city'
                        value={city}
                        onChange={this.handleChange}
                        name='city'
                    />
                    <label htmlFor='members'>members</label>
                    <input
                        required
                        type='number'
                        id='members'
                        value={members}
                        onChange={this.handleChange}
                        name='members'
                    />
                    <label htmlFor='type'>type</label>
                    <select
                        required
                        id='type'
                        value={type}
                        onChange={this.handleChange}
                        name='type'
                    >
                        <option value='single seasonal'>single seasonal</option>
                        <option value='couple seasonal'>couple seasonal</option>
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
                        <option value='single monthly'>single monthly</option>
                        <option value='couple Monthly'>couple Monthly</option>
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
                    <label htmlFor='createdAt'>createdAt</label>
                    <input
                        type='date'
                        id='createdAt'
                        value={createdAt}
                        onChange={this.handleChange}
                        name='createdAt'
                    />
                    <label htmlFor='finishedAt'>finishedAt</label>
                    <input
                        type='date'
                        id='finishedAt'
                        value={finishedAt}
                        onChange={this.handleChange}
                        name='finishedAt'
                    />
                    <button>Save Member</button>
                    <Link to={'/pool'}>
                        <img src={home} alt='' />
                    </Link>
                </form>
                <ToastContainer />
            </div>
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
