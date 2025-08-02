import React, { useState } from "react";
import styles from "./settings.module.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FiLock } from "react-icons/fi";
import { IoMdLogOut } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { updatePasswordAPI } from "../../api/auth";

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const email = user || "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    let changed = false;

    if (password) {
      const res = await updatePasswordAPI(password);
      if (res.error) {
        toast.error(res.error.message || "Password update failed");
        setLoading(false);
        return;
      }
      dispatch(logout());
      changed = true;
    }

    if (!changed) {
      toast.info("No changes made");
    } else {
      toast.success("Profile updated successfully");
      navigate("/workspace");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.info("Logged out");
  };

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.backToWorkspace} onClick={() => navigate("/workspace")}>
          <IoArrowBack className={styles.navIcon} />
          Back to Workspace
        </div>
        <div className={styles.logout} onClick={handleLogout}>
          <IoMdLogOut className={styles.navIcon} />
          Logout
        </div>
      </div>

      <div className={styles.settings}>
        <div className={styles.settingContainer}>
          <h2 className={styles.header}>Account Settings</h2>

          <form onSubmit={handleSave}>
            <div className={styles.inputContinaer}>
              <MdOutlineMailOutline className={styles.icon} />
              <input
                className={styles.input}
                type="email"
                value={email}
                disabled
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.inputContinaer}>
              <FiLock className={styles.icon} />
              <input
                className={styles.input}
                type="password"
                placeholder="Update Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className={styles.footer}>
              <button disabled={loading} type="submit" className={`${styles.btn} ${styles.mainbtn}`}>
                {loading ? "Saving..." : "Save Changes"}
              </button>


              <p className={styles.remainder}>
                * All fields are required for your profile information to be complete.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
