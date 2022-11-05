import React from 'react';
import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Home = () => {
     const users = useLoaderData();
     const [displayUser, setDisplayUser] = useState(users);
     // console.log(displayUser);
     const handleDelete = user =>{
          const agree = window.confirm(`are you sure to delete ${user.name}`)
          
          if(agree){
               // console.log(`deleting user with id ${user._id}`)
               fetch(`http://localhost:5000/users/${user._id}`,{
                    method: 'DELETE'
               })
               .then(res => res.json())
               .then(data => {
                    console.log(data)
                    if(data.deletedCount > 0){
                         // alert('user deleted successfully.');
                         const remainingUser = displayUser.filter(usr => usr._id !== user._id);
                         setDisplayUser(remainingUser);
                    }
               })
          }
     }
     return (
          <div>
               <Link style={{marginRight: '10px'}} to='/'> HOME </Link>
               <Link style={{marginRight: '10px'}}  to='/user/add'> ADD </Link>

               <h2>Hello I am the home page and I have data of {displayUser.length} users</h2>
               <div>
                    {
                         displayUser.map(user => <p key={user._id}>
                              {user.name} {user.adress} Email: {user.email} 
                              <Link style={{marginLeft: '10px'}} to={`/update/${user._id}`}><button>edit</button></Link>
                              <button onClick={()=>handleDelete(user)}>X</button>
                         </p>)
                    }
               </div>


          </div>
     );
};

export default Home;