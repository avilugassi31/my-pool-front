import { Component } from 'react';
import { NavLink } from 'react-router-dom';
// import { AppHeader } from '../../cmps/AppHeader/AppHeader';
import './HeroPage.scss';

export class HeroPage extends Component {
    render() {
        return (
            <div className='hero-page'>
                {/* <AppHeader /> */}
                <div className='main'>
                    <h1>
                        MG Pool <br />
                        <span className='pool-span'>Where Family Begins</span>
                    </h1>
                    <NavLink exact to='/pool'>
                        Get Started
                    </NavLink>
                </div>
            </div>
        );
    }
}
