Student Finance Tracker

Live Demo: https://csheja.github.io/Student-Finance-Tracker/

A simple web application designed to help students in Rwanda manage and track their personal finances.
Users can add, view, sort, and delete transaction records, visualize weekly spending trends, and set monthly spending caps.

##Features

Add, edit, and delete transactions

Search transactions using regular expressions (regex) for advanced filtering

Sort records by date, amount, or description

Weekly spending bar chart with auto-update (powered by Chart.js)

Dashboard displays:

Total number of transactions

Total amount spent

Top spending category

Remaining budget cap

Currency settings:

Set preferred currency (RWF, USD, EUR)

Manual exchange rates with automatic conversion

Keyboard shortcuts:

Ctrl + D: Open Dashboard

Ctrl + R: View Records

Ctrl + N: Add New Transaction

Ctrl + S: Open Settings

Data stored locally in browser using localStorage

Responsive and mobile-friendly design

##Regex Search Examples

The search bar supports flexible regex filters for transaction descriptions.

Pattern	Matches
food|rent	Descriptions containing food or rent
^trans	Descriptions starting with "trans"
milk$	Descriptions ending with "milk"
(?i)book	Case-insensitive match for "book"

Invalid patterns are handled gracefully without crashing the app.

##Category & Keyboard Mapping

Each transaction requires a category (e.g., Food, Transport, Entertainment).
Keyboard shortcuts improve usability and allow faster navigation between sections.

##Technologies Used

HTML5, CSS3, JavaScript (ES6+)

Chart.js for data visualization

Browser localStorage API for data persistence

##Project Structure
student-finance-tracker/
├── index.html

├── styles/
│   └── style.css

├── scripts/
│   ├── tracker.js       # Initializes UI and draws chart
│   ├── ui.js            # UI rendering, navigation, event binding
│   ├── state.js         # Application state and logic
│   ├── storage.js       # localStorage utility
│   ├── search.js        # Regex utilities
│   └── validators.js    # Input validation

├── seed.json

└── README.md

##Usage

Download or clone this repository

Open index.html in a modern web browser

Use the navigation or keyboard shortcuts to access:

Dashboard

Records

Add/Edit

Settings

Add transactions with description, amount, category, and date

View real-time charts and dashboard updates

Data remains saved in the browser even after refresh

##Limitations

Editing functionality is partially implemented

Settings (cap and exchange rates) are not saved to storage

Currency conversion must be entered manually

Keyboard shortcuts may not work in all browsers if conflicting with system shortcuts


Author

Developed by CSheja for academic purposes
Contact: csheja@alustudent.com

GitHub: github.com/CSheja

License

This project is licensed under the MIT License.
