# Student Finance Tracker

Live demo: [https://csheja.github.io/Student-Finance-Tracker/](https://csheja.github.io/Student-Finance-Tracker/)

A simple web application designed to help students in Rwanda manage and track their personal finances.  
Users can add, view, sort, and delete transaction records, visualize weekly spending trends, and set monthly spending caps.

## Features

- Add, edit*, and delete transactions  
- Search transactions using regular expressions (regex) for flexible and powerful filtering  
- Sort records by date, amount, or description  
- View weekly spending data with interactive bar charts (powered by Chart.js)  
- Track total spending, top spending category, and remaining budget cap  
- Set preferred currency and exchange rates (RWF, USD, EUR)  
- Responsive and accessible user interface suitable for desktops and mobile devices  
- All data stored locally in the browser using `localStorage` for persistence  

> \*Note: Editing transactions is currently not implemented.

---

## Regular Expression Search

The search bar supports regular expressions (regex to allow advanced filtering of transaction descriptions.  
For example:
- Searching `foo|bar` matches any description containing "foo" or "bar".  
- Using `^rent` finds descriptions starting with "rent".  
- Case-insensitive searches are supported.

Invalid regex patterns are handled gracefully to avoid errors.

## Category & Keyboard Mapping

- Transactions require a category field, allowing users to organize expenses (e.g., Food, Transport, Utilities).  
- Keyboard shortcuts (if any) for navigating the UI or quick actions can be added to improve usability (future enhancement).  
- The current UI navigation uses buttons and standard click/touch interactions for accessibility.


## Technologies Used

- HTML, CSS, JavaScript (ES6+)  
- [Chart.js](https://www.chartjs.org/) for data visualization  
- Browser `localStorage` API for data persistence  

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

yaml
Copy code

## Usage

1. Open `index.html` in a modern web browser.  
2. Use the navigation buttons to switch between Dashboard, Records, Add/Edit, and Settings.  
3. Add transactions with description, amount, category, and date.  
4. View, search, and sort transaction records.  
5. Visualize weekly spending trends in the Dashboard charts.  
6. Set monthly spending cap and currency preferences in Settings.

## Limitations

- Editing transactions is not yet implemented.  
- Settings are not persisted and reset on page refresh.  
- Currency conversion rates are set manually; no automatic conversion.  
- Keyboard shortcuts/navigation enhancements are planned but not yet implemented.

## Author

Developed by CSheja for academic purposes.  
Contact:csheja@alustudent.com  
GitHub: [github.com/CSheja](https://github.com/CSheja)

## License

This project is released under the MIT License.
