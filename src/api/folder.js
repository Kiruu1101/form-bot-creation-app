import axios from "axios";

const BASE_URL = "https://my-form-bot-default-rtdb.firebaseio.com/";

const encodeEmail = (email) => email.replace(/[.@]/g, "");

export const fetchForms = async (userEmail) => {
  try {
    const res = await axios.get(`${BASE_URL}users/${encodeEmail(userEmail)}.json`);
    if (res.data) {
      return Object.keys(res.data);
    }
    return [];
  } catch (err) {
    console.error("Error fetching forms:", err);
    return [];
  }
};

export const addForm = async (userEmail, formName) => {
  try {
    const encodedEmail = encodeEmail(userEmail);
    const res = await axios.put(`${BASE_URL}users/${encodedEmail}/${formName}.json`, true);
    return res.status === 200;
  } catch (err) {
    console.error("Error adding form:", err);
    return false;
  }
};

export const deleteForm = async (userEmail, formName) => {
  try {
    const encodedEmail = encodeEmail(userEmail);
    await axios.delete(`${BASE_URL}users/${encodedEmail}/${formName}.json`);
    await axios.delete(`${BASE_URL}forms/${formName}.json`);
    return true;
  } catch (err) {
    console.error("Error deleting form:", err);
    return false;
  }
};
