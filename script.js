document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const expenseForm = document.getElementById("expenseForm");
    const expenseList = document.getElementById("expenseList");

    // Register
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;
            localStorage.setItem("user", JSON.stringify({ email, password }));
            alert("Registered successfully!");
            window.location.href = "index.html";
        });
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;
            const user = JSON.parse(localStorage.getItem("user"));
            if (user && user.email === email && user.password === password) {
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid credentials!");
            }
        });
    }

    // Dashboard
    if (expenseForm && expenseList) {
        if (localStorage.getItem("isLoggedIn") !== "true") {
            window.location.href = "index.html";
        }

        const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
        renderExpenses(expenses);

        expenseForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("title").value;
            const amount = document.getElementById("amount").value;
            const category = document.getElementById("category").value;
            const expense = { title, amount, category, id: Date.now() };
            expenses.push(expense);
            localStorage.setItem("expenses", JSON.stringify(expenses));
            renderExpenses(expenses);
            expenseForm.reset();
        });
    }
});

function renderExpenses(expenses) {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    expenses.forEach(exp => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${exp.title} - $${exp.amount} (${exp.category})
            <button class="btn btn-sm btn-danger" onclick="deleteExpense(${exp.id})">Delete</button>
        `;
        expenseList.appendChild(li);
    });
}

function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    expenses = expenses.filter(e => e.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses(expenses);
}

function logout() {
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "index.html";
}
