import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';

const app = new Clarifai.App({
 apiKey:'f9d8f19378684c46bf17d029cabed99f'
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
      isSignIn: false
    }
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

  onButtonSubmit=()=>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response=> this.displayFaceBox(this.calculateFaceSize(response)))
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
      params={particlesOptions}
            />
      <Navigation onRouteChange={this.onRouteChange} isSignIn={this.state.isSignIn}/>
      { this.state.route === 'home'
      ? <div>
      <Logo />
      <Rank />
      <ImageLinkForm
      onInputChange={this.onInputChange}
      onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
      </div>
      :( this.state.route === 'signin'
      ? <Signin onRouteChange={this.onRouteChange}/>
      : <Register onRouteChange={this.onRouteChange}/>
    )
    }
      </div>
    );
  }
}

export default App;
