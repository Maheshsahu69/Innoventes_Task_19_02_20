import React from 'react';
import './App.css';
import { Button } from '@material-ui/core';
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css';

const maxRoom = 5;
const roomCapacity = 4;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countRoom: 1,
      countAdult: 1,
      countChild: 0,
    }

    // functions binding start from here..................................... 
    this.incrementRoom = this.incrementRoom.bind(this);
    this.decrementRoom = this.decrementRoom.bind(this);
    this.incrementAdult = this.incrementAdult.bind(this);
    this.decrementAdult = this.decrementAdult.bind(this);
    this.incrementChildren = this.incrementChildren.bind(this);
    this.decrementChildren = this.decrementChildren.bind(this);

  };

  //Functions defination starts from here.....................................
  incrementRoom() {
    let { countRoom, countAdult, countChild } = this.state;
    if (countRoom < maxRoom) {
      countRoom += 1;
      if (countRoom > countAdult + countChild) countAdult = countRoom - countChild;
      this.setState({ countRoom: countRoom, countAdult: countAdult });
    }
  }

  decrementRoom() {
    let { countRoom, countAdult, countChild } = this.state;
    let totalMember = countChild + countAdult;
    let previousRoom = roomCapacity * (countRoom - 1);
    if (countRoom > 1 && totalMember <= previousRoom) {
      countRoom -= 1;
      this.setState({ countRoom: countRoom });
    } else if (countRoom > 1) {
      countRoom -= 1;
      if (countChild >= roomCapacity) {
        countChild -= roomCapacity;
      } else if (
        countChild > 0 &&
        countChild < roomCapacity &&
        totalMember > roomCapacity
      ) {
        countAdult -= roomCapacity - countChild;
        countChild = 0;
      } else if (countAdult > roomCapacity) {
        countAdult = previousRoom;
      }
      this.setState({ countRoom: countRoom, countAdult: countAdult, countChild: countChild });
    }
  }


  incrementAdult() {
    let { countAdult, countRoom, countChild } = this.state;
    let availableCount = roomCapacity * countRoom;
    let totalMember = countChild + countAdult;
    if (totalMember < availableCount) {
      countAdult += 1;
      this.setState({ countAdult: countAdult });
    } else if (countRoom != maxRoom) {
      countAdult += 1;
      countRoom += 1;
      this.setState({ countAdult: countAdult, countRoom: countRoom });
    }
  }
  decrementAdult() {
    let { countChild, countAdult, countRoom } = this.state;
    let totalMember = countChild + countAdult;
    if (countAdult > 1 && totalMember <= countRoom) {
      countAdult -= 1;
      countRoom -= 1;
      this.setState({ countAdult: countAdult, countRoom: countRoom });
    } else if (countAdult > 1) {
      countAdult -= 1;
      this.setState({ countAdult: countAdult });
    }
  }


  incrementChildren() {
    let { countAdult, countRoom, countChild } = this.state;
    let availableCount = roomCapacity * countRoom;
    let totalMember = countChild + countAdult;
    if (totalMember < availableCount) {
      countChild += 1;
      this.setState({ countChild: countChild });
    } else if (countRoom != maxRoom) {
      countChild += 1;
      countRoom += 1;
      this.setState({ countChild: countChild, countRoom: countRoom });
    }
  }

  decrementChildren() {
    let { countChild, countAdult, countRoom } = this.state;
    let totalMember = countChild + countAdult;
    if (countChild > 0 && totalMember <= countRoom) {
      countChild -= 1;
      countRoom -= 1;
      this.setState({ countChild: countChild, countRoom: countRoom });
    } else if (countChild > 0) {
      countChild -= 1;
      this.setState({ countChild: countChild });
    }
  }
  render() {
    return (
      <div>
        <h2 style={{ color: "#006699", marginLeft: "20px" }}> <span className="fa fa-users" aria-hidden="true" style={{ color: "#006699", fontSize: "25px" }}> </span> Choose Number Of People</h2>
        <div id="outerDivID">
          <div style={{ width: "100%", borderBottom: "2px solid #7a7a52", height: "90px" }}> <span className="fa fa-bed" aria-hidden="true" style={{ color: "#006699", fontSize: "25px" }}></span><span id="TitleDivRoom" > ROOMS</span>
            <span style={{ paddingLeft: "460px" }}><button disabled={this.state.countRoom > 1 ? false : true} id="btnDecreament" className="fa fa-minus-circle" onClick={this.decrementRoom}></button></span>
            <span style={{ paddingLeft: "45px", color: "#006699", fontWeight: "bold" }} >{this.state.countRoom}</span>
            <span style={{ paddingLeft: "50px" }}><button disabled={this.state.countRoom >= 5 ? true : false} id="btnIncrement" className="fa fa-plus-circle" onClick={this.incrementRoom} ></button></span>
          </div>
          <div style={{ width: "100%", borderBottom: "2px solid #7a7a52", height: "95px", marginTop: "15px" }}> <span className="fa fa-user" aria-hidden="true" style={{ color: "#006699", fontSize: "25px" }}></span><span id="TitleDivAdult">  ADULTS</span>
            <span style={{ paddingLeft: "472px" }}><button disabled={this.state.countAdult > 1 ? false : true} id="btnDecreamentAdult" className="fa fa-minus-circle" onClick={this.decrementAdult} ></button></span>
            <span style={{ paddingLeft: "45px", color: "#006699", fontWeight: "bold" }}>{this.state.countAdult}</span>
            <span style={{ paddingLeft: "50px" }}><button disabled={this.state.countAdult >= 20 ? true : false} id="btnIncrementAdult" className="fa fa-plus-circle" onClick={this.incrementAdult} ></button></span>
          </div>
          <div style={{ width: "100%", height: "90px", marginTop: "15px" }}> <span className="fa fa-child" aria-hidden="true" style={{ color: "#006699", fontSize: "25px" }}></span><span id="TitleDivChildren"> CHILDREN</span>
            <span style={{ paddingLeft: "442px" }}><button disabled={this.state.countChild > 0 ? false : true} id="btnDecreament" className="fa fa-minus-circle" onClick={this.decrementChildren}></button></span>
            <span style={{ paddingLeft: "45px", color: "#006699", fontWeight: "bold" }}>{this.state.countChild}</span>
            <span style={{ paddingLeft: "50px" }}><button disabled={this.state.countChild >= 19 ? true : false} id="btnIncrement" className="fa fa-plus-circle" onClick={this.incrementChildren}></button></span>
            </div>
        </div>
      </div>
    );
  };
};
export default App;