import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { PoolApp } from './pages/PoolApp/PoolApp';
import { PoolEdit } from './pages/PoolEdit/PoolEdit';
import { PoolDetails } from './pages/PoolDetails/PoolDetails';
import { UserProfile } from './pages/UserProfile/UserProfile';
import { LoginSignUp } from './pages/LoginSignUp/LoginSignUp';
import './App.css';

function App() {
    return (
        <Router>
            <div className='App'>
                <Switch>
                    <Route component={UserProfile} path='/user/:userId' />
                    <Route component={PoolEdit} path='/pool/edit/:id?' />
                    <Route component={PoolDetails} path='/pool/:id' />
                    <Route component={PoolApp} path='/pool' />
                    <Route component={LoginSignUp} path='/' />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
