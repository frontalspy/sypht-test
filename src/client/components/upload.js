import React, { PureComponent } from 'react';

export default class Upload extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {value : ''};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.handleUpload(event);
    this.setState({value : event.target.value})
  }

  render() {
    return (
      <input type="file" id="sypht_upload" name="upload_document" value={this.state.value} onChange={this.handleChange} accept=".pdf,.doc,.docx,.jpg,.png,.jpeg,.txt,.xlsx,.xls,.msg,.zip"/>
    )
  }
}