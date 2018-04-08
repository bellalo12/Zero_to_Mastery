import React from 'react';

const Card =({name, id, email})=>{
  return(
  <div className='tc bg-light-blue br3 pa3 ma2 dib grow shadow-5'>
  <img alt='robot' src={`http://robohash.org/${id}?200x200`} />
  <div>
  <h2>{name}</h2>
  <p>{email}</p>
  </div>
  </div>
  );
}

export default Card;
