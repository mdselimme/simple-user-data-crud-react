import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router";

function App() {
  const [users, setUsers] = useState([]);

  const onSubmitFormData = (e) => {
    e.preventDefault();
    const eventData = e.target;
    const name = eventData.name.value;
    const email = eventData.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5250/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    e.target.reset();
  };

  useEffect(() => {
    fetch("http://localhost:5250/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleDeleteItem = (_id) => {
    console.log(_id);
    fetch(`http://localhost:5250/users/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          const usersDelete = users.filter((ele) => ele._id !== _id);
          setUsers(usersDelete);
        }
      });
  };

  return (
    <>
      <h1 className="bg-green-500 text-[#001001] text-3xl py-5 text-center mb-16 font-extrabold">
        Enter your information here
      </h1>
      <form
        onSubmit={onSubmitFormData}
        className="bg-red-300 w-96 p-4 rounded-xl mx-auto"
      >
        <input
          type="text"
          className="w-full my-5 py-4 rounded-xl px-5"
          name="name"
          placeholder="Enter your name here"
        />
        <input
          type="email"
          className="w-full my-5 py-4 rounded-xl px-5"
          name="email"
          placeholder="Enter your email here"
        />
        <button className="w-full my-5 py-4 rounded-xl bg-yellow-700 px-5">
          Submit Data
        </button>
      </form>
      <div>
        <h1 className="text-center py-5">Total Users</h1>
        <div>
          {users.map((ele, idx) => (
            <div
              className="border p-5 bg-gray-400 text-white text-center w-72 mx-auto mb-5 rounded-lg"
              key={idx}
            >
              <h1 className="uppercase font-semibold">{ele.name}</h1>
              <h3>{ele.email}</h3>
              <button
                onClick={() => handleDeleteItem(ele._id)}
                className="bg-purple-700 py-2 px-4 rounded-lg mt-2"
              >
                Delete
              </button>
              <Link
                to={`/update_profile/${ele._id}`}
                className="bg-purple-700 py-2 px-4 rounded-lg mt-2 ms-5"
              >
                Update
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
