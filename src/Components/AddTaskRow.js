import React, { Component } from 'react';

class AddTaskRow extends Component {
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
    this.props.onAddButtonClicked({user: 'avi',
                                  date: this.props.pageDate,
                                  startTime: this.state.startTime,
                                  activity: this.state.activity,
                                  completed: false});
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
          <tr className="">
              <td></td>
              <td className="">
                <input id="start"
                className="input form-control"
                value={startTime}
                type="time"
                pattern="([01]?[0-9]|2[0-3]):[0-5][0-9]"
                placeholder="start"
                required="true"
                onBlur={this.handleBlur("startTime")}
                onChange={event => {
                  this.setState({startTime: event.target.value});
                }}/>
              </td>
              <td className="">
                <input id="activity"
                className="input form-control"
                value={activity}
                placeholder="Do something..."
                required="true"
                onBlur={this.handleBlur("activity")}
                onChange={event => {
                  this.setState({activity: event.target.value});
                }}/>
              </td>
              <td className="">
                <button className="btn btn-dark"
                type="submit"
                onClick={this.onButtonClick}
                disabled={!isEnabled}
                >Add
                </button>
              </td>
          </tr>
    );
  }
}

export default AddTaskRow;
