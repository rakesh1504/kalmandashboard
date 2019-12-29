import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      user_name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      user_name: this.state.user_name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-stretch auth auth-img-bg">
            <div className="row flex-grow">
              <div className="col-lg-6 d-flex align-items-center justify-content-center">
                <div className="auth-form-transparent text-left p-3">
                  <div className="brand-logo">
                    <img src="./images/logo.svg" alt="logo" />
                  </div>
                  <h4>New here?</h4>
                  <h6 className="font-weight-light">
                    Join us today! It takes only few steps
                  </h6>
                  <div className="col s12">
                    {errors.message ? (
                      <p className="error-message">{errors.message}</p>
                    ) : null}
                  </div>
                  <form className="pt-3" noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="user_name">Username</label>
                      <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                          <span className="input-group-text bg-transparent border-right-0">
                            <i className="mdi mdi-account-outline text-primary"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          onChange={this.onChange}
                          value={this.state.user_name}
                          id="user_name"
                          className="form-control form-control-lg border-left-0"
                          placeholder="Username"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                          <span className="input-group-text bg-transparent border-right-0">
                            <i className="mdi mdi-email-outline text-primary"></i>
                          </span>
                        </div>
                        <input
                          type="email"
                          onChange={this.onChange}
                          value={this.state.email}
                          className="form-control form-control-lg border-left-0"
                          placeholder="Email"
                          id="email"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                          <span className="input-group-text bg-transparent border-right-0">
                            <i className="mdi mdi-lock-outline text-primary"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          onChange={this.onChange}
                          value={this.state.password}
                          className="form-control form-control-lg border-left-0"
                          id="password"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="password2">Confirm Password</label>
                      <div className="input-group">
                        <div className="input-group-prepend bg-transparent">
                          <span className="input-group-text bg-transparent border-right-0">
                            <i className="mdi mdi-lock-outline text-primary"></i>
                          </span>
                        </div>
                        <input
                          type="password"
                          onChange={this.onChange}
                          value={this.state.password2}
                          className="form-control form-control-lg border-left-0"
                          id="password2"
                          placeholder="Password"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" />
                          I agree to all Terms & Conditions
                        </label>
                      </div>
                    </div>
                    <div className="mt-3">
                      <button
                        type="submit"
                        className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                      >
                        SIGN UP
                      </button>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Already have an account?{" "}
                      <a href="login.html" className="text-primary">
                        Login
                      </a>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6 register-half-bg d-flex flex-row">
                <p className="text-white font-weight-medium text-center flex-grow align-self-end">
                  Copyright &copy; 2018 All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
