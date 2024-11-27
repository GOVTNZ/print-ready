TODO - ADD implimentaiton instructions the base.css file (must be type print)
  

# PrintReady Module Integration Guide

This guide details the use of each **PrintReady** module function to enhance print formatting on government agency webpages.

---

## 1. Setting Up a Print Button

This is optional. The `initializePrintButton` function enables a print button on the page, making it visible and functional to trigger the print dialog.


### Usage

1. Place a hidden print button in your HTML or reference an existing one in the next step. Ensure a exisiting button has the `hidden` attribute:

   ```html
   <button id="print-page-button" hidden>Print Page</button>
   ```

2. Call `initializePrintButton` with the button's CSS selector:

   ```javascript
   import { initializePrintButton } from 'path/to/printready-base.js';

   document.addEventListener('DOMContentLoaded', () => {
       const printButtonSelector = "#print-page-button";
       initializePrintButton(printButtonSelector);
   });
   ```   
   
3. **Explanation:** The function checks if the button exists, adds a `click` event to trigger printing, and makes it visible.



## 2. Displaying Page Information for Printing

The `generatePrintablePageInformation` function generates page information, such as the site name, title, print date, and URL, for the print view.

### Usage

1. Add a container in your HTML or inject it via JavaScript:

   ```javascript
   import { generatePrintablePageInformation } from 'path/to/printready-base.js';

   document.addEventListener('DOMContentLoaded', () => {
       const siteName = "Your Site Name"; // Replace with your site’s name
       document.body.insertAdjacentHTML(
           'afterbegin',
           `<div class="printed-page-details js-print-only">
               ${generatePrintablePageInformation(siteName)}
           </div>`
       );
   });
   ```   
   
2. **Explanation:** The `generatePrintablePageInformation` function takes a site name and optionally a page title selector (`'h1'` by default), creating an HTML snippet with the page information.

#### Example Output

   ```html
   <div class="printed-page-details js-print-only">
       <p><b>Your Site Name</b></p>
       <p><b>Page title:</b> Example Title</p>
       <p><b>Printed:</b> 11 November 2024</p>
       <p><b>Printed from:</b> https://example.com/page</p>
   </div>
   ```

## 3. Generating a Printable Link List

### Usage

1. Add the following code to generate and insert the list of links:

   ```javascript
   import { generatePrintableLinkList } from 'path/to/printready-base.js';

   document.addEventListener('DOMContentLoaded', () => {
       const linkList = generatePrintableLinkList(
           '.page-content a',   // Selector for links to include
           '.sidenav a',         // Selector for links to exclude
           true                  // Set to 'true' to include only external links
       );

       document.body.insertAdjacentHTML(
           'beforeend',
           `<div id="js-printready-link-urls" class="js-print-only">
               <h2>Index of Page Links</h2>
               <ol class="js-printready-links-list">${linkList}</ol>
           </div>`
       );
   });
   ```

2. **Explanation:** This function filters links based on provided selectors and outputs them in a format suitable for printing. It includes email, phone, and external links by default.

#### Example Output

   ```html
   <div id="js-printready-link-urls" class="js-print-only">
       <h2>Index of Page Links</h2>
       <ol class="js-printready-links-list">
           <li>https://external-link.com</li>
           <li>Email: contact@example.com</li>
           <li>Phone number: +123456789</li>
       </ol>
   </div>
   ```


## 4. Automatically Opening \<details> Elements for Printing

The `openDetailsElementsForPrinting` function opens all \<details> elements within the specified selector when printing and closes them afterward.

### Usage

1. Use the following code to implement the function:

   ```javascript
   import { openDetailsElementsForPrinting } from 'path/to/printready-base.js';

   document.addEventListener('DOMContentLoaded', () => {
       const detailsSelector = '.main-content details.inline-accordion';
       openDetailsElementsForPrinting(detailsSelector);
   });
   ```

2. **Explanation:** This function filters links based on provided selectors and outputs them in a format suitable for printing. It includes email, phone, and external links by default.

#### Example output

```html
   <details class="inline-accordion">
       <summary>Click to view more</summary>
       <p>Details content here will be visible in print.</p>
   </details>
```
