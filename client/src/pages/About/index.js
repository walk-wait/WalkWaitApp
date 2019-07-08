import React from "react";
import { MDBContainer } from 'mdbreact';

const AboutPage = () => {
    return (
      <MDBContainer id="about" className="mt-5 pt-5 mainContainer">
        <br></br>
        <h2>
            Why walk or wait?
        </h2>
            <br></br>
            <p>
                We've all been there. Standing at a TTC stop, waiting, checking the time, waiting, checking the time, waiting ....
                checking the time. 
            </p>
            <p>
                Then, the scramble. 
            </p>
            <p>
                How far is it to my destiantion? When does the TTC say my chariot will 
                arrive? Will it actually arrive at the next scheduled time? Or, will it be shorturned? And, even if it doess arrive,
                will it be full?
            </p>
            <p>
                SHOULD I JUST START WALKING?
            </p>
            <p>
                This app takes the guesswork out of the equation. Real-time TTC data only tells when your bus or streetcar is SUPPOSED 
                to arrive. 
            </p>
            <p>
                Our app uses a proprietary algorithm to predict the future, figuring the statistical probability your ride will arrive 
                as scheduled, you'll actually be able to get on it and it will take you all the way to your destanation FASTER &#40;or slower&#41;
                than you could make it on foot. 
            </p>
            <p>
                No more street-corner math. No more should I stay or should I go.
            </p>
            <p>
                Kick back and let us make the tough decisions for you &#40;after all, you decided what to wear this morning. Haven't you done enough?&#41;
            </p>
            <p>"Pure mathematics is, in its way, the poetry of logical ideas."
                — Albert Einstein</p>
            <br></br>
            <h2>About us</h2>
            <br></br>
            <p>
            Here we will write a little something about us as a group, school etc.
            </p>
            <br></br>
            <h2>Sharon Chien</h2>
            <br></br>
            <p>About Sharon</p>
            <br></br>
            <h2>Paul Xu</h2>
            <br></br>
            <p>About Paul</p>
            <br></br>
            <h2>Quang Chieu Nguyen</h2>
            <br></br>
            <p>About Quang</p>
            <br></br>
            <h2>Holland Gronau</h2>
            <br></br>
            <p>I believe in using apps and good old-fashioned math to makes people's lives easier and support good causes. 
            From start to finish, Walk or Wait was developed with the philosphy that good technology should be used to solve 
            real-life problems. </p>
      </MDBContainer>
    );
  }
  
  export default AboutPage;