# Employee Management Dashboard

A React.js application for managing employee information. This dashboard allows you to add, edit, delete, search, and filter employees with a simple and modern interface.

## Project Overview

This is an Employee Management Dashboard built with React and TypeScript. The application includes:

- **Login System**: Simple login page to access the dashboard
- **Employee List**: View all employees in a table format
- **Add/Edit Employees**: Create new employees or update existing ones
- **Delete Employees**: Remove employees with confirmation
- **Search & Filter**: Find employees by name, gender, or status
- **Print Functionality**: Print the employee list
- **Image Upload**: Upload and preview employee profile pictures

All data is stored in your browser's local storage, so it persists even after closing the browser.

## Tech Stack Used

- **React 18.2.0** - JavaScript library for building user interfaces
- **TypeScript 5.2.2** - Adds type safety to JavaScript
- **React Router DOM 6.20.0** - Handles navigation between pages
- **Vite 5.0.8** - Fast build tool and development server
- **CSS3** - For styling the application
- **LocalStorage** - Stores data in the browser

## Steps to Run the Project Locally

### Prerequisites

Make sure you have Node.js installed on your computer (version 16 or higher).

### Installation Steps

1. **Open Terminal/Command Prompt**
   - Navigate to the project folder
   - Example: `cd employee-management-dashboard`

2. **Install Dependencies**
   ```bash
   npm install
   ```
   This will install all required packages.

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This will start the application on a local server.

4. **Open in Browser**
   - The terminal will show a URL (usually `http://localhost:5173`)
   - Open this URL in your web browser
   - The application should load automatically

### Login

- Use any username and password to login (this is a demo, so any credentials work)
- After login, you'll see the dashboard

## Assumptions and Design Decisions

### Assumptions

1. **Simple Authentication**: For this demo, any username and password will work. In a real application, this would connect to a secure server.

2. **Browser Storage**: All employee data is saved in the browser's local storage. This means:
   - Data stays even after closing the browser
   - Data is only on your computer (not shared)
   - Good for demo purposes, but not for real production use

3. **US States Only**: The state dropdown shows only US states. This can be changed to include other countries if needed.

4. **Age Limit**: Employees must be between 18 and 100 years old. This is a business rule that can be adjusted.

5. **Image Size**: Profile images can be up to 5MB in size. Images are converted to base64 format for storage.

### Design Decisions

1. **Component Structure**: 
   - Each feature is in its own component file
   - Makes the code easy to read and maintain
   - Components can be reused in different places

2. **State Management**:
   - Used React Context API to share data between components
   - Separate contexts for login and employee data
   - Keeps the code organized

3. **Form Validation**:
   - All forms check for errors before saving
   - Shows error messages immediately
   - Prevents saving invalid data

4. **User Experience**:
   - Clean and simple design
   - Loading indicators when data is being processed
   - Confirmation dialogs before deleting
   - Image preview before saving
   - Responsive design that works on phones and tablets

5. **Data Storage**:
   - Used localStorage because it's simple and works without a server
   - Data persists between browser sessions
   - Easy to test and demonstrate

6. **Styling**:
   - Modern gradient colors for a professional look
   - Smooth animations for better user experience
   - Print-friendly styles for printing employee lists

## Project Structure

```
employee-management-dashboard/
├── src/
│   ├── components/     # All UI components (Login, Dashboard, Forms, etc.)
│   ├── context/        # State management (Authentication, Employees)
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Helper functions (Storage, Validation, Images)
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── package.json        # Project dependencies
└── README.md           # This file
```

## Notes

- This is a demo application for learning purposes
- For production use, you would need:
  - A real backend server
  - A database to store data
  - Secure authentication system
  - API endpoints for data operations

---

**Created for**: React.js Assignment - Employee Management Dashboard
