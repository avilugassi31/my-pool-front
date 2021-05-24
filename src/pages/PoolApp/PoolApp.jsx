import { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { loadMembers } from '../../store/actions/poolActions';
import { PoolList } from '../../cmps/PoolList/PoolList';
import { Link } from 'react-router-dom';
import plusMember from '../../assests/imgs/plus.png';
import './PoolApp.scss';

export class _PoolApp extends Component {
    componentDidMount() {
        this.props.loadMembers();
    }
    render() {
        const { members } = this.props;
        return (
            <section className='pool-app'>
                <AppHeader />
                <h1>Pool Members</h1>
                <Link to='/pool/edit'>
                    <img src={plusMember} alt='' />
                </Link>
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
