// Background animation start kar raha hai
VANTA.NET({
  el: "#bg",            // kis element par lagana hai (id ya class)
  mouseControls: true,  // mouse se effect control hoga
  touchControls: true,  // mobile pe touch se control
  gyroControls: false,  // phone ka gyroscope use nahi karega
  minHeight: 200.00,    // minimum height
  minWidth: 200.00,     // minimum width
  scale: 1.00,          // scale normal
  scaleMobile: 1.00,    // mobile pe bhi same scale
  color: 0x3498db,      // lines ka color (hexadecimal js format)
  backgroundColor: 0x0d1117 // background color
})

// ========== Password Manager Logic ==========
const websiteInput = document.getElementById("website");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const addBtn = document.getElementById("addBtn");
const togglePasswordBtn = document.getElementById("togglePassword");
const passwordList = document.getElementById("passwordList");
const clearAllBtn = document.getElementById("clearAll");

// Get saved passwords from localStorage
let passwords = JSON.parse(localStorage.getItem("passwords")) || [];

// Render saved passwords
function renderPasswords() {
  passwordList.innerHTML = "";
  passwords.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.website}</td>
      <td>${item.username}</td>
      <td>
        <span class="hidden-password">••••••</span>
        <span class="real-password hidden">${item.password}</span>
      </td>
      <td>
        <button onclick="toggleVisibility(this, ${index})">👁️</button>
        <button onclick="deletePassword(${index})">❌</button>
      </td>
    `;

    passwordList.appendChild(row);
  });

  localStorage.setItem("passwords", JSON.stringify(passwords));
}

// Add new password
addBtn.addEventListener("click", () => {
  const website = websiteInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!website || !username || !password) {
    alert("⚠️ Please fill all fields!");
    return;
  }

  passwords.push({ website, username, password });
  renderPasswords();

  websiteInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";
});

// Toggle input password visibility
togglePasswordBtn.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Delete single password
function deletePassword(index) {
  passwords.splice(index, 1);
  renderPasswords();
}

// Toggle saved password visibility
function toggleVisibility(button, index) {
  const row = button.closest("tr");
  const hiddenPass = row.querySelector(".hidden-password");
  const realPass = row.querySelector(".real-password");

  hiddenPass.classList.toggle("hidden");
  realPass.classList.toggle("hidden");
}

// Delete all passwords
clearAllBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all passwords?")) {
    passwords = [];
    renderPasswords();
  }
});

// Load on start
renderPasswords();
