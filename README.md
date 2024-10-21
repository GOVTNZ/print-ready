# print-ready
Print ready is a lightweight toolkit providing base styling and JavaScript functionality for printed webpages. 

---

# Documentation for Importing and Using `print-ready`

`print-ready.js` provides functionality to initialize a print button, generate printable page information, and create a list of links to include in a printed version of the page. Below is the detailed guide on how to import and use these modules in your project.

---

## 1. Importing the Modules

To use the `print-ready.js` in your project, import the necessary functions into your JavaScript file:

```javascript
import { initializePrintButton, generatePrintablePageInformation, generatePrintableLinkList } from './print-ready.js';
```

### Available Functions:

- **`initializePrintButton(buttonSelector)`**
- **`generatePrintablePageInformation(name, pageTitleElement)`**
- **`generatePrintableLinkList(linksSelector, excludeLinksSelector)`**

---

## 2. Usage of the Functions

### 2.1. Initialize Print Button

This function attaches a print functionality to a button. When the button is clicked, the page will be printed.

#### Parameters:

- `buttonSelector`: The CSS selector of the button element that will trigger the print action.

#### Example:

```javascript
initializePrintButton('#print-page-button');
```

This will initialize the button with the ID `print-page-button` and bind a print event to it.

---

### 2.2. Generate Printable Page Information

This function generates a string of HTML that contains details about the page, such as the page title, the current URL, and the date when the page is printed.

#### Parameters:

- `name`: A string representing the name or title (e.g., the website or organization name) to display.
- `pageTitleElement`: (Optional) A CSS selector for the element containing the page title. Defaults to `h1`.

#### Returns:

A string of formatted HTML containing the page's information.

#### Example:

```javascript
const pageInfo = generatePrintablePageInformation('Digital.govt.nz', 'h1');
document.body.insertAdjacentHTML('afterbegin', `<div class="printed-page-details js-print-only">${pageInfo}</div>`);
```

This will insert the page information at the beginning of the document body.

---

### 2.3. Generate Printable Link List

This function creates a list of links that can be printed, based on specified selectors. You can choose which links to include and which to exclude.

#### Parameters:

- `linksSelector`: A CSS selector for the links you want to include in the printed list.
- `excludeLinksSelector`: (Optional) A CSS selector for the links you want to exclude from the printed list.

#### Returns:

A string of HTML containing the list of links, formatted as an ordered list (`<ol>`).

#### Example:

```javascript
const linkList = generatePrintableLinkList('#sitewidebanner a, .page-content a', '.exclude-links-class');
const printedLinksSection = `<div id="js-page-link-footnotes" class="js-print-only"><h2>Links</h2><ol class="js-footnoted-urls">${linkList}</ol></div>`;
document.querySelector('.footer').insertAdjacentHTML('beforebegin', printedLinksSection);
```

This will generate a list of all links within the `#sitewidebanner` and `.page-content`, excluding those matching the `.exclude-links-class`, and insert them into the DOM just before the footer.

---

## 3. Putting It All Together

Here’s a basic example of how to use all the functions in a document:

```javascript
import { initializePrintButton, generatePrintablePageInformation, generatePrintableLinkList } from './print-ready.js';

document.addEventListener('DOMContentLoaded', function () {

    // Initialize the print button
    initializePrintButton('#print-page-button');

    // Insert the page information into the document
    document.body.insertAdjacentHTML('afterbegin', `<div class="printed-page-details js-print-only">${generatePrintablePageInformation("Digital.govt.nz")}</div>`);

    // Determine which links to include in the printed version
    let listOfLinks = generatePrintableLinkList(
        '#sitewidebanner a, .page-content a', // Links to include
        '.exclude-links-class' // Links to exclude
    );

    // Insert the list of links into the document
    const printedLinksSection = `<div id="js-page-link-footnotes" class="js-print-only"><h2>Links</h2><ol class="js-footnoted-urls">${listOfLinks}</ol></div>`;
    document.querySelector('.footer').insertAdjacentHTML('beforebegin', printedLinksSection);
});
```

---

## 4. Notes for Developers

- Ensure that the button specified in `initializePrintButton` exists in the DOM with the correct selector, or the print functionality will not work.
- The `pageTitleElement` is configurable in `generatePrintablePageInformation`. The default is an `h1` tag, but you can specify any other tag or class for the page title.
- When using `generatePrintableLinkList`, make sure the selectors match your DOM structure, and provide a valid exclude selector to prevent unwanted links from being printed.
  
---

## 5. Customization Options

- You can configure the `linksSelector` and `excludeLinksSelector` in `generatePrintableLinkList` to match your page’s DOM structure. You might want to adjust these based on the specific page type.
- The generated HTML strings for page information and links are highly customizable—feel free to modify them to fit your needs or apply additional styles using the `js-print-only` class for print-specific styling.

---
