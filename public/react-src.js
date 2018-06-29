
ReactDOM.render(
  <Root />,
  document.getElementById('root')
);


class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Menu />
          <div className="main">
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/users/:id/edit" component={UserEdit} />
              <Route path="/users" component={UserList} />
              <Route path="*" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}


class Users {
  constructor() {
    this.users = [
      { id: 1, name: "Tanaka", email: "tanaka@example.com" },
      { id: 2, name: "Suzuki", email: "suzuki@example.com" },
      { id: 3, name: "Yamada", email: "yamada@example.com" }
    ];
  }

  getUsers() {
    return this.users;
  }

  getUser(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === id) {
        return this.users[i];
      }
    }
    return undefined;
  }

  setUser(user) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].id === user.id) {
        this.users[i].name = user.name;
        this.users[i].email = user.email;
      }
    }
  }
}

const userList = new Users();

function Header() {
  return <div className="header">React Sample Console</div>;
}

function Menu() {
  return (
    <ul className="menu">
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/users">Users</Link></li>
    </ul>
  );
}

function Dashboard() {
  return <h1>Dashboard</h1>;
}

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: userList.getUsers() }
  }

  render() {
    const userRows = userList.getUsers().map((user, index) =>
      <tr key={index}>
        <td>{user.id}</td>
        <td><Link to={"/users/" + user.id + "/edit"}>{user.name}</Link></td>
        <td>{user.email}</td>
      </tr>
    );
    return (
      <div>
        <h1>Users</h1>
        <table>
          <thead><tr><th>Id</th><th>Name</th><th>E-mail</th></tr></thead>
          <tbody>{userRows}</tbody>
        </table>
      </div>
    )
  }
}

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: userList.getUser(Number(this.props.match.params.id)) }
  }

  onCange = (e) => {
    let user = this.state.user;
    switch (e.target.name) {
    case 'name':
      user.name = e.target.value;
      break;
    case 'email':
      user.email = e.target.value;
      break;
    default:
      break;
    }
    this.setState({ user: user });
  }

  onSubmit = (e) => {
    e.preventDefault();
    userList.setUser(this.state.user);
    this.props.history.push('/users');
  }

  onCancel = () => {
    this.props.history.push('/users');
  }

  render() {
    let user = this.state.user;
    return (
      <form onSubmit={this.onSubmit}>
        <table>
          <tbody>
            <tr>
              <th>Id</th>
              <td>{user.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td><input type="text" name="name" defaultValue={user.name} onChange={this.onCange} /></td>
            </tr>
            <tr>
              <th>E-mail</th>
              <td><input type="text" name="email" defaultValue={user.email} onChange={this.onCange} /></td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.onCancel}>Cancel</button>
        <button type="submit">OK</button>
      </form>
    );
  }
}
