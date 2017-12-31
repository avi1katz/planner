import React, { Component } from 'react';
import axios from 'axios';
import Schedule from './Schedule';
import ArrowDivButton from './ArrowDivButton';

class TodoArea extends Component {
  constructor(props) {
    super(props);
    const currentDate = new Date();
    currentDate.setHours(0,0,0,0);
    this.state = {
      pageDate: currentDate,
      tasks:[]
    };
    this.loadTasksFromServer = this.loadTasksFromServer.bind(this);
    this.onAddButtonClicked = this.onAddButtonClicked.bind(this);
    this.onDelButtonClicked = this.onDelButtonClicked.bind(this);
    this.onRowClicked = this.onRowClicked.bind(this);
    this.onArrowClicked = this.onArrowClicked.bind(this);
    this.onTodayClicked = this.onTodayClicked.bind(this);
  }

  onAddButtonClicked(task) {
    this.setState({tasks: [...this.state.tasks,
      {_id: Date.now(), startTime: task.startTime, activity: task.activity, completed: false}]});
    axios.post(`${this.props.url}/tasks`, task)
    .then(res => {
      //this.setState({tasks: [...this.state.tasks, task]});
      this.loadTasksFromServer();
    })
    .catch(err => {
      this.setState({tasks: [...this.state.tasks]});
      console.error(err);
    });
  }

  onDelButtonClicked(id) {
    console.log(`delete button clicked: ${id}`)
    let newTasks = this.state.tasks.filter((task) => {
      console.log(`task.id: ${task._id} myBadid: ${id} compare: ${task._id === id}`);
      return task._id !== id;
    });
    console.log(newTasks);
    this.setState({tasks: newTasks});
    axios.delete(`${this.props.url}/task/${id}`)
    .then(res => {
      console.log('Task deleted');
      this.loadTasksFromServer();
    })
    .catch(err => {
      console.error(err);
      this.loadTasksFromServer();
    });
  }

  onRowClicked(id) {
    let affectedTask = this.state.tasks.find( task => task._id === id );
    console.log(`row clicked: ${id}`);
    console.log(affectedTask);
    let newTasks = this.state.tasks.map((task) => {
      console.log(`task._id: ${task._id}`);
      const newTask = {...task};
      newTask.completed = (newTask._id === id ? !task.completed : task.completed);
      return newTask;
    });
    console.log(newTasks);
    this.setState({tasks: newTasks});
    axios.put(`${this.props.url}/task/${id}`, {...affectedTask, completed: !affectedTask.completed})
    .then(res => {
      console.log('Task updated');
      this.loadTasksFromServer();
    })
    .catch(err => {
      console.error(err);
      this.loadTasksFromServer();
    });
  }

  onArrowClicked(event) {
    const arrowDir = event.currentTarget.id;
    const addToDate = (arrowDir === 'left-arrow') ? -1 : 1;
    console.log(arrowDir);
    const newDate = new Date(this.state.pageDate.valueOf());
    newDate.setDate(newDate.getDate() + addToDate)
    this.setState({pageDate : newDate}, () => this.loadTasksFromServer());
    //console.log("new date: " + newDate);
    //this.loadTasksFromServer();
  }

  onTodayClicked(event) {
    this.setState({pageDate : new Date(new Date().setHours(0,0,0,0))},
                        () => this.loadTasksFromServer());
  }
  verifyDates(date1, date2) {
    // call setHours to take the time out of the comparison
    return date1.setHours(0,0,0,0) === date2.setHours(0,0,0,0);
  }

  loadTasksFromServer() {
    console.log("lookup date: " + this.state.pageDate);
    axios.get(`${this.props.url}/tasks/${this.state.pageDate}`)
    .then(res => {
      console.log(res);
      this.setState({ tasks: res.data });
    })
  }

  componentDidMount() {
    console.log("component did mount");
    this.loadTasksFromServer();
    //setInterval(this.loadTasksFromServer, 2000);
  }

  componentDidUpdate(_, previousState) {
    console.log("prev: ")
    console.log(previousState); // => {}
    console.log("curr: ")
    console.log(this.state);    // => { name: "Michael" }
  }

  render() {
    const {tasks, pageDate} = this.state;
    return (
      <div className=" TodoArea row align-items-stretch justify-content-center">
        <ArrowDivButton direction={"left"} onArrowClicked={this.onArrowClicked}/>
        <ArrowDivButton direction={"right"} onArrowClicked={this.onArrowClicked}/>
        <div className="col-12 col-md-8 order-md-2 d-flex flex-column">
          <div
          className={"row div-button-dark justify-content-center align-items-center d-none"
                    + (this.verifyDates(new Date(pageDate), new Date()) ? " d-none" : "")}
          onClick={(event) => {this.setState({pageDate : new Date(new Date().setHours(0,0,0,0))},
                              () => this.loadTasksFromServer())}}>
            <h3 className="col my-2"> Go to today! </h3>
          </div>
          <Schedule tasks={tasks}
            pageDate={pageDate}
            onAddButtonClicked={this.onAddButtonClicked}
            onDelButtonClicked={this.onDelButtonClicked}
            onRowClicked={this.onRowClicked}
            onTodayClicked={this.onTodayClicked}/>
        </div>
      </div>
    );
  }
}

export default TodoArea;
