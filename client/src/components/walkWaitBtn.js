import React from 'react'

class Result extends React.Component {

  render() {

    let {travelMode} = this.props
    console.log('travelMode', travelMode)
    let heading = ""
    let text = ""

    if (travelMode === 'walk') {
        heading = 'walk'
        text= 'Based on our math you will get there faster'
    }else if (travelMode === 'cab') {
        heading= 'cab'
        text= 'For various reasons including a bus may not be coming at all you should call a cab. If you want to walk still it will take you {} minutes' 
    }else if (travelMode === 'wait') {
        heading= 'wait'
        text= 'Please wait our math shows you will arrive faster then walking if you use the TTC.' 
    }

      console.log (heading)
      console.log (text)


  // let renderResult = <button className={this.state.heading}> <h2>{this.state.heading}</h2><p>{this.state.text}</p></button>
    return(
       <div><button className={heading} onClick={(e)=>{this.props.onClick(e)}}><h2>{heading}</h2><p>{text}</p></button></div>
        // <div><button onClick={
        //   function (e) {
        //     console.log (e.target.classList.add('nothing'))
        //   }
        // } className={heading}><h2>{heading}</h2><p>{text}</p></button></div>
    );
  }
}

export default Result; 


/* <button className="cab resultBtn"><a href="/home"><h2 className="cab">Take a Taxi</h2><p className="cab">No bus will arrive. {} to walk.</p><p className="cab">Please click anywhere on the page to return to the start.</p></a></button> */

// //Manual binomial function for probability
// function binomial(n, k) {
//     if ((typeof n !== 'number') || (typeof k !== 'number')) 
//  return false; 
//    var coeff = 1;
//    for (var x = n-k+1; x <= n; x++) coeff *= x;
//    for (x = 1; x <= k; x++) coeff /= x;
//    return coeff;
// }

// console.log(binomial(8,3));
// console.log(binomial(10,2));

// //Time Day Logic Tables for maginal math probability 
// const a = {
//   'mon': { 
//    0: { trials: 3, sucess: 1}, //8am-9am
//    1: { trials: 2, sucess: 1}, //12pm-1pm
//    2: { trials: 3, sucess: 2}, //4pm-5pm
//    4: { trials: 1, sucess: 0} //all other hours
//    },
//   'tues': {
//     0: { trials: 3, sucess: 1}, //8am-9pm
//     1: { trials: 2, sucess: 1}, //12pm-1pm
//     2: { trials: 3, sucess: 2}, //4pm-5pm
//     4: { trials: 1, sucess: 0} //all other hours
//   },
//   'wed': {
//     0: { trials: 3, sucess: 1}, //8am-9pm
//     1: { trials: 2, sucess: 1}, //12pm-1pm
//     2: { trials: 3, sucess: 2}, //4pm-5pm
//     4: { trials: 1, sucess: 0} //all other hours
//   },
//   'thurs': {
//     0: { trials: 3, sucess: 1}, //8am-9pm
//     1: { trials: 2, sucess: 1}, //12pm-1pm
//     2: { trials: 3, sucess: 2}, //4pm-5pm
//     4: { trials: 1, sucess: 0} //all other hours
//   },
//   'fri': {
//     0: { trials: 3, sucess: 1}, //8am-9pm
//     1: { trials: 2, sucess: 1}, //12pm-1pm
//     2: { trials: 3, sucess: 2}, //4pm-5pm
//     4: { trials: 1, sucess: 0} //all other hours
//   },
//   'weekend': {
//     0: { trials: 3, sucess: 1}, //8am-9pm
//     1: { trials: 2, sucess: 1}, //12pm-1pm
//     2: { trials: 3, sucess: 2}, //4pm-5pm
//     4: { trials: 1, sucess: 0} //all other hours
//   }
//  }
// //Call list for table
//  const time = '5:00'; //called from the API
//  const day = 'mon'; //called from the API
//  const x = a[day][time].trials //NewDate() built in function to JS or use moment.js 
//  const y = a[day][time].success

//  binomial(x, y)

// // Business logic for algorithm not using tables yet. 
// Math.random();
// var s = Math.floor(Math.random()*9)+1;

// var walkWaitTtc = eta * binomialProbability(10, s, 0.5) + eta;

// console.log(s + " at " + walkWaitTtc);

//  //Conditions array if/else for walk or wait determination
//  let conditionsArray = [
//   walkTime < 20, 
//   bus.eta >= walkTime, //bus.eta walk.eta
//   bunch = false,
// ]
// //SET STATE HERE
// if (conditionsArray.indexOf(false) === -1) {
//   renderWalkButton //Else recommend wait
// }

//return a promise to use async await 
//define a state I am cha

//React to change state using conditions array

//define state as boolean if all conditions are met in the if else or not met. 


//Class
// Chain to event on click of submit
// 3 states do not apear, appear as walk and appear wait (to change state).
//Moved JS to controller 
//use conditions array to determin result and pass to prop.

//  componentDidMount() {
//   if(this.state.walk) {
//     console.log(this.state.modalStatus);
//     this.setState({ modalStatus: true}, () => {
//          console.log(this.state.modalStatus);
//     });
//   }  else {
//       console.log(this.state.modalStatus);
//     } 
//   }


 // <div> Walk or Wait</div>
 //Binomial Runkit NPM Instructions
//  const binomialProbability = require('binomial-probability')

 // What is the probability of x successes in n trials?
//  binomialProbability(trials, successes, probability_of_success)
 
 // What is the probability of x or fewer successes in n trials?
//  binomialProbability.cumulative(trials, successes, probability_of_success)

//  var binomialProbability = require("binomial-probability");