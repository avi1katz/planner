import React, { Component } from 'react';

class Schedule extends Component {

  render() {
    const {tasks, onRowClicked, onDelButtonClicked, pageDate} = this.props;

    return (
      <div className="Schedule">
        <div className="my-3">
          <div className="row">
            <div className="col-12">
              <h2 className="">{pageDate.toDateString()}</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <table className="table table-striped table-hover" >
                <thead>
                  <tr>
                    <th className="text-uppercase w-10"><i className="fa fa-check-square fa-lg" aria-hidden="true"></i> </th>
                    <th className="text-uppercase w-15">start time </th>
                    <th className="text-uppercase w-50">activity </th>
                    <th className="text-uppercase w-25"><i className="fa fa-trash fa-lg" aria-hidden="true"></i></th>
                  </tr>
                </thead>
                <tbody>
                  {[...tasks].sort(function (a, b) {
                    return new Date('1970/01/01 ' + a.startTime) - new Date('1970/01/01 ' + b.startTime);
                  }).map((task) => {
                    return <tr className={task.completed?"completed":""}
                    key={ task['_id'] }
                    onClick={event => {
                      onRowClicked(task._id);
                      console.log(task._id)}}>
                            <td><i className={"fa " + (task.completed ?  "fa-check-square-o" : "fa-square-o")}
                            aria-hidden="true"></i></td>
                            <td>{task.startTime}</td>
                            <td>{task.activity}</td>
                            <td><button
                                className='btn btn-small btn-danger'
                                value={task._id}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  event.preventDefault();
                                  onDelButtonClicked(event.currentTarget.value);
                                }}><i className="fa fa-trash-o fa-lg" aria-hidden="true"></i></button></td>
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
