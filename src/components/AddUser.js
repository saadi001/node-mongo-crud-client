import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddUser = () => {
     const [user, setUser] = useState({});

     const handleAddUser = (event) =>{
          event.preventDefault();
          console.log(user);

          fetch('http://localhost:5000/users',{
               method: 'POST',
               headers: {
                    'content-type' : 'application/json'
               },
               body: JSON.stringify(user)
          })

          .then(res => res.json())
          .then(data => {
               if(data.acknowledged){
                    alert('user added')
                    event.target.reset();
               }
          })
          
     }

     const handleInputBlur = (e) =>{
          e.preventDefault();
          const field = e.target.name; 
          const value = e.target.value;
          const newUser = {...user};
          newUser[field] = value;
          setUser(newUser);

     }
     return (
          <div>
               <Link to={'/'}><button>Back</button></Link>
               <form onSubmit={handleAddUser}>
                    <input onBlur={handleInputBlur} type="text" name='name' placeholder='name' /><br />
                    <input onBlur={handleInputBlur} type="text" name='adress' placeholder='adress' /><br />
                    <input onBlur={handleInputBlur} type="email" name="email" id="" placeholder='email' /><br />
                    <button type='submit'>Add user</button>
               </form>
          </div>
     );
};

export default AddUser;