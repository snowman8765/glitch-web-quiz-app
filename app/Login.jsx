class Login extends Component {

  static propTypes = {
    sessionId: PropTypes.string,
    message: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionId) {
      this.setState({ sessionId: nextProps.sessionId });
      localStorage.setItem('sessionId', this.state.sessionId);
    } else {
      this.setState({ message: nextProps.message });
    }
  }

  onLogin(e) {
    e.preventDefault();

    let id = this.refs.id.value;
    let pass = this.refs.pass.value;

    if (!id) {
      this.setState({ message: 'idは必須です。'});
    } else if (!pass) {
      this.setState({ message: 'パスワードは必須です。'});
    } else {
      this.setState({ message: null });
      // api 呼び出し
    }
  }

  render() {
    return (
      this.state.sessionId? (
        <Redirect to={'/'} />
      ) : (
        <div>
          <div>
            <p>{this.state.message}</p>
          </div>
          <div>
            <h1>ログイン</h1>
            <div>
              <input type="text" ref="id" placeholder="email" />
            </div>
            <div>
              <input type="password" ref="pass" placeholder="password" />
            </div>
            <button type="button" onClick={this.onLogin.bind(this)}>ログイン</button>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  sessionId: state.loginReducer.login.sessionId,
  message: state.loginReducer.login.message,
});

export default withRouter(connect(mapStateToProps)(Login));
