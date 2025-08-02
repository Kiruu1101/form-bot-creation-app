import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./publicForm.module.css";

const DB_URL = "https://my-form-bot-default-rtdb.firebaseio.com";

const PublicForm = () => {
  const { formName } = useParams();
  const [fields, setFields] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`${DB_URL}/forms/${formName}.json`);
        const data = await res.json();
        if (data?.fields) {
          setFields(data.fields);
          setTitle(data.meta?.title || "Untitled Form");
        }
      } catch (err) {
        console.error("Failed to load form", err);
      }
    };

    fetchForm();
  }, [formName]);

  const handleInputChange = (label, value) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleNext = () => {
    if (currentStep < fields.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = async () => {
    try {
      await fetch(`${DB_URL}/forms/${formName}/responses.json`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error", err);
    }
  };

  if (!fields.length) return <p className={styles.loading}>Loading form...</p>;
  if (submitted) return <p className={styles.thankyou}>✅ Thank you! Your response has been recorded.</p>;

  const field = fields[currentStep];

  return (
    <div className={styles.chatContainer}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.chatView}>
        {/* Display previous Q/A */}
        {fields.slice(0, currentStep).map((f, i) => (
          <div key={i} className={styles.chatPair}>
            <div className={styles.question}>{f.label}</div>
            <div className={styles.answer}>{String(formData[f.label])}</div>
          </div>
        ))}

        {/* Display current field */}
        <div className={styles.chatPair}>
          <div className={styles.question}>{field.label}</div>
          <div className={styles.inputWrapper}>
            {field.type === "text" || field.type === "email" ? (
              <input
                type={field.type}
                value={formData[field.label] || ""}
                onChange={(e) => handleInputChange(field.label, e.target.value)}
                className={styles.input}
                required
              />
            ) : field.type === "checkbox" ? (
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData[field.label] || false}
                  onChange={(e) =>
                    handleInputChange(field.label, e.target.checked)
                  }
                />
                Check if true
              </label>
            ) : field.type === "textarea" ? (
              <textarea
                value={formData[field.label] || ""}
                onChange={(e) =>
                  handleInputChange(field.label, e.target.value)
                }
                className={styles.textarea}
              />
            ) : null}
          </div>
        </div>

        {/* Next / Submit button */}
        <button onClick={handleNext} className={styles.nextButton}>
          {currentStep === fields.length - 1 ? "📤 Submit" : "➡️ Next"}
        </button>
      </div>
    </div>
  );
};

export default PublicForm;
