import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm=({onInputChange, onButtonSubmit})=>{
  return(
    <div>
    <p className='f3 tc'>
    {'This Magic Brain will detect faces in your pictures. Give it a try!'}
    </p>
    <div className='center'>
    <div className='form center pa3 br3 shadow-5'>
    <input className='w-70 f4 pa2' type='tex' onChange={onInputChange}/>
    <button
    className='f4 white pv2 link ph3 grow dib bg-light-red w-30'
    onClick={onButtonSubmit}>Detect</button>
    </div>
    </div>
    </div>
  );
}

export default ImageLinkForm;
