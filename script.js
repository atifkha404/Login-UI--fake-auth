document.addEventListener('DOMContentLoaded', () => {
    // --- Select DOM Elements ---
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const btnText = loginBtn.querySelector('.btn-text');
    const loader = loginBtn.querySelector('.loader');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    
    // Note: Ensure you add a div with class 'success-message' inside the form or card 
    // if you want the success text to appear. 
    // For this script, I will create it dynamically or assume it exists.
    // Let's assume the HTML structure provided in the prompt is the base, 
    // so I will append the success message logic to the form container.

    // --- 1. Toggle Password Visibility ---
    togglePasswordBtn.addEventListener('click', () => {
        // Toggle the type attribute
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Toggle the eye icon style (optional visual cue)
        togglePasswordBtn.style.color = type === 'text' ? '#7b2cbf' : '#888';
    });

    // --- 2. Form Validation & Submission ---
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Stop form from actually submitting

        // Reset errors
        clearErrors();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;

        // Validate Email
        if (email === '') {
            showError(emailError, 'Email address is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailError, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate Password
        if (password === '') {
            showError(passwordError, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordError, 'Password must be at least 6 characters');
            isValid = false;
        }

        // If valid, simulate login
        if (isValid) {
            startLoading();
            
            // Simulate API call (2 seconds delay)
            setTimeout(() => {
                stopLoading();
                showSuccess();
            }, 2000);
        }
    });

    // --- Helper Functions ---

    function clearErrors() {
        emailError.classList.remove('visible');
        passwordError.classList.remove('visible');
        emailError.textContent = '';
        passwordError.textContent = '';
    }

    function showError(element, message) {
        element.textContent = message;
        element.classList.add('visible');
    }

    function isValidEmail(email) {
        // Simple regex for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function startLoading() {
        btnText.style.display = 'none';
        loader.style.display = 'block';
        loginBtn.disabled = true;
        loginBtn.style.opacity = '0.7';
        loginBtn.style.cursor = 'not-allowed';
    }

    function stopLoading() {
        btnText.style.display = 'block';
        loader.style.display = 'none';
        loginBtn.disabled = false;
        loginBtn.style.opacity = '1';
        loginBtn.style.cursor = 'pointer';
    }

    function showSuccess() {
        // Create a success message element if it doesn't exist
        let successMsg = document.querySelector('.success-message');
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.textContent = 'Login successful! Redirecting...';
            loginForm.appendChild(successMsg);
        }
        
        successMsg.style.display = 'block';
        
        // Optional: Reset form after a delay
        setTimeout(() => {
            loginForm.reset();
            successMsg.style.display = 'none';
        }, 3000);
    }
});