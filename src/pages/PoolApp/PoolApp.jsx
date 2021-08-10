import { Component } from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import { loadMembers } from '../../store/actions/poolActions';
import { PoolList } from '../../cmps/PoolList/PoolList';
import { FilterCmp } from '../../cmps/FilterCmp/FilterCmp';
import { CircularIndeterminate } from '../../cmps/CircularIndeterminate/CircularIndeterminate';
import { Link } from 'react-router-dom';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import AddIcon from '@material-ui/icons/Add';
import './PoolApp.scss';

export class _PoolApp extends Component {
    state = {
        filterBy: null,
    };
    componentDidMount() {
        this.props.loadMembers(this.state.filterby);
    }
    componentDidUpdate = async (prevProps) => {
        if (this.props.members.length === prevProps.members.length) {
            const members = await this.props.loadMembers();
            return members;
        }
    };
    // onChangeFilter = (filterBy) => {
    //     console.log('filterBy:', filterBy);
    //     this.setState({ filterBy }, () => 
    //     this.props.loadMemebers(filterBy)
    //     );
    // };

    render() {
        const { members } = this.props;
        if (!members) return <CircularIndeterminate />;
        return (
            <section className='pool-app'>
                <AppHeader />
                <h1>welcome to Mg-Pool System</h1>
                <div className='main-app-btns'>
                    <Link to='/pool/edit' title='Add a Pool member'>
                        <AddIcon color='primary' />
                    </Link>
                    <a
                        href={`mailto:${members.map(
                            (member) => member.email
                        )}?subject=A message from Merom-Golan Pool`}
                        className='mail-link'
                    >
                        <EmailRoundedIcon color='primary' />
                    </a>
                </div>
                {/* <FilterCmp onChangeFilter={this.onChangeFilter} /> */}
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
