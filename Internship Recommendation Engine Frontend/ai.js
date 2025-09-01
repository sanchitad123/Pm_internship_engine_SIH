// Get reference to enrollment message element
const eduErrMessage = document.getElementById("eduErrMessage");

// Handle enrollment status changes
document.querySelectorAll('input[name="edu"]').forEach(radio => {
  radio.addEventListener("change", function() {
    // Process enrollment eligibility immediately when option is selected
    processEnrollmentEligibility();
    
    // Add visual feedback for selection
    this.closest('.radio').classList.add('selected');
    document.querySelectorAll('input[name="edu"]').forEach(otherRadio => {
      if (otherRadio !== this) {
        otherRadio.closest('.radio').classList.remove('selected');
      }
    });
  });
});

// Process enrollment eligibility
function processEnrollmentEligibility() {
  const selected = document.querySelector('input[name="edu"]:checked');
  
  if (!selected) return; // No option selected yet
  
  if (selected.value === "Enrolled full-time") {
    // Show rejection message
    eduErrMessage.innerHTML = "<i class='fas fa-times-circle'></i> Sorry, you are not eligible for this internship as you are enrolled in full-time study/job.";
    eduErrMessage.classList.remove("success");
    eduErrMessage.classList.add("error");
    eduErrMessage.style.display = "block";

    // Disable further actions if not eligible
    const submitBtn = document.querySelector(".submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.backgroundColor = "#9ca3af";
      submitBtn.style.cursor = "not-allowed";
      
      // Add visual indication
      submitBtn.innerHTML = "<i class='fas fa-ban'></i> Not Eligible";
    }
    
    // Highlight the section to draw attention
    document.querySelector('.edu').classList.add('error-section');
  } else {
    // If not "Enrolled full-time" → Eligible
    eduErrMessage.innerHTML = "<i class='fas fa-check-circle'></i> You are eligible to apply for this internship.";
    eduErrMessage.classList.remove("error");
    eduErrMessage.classList.add("success");
    eduErrMessage.style.display = "block";
    
    // Re-enable submit button if it was disabled and govt job is not "yes"
    const submitBtn = document.querySelector(".submit-btn");
    const govtJobSelected = document.querySelector('input[name="govtJob"]:checked');
    
    if (submitBtn && (!govtJobSelected || govtJobSelected.value !== "yes")) {
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = "";
      submitBtn.style.cursor = "";
      
      // Restore original text
      submitBtn.innerHTML = "<i class='fas fa-robot'></i> Get AI Recommendations";
    }
    
    // Remove error highlighting
    document.querySelector('.edu').classList.remove('error-section');
  }
}



// Get references to DOM elements
const govtJobForm = document.getElementById("govtJobForm");
const govtJobMessage = document.getElementById("govtJobMessage");
const govtDetailsBox = document.getElementById("govtDetailsBox"); // This might be null if commented out in HTML
const aadhaarMessage = document.getElementById("aadhaarMessage");

// Add visual feedback for form interactions
document.querySelectorAll('input, select').forEach(element => {
  // Add focus effect
  element.addEventListener('focus', function() {
    this.closest('.field')?.classList.add('focused');
  });
  
  // Remove focus effect
  element.addEventListener('blur', function() {
    this.closest('.field')?.classList.remove('focused');
  });
});

// Show/hide government details box based on selection
document.querySelectorAll('input[name="govtJob"]').forEach(radio => {
  radio.addEventListener("change", function() {
    // Only manipulate govtDetailsBox if it exists in the DOM
    if (govtDetailsBox) {
      if (this.value === "yes") {
        govtDetailsBox.style.display = "block";
      } else {
        govtDetailsBox.style.display = "none";
      }
    }
    
    // Process eligibility immediately when option is selected
    processGovtJobEligibility();
    
    // Add visual feedback for selection
    this.closest('.radio').classList.add('selected');
    document.querySelectorAll('input[name="govtJob"]').forEach(otherRadio => {
      if (otherRadio !== this) {
        otherRadio.closest('.radio').classList.remove('selected');
      }
    });
  });
});

// Process government job eligibility
function processGovtJobEligibility() {
  const selected = document.querySelector('input[name="govtJob"]:checked');
  
  if (!selected) return; // No option selected yet
  
  if (selected.value === "yes") {
    // Show rejection message
    govtJobMessage.innerHTML = "<i class='fas fa-times-circle'></i> Sorry, you are not eligible for this internship as you or your family members or your spouse has a government job.";
    govtJobMessage.classList.remove("success");
    govtJobMessage.classList.add("error");
    govtJobMessage.style.display = "block";

    // Disable further actions if not eligible
    const submitBtn = document.querySelector(".submit-btn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.style.backgroundColor = "#9ca3af";
      submitBtn.style.cursor = "not-allowed";
      
      // Add visual indication
      submitBtn.innerHTML = "<i class='fas fa-ban'></i> Not Eligible";
    }
    
    // Highlight the section to draw attention
    document.querySelector('.govt-job-section').classList.add('error-section');
  } else {
    // If "No" → Eligible
    govtJobMessage.innerHTML = "<i class='fas fa-check-circle'></i> You are eligible to apply for this internship.";
    govtJobMessage.classList.remove("error");
    govtJobMessage.classList.add("success");
    govtJobMessage.style.display = "block";
    
    // Re-enable submit button if it was disabled
    const submitBtn = document.querySelector(".submit-btn");
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = "";
      submitBtn.style.cursor = "";
      
      // Restore original text
      submitBtn.innerHTML = "<i class='fas fa-robot'></i> Get AI Recommendations";
    }
    
    // Remove error highlighting
    document.querySelector('.govt-job-section').classList.remove('error-section');
  }
}

// Handle Aadhaar linking section
document.querySelectorAll('input[name="aadhaarLink"]').forEach(radio => {
  radio.addEventListener("change", function() {
    if (this.value === "yes") {
      // Show success message for Aadhaar linking
      aadhaarMessage.innerHTML = "<i class='fas fa-check-circle'></i> Great! Your bank account is linked with Aadhaar.";
      aadhaarMessage.classList.remove("error", "warning");
      aadhaarMessage.classList.add("success");
      aadhaarMessage.style.display = "block";
    } else {
      // Show warning message for Aadhaar linking
      aadhaarMessage.innerHTML = "<i class='fas fa-exclamation-triangle'></i> Please link your bank account with Aadhaar before the internship starts for stipend disbursement.";
      aadhaarMessage.classList.remove("success", "error");
      aadhaarMessage.classList.add("warning");
      aadhaarMessage.style.display = "block";
    }
    
    // Add visual feedback for selection
    this.closest('.radio').classList.add('selected');
    document.querySelectorAll('input[name="aadhaarLink"]').forEach(otherRadio => {
      if (otherRadio !== this) {
        otherRadio.closest('.radio').classList.remove('selected');
      }
    });
  });
});

// Handle main form submission
document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault();
  
  // Check if user is eligible (not in govt job)
  const govtJobSelected = document.querySelector('input[name="govtJob"]:checked');
  if (!govtJobSelected || (govtJobSelected.value === "yes")) {
    alert("Please complete the Government Job Status section. You must not be in a government job to be eligible.");
    return;
  }
  
  // Check if user is eligible (not enrolled full-time)
  const eduSelected = document.querySelector('input[name="edu"]:checked');
  if (!eduSelected || (eduSelected.value === "Enrolled full-time")) {
    alert("Please complete the Enrollment Status section. You must not be enrolled in full-time study/job to be eligible.");
    return;
  }
  
  // Check if all required fields are filled
  const requiredFields = document.querySelectorAll("[required]");
  let allFilled = true;
  
  requiredFields.forEach(field => {
    if (!field.value && !field.checked) {
      allFilled = false;
    }
  });
  
  if (!allFilled) {
    alert("Please fill in all required fields.");
    return;
  }
  
  // If all validations pass, show success message
  alert("Form submitted successfully! You will receive AI recommendations shortly.");
});

// Add CSS classes for messages and additional desktop styling
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .focused {
      background-color: rgba(25, 118, 210, 0.05);
      padding: 5px;
      border-radius: 5px;
      transition: all 0.3s ease;
    }
    
    .radio.selected {
      background-color: #e3f2fd;
      border-left: 3px solid #1976d2;
      font-weight: 500;
    }
    
    .error-section {
      border: 1px solid #ffcdd2 !important;
      background-color: #ffebee !important;
    }
    
    /* Smooth transitions */
    .section, .field, .radio, .btn, .message {
      transition: all 0.3s ease;
    }
    
    /* Hover effects for better desktop experience */
    .section:hover {
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    }
  </style>
`);

// Add smooth scrolling to sections
document.querySelectorAll('.subhead').forEach(subhead => {
  subhead.addEventListener('click', function() {
    const section = this.closest('.section');
    section.scrollIntoView({ behavior: 'smooth' });
  });
});



