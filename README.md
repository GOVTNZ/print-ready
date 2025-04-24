# PrintReady

## Status :  **Currently in Alpha. Use at your own risk.**

## Introduction

PrintReady is an optional tool for government agencies, not a mandatory requirement. It helps implement consistent, accessible print formatting for websites. By using PrintReady, agencies can ensure their printed web content provides a consistent experience across government websites while meeting the relevant NZ Government Web Standards;

The PrintReady toolkit simplifies the implementation of print stylesheets that follow good practices. It provides developers with the necessary files and guidance to create print-friendly pages that align with New Zealand Government Web Standards and deliver an accessible experience for all users.

This guide provides step-by-step instructions for implementing PrintReady in your website. The tool is open source and welcomes contributions from the All-of-Government (AoG) community via GitHub.

## Approach  
PrintReady's print stylesheet approach focuses on leveraging the browser's default stylesheet, which is already effective for printed content, enhancing it only when necessary.  

It preserves important context by displaying URLs and full titles when printed, while managing page layouts to prevent awkward breaks and maintain professional formatting.  

This implementation embraces the principle of separation of concerns by applying the print stylesheets exclusively for printing and the screen stylesheets only for screen rendering.

It is designed to be flexible, separating core styles from site-specific needs and allowing easy customization across different website structures.

### Meeting the NZ Government Web Standards
Integrating Print Ready into your website should ensure compliance with the following print-specific New Zealand Government Web Standards;

From [Web Usability Standard 1.4, 3.3 in the 'Printable web pages' section](https://www.digital.govt.nz/standards-and-guidance/nz-government-web-standards/web-usability-standard-1-4#printable-web-pages)

3.3.1 The main content of each web page in its current state must be printable on A4 paper, except for inactive web pages.

3.3.2 Printed web pages must include at least one instance of the Mandated Organisation’s name or logo.

3.3.3 Printed web pages should not include the following web content:
- primary content navigation
- secondary content navigation
- persistent search form
- decorative elements.

3.3.4 A web page’s text content should be printable by default as black text on a white background.

From [Web Standards effective from March 2025 in the 'Printable pages' section](https://www.digital.govt.nz/standards-and-guidance/nz-government-web-standards/new-web-standards-for-march-2025#printable-pages)

- Printed web pages must include at least 1 instance of the mandated organisation’s name or logo


## Quick Start Summary

### Download the repository
You can simply download the [Print ready repository](https://github.com/GOVTNZ/print-ready/) as a ZIP file or Clone it using Git  



### Install Dependencies and view the Example webpage  

1. Open the Print ready folder and run the following command in the terminal:

```bash
npm install
```

2. To open the repository folder in a browser (using [Live Server](https://www.npmjs.com/package/live-server)) run:
```bash
npm run start
```
Note this opens `index.html` in the `example` folder.

### View the Printed Page in the browser  

Toggle between Print and Screen Views either by opening the print dialog (press `Ctrl + P` or `Command + P` on macOS) or by using your browser's Developer Tools and toggling between Print and Screen rendering.

Note that the section at the top of the page and the 'Index of page links' section at the bottom of the example page are dynamically injected using JavaScript.



## Integration Guide
This repository is intended to be **downloaded or cloned** from GitHub, with the files described below then **copied and pasted** into your web project. The instructions below assume this method of integration.

This section explains how to integrate PrintReady into your website to optimize page layouts and styling specifically for print output. 

In the `src` folder are `base` and `site` versions or the CSS and JS files. The `base` files **should not** be changed. Parts of the `site` files **should be** changed to intergrate with your site structure.

### Include the Source Files in Your Webpages  

1. To integrate the files from the `src` folder of the PrintReady repository into your webpages:
    * Link CSS files with the `media="print"` attribute to ensure styles apply only when printing. You can combine the print files in a build step.
    * Link JavaScript files with `type="module"` to enable ES6 module functionality. Keep the JavaScript files separate.
2. Edit `printready-site.example.css` and `printready-site.example.js` to match your website's structure. 
   * Remove the `.example` part of the filename after integrating the files into your site structure.


---

## Seperate screen and print styles
Make sure on your webpages all CSS files intended for on-screen display are served with the `media="screen"` attribute.

```html
<link rel="stylesheet" href="screen-styles.css" media="screen">
``` 

## PrintReady '-base' files
The 'base' files serve as the foundation for creating print-ready pages. The `printready-base.css` file includes well-commented styles designed to ensure reliable printing while following best practices. The `printready-base.js` file provides modular functions that can be imported and used to generate print-specific content for your web pages.

Include the example CSS and JavaScript files (`printready-base.css` and `printready-base.js`) from the `/src` folder into your own project


### Include printready-base.css as a Print Stylesheet
1. Include the print-ready base files from the `src` folder into your websites file structure.  
2. Add the following \<link> tag in the \<head> of your HTML file:

```html
<link rel="stylesheet" href="/path/to/printready-base.css" media="print">
``` 
**Note:**  
- The `media="print"` attribute ensures this stylesheet is only applied when the page is printed.
- You can combine the `base` and `site` CSS files together into one file, for example as part of a build step. 


### Include printready-base.js as a JavaScript Module
1. To load the PrintReady base JavaScript file from the `src` folder into your websites file structure.
2. Add the following \<script> tag to the \<head> of your HTML file or before the closing \</body> tag:

    ```html
    <script src="/path/to/printready-base.js" type="module"></script>
    ```

**Note:** The `type="module"` attribute allows you to export the PrintReady ES6 modules without blocking the page rendering process while they are being fetched and executed.

## PrintReady '-site' files
The PrintReady 'site' files let you customize styling and JavaScript functionality to suit your site's structure and requirements. Use the JavaScript file to implement the core PrintReady functions, and the CSS file to style printed content, including elements generated by the JavaScript functions.

Include the example CSS and JavaScript files (`printready-site.example.css` and `printready-site.example.js`) from the `/src` folder into your own project. Then, rename these files by removing the ".example" extension.

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

## CSS Integration Guide
The CSS rules include explanatory comments and most rules do not need modification. However, you will need to:

1. Replace `BREADCRUMBS` with your site's CSS selector for breadcrumbs. 

2. Optionally specify which images appear in print view. By default, all images are hidden from printed pages, but you can override this behavior by specifying which images should be displayed by replacing `IMAGES_TO_SHOW` in the site CSS file with appropriate CSS selectors for your website.

3. Specify which elements should be hidden when printing. This requires replacing `INSERT_ELEMENTS_TO_HIDE` in the `site` CSS file with the appropriate CSS selectors.

### To determine what to hide:

1. Review each page type and component in your website
2. Apply this principle: "Only print elements that are essential for understanding the page's content or context"

Common elements to hide include:

- Site navigation
- Headers and footers
- Interactive elements (like toggle buttons on accordions)
 
In some cases, you may need to hide entire sections, while in others, you might only need to hide specific interactive elements within a component.

### Implimenting the 'print-only' class
If needed you can also specify HTML elements that only show in printed output by adding the `print-only` class to them. 

You would then need to include the following CSS rule in your **screen** stylesheet: 

```CSS
.print-only { display: none; }     
```

### Using your organisations's logo
Web standards mandate the display of either the agency name or logo. If using the logo, place it at the beginning of the `<body>` section. To ensure the logo is visible only in print view and hidden on screen, you could apply the `.print-only` class to the logo's `<img>` element. 
```html
<img class="print-only" ...>
```


## Javascript Integration Guide

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
        if (document.querySelector(printButtonSelector)) {
            initializePrintButton(printButtonSelector);
        }
   });
   ```   
   
3. **Explanation:** The function checks if the button exists, adds a `click` event to trigger printing, and makes it visible.

4. **Implementation Tips:** If using an existing button ensure it has the `hidden` attribute and update the `printButtonSelector` variable to target it.


### Displaying Agency name for Printing

The `showAgency` function generates an HTML snippet with the agency name for the print view.

#### Displaying your organisations logo instead

You can display a print friendly version of your organisations logo at the top of the page instead of using the `showAgency` function. 
[See instructions](#using-your-organisations-logo).
   

#### Usage

1. Add a container in your HTML or inject it via JavaScript:

   ```javascript
   import { showAgency } from 'path/to/printready-base.js';

   const agencyName = "AGENCY_NAME";
    document.body.prepend(showAgency(agencyName));
   ```   
   
2. **Explanation:** It is a web standards requirement to display either the agency name or logo. If you are diaplaying the logo then this is optional. 

#### Example Output

   ```html
   <div class="printready-agency js-print-only">
        <p class="print-info-agency"><b>AGENCY_NAME</b></p>
    </div>
   ```


### Displaying Page Information for Printing [TODO:  STILL NEEDED?]

The `showPageInformation` function generates the page title, current date, and URL for the print view.

#### Usage

1. Add a container in your HTML or inject it via JavaScript:

   ```javascript
   import { showPageInformation } from 'path/to/printready-base.js';
    
   document.body.insertAdjacentHTML(
       'beforeend', 
       `${showPageInformation()}`
   );
   ```   
   
   
2. **Explanation:** The `showPageInformation` function creates an HTML snippet with the page title, todays date and the page URL. The page title and page URL are a ?web standards requirement? [is this covered by default print footer].

3. **Implementation Tips:** 
- By default the `'h1'` elements content is used for the page title but you can provide a custom selector as the second optional argument to override this.

    ```javascript
    showPageInformation(siteName, 'custom-selector')
    ``` 

#### Example Output [TODO: update if keeping, splitting into start and end of page]

   ```html
   <div class="printready-page-info js-print-only"> 
       <p><b>Page title:</b> Example Title</p>
       <p><b>Printed:</b> 11 November 2024</p>
       <p><b>Printed from:</b> https://example.com/page</p>
   </div>
   ```

### Generating a Printable Link List
This is not a web standard but it is good practice.  The URLs of links to external websites are included as footnotes in a special "Links" section at the end of the printed page. This is primarily to provide context and help readers know which website a link goes to, since hyperlinks do not work in print. They are not printed immediately following the link text to avoid reducing readability.

By default the URLs of links to other pages on the same site are not included because the context for those links is that same website. Not printing URLS of links to the same site also reduces the number of URLs printed. Internal link can be included by setting the third argument `externalOnly` in `generateListOfPageLinks` to `false`.      

#### Usage

1. Add the following code to generate and insert the list of links:

```javascript
import { generateListOfPageLinks } from 'path/to/printready-base.js';

document.addEventListener('DOMContentLoaded', () => {
    const linkList = generateListOfPageLinks(
        '.page-content a',   // Example selector for links to include
        '.sidenav a',         // Example selector for links to exclude
        true                  // Set to 'true' to only include external links
    );  
});
```
2. Set `YOUR_RENDER_TARGET` to the CSS selector where you want the page links to appear on the page.

```javascript
let renderTarget = 'YOUR_RENDER_TARGET'; // Set this to your render target   
```
3. The links will be inserted after the render target.

4. **Explanation:** This function filters links based on provided selectors and outputs them in a format suitable for printing. It includes email, phone, and external links by default. 

5. **Implementation Tips:** 
- Make sure the selectors match your DOM structure, and provide a valid exclude selector to prevent unwanted links from being printed.
- Adjust the include/exclude selectors as needed to account for different page types. For instance, the homepage may have a different structure compared to standard pages. See the implimentation of `generateListOfPageLinks` in `printready-site.example.js`  which uses a conditional statement to handle these variations.

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

## Development Dependencies
Packages that enhance the development experience but aren't required to impliment the main functionality.

### Live server
The repository includes Live Server for quick testing and viewing changes. It is not required to use PrintReady on your site. To use it, run the following command in your project directory:

```bash
npm run start
```
Then in the browser navigate to the `example` folder to view an example page.

### Playwright
Playwright tests are included for further development and preventing regressions in the print-ready JavaScript functionality. These are **not required** to use PrintReady on your site.

To run the tests (after running `npm install`)

1. Navigate to the Print ready folder and run the following command in the terminal:

```bash
npx playwright install
```

2. Then run the following command in the terminal to execute the tests 

```bash
npx playwright test
```