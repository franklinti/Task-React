import { Switch } from 'react-router-dom';
import Route from './Route'

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Clientes from '../pages/Clientes';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/cadastrar" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} isPrivate />
            <Route exact path="/profile" component={Profile} isPrivate />
            <Route exact path="/clientes" component={Clientes} isPrivate />
            <Route exact path="*" component={Dashboard} isPrivate />
        </Switch>
    )
}