
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from "react-router-dom";
// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';
import Navbar from './components/Navbar';
import CustomersPage from './pages/CustomersPage';
import HomePage from './pages/HomePage';
import InvoicesPage from './pages/InvoicesPage';



// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

const App=() => {
    return <HashRouter>
        <Navbar/>
        <main className="container pt-5">
            <Switch>
                <Route path="/invoices" component={InvoicesPage} />
                <Route path="/customers" component={CustomersPage} />
                <Route path="/" component={HomePage}/>
            </Switch>
        </main>
    </HashRouter>
}

const rootElement = document.querySelector('#app');

ReactDOM.render(<App/>, rootElement)