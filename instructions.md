TODO - ADD implimentaiton instructions the base.css file (must be type print)
  

# PrintReady Integration Guide

This guide details the use of each **PrintReady** module function to enhance print formatting on government agency webpages.

---

## Include printready-base.css as a Print Stylesheet
1. Add the following \<link> tag in the \<head> of your HTML file to apply print-specific styles when printing the page:

```html
<link rel="stylesheet" href="/path/to/printready-base.css" media="print">
```

2. **Explanation:** The `media="print"` attribute ensures this stylesheet is only applied when the page is printed.


## Include printready-base.js as a JavaScript Module
1. To load the PrintReady base JavaScript file, add this \<script> tag to the \<head> or before the closing \</body> tag:

    ```html
    <script src="/path/to/printready-base.js" type="module" async></script>
    ```

2. **Explanation:** The `type="module"` attribute  preventing it from blocking the page rendering process while being fetched and executed. allows you to import the PrintReady ES6 modules. 
The `async` attribute ensures the script is loaded asynchronously, preventing it from blocking the page rendering process, because it is not needed unless the page is printed after it's loaded. 

## JS Module Integration Guide

### Setting Up a Print Button

This is optional. The `initializePrintButton` function enables a print button on the page, making it visible and functional to trigger the print dialog.


#### Usage

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



### Displaying Page Information for Printing

The `generatePrintablePageInformation` function generates page information, such as the site name, title, print date, and URL, for the print view.

#### Usage

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
   
2. **Explanation:** The `generatePrintablePageInformation` function creates an HTML snippet with the site name and page title. By default, it uses the `'h1'` element for the title. If the title is in a different element, you can provide a custom selector as the second optional argument.

    ```javascript
    generatePrintablePageInformation(siteName, 'custom-selector')
    ``` 

#### Example Output

   ```html
   <div class="printed-page-details js-print-only">
       <p><b>Your Site Name</b></p>
       <p><b>Page title:</b> Example Title</p>
       <p><b>Printed:</b> 11 November 2024</p>
       <p><b>Printed from:</b> https://example.com/page</p>
   </div>
   ```

### Generating a Printable Link List

#### Usage

1. Add the following code to generate and insert the list of links:

   ```javascript
   import { generatePrintableLinkList } from 'path/to/printready-base.js';

   document.addEventListener('DOMContentLoaded', () => {
       const linkList = generatePrintableLinkList(
           '.page-content a',   // Example selector for links to include
           '.sidenav a',         // Example selector for links to exclude
           true                  // Set to 'true' to only include external links
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


### Automatically Opening \<details> Elements for Printing

The `openDetailsElementsForPrinting` function opens all \<details> elements within the specified selector when printing and closes them afterward.

#### Usage

1. Use the following code to implement the function with the \<detail> accordion's selector:

   ```javascript
   import { openDetailsElementsForPrinting } from 'path/to/printready-base.js';

   document.addEventListener('DOMContentLoaded', () => {
       const detailsSelector = 'details.example-selector';
       openDetailsElementsForPrinting(detailsSelector);
   });
   ```

2. **Explanation:** This function filters links based on provided selectors and outputs them in a format suitable for printing. It includes email, phone, and external links by default.

#### Example HTML

```html
   <details class="example-selector">
       <summary>Click to view more</summary>
       <p>Details content here will be visible in print.</p>
   </details>
```
