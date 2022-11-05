import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Update = () => {
     const storedUser = useLoaderData();
     const [user, setUser] = useState(storedUser);

     const handleAddUser = (event) =>{
          event.preventDefault();
          fetch(`http://localhost:5000/users/${storedUser._id}`,{
               method: 'PUT',
               headers: {
                    'content-type' : 'application/json'
               },
               body: JSON.stringify(user)
          })
          .then(res => res.json())
          .then(data => {
               if(data.modifiedCount > 0){
                    alert('user updated successfully.')
               }
               console.log(data)
          })
     
     }

     const handleInputChange = (e) =>{
          e.preventDefault();
          const field = e.target.name; 
          const value = e.target.value;
          const newUser = {...user};
          newUser[field] = value;
          setUser(newUser);

     }
     return (
          <div>
               <Link to='/'><button>back</button></Link>
               <h3>Update your information of {storedUser.name}</h3>
               <form onSubmit={handleAddUser}>
                    <input onChange={handleInputChange} type="text" defaultValue={storedUser?.name} name='name' placeholder='name' /><br />
                    <input onChange={handleInputChange} type="text" defaultValue={storedUser?.adress} name='adress' placeholder='adress' /><br />
                    <input onChange={handleInputChange} type="email" defaultValue={storedUser?.email} name="email" id="" placeholder='email' /><br />
                    <button type='submit'>update user</button>
               </form>
          </div>
     );
};

export default Update;