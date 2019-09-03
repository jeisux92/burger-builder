import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import { auth, setAuthRedirectPath } from "../../store/actions";
import classes from "./Auth.css";
import { connect } from "react-redux";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom"
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    constrols: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }



  inputChangedHandler = (controlName, e) => {
    const updatedControls = updateObject(this.state.constrols, {
      [controlName]: updateObject(this.state.constrols[controlName], {
        value: e.target.value,
        touched: true,
        valid: checkValidity(
          e.target.value,
          this.state.constrols[controlName].validation
        )
      })
    });

    let formIsValid = true;
    for (let input in updatedControls) {
      formIsValid = formIsValid && updatedControls[input].valid;
    }

    this.setState({ constrols: updatedControls, formIsValid: formIsValid });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.onAuth(
      this.state.constrols.email.value,
      this.state.constrols.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));
  };

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />
    }
    let form = Object.keys(this.state.constrols).map(oFormKey => (
      <Input
        key={oFormKey}
        changed={this.inputChangedHandler}
        elementType={this.state.constrols[oFormKey].elementType}
        elementConfig={{
          ...this.state.constrols[oFormKey].elementConfig,
          ...{ key: oFormKey }
        }}
        touched={this.state.constrols[oFormKey].touched}
        shouldValidate={this.state.constrols[oFormKey].validation}
        invalid={!this.state.constrols[oFormKey].valid}
        value={this.state.constrols[oFormKey].value}
      />
    ));
    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button
            btnType="Success"
            clicked={() => auth}
            disabled={!this.state.formIsValid}
          >
            Submit
          </Button>
        </form>
        <Button btnType="Danger" clicked={() => this.switchAuthModeHandler()}>
          Switch to {this.state.isSignUp ? "Sign-In" : "Sign-Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  buildingBurger: state.burger.building,
  authRedirectPath: state.auth.authRedirectPath
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isAuth) => dispatch(auth(email, password, isAuth)),
  onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath("/"))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Auth, Axios));
