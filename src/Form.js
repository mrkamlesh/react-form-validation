import React, { Component } from 'react';
import { FormErrors } from './FormErrors';
import './Form.css';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      isfFormSubmited: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  handleFormSubmit = (e) => {
    this.setState({ isfFormSubmited: true });
    console.log("form email value: ", this.state.email);
    console.log("form password value: ", this.state.password);
    
    e.preventDefault();
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 3;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }

  hasInputError(inputField) {
    return (inputField.length === 0 ? false : true);
  }

  hasFormError(emailError, passwordError) {
    if (emailError.length === 0 && passwordError.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <form className="demoForm" onSubmit={this.handleFormSubmit}>
        <h2>Sign up</h2>
        {this.hasFormError(this.state.formErrors.email, this.state.formErrors.password) && (
          <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
          </div>
        )}

        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput} />
            {this.hasInputError(this.state.formErrors.email) && (
            <small className="form-text has-error-input">Please input valid email.</small>
            )}
        </div>
        

        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleUserInput} />
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>Sign up</button>
      </form>
    )
  }
}

export default Form;
