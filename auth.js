const API_URL = "const API_URL = "https://ourapi.ourweb.workers.dev";";

function saveToken(token) {
  localStorage.setItem("our_token", token);
}

function getToken() {
  return localStorage.getItem("our_token");
}

function clearToken() {
  localStorage.removeItem("our_token");
}

async function apiRequest(path, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const token = getToken();

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Something went wrong.");
  }

  return data;
}

const loginForm = document.querySelector("#loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async event => {
    event.preventDefault();

    const message = document.querySelector("#loginMessage");

    message.textContent = "Signing in...";

    try {
      const data = await apiRequest("/auth/signin", {
        method: "POST",
        body: JSON.stringify({
          login: document.querySelector("#login").value,
          password: document.querySelector("#password").value
        })
      });

      saveToken(data.token);

      window.location.href = "account.html";
    } catch (error) {
      message.textContent = error.message;
    }
  });
}

const signupForm = document.querySelector("#signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", async event => {
    event.preventDefault();

    const message = document.querySelector("#signupMessage");

    message.textContent = "Creating account...";

    try {
      await apiRequest("/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          username: document.querySelector("#username").value,
          email: document.querySelector("#email").value,
          password: document.querySelector("#password").value
        })
      });

      window.location.href = "login.html";
    } catch (error) {
      message.textContent = error.message;
    }
  });
}

async function loadAccount() {
  const username = document.querySelector("#accountUsername");

  if (!username) return;

  if (!getToken()) {
    window.location.href = "login.html";
    return;
  }

  try {
    const data = await apiRequest("/auth/me");

    document.querySelector("#accountUsername").textContent = data.user.username;
    document.querySelector("#accountEmail").textContent = data.user.email;
    document.querySelector("#accountId").textContent = data.user.id;
  } catch {
    clearToken();
    window.location.href = "login.html";
  }
}

const signoutButton = document.querySelector("#signoutButton");

if (signoutButton) {
  signoutButton.addEventListener("click", async () => {
    try {
      await apiRequest("/auth/signout", {
        method: "POST"
      });
    } finally {
      clearToken();
      window.location.href = "login.html";
    }
  });
}

loadAccount();