import React from 'react';

const Navigation=({onRouteChange, isSignIn})=>{
  if(isSignIn){
    return(
      <div style={{display:'flex', justifyContent:'flex-end'}}>
      <p className='underline f3 dim pa4 pointer link' onClick={()=>onRouteChange('signout')}> Sign Out </p>
      </div>
    );
  } else {
    return(
      <div style={{display:'flex', justifyContent:'flex-end'}}>
      <p className='underline f3 dim pa4 pointer link' onClick={()=>onRouteChange('signin')}> Sign In </p>
      <p className='underline f3 dim pa4 pointer link' onClick={()=>onRouteChange('register')}> Register </p>
      </div>
    );
  }
}

export default Navigation;
