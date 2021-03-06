import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text } from 'react-native';
import { createStructuredSelector } from 'reselect';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardSection from '../../components/CardSection';
import Input from '../../components/Input';
import Spinner from '../../components/Spinner';
import { emailChanged, passwordChanged, loginUser } from './actions';
import { selectEmail, selectError, selectLoading, selectPassword } from './selectors';
import { styles } from './styles';

class LoginForm extends Component {

  onEmailChange = (text) => {
    this.props.emailChanged(text);
  };

  onPasswordChange = (text) => {
    this.props.passwordChanged(text);
  };

  loginButtonPressed = () => {
    const { email, password, navigation } = this.props;
    this.props.loginUser(email, password, navigation);
  };

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='small' />;
    }

    return (<Button onPress={this.loginButtonPressed}>Login</Button>);
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder='user@gmail.com'
            autoCorrect={false}
            label='Email'
            value={this.props.email}
            onChangeText={this.onEmailChange}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder='password'
            autoCorrect={false}
            label='Password'
            value={this.props.password}
            onChangeText={this.onPasswordChange}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.props.error.message}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

LoginForm.propTypes = {
  email: React.PropTypes.string,
  navigation: React.PropTypes.object,
  password: React.PropTypes.string,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  loginUser: React.PropTypes.func,
  emailChanged: React.PropTypes.func,
  passwordChanged: React.PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  email: selectEmail(),
  password: selectPassword(),
  loading: selectLoading(),
  error: selectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    emailChanged: (email) => dispatch(emailChanged(email)),
    passwordChanged: (password) => dispatch(passwordChanged(password)),
    loginUser: (email, password, navigation) => dispatch(loginUser(email, password, navigation)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
