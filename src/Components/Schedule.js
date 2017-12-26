import React, { Component } from 'react';

class Schedule extends Component {

  render() {
    return (
      <div className="Schedule">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Schedule</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-striped table-hover" >
                <thead>
                  <tr>
                    <th className="text-uppercase w-10">completed </th>
                    <th className="text-uppercase w-15">start time </th>
                    <th className="text-uppercase w-50">activity </th>
                    <th className="text-uppercase w-25">remove</th>
                  </tr>
                </thead>
                <tbody>
                  {[...this.props.tasks].sort(function (a, b) {
                    return new Date('1970/01/01 ' + a.startTime) - new Date('1970/01/01 ' + b.startTime);
                  }).map((task) => {
                    return <tr className={task.completed?"completed":""}
                    key={task.key}
                    onClick={event => {
                      this.props.onRowClicked(task.key);
                      console.log(task.key)}}>
                            <td><i className={"fa " + (task.completed ?  "fa-check-square-o" : "fa-square-o")}
                            aria-hidden="true"></i></td>
                            <td>{task.startTime}</td>
                            <td>{task.activity}</td>
                            <td><button
                                className='btn btn-small btn-danger'
                                value={task.key}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  event.preventDefault();
                                  this.props.onDelButtonClicked(event.target.value);
                                }}><i class="fa fa-trash-o fa-lg" aria-hidden="true"></i></button></td>
                          </tr>;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Schedule;
