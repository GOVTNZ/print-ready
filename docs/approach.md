# Our approach

PrintReady is an open source toolkit that simplifies the implementation of print-friendly web pages for New Zealand government agencies. It provides developers with ready-to-use CSS and JavaScript files that create professional, accessible printed documents while maintaining compliance with NZ Government Web Standards.

## Project Goals
PrintReady aims to:

* **Simplify compliance** with the 'Printable web pages' requirements in the New Zealand Government Web Usability Standard
* **Reduce development effort** by providing pre-built, tested components for print styling
* **Maintain accessibility** standards in both screen and print formats
* **Support** the all-of-government (AoG) community

## Development Philosophy
We follow the principle: "Only print elements that are essential for understanding the page's content or context"

### Embrace Browser Defaults
PrintReady leverages the browser's existing print capabilities rather than fighting against them. We enhance the default browser print stylesheet only where necessary, such as managing page layouts to prevent awkward breaks and maintaining professional formatting.

### Separation of Concerns
The toolkit requires separate print styles from screen styles using CSS media queries. This ensures:

* Print styles only affect printed output
* Screen styles only affect on-screen display
* No interference between the two rendering contexts