import React from 'react'

class Result extends React.Component {

  render() {

    let {travelMode} = this.props
    console.log('travelMode', travelMode)
    let heading = ""
    let text = ""

    if (travelMode === 'walk') {
        heading = 'walk'
        text= 'Based on our math, your feet are the best option.'
    }else if (travelMode === 'cab') {
        heading= 'cab'
        text= 'For various reasons, including that a bus may not be coming at all, you should call a cab. If you want to walk, it will take you {} minutes.' 
    }else if (travelMode === 'wait') {
        heading= 'wait'
        text= 'Our math shows the TTC will get you there faster.' 
    }

      console.log (heading)
      console.log (text)

    return(
       <div><button className={heading} onClick={(e)=>{this.props.onClick(e)}}><h2>{heading}</h2><br></br><p>{text}</p></button></div>
    );
  }
}

export default Result; 

