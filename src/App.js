import React, { Fragment } from 'react';

import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SingIn from './components/SingIn/SingIn';
import Register from './components/Register/Register';
import Container from '@mui/material/Container';
// import AlertMessage from './components/AlertMessage/AlertMessage';







import './App.css';



const initialState = {
  UserInput: '',
  imageUrl: '',
  boundingBox: {},
  route: 'singIn',
  isSinedIn: false,
  user: {
    id: '',
    email: '',
    username: '',
    entries: 0,
    joined: '',
  },
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        name: data.name,
        entries: data.entries,
        joined: data.joined,
      }
    })

 
  }

  calculateFaceLocation = (data) => {
    const clarifaiConn = data.outputs[0].data.regions[0].region_info.bounding_box;

    const targetImage = document.getElementById('targetImage');
    const width = Number(targetImage.width);
    const height = Number(targetImage.height);
    return {
      leftCol: clarifaiConn.left_col * width,
      topRow: clarifaiConn.top_row * height,
      rightCol: width - (clarifaiConn.right_col * width),
      bottomRow: height - (clarifaiConn.bottom_row * height)
    }
  }


  displayFaceboundingBox = (boundingBox) => {

    this.setState({ boundingBox: boundingBox })
  }

  onUserInputChange = (event) => {

    this.setState({ UserInput: event.target.value })


  }

  onSubmit = (event) => {
    this.setState({ imageUrl: this.state.UserInput })


    fetch('https://brin-api-side.herokuapp.com/imageurl' , {
      method: 'POST',
      headers:{'Content-Type': 'application/json'} ,
      body: JSON.stringify({
        UserInput:this.state.UserInput
      })
    }).then(response => response.json())

      .then(response => {
        if(response){

          fetch('https://brin-api-side.herokuapp.com/image' , {
            method:'put',
            headers:{'Content-Type': 'application/json'} , 
            body: JSON.stringify({
              id:this.state.user.id
            })
          }).then(response => response.json())
          .then(count => this.setState(Object.assign(this.state.user , {entries:count})))

          this.displayFaceboundingBox(this.calculateFaceLocation(response))
        }
      })
      .catch(err => console.log(err))


  }

  onRouteChange = (route) => {
    if(route === 'singIn'){
             this.setState(initialState)
    }else{
      this.setState({route:route})
 
    }
  
  }

  render() {
    return (
      <Fragment>
   
        <Navigation loadUser={this.loadUser} onRouteChange={this.onRouteChange} route={this.state.route} />

        <Container className="App">
          {this.state.route === 'home' ?


            <Fragment>

              <div className='parentContainer'>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm
                  onUserInputChange={this.onUserInputChange}
                  onSubmit={this.onSubmit}



                />

                <FaceRecognition
                  imageUrl={this.state.imageUrl}
                  boundingBox={this.state.boundingBox}
                />

              </div>
            </Fragment>


            : (
              this.state.route === 'singIn' ?
                <SingIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )


          }
        </Container>
      </Fragment>
    );
  }
}

export default App;
