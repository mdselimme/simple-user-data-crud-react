import { useEffect, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const [user, setUser] = useState(null);
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    fetch(`http://localhost:5250/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [params]);

  const onUpdateUserData = (e) => {
    e.preventDefault();
    const eventData = e.target;
    const name = eventData.name.value;
    const email = eventData.email.value;
    const user = { name, email };
    console.log(user);
    fetch(`http://localhost:5250/users/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("update ", data);
      });
    e.target.reset();
  };

  console.log(user);

  return (
    <div>
      <h1 className="bg-green-500 text-[#001001] text-3xl py-5 text-center mb-16 font-extrabold">
        Update your information here
      </h1>
      <form
        onSubmit={onUpdateUserData}
        className="bg-red-300 w-96 p-4 rounded-xl mx-auto"
      >
        <input
          type="text"
          className="w-full my-5 py-4 rounded-xl px-5"
          name="name"
          placeholder="Enter your name here"
          defaultValue={user?.name}
        />
        <input
          type="email"
          className="w-full my-5 py-4 rounded-xl px-5"
          name="email"
          placeholder="Enter your email here"
          defaultValue={user?.email}
        />
        <button className="w-full my-5 py-4 rounded-xl bg-yellow-700 px-5">
          Submit Data
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
