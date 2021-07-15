import { Component } from 'react';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { loadMembers } from '../../store/actions/poolActions';
import { CircularIndeterminate } from '../../cmps/CircularIndeterminate/CircularIndeterminate';
import './DashboardPage.scss';

export class _DashboardPage extends Component {
    state = {
        lastItem: null,
        labels: null,
        datasets: null,
    };
    componentDidMount() {
        this.props.loadMembers();
        this.getLastItem();
    }
    getLastItem() {
        const { members } = this.props;
        var lastItem = members[members.length - 1];
        console.log('lastItem:', lastItem);
        this.setState({ lastItem });
    }
    render() {
        const { members } = this.props;
        const { lastItem } = this.state;
        console.log('lastItem:', lastItem);
        if (!lastItem) return <CircularIndeterminate />;
        return (
            <div className='dashboard-page'>
                <AppHeader />
                <h1>Dashboard Page</h1>
                <h2>
                    <span>{members.length}</span> membership owners up to{' '}
                    <span> {new Date().toDateString()}</span>
                </h2>
                <h2>
                    last member is <span>{lastItem.name}</span> he joined at{' '}
                    <span>{lastItem.createdAt}</span>
                </h2>
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

export const DashboardPage = connect(
    mapStateToProps,
    mapDispatchToProps
)(_DashboardPage);
