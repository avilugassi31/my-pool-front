import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeMember, getMemberById } from '../../store/actions/poolActions';
import { socketService } from '../../services/socket.service';
import edit from '../../assests/imgs/edit.png';
import remove from '../../assests/imgs/delete.png';
import home from '../../assests/imgs/home.png';
import schedule from '../../assests/imgs/schedule.png';
import members from '../../assests/imgs/community.png';
import card from '../../assests/imgs/member-card.png';

import './PoolDetails.scss';

export class _PoolDetails extends Component {
    componentDidMount = async () => {
        await this.props.getMemberById(this.props.match.params.id);
        socketService.setup();
        socketService.emit('user msg', 'msgs');
    };
    removeMember = async (memberId) => {
        await this.props.removeMember(memberId);
        const member = this.props.member;
        const msg = {
            title: ` Member removed - ${member.name}`,
            message: `${member.name} Just Removed`,
        };
        socketService.emit('add msg', msg);
        this.props.history.push('/pool');
    };
    render() {
        const { member } = this.props;
        if (!member) return <div>Loading</div>;
        return (
            member && (
                <section className='pool-details'>
                    {/* <AppHeader /> */}
                    <div className='details-container'>
                        <div className='member-details'>
                            <img
                                src={`https://i.pravatar.cc/150?u=${member._id}`}
                                alt=''
                            />
                            <h1 className='member-name'>{member.name}</h1>
                        </div>
                        <h2>
                            <img src={home} alt='' />
                            {''} {member.city}
                        </h2>
                        <h2 className='members-img'>
                            <img src={members} alt='' /> {''} {member.members}
                        </h2>
                        <h2>
                            {' '}
                            <img src={card} alt='' /> {''} {member.type}
                        </h2>
                        <h2>
                            <img src={schedule} alt='' /> {''}
                            {new Date(member.createdAt).toDateString()}
                        </h2>
                        <h2>
                            <img src={schedule} alt='' /> {''}
                            {new Date(member.finishedAt).toDateString()}
                        </h2>
                        <div className='details-buttons'>
                            <button
                                onClick={() => this.removeMember(member._id)}
                            >
                                <img src={remove} alt='' />
                            </button>

                            <Link to={'/pool/edit/' + member._id}>
                                <img src={edit} alt='' />
                            </Link>
                            <Link to={'/pool'}>
                                <img src={home} alt='' />
                            </Link>
                        </div>
                    </div>
                </section>
            )
        );
    }
}
const mapStateToProps = (state) => {
    return {
        member: state.poolReducer.member,
        // user: state.userReducer.user,
    };
};

const mapDispatchToProps = {
    removeMember,
    getMemberById,
};

export const PoolDetails = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PoolDetails);
