import React, { useState } from "react";
import styles from "./register.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { registerUser } from "../../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const res = await registerUser(email, password);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }

    dispatch(setUser({ user: res.email, token: res.idToken }));
    toast.success("Registration Successful");
    navigate("/workspace");
  };

  return (
    <form onSubmit={handleRegister} className={styles.container}>
      <h2 className={styles.title}>Create your account</h2>

      <div className={styles.inputContinaer}>
        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label}>Password</label>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.input} ${styles.inputWithIcon}`}
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className={styles.eye}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <label className={styles.label}>Confirm Password</label>
        <div className={styles.passwordWrapper}>
          <input
            className={`${styles.input} ${styles.inputWithIcon}`}
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className={styles.eye}
            onClick={() => setShowConfirm((prev) => !prev)}
          >
            {showConfirm ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <button type="submit" className={styles.btn}>
          Register
        </button>
        <p className={styles.footerText}>
          Already have an account?
          <Link to="/login" className={styles.login}>
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
