const API_KEY = "AIzaSyD_x_oai5uQ66N1_aJZA_fSZXLReCwTD4Q";

export const registerUser = async (email, password) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  return await response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    }
  );
  return await response.json();
};


export const updatePasswordAPI = async (newPassword) => {
  try {
    const authData = JSON.parse(localStorage.getItem("auth"));
    const idToken = authData?.token;

    if (!idToken) return { error: { message: "User not authenticated" } };

    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken,
          password: newPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  } catch (error) {
    return { error: { message: error.message } };
  }
};


