import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/GetUsers');
        const result = await response.json();

        if (result.success) {
          // Update the state with the fetched data
          setUsers(result.getallusers);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/DeleteUser/${userId}`, {
        method: 'DELETE',
      });
      const result = await response.json();

      if (result.success) {
        console.log(`User with ID ${userId} deleted successfully`);
        // Refetch the updated data
        const updatedData = await fetch('http://localhost:5000/GetUsers');
        const updatedResult = await updatedData.json();
        setUsers(updatedResult.getallusers);
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
