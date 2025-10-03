# EmailJS Setup Guide

This portfolio uses EmailJS for handling email notifications from the newsletter and contact forms (frontend only, no backend required).

## Setup Steps

1. **Create a free EmailJS account**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account (allows 200 emails/month)

2. **Get your credentials**
   - After logging in, go to "Email Services" and connect your email provider (Gmail, Outlook, etc.)
   - Note your **Service ID**
   - Go to "Email Templates" and create templates for:
     - Newsletter subscriptions
     - Contact form submissions
   - Note your **Template IDs**
   - Go to "Account" → "General" to find your **Public Key**

3. **Update the code**
   Replace the placeholder values in these files:
   
   ### src/components/Newsletter.tsx
   ```typescript
   emailjs.send(
     'YOUR_SERVICE_ID',    // Replace with your Service ID
     'YOUR_TEMPLATE_ID',   // Replace with your Newsletter Template ID
     { ... },
     'YOUR_PUBLIC_KEY'     // Replace with your Public Key
   )
   ```
   
   ### src/components/CTA.tsx
   ```typescript
   emailjs.send(
     'YOUR_SERVICE_ID',    // Replace with your Service ID
     'YOUR_TEMPLATE_ID',   // Replace with your Contact Template ID
     { ... },
     'YOUR_PUBLIC_KEY'     // Replace with your Public Key
   )
   ```
   
   ### src/components/DetailsSection.tsx
   ```typescript
   emailjs.send(
     'YOUR_SERVICE_ID',    // Replace with your Service ID
     'YOUR_TEMPLATE_ID',   // Replace with your Contact Template ID
     { ... },
     'YOUR_PUBLIC_KEY'     // Replace with your Public Key
   )
   ```

## Email Template Variables

Make sure your EmailJS templates include these variables:

### Newsletter Template
- `{{to_email}}` - Subscriber's email
- `{{from_name}}` - Portfolio Newsletter
- `{{message}}` - Subscription confirmation message

### Contact Form Template
- `{{from_name}}` - Sender's name
- `{{to_email}}` - Sender's email
- `{{message}}` - The message content
- `{{company}}` - Project details (optional)

## Testing

After configuration:
1. Test the newsletter subscription form
2. Test the contact form in the "Let's work together" section
3. Check your connected email inbox for notifications

## Features Implemented

✅ Newsletter subscription with email notification
✅ Contact form with email notification  
✅ Typewriter animation on "Crafting Digital Experiences"
✅ Typewriter animation on "Professional Experience" (triggers on scroll)
✅ Scroll progress bar at top of page
✅ Mobile-responsive Experience section with left-side timeline
✅ All forms validate input and show toast notifications
