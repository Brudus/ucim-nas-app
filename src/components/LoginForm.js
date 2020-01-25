import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loginError: '',
            emailPassed: undefined
        };
    }

    validateEmail = (email) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    };

    onEmailChange = (e) => {
        const email = e.target.value;
        const emailPassed = this.validateEmail(email);
        this.setState(() => ({ 
            email,
            emailPassed
        }));
    };

    onPasswordChange = (e) => {
        const password = e.target.value;
        this.setState(() => ({ password }));
    }

    onSubmit = (e) => {
        e.preventDefault();

        this.setState(() => ({ 
            loginError: '',
            emailPassed: true
        }));
        this.props.startLogin(this.state.email, this.state.password);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    {this.state.loginError && <p>{this.state.loginError}</p>}
                    <div>
                        <input 
                            type="email"
                            placeholder="Email address" 
                            autoFocus
                            onChange={this.onEmailChange}
                        />
                    </div>
                    
                    <div>
                        <input 
                            type="password"
                            placeholder="Password" 
                            onChange={this.onPasswordChange}
                        />
                    </div>
                    <button disabled={!this.state.emailPassed || !this.state.password}>Login</button>
                </form> 
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch, props) => ({
    startLogin: (email, password) => dispatch(startLogin(email, password))
});

export default connect(undefined, mapDispatchToProps)(LoginForm);