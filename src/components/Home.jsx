import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);
// fteching all the articles
useEffect(()=>{
  const fetch =async()=>{
    try{
      const response = await fetch('aPI');
      const result = await response.json();
      if(result.success){
        setUsers(result.getallUsers);
      }else{
        console.log("error in fetching the data");
      }

      }catch(error){
        console.log("error in fetching the data");
    }
  }
})
const handleDelete = async(userId)=>{
 
  try{
    const response = await fetch("API", {
      method:'DELETE,'
    });
    method:"delete"
    const result= await response.json();
    if(response.success){
      const updatedData = await fetch("fetching all");
      const updatedresult = await updatedData.json();
    }
  }catch{
console.log("User not deleted d=successfully")
  }
}
  return (
    <div className='p-8'>
      <center>
        <div className='mb-8'>
          <h2 className='text-white text-3xl bg-green-600 p-4 rounded'>Making of the CRUD Application</h2>
        </div>
        <div>
        <Link to="/addnew">  <button className='text-white bg-blue-600 px-4 py-2 rounded'>Add new</button>
        </Link>
        </div>

        <div className='mt-8'>
          <table className='table-auto w-full'>
            <thead>
              <tr>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 &&
                users.map((user) => (
                  <tr key={user._id} className='bg-gray-100'>
                    <td className='border px-4 py-2'>{user.name}</td>
                    <td className='border px-4 py-2'>{user.email}</td>
                    <td className='border px-4 py-2'>
                      {/* Use Link to navigate to the update page */}
                      <Link to={`/update/${user._id}`} className='bg-yellow-500 px-2 py-1 rounded'>
                        Update
                      </Link>
                      <button className='bg-red-500 px-2 py-1 rounded ml-2' onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
};

export default Home;
