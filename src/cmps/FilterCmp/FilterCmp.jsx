import React from 'react';

import './FilterCmp.scss';

export class FilterCmp extends React.Component {
    state = {
        term: '',
    };
    handleChange = ({ target }) => {
        const field = target.name;
        const value = target.value;
        this.setState({ [field]: value }, () => {
            this.props.onChangeFilter({ ...this.state });
        });
    };
    render() {
        const { term } = this.state;
        return (
            <form className='filter-cmp' onSubmit={(ev) => ev.preventDefault()}>
                <input
                    placeholder='Search Member'
                    type='text'
                    id='term'
                    name='term'
                    value={term}
                    onChange={this.handleChange}
                />
            </form>
        );
    }
}
