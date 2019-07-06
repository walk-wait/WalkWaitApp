import React from "react";
import { MDBContainer } from 'mdbreact';

const AboutPage = () => {
    return (
      <MDBContainer id="about" className="mt-5 pt-5 mainContainer">
        <h2>
            Why walk or wait?
        </h2>
            <br></br>
            <p>
                We've all been there. Standing at a TTC stop, waiting, checking the time, waiting, checking the time, waiting ....
                checking the time. 
                
                Then, the scramble. 
                
                How far is it to my destiantion? When does the TTC say my chariot will 
                arrive? Will it actually arrive at the next scheduled time? Or, will it be shorturned? And, even if it doess arrive,
                will it be full?

                SHOULD I JUST START WALKING?
            
                This app takes the guesswork out of the equation. Real-time TTC data only tells when your bus or streetcar is SUPPOSED 
                to arrive. 
                
                Our app uses a proprietary algorithm to predict the future, figuring the statistical probability your ride will arrive 
                as scheduled, you'll actually be able to get on it and it will take you all the way to your destanation FASTER &#40;or slower&#41;
                than you could make it on foot. 

                No more street-corner math. No more should I stay or should I go.

                Kick back and let us make the tough decisions for you &#40;after all, you decided what to wear this morning. Haven't you done enough?&#41;

              
                "Pure mathematics is, in its way, the poetry of logical ideas."
                — Albert Einstein
            </p>
      </MDBContainer>
    );
  }
  
  export default AboutPage;