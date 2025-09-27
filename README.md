## Welcome to DuneStay!

# DuneStay - Noroff Project Exam 2025.

### Project Overview:

Dunestay is an accommodation booking platform where users can browse and book venues, while venue managers can manage their properties and bookings. Built as Project Exam 2 for Noroff, this frontend application uses the Holidaze API to provide booking and management functionality.

### 🌐 <a href="https://dunestay.netlify.app/" target="_blank">Dunestay Live Demo</a>

### Concept:

I chose a desert-themed booking platform using the `Holidaze` API with all available venues. I developed this dune-side concept to design for something more specific and cohesive.

## Key Features

- 🏠 Browse Venues: All users can view and search available venues.

- 🔍 Search Functionality: Quickly find venues by name or location.

- 📅 Venue Details: View venue pages with full details and a calendar of availability.

- 👤 User Roles:

Visitors: Browse and search venues without logging in.

Customers: Register, log in, make bookings, and view upcoming reservations.

Venue Managers: Register as a manager, create/edit/delete venues, and manage bookings.

- 🖼️ Profile Management: Update avatar/profile picture.

- 📲 Authentication: Secure login and logout flow using the official Holidaze API.

- 🎨 Dark Mode: Toggle for personalized viewing.

###

![DuneStay Homepage Preview](/public/dunestay_preview_homepage.png)  
![Auth Flow](/public/dunestay_preview_auth.png)  
![Profile Page](/public/dunestay_preview_profile.png)

###

## 📝 How to Set Up the Project

To get a copy of this project, you can clone the repository:

```bash
git clone https://github.com/senbet22/holidaze
```

Alternatively, you can download the ZIP file and extract it.

### Install Dependencies

```bash
npm install
```

### 🛠 Dependencies

- React 19
- Tailwind CSS
- React Router DOM
- React Toastify
- Embla Carousel
- React Focus Lock

#### 🏁 Run the Development Server

This generates optimized, production-ready files in the dist/ folder.

```bash
npm run dev
```

To start your project locally:

```bash
npm run build
```

## 🔑 Environment Variables

_This project requires an API key to access certain features._

1. Get your API key from the [Noroff API Key Tool](https://docs.noroff.dev/docs/v2/auth/api-key#api-key-tool).
2. Create a .env file in the project root.
3. Inside the .env file Add your key like this:
   `VITE_API_KEY=your_api_key`
4. Add .env in .gitignore file for security.

## 📚 Documentation

**API Endpoints**: All the relevant API endpoints and their usage can be found in the `src/API/constants.mjs` file. This file holds the base URLs and paths for API requests used within the application.
It also imports the `.env` file for the API key, securely handled using `import.meta.env.VITE_API_KEY`.

**Error Handling** in **API Calls**: The application provides error messages in case of failed requests. For example, when logging in, if the request fails, the error message will be captured from the API response and thrown, indicating the status code, status, and specific error message.

**Email Validation Requirement:** a valid email must end with either @noroff.no or @stud.noroff.no. Any other email domains will be rejected during the signup process.

## Accesibility Features:

- Semantic HTML elements for structure.

- ARIA labels where needed (buttons, forms).

- Keyboard navigation (focus states, focus traps in modals).

- Color contrast that supports dark/light mode.

- Alt text for images.

### Notes:

- Venues marked with '✨New' are venues that are yet to be rated.
- Upon missing content there will be pictures of the Dunestay camel telling you the issue.

### Resources - Third party apps

- React Focus Lock (Used for accessibility on Modals)
  https://www.npmjs.com/package/react-focus-lock

- Embla Carousel
  I chose Embla for carousels throughout the project because it's lightweight and smooth.
  https://www.embla-carousel.com/

- React-toastify
  used for toast messages through the whole project.
  https://www.npmjs.com/package/react-toastify

<h3 align="left">Built with:</h3>

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img src="https://cdn.simpleicons.org/tailwindcss/06B6D4" height="40" alt="tailwindcss logo"  />
  <img src="https://skillicons.dev/icons?i=vite" height="40" alt="vite logo"  />
</div>

###

<h3 align="left">My tools:</h3>

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" height="40" alt="figma logo"  />
  <img src="https://skillicons.dev/icons?i=postman" height="40" alt="postman logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="40" alt="vscode logo"  />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/behance/behance-original.svg" height="40" alt="behance logo"  />
</div>

###

### 📞 Contact

[My GitHub Profile](https://github.com/senbet22)

###

[Back to Top](#readme)
