import React, { Component } from 'react';
import './styles/Chips.css';
import Chips from './components/Chips';
import { connect } from 'react-redux';
import index from './reducer';
import * as chipsActions from './actions/ChipsActions';

class App extends Component {
  highLight = false;
  onSearchChipsText = (e) => {
    this.props.onSearchChipsText(e.target.value)
  }

  // onKeyPress = (e) => {
  //   if (e.keyCode === 8 && this.props.chips.length === 1 && this.highLight === false) {
  //     this.highLight = true;
  //     //1
  //     let myList = document.getElementById("list0");
  //     myList.style = "background: rgba(158, 158, 158, 0.51) !important";
  //   } else {
  //     this.highLight = false;
  //     let myList = document.getElementById("list0");
  //     if (this.props.chips.length > 0 && e.keyCode === 8) {
  //       this.props.deleteChips();
  //     }
  //   }
  // }

  onKeyPress = (e) => {
    if (e.keyCode === 8 && this.props.chips.length === 1 && this.highLight === false) {
      this.highLight = true;
      //1
      let myList = document.getElementById("list0");
      myList.style = "background: rgba(158, 158, 158, 0.51) !important";
    } else {
      this.highLight = false;
      let myList = document.getElementById("list0");
      if (this.props.chips.length > 0 && e.keyCode === 8) {
        this.props.deleteChips();
      }
    }
  }

  render() {
    return (
      <div>
        <div className="chips" >
          {/* chips component */}
          <Chips {...this.props} />
          <input type="text" className="chips-input" placeholder='Search...' 
            onChange={this.onSearchChipsText} 
            onFocus={this.props.onFocusChipsField} 
            onKeyDown={this.onKeyPress} />
        </div>
        <section className="chips-list chip-list-container">
          {this.props.chipsList.length > 0 ?
            <ul>
              {this.props.chipsList.map((data, index) => {
                return (
                  <li onClick={this.props.onAddChipsList.bind(this, index)}>
                    <span id="user-detail" >  {`${data.name}`} </span>
                    <span id="email-detail"> {data.email} </span>
                  </li>
                )
              })
              }
            </ul> : null
          }

        </section>
      </div>
    );
  }
}

function convertStateToProps(state) {

  return {
    chipsList: state.chipsReducer.chipsList,
    chips: state.chipsReducer.chips,
    highLightList: state.chipsReducer.highLightList
  }
}

export default connect(convertStateToProps, { ...chipsActions })(App);




