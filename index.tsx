import React, { Component } from 'react';
import { render } from 'react-dom';
import { encryptObjectFields, encrypt, privateKey } from "./encryption"
import { publicKey, passphrase } from "./keys"
import TextField from '@material-ui/core/TextField';
import ReactJson from 'react-json-view'
import Hello from './Hello';
import './style.css';

interface AppProps { }
interface AppState {
  name: string;
}


class FieldEncrypt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      json: '',
      publicKey: publicKey,
      privateKey: privateKey,
      passphrase: passphrase
    };
  }
  handleChange(event) {
    this.setState({json: event.target.value})
    this.setState({originalJson: JSON.parse(event.target.value)})
    this.setState({encriptedJson: encryptObjectFields(JSON.parse(event.target.value))})
  }
  handlePbKeyChange(event) {
    this.setState({publicKey: event.target.value})
  }
  render() {
    return (
      <div>
        <form noValidate autoComplete="off">
          <TextField id="standard-basic" label="Json" value={this.state.json} onChange={(event) => this.handleChange(event)}/>
          <br/>
          <TextField id="standard-basic" label="Public Key" value={this.state.publicKey} onChange={(event) => this.handlePbKeyChange(event)}/>
          <TextField id="standard-basic" label="Private Key" value={this.state.privateKey} onChange={(event) => this.handlePbKeyChange(event)}/>
          <TextField id="standard-basic" label="Passphrase" value={this.state.passphrase} onChange={(event) => this.handlePassKeyChange(event)}/>
        </form>
        <p>Original Fields</p>
        <ReactJson src={this.state.originalJson} />
        <p>Encrypted Fields</p>
        <ReactJson src={this.state.encriptedJson} />
      </div>
    )
  }
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello name={this.state.name} />
        <FieldEncrypt />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
