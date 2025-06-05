![image alt](https://github.com/munagalamose/flam-assginment/blob/01a3911d0dfb4dc39108d870b9e4101369791059/Screenshot%202025-06-05%20103125.png)



# HR Performance Dashboard

A modern HR dashboard built with Next.js, Tailwind CSS, and TypeScript for tracking employee performance, managing bookmarks, and viewing detailed insights.

## Features

- 🏠 **Dashboard Homepage**
  - Employee cards with performance ratings
  - Search and filter functionality
  - Bookmark system
  - Responsive design

- 👤 **Employee Details**
  - Detailed employee profiles
  - Performance history
  - Project assignments
  - Feedback system
  - Tabbed interface

- 📌 **Bookmark Manager**
  - Save and organize employee profiles
  - Quick access to bookmarked employees
  - Remove bookmarks

- 📊 **Analytics Dashboard**
  - Department-wise performance metrics
  - Bookmark trends
  - Interactive charts
  - Key performance indicators

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Charts:** Chart.js with react-chartjs-2
- **Icons:** Heroicons
- **Animations:** Framer Motion

## Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd hr-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
├── components/            # Reusable UI components
├── store/                # Zustand store
└── lib/                  # Utilities and API functions
```

## Key Components

- **EmployeeCard:** Displays employee information with rating and bookmark functionality
- **SearchBar:** Handles search and filtering of employees
- **Rating:** Reusable star rating component
- **Analytics Charts:** Visualizes department performance and trends

## State Management

The application uses Zustand for state management with the following features:
- Employee data management
- Bookmark system
- Search and filter state
- Persistent storage

## Data Flow

1. Employee data is fetched from the dummy API
2. Data is processed and stored in Zustand store
3. Components subscribe to relevant store slices
4. UI updates reactively based on state changes

## Styling

- Responsive design using Tailwind CSS
- Dark mode support
- Consistent color scheme and spacing
- Modern UI components

## Future Improvements

- [ ] Add authentication system
- [ ] Implement real-time updates
- [ ] Add more analytics features
- [ ] Enhance mobile experience
- [ ] Add unit tests
- [ ] Implement data export functionality

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

This project is licensed under the MIT License. 
