import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn,} from 'mdbreact';
import API from '../../utils/AdminAPI'
import '../pageStyle.css'
import axios from 'axios';
import base64 from 'base-64'

class Admin extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        isLoading: false,
        error: true
      };
    }

    populateRoute = (e) => {
      e.preventDefault()
      API.addAllRoutes()
        .then(res => {
          console.log("All routes Added.")
        })
    }


    // not true authentication
    componentDidMount() {
      let accessString = localStorage.getItem('JWT')
      console.log(accessString)
      if (accessString === 'undefined') {
        this.setState({
          isLoading: false,
          error: true
        })
      } else {
        let payload = accessString.split(".")[1]

        console.log(payload)

        let decodedPayload = JSON.parse(base64.decode(payload))

        console.log(decodedPayload.email)
        console.log(this.props.match.params.email)

        if (decodedPayload.email === this.props.match.params.email) {
          console.log("decodedPayload.email === this.props.match.params.email")
          this.setState({
            error: false
          })
        }

      }
    }


    // componentDidMount() {
    //   let accessString = localStorage.getItem('JWT')
    //   console.log(accessString)
    //   if (accessString === 'undefined') {
    //     this.setState({
    //       isLoading: false,
    //       error: true
    //     })
    //   } else {

    //     axios.get("/api/auth/user", {
    //         params: {
    //           email: this.props.match.params.email
    //         },
    //         headers: {
    //           Authorization: `JWT ${accessString}`
    //         }
    //       })
    //       .then((response) => {
    //         console.log(response.data)

    //         if (response.data.auth) {
    //           console.log(`auth is ${response.data.auth}`)
    //           console.log(this)
    //           this.setState({
    //             isLoading: false,
    //             error: false
    //           })
    //         }

    //       })
    //       .catch(error => console.error(error))
    //   }
    // }



  render() {
    return ( 
      <MDBContainer className = "text-center mt-5 pt-5 mainContainer" >
        <MDBRow className = "justify-content-center" >
          <MDBCol md = "5" sm = "12" > 
          {!this.state.error && < MDBBtn color = "yellow accent-3" onClick = {(e) => this.populateRoute(e) } > Add TTC Routes and Stops </MDBBtn>} 
          {this.state.error && < MDBBtn color = "yellow accent-3" href = "/" > Creditial not found. <br></br>Click to return to Wait/Wait </ MDBBtn>}
          </MDBCol> 
        </MDBRow> 
      </MDBContainer>
    );
  };
};

export default Admin