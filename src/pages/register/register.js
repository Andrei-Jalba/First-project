import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import './register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nameId: '',
            surnameId:'',
            usernameId:'',
            passwordId:'',
            confirmId:'',
            emailId:'',
        }
    }

    handleInput = (inputName) => (e) => {
        this.setState({
            [inputName]: e.target.value
        })
    }

    handleRegisterSubmit = (e) => {
        fetch('http://localhost:8081/register/', {
            method: 'post',
            // mode: 'no-cors',
            // cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        })
    }

    render() {
        return(
            <div class="container">
            <h1>Register</h1>
            <form  id="register-form">
                <div>
                    <label for="name_id">Name</label>
                    <input type="text"  id="name_id" class="u-full-width" value={this.state.nameId} onChange={this.handleInput('nameId')} />
                </div>
                <div>
                    <label for="surname_id">Surname</label>
                    <input type="text"  id="surname_id" class="u-full-width" value={this.state.surnameId} onChange={this.handleInput('surnameId')}/>
                </div>
                <div>
                    <label for="username_id">Username</label>
                    <input type="text"  id="username_id" class="u-full-width"value={this.state.usernameId} onChange={this.handleInput('usernameId')} />
                </div>
                <div>
                <label for="password_id">Password</label>
                    <input type="password"  id="password_id" class="u-full-width"value={this.state.passwordId} onChange={this.handleInput('passwordId')} />
                </div>
                <div>
                    <label for="confirm_password_id">Confirm password</label>
                    <input type="password"  id="confirm_id" class="u-full-width"value={this.state.confirmId} onChange={this.handleInput('confirmId')} />
                </div>
                <div>
                    <label for="email_id">Email</label>
                    <input type="text"  id="email_id" class="u-full-width"value={this.state.emailId} onChange={this.handleInput('emailId')} />
                </div>
                <div>
                    <Link to="/">
                        <input type="button" value="Register" class="u-full-width" onClick={this.handleRegisterSubmit}></input>
                    </Link>
                </div>
            </form>
            </div>
        )
    }
}

export default Register;