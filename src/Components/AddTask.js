import React, { Component } from 'react';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state={
      startTime: '',
      activity: '',
      touched: {
        startTime: false,
        activity: false,
      },
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }
  onButtonClick(event){
    console.log(`start: ${this.state.startTime} activity: ${this.state.activity}`);
    this.props.onAddButtonClicked(this.state.startTime, this.state.activity);
    this.setState({startTime:'', activity: '', touched: {startTime: false, activity: false }});
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }

  render(props) {
    const {startTime, activity, touched} = this.state;
    const isEnabled = startTime.length > 0 &&
    this.state.activity.length > 0;

    return (
      <div className="AddTask mt-4">
        <div className="container">
          <form className="container">
            <div className="row">
              <div className={"col-3 form-group" + (touched.startTime ? " was-validated" : "")}>
                <label htmlFor="start" className="text-white-70">Start: </label>
                <input id="start"
                className="input form-control"
                value={startTime}
                type="time"
                pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                placeholder="start time (HH:mm)"
                required="true"
                onBlur={this.handleBlur("startTime")}
                onChange={event => {
                  this.setState({startTime: event.target.value});
                }}/>
                <div className="invalid-feedback">
                  Please provide a valid time format.
                </div>
              </div>
              <div className={"col-6 form-group" + (touched.activity ? " was-validated" : "")}>
                <label htmlFor="activity" className="text-white-70">Activity: </label>
                <input id="activity"
                className="input form-control"
                value={activity}
                placeholder="Do something..."
                required="true"
                onBlur={this.handleBlur("activity")}
                onChange={event => {
                  this.setState({activity: event.target.value});
                }}/>
                <div className="invalid-feedback">
                  Please provide a valid activity.
                </div>
              </div>
              <div className="col-3 form-group d-flex align-items-start justify-content-center">
                <button className="btn btn-dark mt-4 mb-3 py-3"
                type="submit"
                onClick={this.onButtonClick}
                disabled={!isEnabled}
                >Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddTask;
