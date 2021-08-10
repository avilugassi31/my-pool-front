import { Component } from 'react';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { loadMembers } from '../../store/actions/poolActions';
import { CircularIndeterminate } from '../../cmps/CircularIndeterminate/CircularIndeterminate';
import moment from 'moment';
import './DashboardPage.scss';

export class _DashboardPage extends Component {
    state = {
        lastItem: null,
        membersInMay: null,
        membersInJune: null,
        membersInJuly: null,
        membersInAugust: null,
        membersInSeptember: null,
        membersInOctober: null,
        date: new Date(),
    };
    componentDidMount() {
        this.props.loadMembers();
        this.getLastItem();
        this.getMembersByMonth();
        var date = moment(this.state.date).format('MMMM');
        this.setState({ date });
    }
    getLastItem() {
        const { members } = this.props;
        var lastItem = members[members.length - 1];
        this.setState({ lastItem });
    }
    getMembersByMonth() {
        const { members } = this.props;
        const date = members.map((member) => member.createdAt.split('-'));
        const membersInMay = date.filter((month) => month[1] === '05');
        this.setState({ membersInMay });
        const membersInJune = date.filter((month) => month[1] === '06');
        this.setState({ membersInJune });
        const membersInJuly = date.filter((month) => month[1] === '07');
        this.setState({ membersInJuly });
        const membersInAugust = date.filter((month) => month[1] === '08');
        this.setState({ membersInAugust });
        const membersInSeptember = date.filter((month) => month[1] === '09');
        this.setState({ membersInSeptember });
        const membersInOctober = date.filter((month) => month[1] === '10');
        this.setState({ membersInOctober });
    }
    render() {
        const { members } = this.props;
        const {
            lastItem,
            membersInMay,
            membersInJune,
            membersInJuly,
            membersInAugust,
            membersInSeptember,
            membersInOctober,
            date,
        } = this.state;
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
                <div className='chart'>
                    <Doughnut
                        options={{ maintainAspectRatio: false }}
                        data={{
                            labels: [
                                'May',
                                'June',
                                'July',
                                'August',
                                'September',
                                'October',
                            ],
                            datasets: [
                                {
                                    label: 'Number Of Members By Month',
                                    data: [
                                        membersInMay.length,
                                        membersInJune.length,
                                        membersInJuly.length,
                                        membersInAugust.length,
                                        membersInSeptember.length,
                                        membersInOctober.length,
                                    ],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                    ],
                                    borderColor: [
                                        'rgba(255, 99, 132, 1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                    ],
                                    borderWidth: 1,
                                },
                            ],
                        }}
                    />
                </div>
                <h1>
                    In {date} {membersInAugust.length} members Joined
                </h1>
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
