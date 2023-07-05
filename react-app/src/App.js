import React from 'react';
import Axios from 'axios';
import './styles.css';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      status: false,
      newInserted: false,
      data: [],
      check: false,
      errorMessage: false,
    };
  }

  handleInputChange = (value, key) => {
    this.setState({
      [key]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email } = this.state;
    let payload = {
      name: name,
      email: email,
    };

    let response = await Axios.post('http://localhost:3001/insertUserDetails', payload);

    if (response.data && response.data.status === true) {
      if (response.data.newInserted === true) {
        this.setState({
          status: true,
          name: response.data.name,
          email: response.data.email,
          newInserted: response.data.newlyInserted,
        });
      } else {
        this.setState({
          newInserted: response.data.newlyInserted,
          errorMessage: true,
        });
      }
    } else {
      this.setState({
        newInserted: response.data.newlyInserted,
      });
    }
  };

  handleCheck = async () => {
    let response = await Axios.get('http://localhost:3001/getDetails');
    console.log('response', response);
    if (response.data.length !== 0) {
      this.setState({
        data: response.data.response,
        check: true,
      });
    }
  };

  render() {
    const { name, email, newInserted, data, check, errorMessage } = this.state;
    console.log('error', errorMessage);
    return (
      <div className="parent-div">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="nameImput">Name</label>
            <input
              type="text"
              name="name"
              className="input-box"
              value={this.state.name}
              onChange={(e) => {
                this.handleInputChange(e.target.value, 'name');
              }}
            />
          </div>
          <div>
            <label for="emailImput">Email</label>
            <input
              name="email"
              type="email"
              value={this.state.email}
              className="input-box"
              onChange={(e) => {
                this.handleInputChange(e.target.value, 'email');
              }}
            />
          </div>
          <button className="button" onClick={this.handleSubmit}>
            Submit
          </button>
          {newInserted !== true && errorMessage === true && <p style={{ color: 'red' }}>Already inserted</p>}
        </form>
        <button className="check-button" onClick={this.handleCheck}>
          Check
        </button>
        {newInserted && (
          <div class="greenBox">
            <h4>Your Newly Inserted Data</h4>
            <p>name : {name}</p>
            <p>email: {email}</p>
          </div>
        )}

        {check && (
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>

            {data.length !== 0 &&
              data.map((val) => {
                return (
                  <tr>
                    <td>{val.name}</td>
                    <td></td>
                    {val.email}
                  </tr>
                );
              })}
          </table>
        )}
      </div>
    );
  }
}

class MainTitle extends React.Component {
  render() {
    return <h1>Ippo Pay Test</h1>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <MainTitle />
        <ContactForm />
      </div>
    );
  }
}

export default App;
