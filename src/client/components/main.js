import React, { PureComponent } from 'react';
import Upload from './upload';
import axios from 'axios';
import Notice from './notice';
import {toggleLoad} from './loader';

export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {message : '', syphtData : ''}
    this.handleUpload = this.handleUpload.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  formSubmit(event) {
    event.preventDefault();
    toggleLoad('load');
    let data = new FormData();
    data.append('sypht_document', this.state.upload_document);
    axios.request({
      url: './api/upload/',
      method: 'post',
      data: data,
    })
    .then((resp) => {
      this.setState({syphtData : resp.data.data});        
      toggleLoad('remove');
    }).catch((error) => {
      this.setState({message : <Notice type="error" message={error.msg}/>})
      toggleLoad('remove');
    }) 
  }

  handleUpload(event) {
    this.setState({ [event.target.name] : event.target.files[0]});
  }

  render() {
    return (
      <form encType="multipart/form-data" onSubmit={this.formSubmit}>
        <div className="">
          <Upload handleUpload={this.handleUpload} />
        </div>
        <div className="">
          <input type="submit" value="Submit Document" className="button blue-background white-colour" />
        </div>
        {this.state.message}
        {
          this.state.syphtData !== '' &&
          <>
            {this.state.syphtData.map((item, i) => {
              return <div key={i}><strong>{item.name}:</strong> {(item.value !== null) ? item.value : ''}</div>
            })}
          </>
        }
      </form>
    )
  }
}