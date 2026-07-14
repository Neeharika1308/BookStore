import { useState } from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">My Profile</h2>

      <div className="card p-4 shadow">
        <div className="mb-3">
          <label>Name</label>
          <input
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            value={email}
            disabled
          />
        </div>

        <button className="btn btn-primary">
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;