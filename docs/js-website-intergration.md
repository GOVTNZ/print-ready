# Javascript Integration Guide

`printready-base.js` provides modular functions to generate print-specific content for your web pages.

`printready-site.js` implients the modular functions in the base file. As detailed below ot should be edited to integrate with your website.


## Displaying Agency name for Printing

**If your printed pages already include your organisation’s logo, then this is optional.** You could also choose to add the example output below as a hardcoded component in your HTML, instead of injecting it via JavaScript.

Replace `AGENCY_NAME` with the name of your agency or organisation.

The `showAgency` function generates an HTML snippet containing the agency name for the print view.

### Usage

   ```javascript
   import { showAgency } from 'path/to/printready-base.js';

   const agencyName = "AGENCY_NAME";
    document.body.prepend(showAgency(agencyName));
   ```   
   
### Example Output

   ```html
   <div class="printready-agency js-print-only">
        <p class="print-info-agency"><b>AGENCY_NAME</b></p>
    </div>
   ``` 

## Displaying Page Information for Printing

The `showPageInformation` function generates a HTML snippet with the page title, current date, and URL for the print view.

### Usage

   ```javascript
   import { showPageInformation } from 'path/to/printready-base.js';
    
   document.body.insertAdjacentHTML(
       'beforeend', 
       `${showPageInformation()}`
   );
   ```   

#### Optionally Set a Custom Page Title Selector
By default, the content of the first `'h1'` element is used as the page title. You can override this by providing a custom selector as the second optional argument.

   ```javascript
   showPageInformation(siteName, 'custom-page-title-selector')
   ``` 

### Example Output

   ```html
   <div class="printready-page-info js-print-only"> 
       <p><b>Page title:</b> Example Title</p>
       <p><b>Printed:</b> 11 November 2024</p>
       <p><b>Printed from:</b> https://example.com/page</p>
   </div>
   ```



## Setting Up a Print Button

**This is optional.** The `initializePrintButton` function enables a print button on the page, making it visible and functional to trigger the print dialog.


### Usage

1. Place a hidden print button in your HTML or reference an existing one in the next step. 

   ```html
   <button id="print-page-button" hidden>Print Page</button>
   ```

2. Call `initializePrintButton` with the button's CSS selector:

   ```javascript
   import { initializePrintButton } from 'path/to/printready-base.js';

   document.addEventListener('DOMContentLoaded', () => {
        const printButtonSelector = "#print-page-button";
        if (document.querySelector(printButtonSelector)) {
            initializePrintButton(printButtonSelector);
        }
   });
   ```   
   
3. **Explanation:** The function checks if the button exists, adds a `click` event to trigger printing, and makes it visible.

4. **Implementation Tips:** If using an existing button ensure it has the `hidden` attribute and update the `printButtonSelector` variable to target it.


## Generating a Printable Link List
**This is optional, but it’s recommended.** The URLs of links to external websites are included as footnotes in a special “Links” section at the end of the printed page. This provides helpful context for readers, since hyperlinks do not work in print.

The URLs are not printed immediately after the link text to avoid reducing readability. But as a fallback, CSS rules (set in `printready-base.css`) will display the URL immediately after the link text if the Printable Link List functionality is not implemented.

By default, links to other pages on the same website are excluded from the list, as their context is already clear. Excluding internal links also reduces the number of URLs printed in the list.

To include internal links, set the third argument `externalOnly` in the generateListOfPageLinks function to `false`.

### Usage

1. Add the following code to generate and insert the list of links:

```javascript
import { generateListOfPageLinks } from 'path/to/printready-base.js';

document.addEventListener('DOMContentLoaded', () => {
    const linkList = generateListOfPageLinks(
        '.page-content a',   // Example selector for links to include
        '.sidenav a',         // Example selector for links to exclude
        true                  // Set to 'true' to only include external links in the list
    );  
});
```
2. Set `YOUR_RENDER_TARGET` to the CSS selector where you want the page links to appear on the page.

```javascript
let renderTarget = 'YOUR_RENDER_TARGET'; 
```
3. The links will be inserted after the render target.

4. **Explanation:** This function filters links based on provided selectors and outputs them as a list in a format suitable for printing. It includes email, phone, and external links by default. 

5. **Implementation Tips:** 
- Make sure the selectors match your DOM structure, and provide a valid exclude selector to prevent unwanted links from being printed.
- Adjust the include/exclude selectors as needed to account for different page types. For instance, the homepage may have a different structure compared to standard pages. See the implimentation of `generateListOfPageLinks` in `printready-site.js`  which uses a conditional statement to handle these variations.

### Example Output

   ```html
   <div id="js-printready-link-urls" class="js-print-only">
       <h2>Index of Page Links</h2>
       <ol class="js-printready-links-list">
           <li>https://external-link.com</li>
           <li>Email: contact@example.com - Subject: Example subject</li>
           <li>Phone number: +123456789</li>
       </ol>
   </div>
   ```