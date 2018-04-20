import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import SigninForm from './components/SigninForm/SigninForm';
import Register from './components/Register/Register';

const app = new Clarifai.App({
 // apiKey:'App api key'
});

const particlesOptions ={
  particles: {
  number: {
    value: 327,
    density: {
      enable: true,
      value_area: 868
    }
  }
  }
}

class App extends React.Component{
  constructor(){
    super();
    this.state={
      input: '',
      imageUrl: '',
      box:{},
      route: 'signin',
      isSignIn: false,
      user:{
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }

    }
  }

  updateUser=(data)=>{
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }



  calculateFaceSize=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      topRow: clarifaiFace.top_row * height,
      leftCol: clarifaiFace.left_col * width,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      rightCol:  width - (clarifaiFace.right_col * width)
    }
  }

  displayFaceBox=(box)=>{
    this.setState({box: box})
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value})
  }

  onImageSubmit=()=>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response=> {
        if(response){
          fetch('http://localhost:3000/image', {
            method:'put',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response=> response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user, {entries:count}))
          })
        }
        this.displayFaceBox(this.calculateFaceSize(response))})
      .catch(err=>console.log(err))
    }

    onRouteChange=(route)=>{
      if(route === 'signout'){
        this.setState({isSignIn: false})
      } else if (route === 'home'){
        this.setState({isSignIn: true})
      }
      this.setState({route:route})
    }

  render(){
    return(
      <div className='App'>
      <Particles className='particles'
      params={particlesOptions}/>
      <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn}/>
      { this.state.route === 'home'
      ? <div>
      <Logo />
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm
      onInputChange={this.onInputChange}
      onImageSubmit={this.onImageSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
      :( this.state.route === 'signin'
      ? <SigninForm onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
      : <Register onRouteChange={this.onRouteChange} updateUser={this.updateUser}/>
    )
    }
      </div>
    );
  }
}

export default App;
