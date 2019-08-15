import React, { PureComponent } from 'react';

export class Notice extends PureComponent {

  render() {
    return (
      <div className={this.props.type}>
        <div className="notice-message">
          {this.props.message}
        </div>
      </div>
    )
  }
}

export default Notice