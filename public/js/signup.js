const signUpFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    console.log(username)
    if (username && password) {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (response.ok) {
        document.location.replace("/login");
      } else {
        alert("Failed to create account");
      }
    }
  };
document.querySelector("#signup-form").addEventListener("submit", signUpFormHandler);