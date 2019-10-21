import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './components/layout';
import About from './pages/about';
import Forum from './pages/forum';
import Home from './pages/home';
import Register from './pages/register';
import './App.css';

class App extends Component {

	render() {
		return (
			<Router forceRefresh>
				<div className='App'>
					<Layout>
						<Route exact path='/' component={Home} />
						<Route path='/about' component={About} />
						<Route path='/forum' component={Forum} />
						<Route path='/register' component={Register} />
					</Layout>
				</div>
			</Router>
			
		);
	}
}

export default App;
