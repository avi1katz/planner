import React, { Component } from 'react';

class ArrowDivButton extends Component {
  render() {
    const {direction, onArrowClicked} = this.props;
    return (
      <div id={`${direction}-arrow`}
      className={`col-6 col-md-2 order-md-${direction === 'left' ? '1' : '3'} py-3 div-button-dark`}
      onClick={onArrowClicked}>
        <div className="row  h-100 justify-content-center align-items-center">
          <div className="col-12">
            <i className={`fa fa-arrow-${direction} fa-2x`} aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default ArrowDivButton;
