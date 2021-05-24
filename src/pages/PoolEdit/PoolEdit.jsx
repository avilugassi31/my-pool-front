import { Component } from 'react';
import { Link } from 'react-router-dom';
import { poolService } from '../../services/pool.service';
import home from '../../assests/imgs/home.png';
import './PoolEdit.scss';

export class PoolEdit extends Component {
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
        const { id } = this.props.match.params;
        const member = id
            ? await poolService.getById(id)
            : poolService.getEmptyMember();
        this.setState({ member });
    }
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.type === 'number' ? +target.value : target.value;
        this.setState((prevState) => ({
            member: { ...prevState.member, [field]: value || '' },
        }));
    };

    onSaveMember = async (ev) => {
        ev.preventDefault();
        console.log(this.state.member, 'member in edit after add');
        await poolService.saveMember({ ...this.state.member });
        this.props.history.push('/pool');
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
            </div>
        );
    }
}
