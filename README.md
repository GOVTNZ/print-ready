# PrintReady

PrintReady is an optional tool for government agencies, **it is not a mandatory requirement**. 

The PrintReady toolkit simplifies the implementation of print stylesheets that follow good practices. It provides developers with the necessary files and guidance to create print-friendly web pages that align with New Zealand Government Web Standards and deliver an accessible, consistent experience for all users.

This guide provides step-by-step instructions for implementing PrintReady in your website. The tool is open source and welcomes contributions from the all-of-government (AoG) community via GitHub.


## Live Demo
These pages and their assets are in the /example directory. Only the print view changes the screen view is identical.   

Examples:
* Basic webpage without PrintReady [TODO link]
* Basic webpage with PrintReady applied [TODO link]

### View the Printed Pages in your browser  

Toggle between Print and Screen Views either by opening the print preview dialog (press `Ctrl + P` or `Command + P` on macOS) or by using your browser's Developer Tools and toggling between Print and Screen rendering.

## Get started
The [PrintReady repository](https://github.com/GOVTNZ/print-ready/) should be  to be **downloaded or cloned** from GitHub, with the files described below then **copied and pasted** into your web project. The instructions below assume this method of integration.

In the `src` folder are `base` and `site` versions or the CSS and JS files. The `base` files **should not** be changed. Parts of the `site` files **should be** changed to intergrate with your site structure.

## Basic usage 
### Include the Source Files in Your Webpages
PrintReady consists of Cascading Style Sheet (CSS) and JavaScript (JS) files  

Link CSS files with the `media="print"` attribute to ensure styles apply only when printing. You can combine the print files in a build step.

In the `src` folder are `base` files:
* printready-base.css
* printready-base.js

and `site` files: 
* printready-site.css
* printready-site.js

The `base` files **should not** be changed. Parts of the `site` files **should be** changed to intergrate with your site structure. 

### CSS 

#### Seperate screen and print styles
All CSS files intended for on-screen display need to be served with the `media="screen"` attribute.

```html
<link rel="stylesheet" href="screen-styles.css" media="screen">
``` 

The PrintReady CSS files need to be served with the `media="print"` attribute. 

   ```html
    <link rel="stylesheet" href="/path/to/printready-site.css" media="print">
   ```
**Note:** You can combine the CSS files into a single file in a build step.

#### Taylor the CSS
The  `printready-site.css` file should be edited to match your website's structure.    

[View the CSS Integration Guide](docs/css-website-intergration.md)

### Javascript
Link JavaScript files with type="module" to enable ES6 module functionality. Serve the JavaScript files separately.

   ```html
     <script src="/path/to/printready-base.js" type="module"></script>
     <script src="/path/to/printready-site.js" type="module"></script>
   ```

#### Taylor the Javascript
The `printready-site.js` file should be edited to intergeate with your website.

[View the JavaScript Integration Guide](docs/js-website-intergration.md)


**[UP TO HERE]**
## Documentation
* The PrintReady approach
* [Meeting the NZ Government Web Standards](docs/meeting-the-nz-govt-web-standards.md)
* [CSS Integration Guide](docs/css-website-intergration.md)
* [JavaScript Integration Guide](docs/js-website-intergration.md)



## Approach [move to /docs] 
PrintReady leverages the browser’s default stylesheet, which is already effective for printed content, and enhances it only where necessary for example, by managing page layouts to prevent awkward breaks and maintain professional formatting.

It embraces the principle of separation of concerns by applying the print styles exclusively for printing while keeping the screen styles only for screen rendering.

It is designed to be flexible, separating core styles from site-specific needs and allowing easy customisation across different websites. 


## Integration Guide

### PrintReady '-base' files
The 'base' files serve as the foundation for creating print-ready pages; 

* The `printready-base.css` file includes well-commented styles designed to ensure reliable printing while following best practices. 

* The `printready-base.js` file provides modular functions that can be imported and used to generate print-specific content for your web pages.

Copy the files `printready-base.css` and `printready-base.js` from the `/src` folder into your project's file structure.


### Include printready-base.css as a Print Stylesheet
The `media="print"` attribute ensures that this stylesheet is applied only when the page is printed. You can combine the `base` and site `CSS` files into a single file — for example, as part of a build step. The name of the file is entirely up to you.

1. Add the following \<link> tag in the \<head> of your HTML file:

```html
<link rel="stylesheet" href="/path/to/printready-base.css" media="print">
``` 

### Include printready-base.js as a JavaScript Module
1. To load the PrintReady base JavaScript file from the `src` folder into your websites file structure.
2. Add the following \<script> tag to the \<head> of your HTML file or before the closing \</body> tag:

    ```html
    <script src="/path/to/printready-base.js" type="module"></script>
    ```

**note:** Scripts with `type="module"` also behave as if they have the `defer` attribute, so they won't block page rendering while being fetched and are executed only after the HTML is fully parsed.

## PrintReady '-site' files
The PrintReady 'site' files let you customize styling and JavaScript functionality to suit your site's structure and requirements. Use the JavaScript file to implement the core PrintReady functions, and the CSS file to style printed content, including elements generated by the JavaScript functions.

Copy the example CSS and JavaScript files (`printready-site.css` and `printready-site.js`) from the `/src` folder into your own project. Then, rename these files by removing the ".example" extension.

### Include printready-site.css as a Print Stylesheet
1. The `printready-site.css` file contains styles for components created by the JavaScript functionality and common site elements, such as breadcrumbs. Adjust the selectors in this stylesheet to align with your website's markup.

    ```html
     <link rel="stylesheet" href="/path/to/printready-site.css" media="print">
    ```

### Include printready-site.js as a JavaScript Module
1. Use `printready-site.js` to implement the JavaScript modules from `printready-base.js`. 
    
    ```html
    <script src="/path/to/printready-site.js" type="module"></script>
    ```

## Install Dependencies [move to /docs] 
This is optional. The files that are integrated into your website are pre-built and ready to use.

## Setup
Install dependencies (requires NPM):

```bash
npm install
```

### Live server
Use Live Server to view the repository in your browser. Run this command:  

```bash
npm run start
```
Then in the browser navigate to the `/example` folder to view the demo pages.

### Playwright
Playwright tests are included for further development and preventing regressions in the print-ready JavaScript functionality. They are **not needed** to use PrintReady on your site.

To run the tests (after running `npm install`) navigate to the Print ready folder and run the following command in the terminal:

```bash
npx playwright install
```

Then run this command to run the tests 

```bash
npx playwright test
```
