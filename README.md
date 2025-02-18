# PrintReady

## Introduction

PrintReady is optional not manadated. Is a meant to help government agencies implement consistent, accessible print formatting for their websites. By using PrintReady, agencies can ensure their printed web content meets the relevant NZ Government Web Standards while also providing a consistent experience across government websites.

The PrintReady toolkit simplifies the implementation of print stylesheets that follow good practices. It provides developers with the necessary files and guidance to create print-friendly pages that align with government standards and deliver an accessible experience for all users.

This guide provides step-by-step instructions for implementing PrintReady in your website. The tool is open source and welcomes contributions from the All-of-Government (AoG) community via GitHub.

## Approach  
PrintReady's print stylesheet approach focuses on leveraging the browser's default stylesheet, which is already effective for printed content, enhancing it only when necessary.  

It preserves important context by displaying URLs and full titles when printed, while managing page layouts to prevent awkward breaks and maintain professional formatting.  

This implementation embraces the principle of separation of concerns by applying the print stylesheets exclusively for printing and the screen stylesheet/s only for screen rendering.

It is designed to be flexible, separating core styles from site-specific needs and allowing easy customization across different website structures.

### General Guidelines
- Seperate print and screen styles, don't override screen styles with print styles.  
- Print it in black and white
- Only print what is critical to understanding the content or context of the page. 
- Do not print images unless they are critical to understanding the page content. 

## Quick Start Summary

### Download the repository
1. Clone the repo using Git or download it as a ZIP file.
2. Copy the JavaScript (.js) and CSS (.css) files from the `/src` folder into your website's directory.

### Install dependencies and examine the example folder  

1. Run the following command in the terminal:

```bash
npm 
install
```
2. Then to open the repository folder in a browser using `live server` run 
```bash
npm run start 
```
3. Once the browser window opens, navigate to the `example` folder

### Examine the printed page  

1. Toggle Between Print and Screen Views, either by opening a print dialog ( by pressing `Ctrl + P` or `Command + P` on macOS) or by using your browsers Developer Tools and toggling between Print and Screen rendering.
2. Note the section at the top of the page and the 'Index of page links' section at the bottom of the example page are dynamically injected using JavaScript.


### Include the source files in Your Webpages

1. Include the Files in the `src` folder in your Webpages;
    * Link CSS files only with `media="print"` to ensure styles apply only when printing. You can combine the print files in a build step 
    * Link JavaScript files with `type="module"` to enable ES6 module functionality. Keep the javascript files seperate.
2. Edit `printready-site.example.css` and `printready-site.example.js` to match your website's structure
(then remove the .example part fo the filename after intergrating the files into your site structure).

## Integration Guide
This repository is intended to be **downloaded or cloned** from GitHub, with the files0 described below then **copied and pasted** into your web project. The instructions below assume this method of integration.

Alternatively, you could install the package via NPM and import the JavaScript functions in a build step (e.g. using a compiler like  Webpack).

This section explains how to integrate PrintReady into your website to optimize page layouts and styling specifically for print output. 

---

## Seperate screen and print styles
Make sure all CSS files intended for on-screen display are served with the `media="screen"` attribute.

```html
<link rel="stylesheet" href="screen-styles.css" media="screen">
``` 


## PrintReady -base files
The 'base' files in the `/src` folder serve as the foundation for creating print-ready pages. The `printready-base.css` file includes well-commented styles designed to ensure reliable printing while following best practices. The `printready-base.js` file provides modular functions that can be imported and used to generate print-specific content for your web pages.


### Include printready-base.css as a Print Stylesheet
1. Add the following \<link> tag in the \<head> of your HTML file to apply print-specific styles when printing the page:

```html
<link rel="stylesheet" href="/path/to/printready-base.css" media="print">
``` 

2. **Explanation:** The `media="print"` attribute ensures this stylesheet is only applied when the page is printed.

### Include printready-base.js as a JavaScript Module
1. To load the PrintReady base JavaScript file, add this \<script> tag to the \<head> or before the closing \</body> tag:

    ```html
    <script src="/path/to/printready-base.js" type="module"></script>
    ```

2. **Explanation:** The `type="module"` attribute allows you to export the PrintReady ES6 modules without blocking the page rendering process while they are being fetched and executed.

## PrintReady site files
The PrintReady 'site' files include a print-specific stylesheet and a JavaScript file. Use the JavaScript file to implement the 'base' PrintReady functions. Use the CSS file to help style printed content including that generated by the Javascript functions.         

Copy the example CSS and JavaScript files (`printready-site.example.css` and `printready-site.example.js`) from the `/src` folder into your own project. Then, rename these files by removing the ".example" extension.

### Include printready-site.css as a Print Stylesheet
1. The `printready-site.css` file contains styles for components created by the JavaScript functionality and common site elements, such as breadcrumbs. Adjust the selectors in this stylesheet to align with your website's markup.

    ```html
     <link rel="stylesheet" href="/path/to/printready-site.css" media="print">
    ```


### Include printready-site.js as a JavaScript Module
1. Use `printready-site.js` to implement the JavaScript modules from `printready-base.js`. The `type="module"` attribute allows you to export the PrintReady ES6 modules without blocking the page rendering process while they are being fetched and executed.
    
    ```html
    <script src="/path/to/printready-site.js" type="module"></script>
    ```
## JS Module Integration Guide

### Setting Up a Print Button

This is optional. The `initializePrintButton` function enables a print button on the page, making it visible and functional to trigger the print dialog.


#### Usage

1. Place a hidden print button in your HTML or reference an existing one in the next step. 

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

4. **Implementation Tips:** If using an existing button ensure it has the `hidden` attribute and update the `printButtonSelector` to target it. 


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
           `<div class="printready-page-info js-print-only"> 
               ${generatePrintablePageInformation(siteName)}
           </div>`
       );
   });
   ```   
   
2. **Explanation:** The `generatePrintablePageInformation` function creates an HTML snippet with the site name and page title.

3. **Implementation Tips:** 
- The generated HTML strings for page information and links are highly customizable—feel free to modify them to fit your needs or apply additional styles using the `js-print-only` class for print-specific styling. 
- By default the `'h1'` elements content is used for the page title but you can provide a custom selector as the second optional argument to override this.

    ```javascript
    generatePrintablePageInformation(siteName, 'custom-selector')
    ``` 


#### Example Output

   ```html
   <div class="printready-page-info js-print-only"> 
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

3. **Implementation Tips:** 
- Make sure the selectors match your DOM structure, and provide a valid exclude selector to prevent unwanted links from being printed.
- Adjust the include/exclude selectors as needed to account for different page types. For instance, the homepage may have a different structure compared to standard pages. See the implimentation of `generatePrintableLinkList` in `printready-site.example.js`  which uses a `switch` statement to handle these variations.

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

#### Example HTML

```html
   <details class="example-selector">
       <summary>Click to view more</summary>
       <p>Details content here will be visible in print.</p>
   </details>
```

## Development Dependencies
Packages that enhance the development experience but aren't required to impliment the main functionality.

### Live server
The repository includes Live Server for quick testing and viewing changes. It is not required to use PrintReady on your site. To use it, run the following command in your project directory:



```bash
npm run start
```
Then in the browser navigate to the `example` folder. 

### Playwright
Playwright tests are included for further development and preventing regressions in the print-ready JavaScript functionality. It is not required to use PrintReady on your site.