import React, { useState } from "react";
import "../../styles/user/ChangePassword.css";

const ChangePassword = () => {

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(formData);
  };

  return (
    <div className="change-password-page">
      <div className="change-password-card">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  currentPassword: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  newPassword: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="change-password-btn"
          >
            Update Password
          </button>

        </form>

      </div>

    </div>
  );
};

export default ChangePassword;