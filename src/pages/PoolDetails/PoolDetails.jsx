import { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeMember, getMemberById } from '../../store/actions/poolActions';
import { socketService } from '../../services/socket.service';
import edit from '../../assests/imgs/edit.png';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { WhatsappPage } from '../../cmps/WhatsappPage/WhatsappPage';
import remove from '../../assests/imgs/delete.png';
import home from '../../assests/imgs/home.png';
import schedule from '../../assests/imgs/schedule.png';
import members from '../../assests/imgs/community.png';
import gmail from '../../assests/imgs/gmail.png';
import card from '../../assests/imgs/member-card.png';
import moment from 'moment';
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
        const date = new Date();
        var dateDiff1 = moment(date);
        var dateDiff2 = moment(member.finishedAt);
        var result = dateDiff1.diff(dateDiff2);
        if (result > 0) {
            return (
                <div className='membership-expired'>
                    <AppHeader />
                    <h1>membership expired - please contact member to renew</h1>
                    <a
                        href={`mailto:${member.email}?subject=Your Membership Just Ended&body=Hi,your membership just ended, call 0508513679 or come to the pool recpetion to renew your membership`}
                        className='mail-link'
                    >
                        Send Mail
                    </a>
                    <WhatsappPage />
                    <div className='details-buttons'>
                        <button onClick={() => this.removeMember(member._id)}>
                            <img src={remove} alt='' />
                        </button>
                        <Link to={'/pool/edit/' + member._id}>
                            <img src={edit} alt='' />
                        </Link>
                    </div>
                </div>
            );
        } else {
            return (
                member && (
                    <section className='pool-details'>
                        <WhatsappPage member={member}/>
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
                                <img src={members} alt='' /> {''}{' '}
                                {member.members}
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
                            <a
                                href={`mailto:${member.email}`}
                                className='send-mail'
                            >
                                <img
                                    src={gmail}
                                    alt='send mail'
                                    title='Send mail to member'
                                />
                                {member.email}
                            </a>
                            <div className='details-buttons'>
                                <button
                                    onClick={() =>
                                        this.removeMember(member._id)
                                    }
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
