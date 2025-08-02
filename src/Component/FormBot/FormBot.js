import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./formbot.module.css";
import { saveFormToDB, getFormFromDB } from "../../api/form";
import { toast } from "react-toastify";
import FormResponses from "./FormResponses";

const FormBot = () => {
  const { formName } = useParams();
  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState([]);
  const [showResponses, setShowResponses] = useState(false);

  

  const loadForm = async () => {
    const form = await getFormFromDB(formName);
    if (form) {
      setFormTitle(form.meta?.title || "");
      setFields(form.fields || []);
    }
  };
  
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (formName) loadForm();
  }, [formName]);

  const addField = (type) => {
    setFields((prev) => [...prev, { type, label: "", id: Date.now() }]);
  };

  const handleLabelChange = (id, newLabel) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, label: newLabel } : f))
    );
  };

  const saveForm = async () => {
    if (!formName || !formTitle || fields.length === 0)
      return toast.error("Form name, title & at least one field required");

    const success = await saveFormToDB(formName, formTitle, fields);
    success ? toast.success("Form saved") : toast.error("Save failed");
    if (success) {

    // Copy public link to clipboard
    const formLink = `${window.location.origin}/${encodeURIComponent(formName)}`;
    navigator.clipboard.writeText(formLink);
    toast.info("Public form link copied to clipboard 📋");
  } else {
    toast.error("Save failed ❌");
  }
  };

  return (
    <>
    <div className={styles.responseToggleWrapper}>
          <button
          onClick={(e) => {
            e.stopPropagation();
            setShowResponses(!showResponses);
          }}
          className={styles.responseToggle}
        >
          📊 {showResponses ? "Hide" : "Show"} User Responses
        </button>
      </div>
    <div className={styles.container}>
      <div className={styles.topbar}>
        <h2>Edit Form: {formName}</h2>
        
      </div>

      <input
        type="text"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        placeholder="Form Title"
        className={styles.titleInput}
      />

      <div className={styles.fieldList}>
        {fields.map((field) => (
          <div key={field.id} className={styles.field}>
            
            <span className={styles.fieldType}>{field.type}</span>
            <input
              type="text"
              placeholder="Label"
              value={field.label}
              onChange={(e) => handleLabelChange(field.id, e.target.value)}
              className={styles.fieldInput}
            />
            <button
              onClick={() =>
                setFields((prev) => prev.filter((f) => f.id !== field.id))
              }
              className={styles.deleteButton}
              title="Remove field"
            >
              ❌
            </button>
          </div>

        ))}
      </div>

      <div className={styles.buttons}>
        <button onClick={() => addField("text")}>➕ Text Field</button>
        <button onClick={() => addField("email")}>➕ Email Field</button>
        <button onClick={() => addField("checkbox")}>➕ Checkbox</button>
        <button onClick={() => addField("textarea")}>➕ Textarea</button>
        <button onClick={saveForm}>💾 Save Form</button>
      </div>

      {showResponses && (
        <div
          className={styles.sidebar}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setShowResponses(false)}
            className={styles.closeButton}
          >
            ✖
          </button>
          <FormResponses />
        </div>
      )}
    </div>
    </>
  );
};

export default FormBot;
