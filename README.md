# PrintReady

PrintReady is an optional tool for government agencies, **it is not a mandatory requirement**. 

The PrintReady toolkit simplifies the implementation of print stylesheets that follow good practices. It provides developers with the necessary files and guidance to create print-friendly web pages that align with New Zealand Government Web Standards and deliver an accessible, consistent experience for all users.

This guide provides step-by-step instructions for implementing PrintReady in your website. The tool is open source and welcomes contributions from the all-of-government (AoG) community via GitHub.

## Live Demo
These pages and their assets are in the /example directory. Only the print view changes the screen view is identical.   

Examples:
* [Basic webpage with PrintReady applied](https://govtnz.github.io/print-ready/with-printready.html)
* [Basic webpage without PrintReady](https://govtnz.github.io/print-ready/without-printready.html)

### View the Printed Pages in your browser  

Toggle between Print and Screen Views either by opening the print preview dialog (press `Ctrl + P` or `Command + P` on macOS) or by using your browser's Developer Tools and toggling between Print and Screen rendering.

## Get started
The [PrintReady repository](https://github.com/GOVTNZ/print-ready/) should be  to be **downloaded or cloned** from GitHub, with the files described below then **copied and pasted** into your web project. The instructions assume this method of integration.


### Include the Source Files in Your Webpages
PrintReady consists of Cascading Style Sheet (CSS) and JavaScript (JS) files.  

In the `src` folder there are `base` files:
* printready-base.css
* printready-base.js

and `site` files: 
* printready-site.css
* printready-site.js

The `base` files **should not** be changed. Parts of the `site` files **should be** changed to intergrate with your site structure. 

#### Base files

`printready-base.css` is designed to ensure reliable printing while following best practices. 

`printready-base.js` provides modular functions that can be imported and used to generate print-specific content for your web pages.

#### Site files 
Use the 'site' files to customize CSS styling your site's structure and include the JavaScript functionality you require.


### CSS 

The PrintReady CSS files need to be served with the `media="print"` attribute. 

   ```html
    <link rel="stylesheet" href="/path/to/printready-site.css" media="print">
   ```
**Note:** You can combine the 2 PrintReady CSS files into a single file in a build step.

#### Seperate screen and print styles
All CSS files intended for on-screen display need to be served with the `media="screen"` attribute.

```html
<link rel="stylesheet" href="screen-styles.css" media="screen">
``` 

#### Tayloring the CSS
The  `printready-site.css` file should be edited to match your website's structure.    

[View the CSS Integration Guide](docs/css-website-intergration.md)

### Javascript
Link JavaScript files with `type="module"` to enable ES6 module functionality. Serve the JavaScript files separately.

   ```html
     <script src="/path/to/printready-base.js" type="module"></script>
     <script src="/path/to/printready-site.js" type="module"></script>
   ```

note: Scripts with `type="module"` also behave as if they have the `defer` attribute, so they won't block page rendering while being fetched and are executed only after the HTML is fully parsed.

#### Taylor the Javascript
The `printready-site.js` file should be edited to intergeate with your website structure.

[View the JavaScript Integration Guide](docs/js-website-intergration.md)

## Documentation
* [Our approach](docs/approach.md)
* [CSS Integration Guide](docs/css-website-intergration.md)
* [JavaScript Integration Guide](docs/js-website-intergration.md)
* [Dependencies](docs/dependencies.md) (if you want to view, edit or test PrintReady locally.)
   * [Live Server](docs/dependencies.md#live-server)
   * [Playwright](docs/dependencies.md#playwright)
* [Meeting the NZ Government Web Standards](docs/meeting-the-nz-govt-web-standards.md)
* [Contributing](docs/contributing.md)
* [Changelog](docs/changelog.md)
* [License](LICENSE)

 