import { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { loadMembers } from '../../store/actions/poolActions';
import { PoolList } from '../../cmps/PoolList/PoolList';
import { Link } from 'react-router-dom';
import plusMember from '../../assests/imgs/plus.png';
import gmail from '../../assests/imgs/gmail.png';
// import message from '../../assests/imgs/message.png'
import './PoolApp.scss';

export class _PoolApp extends Component {
    componentDidMount() {
        this.props.loadMembers();
    }
    componentDidUpdate = async (prevProps) => {
        if (this.props.members.length === prevProps.members.length) {
            const members = await this.props.loadMembers();
            return members;
        }
    };

    render() {
        const { members } = this.props;
        return (
            <section className='pool-app'>
                <AppHeader />
                <h1>welcome to Mg-Pool System</h1>
                <div className='main-app-btns'>
                    <Link to='/pool/edit' title='Add a Pool member'>
                        <img src={plusMember} alt='' />
                    </Link>
                    <a
                        href={`mailto:${members.map(
                            (member) => member.email
                        )}?subject=A message from Merom-Golan Pool`}
                        className='mail-link'
                    >
                        <img src={gmail} alt='' title='Send Mails To Members' />
                    </a>
                    {/* <a
                        href={`https://wa.me/${members.map(
                            (member) => member.phone
                        )}`}
                        className='whatsapp-link'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img src={message} alt='' />
                    </a> */}
                </div>
                <PoolList members={members} />
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

export const PoolApp = connect(mapStateToProps, mapDispatchToProps)(_PoolApp);
