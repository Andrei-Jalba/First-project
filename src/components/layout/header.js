import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './header.css';
const localStorage = window.localStorage;

class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            emailId: '',
            passwordId:'',
        }
    }

    handleInput = (inputName) => (e) => {
        this.setState({
            [inputName]: e.target.value
        })
    }

    handleLoginSubmit = (e) => {
        fetch('http://localhost:8081/login/', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        }).then((response) => {
            return response.json()
        }).then(({ message, token, userData }) => {
            localStorage.removeItem('token');
            localStorage.setItem('token', token);
            localStorage.setItem('name', userData.name);
            localStorage.setItem('surname', userData.surname);
            localStorage.setItem('email', userData.email);
            console.log('SERVER MESSAGE: ', message);
            this.reloadCurrentPath();
        }).catch((err) => {
            if (err) {
                throw new Error(err);
            }
        })
    }

    reloadCurrentPath = () => {
        const { history, location } = this.props;
        history.push(location.pathname);
    }

    disconnectHandler = () => {
        localStorage.removeItem('token');
        this.reloadCurrentPath();
    }

    render(){
        const isAuthed = !!localStorage.getItem('token');
        const name = localStorage.getItem('name');
        const surname = localStorage.getItem('surname');

        return(
        <div className = "above-body">
          <div className = "header">
            <div className = "title">
                <img src={'/image/image1.jpg'} alt=" " style={{width:50,height:50,marginRight: 20}}/>
                <h1>Regina Maria</h1>
            </div>
            <div id = "top-links" className = "top-links">
              <div className = "nouser">
                {!isAuthed ? 
                    <React.Fragment>
                        <form id = "navbar_loginform" className = "navbar_loginform" action = "">
                            <div id = "logindetails" className = "logindetails">
                                <label for="email_id">Email</label>
                                <input type="text"  id="email_id" class="u-full-width"value={this.state.emailId} onChange={this.handleInput('emailId')} />
                                <label for="password_id">Password</label>
                                <input type="password"  id="password_id" class="u-full-width"value={this.state.passwordId} onChange={this.handleInput('passwordId')} />
                                <input type="button" value="Login" class="u-full-width" onClick={this.handleLoginSubmit}></input>
                            </div>
                            <div id = "remember" className = "remember">
                                <label></label>
                            </div>
                        </form>
                        <div className = "need-an-account"> Need an account? 
                            <Link to = "/register">Register</Link>
                        </div>
                    </React.Fragment>
                    : <React.Fragment>
                        <span>Welcome {name} {surname}</span>
                        <button onClick={this.disconnectHandler}>Disconnect</button>
                    </React.Fragment>
                }
              </div>
            </div>
          </div>
        </div>
  )
}
}
export default withRouter(Header);
