import React from 'react';
import Card from './Card';

const CardList =({robots})=>{
  return(
    <div>
    {
      robots.map((user, a)=>{
        return  <Card key={a} id={robots[a].id} name={robots[a].name} email={robots[a].email}/>
      })
    }
   </div>
  );
}


export default CardList;
