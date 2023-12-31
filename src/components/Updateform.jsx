import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateForm = () => {
  const { id } = useParams(); // Destructure the id parameter from useParams
  const [user, setUser] = useState({ name: '', email: '' }); // Add other fields as needed
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch existing user data by ID when the component mounts
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/GetUser/${id}`);
        const result = await response.json();

        if (result.success) {
          const userData = result.user;
          setUser(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error(error);
      }
    };

    // Set the user ID obtained from useParams
    setUserId(id);

    // Fetch user data only when the userId is set
    if (userId) {
      fetchUserData();
    }
  }, [id, userId]); // Include 'id' in the dependency array

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/UpdateUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();
      console.log(result);

      // Optionally, you can update the state or perform additional actions based on the response
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Update User</h2>

          <form className="flex flex-wrap items-center justify-center">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md"
              />
            </div>

            {/* Add other fields as needed */}

            <button type="button" className="bg-red-600 p-2 text-white rounded-md mt-4" onClick={handleUpdate}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateForm;
