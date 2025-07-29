// Importing functions from the 'printready-base' file
import { showAgency, initializePrintButton, showPageInformation, generateListOfPageLinks } from '../thirdparty/printready/src/printready-base.js' // Note: update this path as required. 

// Initialize the DOMContentLoaded event listener to ensure the script runs after the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Initialize print button if it exists on the page. This is fro progressive enhancement and assumes the button is rendered with the 'hidden' html attribute.  
    const printButtonSelector = "#print-page-button"; // Selector for print button - update as needed
    if (document.querySelector(printButtonSelector)) {
        initializePrintButton(printButtonSelector);
    }

    // Insert the agency name at the top of the document (optional, can use a logo instead, see README.md for more details)
    const agencyName = "AGENCY_NAME"; // Replace with the name of your agency when printing.
    document.body.prepend(showAgency(agencyName));

    // Insert printable page information at the bottom of the document (optional, see README.md for more details)
     document.body.appendChild(showPageInformation());

    /* Genrate a list of links */
    // Initialize a variable for the list of links
    let listOfLinks = null;

    // Determine which links to include/exclude based on page type or specific needs
    // A switch statement can be used here to allow for different links to be selected for different types of pages.
    switch (true) {
        // Case for a specific page type (e.g., homepage)
        case document.body.classList.contains('pagetype-home'):
            listOfLinks = generateListOfPageLinks(
                '.homepage-content a', // Selector for links to include
                null,                // No exclusion selector
                true                 // Only include external links
            );
            break;

        // Default case for other page types
        default:
            listOfLinks = generateListOfPageLinks(
                '.page-content a', // Links to include
                '.sidenav a', // Links to exclude
                true // Only include external links, setting to 'false' will also include internal links. Mailto and Tel links are always included, anchor links are always excluded  
            );
            break;
    }

    if (listOfLinks !== null) {
        // Define the printed links section which lists the URLs of the selected links
        // Change this HTML structure if necessery.   
        const printedLinksSection = document.createElement('div');
        printedLinksSection.id = 'js-printready-link-urls';
        printedLinksSection.className = 'print-only';

        const heading = document.createElement('h2');
        heading.textContent = 'Index of page links';

        printedLinksSection.appendChild(heading);
        printedLinksSection.appendChild(listOfLinks);
       
    
        // Define the target element to insert the printed links section after.
        // You can change this to suit your site. 
        let renderTarget = 'YOUR_RENDER_TARGET'; // Set this to your default render target (e.g. renderTarget = '.main-content';)  
    
         // OPTIONAL - You can use a switch statement to have different render targets for particular pagetypes.  
        // EXAMPLE: Set the render target based on the page type
        // if (document.body.classList.contains('pagetype-home')) {
        //     renderTarget = '.homepage-content';
        // }

        // Insert the printed links section after the renderTarget if it exists.
        if (renderTarget !== '' && document.querySelector(renderTarget) !== null) {
            const renderTargetNode = document.querySelector(renderTarget);
            renderTargetNode.parentNode.insertBefore(printedLinksSection, renderTargetNode.nextSibling);
        } else {
            console.warn('No render target found for the printed links section.');
        }
    } 
});
