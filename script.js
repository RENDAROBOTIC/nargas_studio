// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler
function handleFormSubmit(event, formType) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const classTime = formData.get('classTime');
    const comments = formData.get('comments');
    
    // Basic validation
    if (!name || !email || !phone || !classTime) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Phone number validation - more lenient
    const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (cleanedPhone.length < 10) {
        alert('Please enter a valid phone number.');
        return;
    }
    
    // Show loading state
    showLoadingState(form);
    
    // Send email via FormSubmit
    fetch('https://formsubmit.co/nargasatelier@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            phone: phone,
            classTime: classTime,
            comments: comments || 'None',
            classType: formType,
            _subject: `New ${formType} Registration - ${name}`,
            _cc: 'oldtownrode@gmail.com',
            _template: 'table',
            _captcha: 'false'
        })
    })
    .then(response => {
        console.log('Response status:', response.status);
        // FormSubmit returns 200 on success
        if (response.ok || response.status === 200) {
            return response.json().catch(() => {
                // If JSON parsing fails but status is ok, still treat as success
                return { success: true };
            });
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .then(data => {
        console.log('Success:', data);
        // Store form data in localStorage as backup
        const submissionData = {
            name: name,
            email: email,
            phone: phone,
            classTime: classTime,
            comments: comments,
            classType: formType,
            timestamp: new Date().toISOString()
        };
        
        let submissions = JSON.parse(localStorage.getItem('nargasSubmissions') || '[]');
        submissions.push(submissionData);
        localStorage.setItem('nargasSubmissions', JSON.stringify(submissions));
        
        // Show success message
        showSuccessMessage();
        
        // Redirect to success page after showing message
        setTimeout(() => {
            window.location.href = 'success.html';
        }, 2000);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your registration. Please check the browser console for details, or contact us directly at nargasatelier@gmail.com');
        // Remove loading overlay
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) overlay.remove();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register Now';
    });
}

// Show loading state
function showLoadingState(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    // Add loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-content">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Submitting your registration...</p>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
}

// Show success message
function showSuccessMessage() {
    // Remove loading overlay
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) loadingOverlay.remove();
    
    // Add success overlay
    const successOverlay = document.createElement('div');
    successOverlay.className = 'loading-overlay';
    successOverlay.innerHTML = `
        <div class="loading-content success-content">
            <i class="fas fa-check-circle" style="color: #28a745; font-size: 3rem;"></i>
            <h2 style="color: #28a745; margin: 1rem 0;">Registration Successful!</h2>
            <p>Thank you for registering. We'll contact you shortly.</p>
        </div>
    `;
    
    document.body.appendChild(successOverlay);
}

// Add loading overlay styles
const loadingStyles = `
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .loading-content {
        background: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    }
    
    .loading-content i {
        font-size: 2rem;
        color: #d4af37;
        margin-bottom: 1rem;
    }
    
    .loading-content p {
        color: #333;
        font-weight: 500;
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Email simulation (for demo purposes)
function simulateEmailSend(formData) {
    console.log('Email would be sent to: oldtownrode@gmail.com');
    console.log('Email content:', {
        subject: `New ${formData.classType} Registration`,
        body: `
            New class registration received:
            
            Name: ${formData.name}
            Phone: ${formData.phone}
            Preferred Class Time: ${formData.classTime}
            Comments: ${formData.comments || 'None'}
            Class Type: ${formData.classType}
            Registration Date: ${new Date().toLocaleString()}
        `
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to class cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe class cards
    document.querySelectorAll('.class-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Utility function to format phone number
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

// Add phone number formatting to form inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = formatPhoneNumber(this.value);
        });
    });
});
