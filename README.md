## Student Finance Tracker

Live demo: https://csheja.github.io/Student-Finance-Tracker/
A simple web application to help students in Rwanda manage and track their personal finances. Users can add, view, sort, and delete transaction records, visualize weekly spending trends, and set monthly spending caps.

## Features

- Add, edit, and delete transactions
- Search transactions using regular expressions
- Sort records by date, amount, or description
- View weekly spending data in a bar chart
- Track total spending, top category, and cap remaining
- Set currency and exchange rates (RWF, USD, EUR)
- Responsive and accessible user interface
- Data stored locally in the browser using localStorage

## Technologies Used

- HTML, CSS, JavaScript
- Chart.js for data visualization
- LocalStorage API for persistence

## Project Structure

student-finance-tracker/
├── index.html
├── styles/
│ └── style.css
├── scripts/
│ ├── tracker.js
│ ├── ui.js
│ ├── state.js
│ ├── storage.js
│ ├── search.js
│ └── validators.js
├── seed.json
└── README.md

## Usage

1. Open `index.html` in a web browser.
2. Use the navigation buttons to access different sections.
3. Add transactions from the "Add/Edit" page.
4. View and manage transactions from the "Records" page.
5. Configure monthly cap and currency settings in the "Settings" page.

## Limitations

- Editing transactions is not yet implemented.
- Settings are not saved to storage and reset on refresh.
- Currency conversion is manual and not automatically calculated.

## Author

Developed by CSheja for academic purposes.  
Contact: [csheja@alustudent.com](mailto:csheja@alustudent.com)  
GitHub: [github.com/CSheja](https://github.com/CSheja)
