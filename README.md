# Nargas Studio Website

A beautiful, modern website for Nargas Studio featuring two main classes: Introduction to Sewing and Introduction to Fashion Illustration.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Class Pages**: Detailed pages for both sewing and fashion illustration classes
- **Signup Forms**: Interactive registration forms with validation
- **Success Feedback**: Beautiful confirmation page after registration
- **Email Integration**: Form submissions are stored and ready for email processing

## Files Structure

```
nargas-studio/
├── index.html                    # Main homepage
├── sewing-class.html            # Introduction to Sewing class page
├── fashion-illustration-class.html # Introduction to Fashion Illustration class page
├── success.html                 # Registration success page
├── styles.css                   # All CSS styling
├── script.js                    # JavaScript functionality
└── README.md                    # This file
```

## How to Use

1. **Open the Website**: Double-click on `index.html` to open the website in your browser
2. **Navigate**: Use the navigation menu to explore different sections
3. **View Classes**: Click on "Learn More" buttons to see detailed class information
4. **Register**: Fill out the registration forms on class pages
5. **Success**: After registration, you'll see a beautiful confirmation page

## Class Information

### Introduction to Sewing
- **Duration**: 6 weeks, 2 hours per session
- **Price**: $299 per person
- **Skill Level**: Complete Beginner
- **Class Size**: Maximum 8 students

### Introduction to Fashion Illustration
- **Duration**: 8 weeks, 2.5 hours per session
- **Price**: $399 per person
- **Skill Level**: Beginner to Intermediate
- **Class Size**: Maximum 6 students

## Form Submissions

The registration forms collect:
- Full Name (required)
- Phone Number (required)
- Preferred Class Time (required)
- Additional Comments (optional)

Form data is stored in the browser's localStorage and can be accessed for email processing.

## Customization

### Contact Information
Update the contact details in `index.html`:
- Email: info@nargasstudio.com
- Phone: (555) 123-4567
- Address: 123 Fashion Street, Creative City

### Class Times
Modify available class times in the signup forms on both class pages.

### Styling
All styling is in `styles.css`. The color scheme uses:
- Primary Gold: #d4af37
- Gradient: #667eea to #764ba2
- Text: #333
- Background: #fafafa

## Email Integration

To set up email notifications for form submissions:

1. **Backend Setup**: Create a server-side script to handle form submissions
2. **Email Service**: Use services like:
   - EmailJS (client-side)
   - Formspree
   - Netlify Forms
   - Custom PHP/Node.js backend

3. **Form Action**: Update the form action URLs to point to your email handler

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Future Enhancements

- Add real images for class galleries
- Implement payment processing
- Add student testimonials
- Create instructor profiles
- Add blog/news section
- Implement user accounts

## Support

For any questions or modifications needed, please contact the developer or refer to the code comments in the HTML, CSS, and JavaScript files.

---

**Nargas Studio** - Where Fashion Meets Creativity
