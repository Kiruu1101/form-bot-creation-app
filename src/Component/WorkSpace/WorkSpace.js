import React, { useEffect, useState } from "react";
import styles from "./workSpace.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { fetchForms, addForm, deleteForm } from "../../api/folder";
import { setForms } from "../../redux/formSlice";
import { toast } from "react-toastify";

const WorkSpace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const forms = useSelector((state) => state.forms.list);

  const [showMenu, setShowMenu] = useState(false);
  const [formInput, setFormInput] = useState("");

  
  


  const getForms = async () => {
    const formList = await fetchForms(user);
    dispatch(setForms(formList || []));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
  if (!user) navigate("/login");
  else getForms();
}, [user,navigate, getForms]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleCreateForm = async () => {
    if (!formInput.trim()) return toast.error("Form name required");
    const success = await addForm(user, formInput.trim());
    if (success) {
      toast.success("Form created");
      setFormInput("");
      getForms();
    } else toast.error("Error creating form");
  };

  const handleDeleteForm = async (formName) => {
    const confirmed = window.confirm(`Delete form "${formName}"?`);
    if (!confirmed) return;

    const ok = await deleteForm(user, formName);
    if (ok) {
      toast.success("Form deleted");
      getForms();
    }
  };

  const goToFormPage = (formName) => {
    navigate(`/forms/${formName}`);
  };

  return (
    <div>
      {/* Header */}
      <div className={styles.header}>
        <div
          className={`${styles.menu} ${styles.userName}`}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <span>{user}</span>
          {showMenu ? <IoIosArrowUp className={styles.icon} /> : <IoIosArrowDown className={styles.icon} />}
        </div>
        {showMenu && (
          <div className={styles.userMenu}>
            <div className={styles.username}>{user}</div>
            <div className={styles.setting} onClick={() => navigate("/setting")} style={{ cursor: "pointer" }}>
              Settings
            </div>
            <div className={styles.logout} onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </div>
          </div>
        )}
      </div>

      {/* Main Section */}
      <div className={styles.main}>
        {/* Create Form */}
        <div className={styles.folderActions}>
          <input
            type="text"
            placeholder="New Form Name"
            value={formInput}
            onChange={(e) => setFormInput(e.target.value)}
            className={styles.folderInput}
          />
          <button onClick={handleCreateForm} className={styles.createBtn}>
            <FaPlus /> Add New Form
          </button>
        </div>

        {/* Form List */}
        <div className={styles.folderContainer}>
          {forms.length === 0 && <p style={{ color: "#ccc" }}>No forms yet. Create one!</p>}
          {forms.map((form) => (
            <div key={form} className={styles.folder} onClick={() => goToFormPage(form)}>
              <span className={styles.folderName}>{form}</span>
              <RiDeleteBin6Fill
                className={styles.deleteIcon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteForm(form);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
