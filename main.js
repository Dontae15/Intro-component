document.addEventListener('DOMContentLoaded', function() { 
    
    
    // Define error handling logic in an array of objects
    const validationRules = [
    {


      // Combined rule for first name and last name
      names: ['firstname', 'lastname'],
      check: (input) => input.value.trim() === '',
      errorMessage: (input) => `${input.placeholder} is required.`,
      displayError: (formGroup, message) => {
        formGroup.classList.add('error');
        formGroup.querySelector('.error-message').textContent = message;
        formGroup.querySelector('.input-error-icon').style.display = 'block';
      },
      clearError: (formGroup) => {
        formGroup.classList.remove('error');
        formGroup.querySelector('.error-message').textContent = '';
        formGroup.querySelector('.input-error-icon').style.display = 'none';
      }
    },
    {
      // Separate rule for password validation
      name: 'password',
      check: (input) => {
        const value = input.value.trim();
        return value === '' || !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(value);
      },
      errorMessage: (input) => {
        if (input.value.trim() === '') {
          return 'Password is required.';
        }
        return 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.';
      },
      displayError: (formGroup, message) => {
        formGroup.classList.add('error');
        formGroup.querySelector('.error-message').textContent = message;
        formGroup.querySelector('.input-error-icon').style.display = 'block';
      },
      clearError: (formGroup) => {
        formGroup.classList.remove('error');
        formGroup.querySelector('.error-message').textContent = '';
        formGroup.querySelector('.input-error-icon').style.display = 'none';
      }
    },
    {
      name: 'email',
      check: (input) => input.value.trim() === '' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value),
      errorMessage: (input) => 'Please enter a valid email address.',
      displayError: (formGroup, message) => {
        formGroup.classList.add('error');
        formGroup.querySelector('.error-message').textContent = message;
        formGroup.querySelector('.input-error-icon').style.display = 'block';
      },
      clearError: (formGroup) => {
        formGroup.classList.remove('error');
        formGroup.querySelector('.error-message').textContent = '';
        formGroup.querySelector('.input-error-icon').style.display = 'none';
      }
    }
  ];
  
    document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission for validation
  
    const form = event.target;
    let isValid = true;
  
    validationRules.forEach(rule => {
      // Handle multiple names for combined fields
      if (rule.names) {
        rule.names.forEach(name => {
          const input = form.querySelector(`input[name="${name}"]`);
          const formGroup = input.closest('.form-group');
  
          // Clear previous errors
          rule.clearError(formGroup);
  
          // Check for validation errors
          if (rule.check(input)) {
            rule.displayError(formGroup, rule.errorMessage(input));
            isValid = false;
          }
        });
      } else {
        // Handle single name fields (e.g., email, password)
        const input = form.querySelector(`input[name="${rule.name}"]`);
        const formGroup = input.closest('.form-group');
  
        // Clear previous errors
        rule.clearError(formGroup);
  
        // Check for validation errors
        if (rule.check(input)) {
          rule.displayError(formGroup, rule.errorMessage(input));
          isValid = false;
        }
      }
    });
     
    if (isValid) {
        // Clear all input fields and reset error messages/icons
        form.querySelectorAll('input').forEach(input => {
          input.value = ''; // Clear the input value
          const formGroup = input.closest('.form-group');
          if (formGroup) {
            validationRules.forEach(rule => rule.clearError(formGroup)); // Clear any error state
          }
        });
      }
    });
  
});