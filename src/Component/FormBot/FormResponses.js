import React, { useEffect, useState } from "react";
import styles from "./formbot.module.css";
import { useParams } from "react-router-dom";

const FormResponses = () => {
  const { formName } = useParams();
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch(
          `https://my-form-bot-default-rtdb.firebaseio.com/forms/${formName}/responses.json`
        );
        const data = await res.json();
        if (data) {
          const formatted = Object.values(data);
          setResponses(formatted);
        } else {
          setResponses([]);
        }
      } catch (err) {
        console.error("Fetch responses error", err);
        setResponses([]);
      }
    };

    fetchResponses();
  }, [formName]);

  return (
    <div className={styles.responseBox}>
      <h3>Responses for: {formName}</h3>
      {responses.length === 0 ? (
        <p className={styles.empty}>No responses yet.</p>
      ) : (
        <div className={styles.responseList}>
          {responses.map((resp, index) => (
            <div key={index} className={styles.response}>
              {Object.entries(resp).map(([label, answer]) => (
                <p key={label}>
                  <strong>{label}:</strong> {String(answer)}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormResponses;
