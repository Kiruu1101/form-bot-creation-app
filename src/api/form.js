const DB_URL = "https://my-form-bot-default-rtdb.firebaseio.com";

/**
 * Save form metadata and fields to Firebase.
 */
export const saveFormToDB = async (formName, title, fields) => {
  try {
    // Save form meta
    await fetch(`${DB_URL}/forms/${formName}/meta.json`, {
      method: "PUT",
      body: JSON.stringify({ title, updatedAt: Date.now() }),
    });

    // Save form fields
    await fetch(`${DB_URL}/forms/${formName}/fields.json`, {
      method: "PUT",
      body: JSON.stringify(fields),
    });

    return true;
  } catch (err) {
    console.error("Form save error", err);
    return false;
  }
};

/**
 * Fetch form metadata and fields from Firebase.
 */
export const getFormFromDB = async (formName) => {
  try {
    const res = await fetch(`${DB_URL}/forms/${formName}.json`);
    if (!res.ok) throw new Error("Failed to fetch form");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Form fetch error", err);
    return null;
  }
};
