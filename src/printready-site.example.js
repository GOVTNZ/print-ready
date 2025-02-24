// Importing functions from the 'printready-base' file
import { showAgency, initializePrintButton, showPageInformation, generatePrintableLinkList } from '../thirdparty/printready/src/printready-base.js' // Note: update this path as required. 

// Initialize the DOMContentLoaded event listener to ensure the script runs after the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Initialize print button if it exists on the page. This is fro progressive enhancement and assumes the button is rendered with the 'hidden' html attribute.  
    const printButtonSelector = "#print-page-button"; // Selector for print button - update as needed
    if (document.querySelector(printButtonSelector)) {
        initializePrintButton(printButtonSelector);
    }

    // Insert the agency name at the top of the document
    const agencyName = "Your site name"; // Replace with the name of your site when printing.
    document.body.insertAdjacentHTML(
        'afterbegin', 
        `${showAgency(agencyName)}`
    );

    // Insert printable page information at the bottom of the document
    document.body.insertAdjacentHTML(
        'beforeend', 
        `${showPageInformation()}`
    );


    
    /* Genrate a list of links */
    // Initialize a variable for the list of links
    let listOfLinks = null;

    // Determine which links to include/exclude based on page type or specific needs
    // A switch statement can be used here to allow for different links to be selected for different types of pages.
    switch (true) {
        // Case for a specific page type (e.g., homepage)
        case document.body.classList.contains('pagetype-home'):
            listOfLinks = generatePrintableLinkList(
                '.homepage-content a', // Selector for links to include
                null,                // No exclusion selector
                true                 // Only include external links
            );
            break;

        // Default case for other page types
        default:
            listOfLinks = generatePrintableLinkList(
                '.page-content a', // Links to include
                '.sidenav a', // Links to exclude
                true // Only include external links, setting to 'false' will also include internal links. Mailto and Tel links are always included, anchor links are always excluded  
            );
            break;
    }

    if (listOfLinks !== null) {
        // Define the printed links section which lists the URLs of the selected links
        // Change this HTML structure if necessery.   
        const printedLinksSection = `<div id="js-printready-link-urls" class="js-print-only">
                                        <h2>Index of page links</h2>
                                        <ol class="js-printready-links-list">${listOfLinks}</ol>
                                     </div>`;
    
        // Define the target element to insert the printed links section before.
        // You can change this to suit your site. 
        // A switch statement is used here to allow for different render targets for different types of pages.
         
        let renderTarget = 'YOUR_RENDER_TARGET'; // Set this to your render target (e.g. renderTarget = '.footer')  
    
        switch (true) {
            // Check for an element on the page that matches the renderTarget selector
            case document.querySelector(renderTarget) !== null:
                renderTarget = document.querySelector(renderTarget);
                break;
            default:
                renderTarget = null
                console.warn('No render target defined for the printed links section.');
                break;
        }
    
        // Insert the printed links section if a render target is found before ('beforebegin') or after ('afterend')' the render target.
        if (renderTarget !== null) {
            renderTarget.insertAdjacentHTML('beforebegin', printedLinksSection);
        }
    } 

});
