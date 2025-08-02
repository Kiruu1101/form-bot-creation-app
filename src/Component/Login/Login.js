import React, { useState } from "react";
import styles from "./login.module.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginUser(email, password);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    dispatch(setUser({ user: res.email, token: res.idToken }));
    toast.success("Login Successful");
    navigate("/workspace");
  };

  return (
    <form onSubmit={handleLogin} className={styles.container}>
      <div className={styles.inputContinaer}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.inputContinaer}>
        <label className={styles.label}>Password</label>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <span
            className={styles.eye}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
      </div>

      <div className={styles.footer}>
        <button type="submit" className={styles.btn}>
          Login
        </button>
        <p className={styles.footerText}>
          Don’t have an account?
          <span
            className={styles.register}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
