// Importing functions from the 'printready-base' file
import { showAgency, initializePrintButton, showPageInformation, generateListOfPageLinks } from '../src/printready-base.js' // NOTE: Update this path as required

// Initialize the DOMContentLoaded event listener to ensure the script runs after the page is fully loaded (optional)
document.addEventListener('DOMContentLoaded', () => {

    // Initialize print button if it exists on the page. This is for progressive enhancement and assumes the button is rendered with the 'hidden' html attribute.  
    const printButtonSelector = "#print-page-button"; // Selector for print button - update if your print button has a different HTML ID or class. 
    
    if (document.querySelector(printButtonSelector)) {
        initializePrintButton(printButtonSelector);
    }

    // Insert printable page information at the top of the document (optional, can use a logo instead, see README.md for more details)
    // You can choose to display a print friendly version of your organisations logo instead.
    const agencyName = "Print ready site"; // NOTE: Replace with the name of your site when printing.
    const agencyComponent = showAgency(agencyName); 

    if( agencyComponent !== null ) {
        document.body.prepend(agencyComponent);
    } 
   
    // Insert printable page information at the bottom of the document (optional, see README.md for more details)
    document.body.appendChild(showPageInformation());
  
    /* Generate a list of links */  
    // Initialize a variable for the list of links
    let listOfLinks = null;

    // Determine which links to include/exclude based on page type or specific needs
    // A switch statement is used here to allow for different links to be selected for different types of pages. 
    switch (true) {
        // Example for a specific page type (e.g., homepage)
        /*
        case document.body.classList.contains('pagetype-home'):
            listOfLinks = generateListOfPageLinks(
                '.homepage-content a',  // Links to include
                null,                   // Links to exclude
                true                    // Only include external links
            );
            break;
        */

        // Default case for other page types. If you only have one page type you can set 'listOfLinks' seperately an delete the switch statement   
        // If your site doesn't require different link selections for different pages,  you can assign 'listOfLinks' directly
        // and remove the switch statement.
        default:
            //  NOTE: Replace with your link selectors
            listOfLinks = generateListOfPageLinks(
                '.main-content a', // Links to include
                '.sidenav a', // Links to exclude
                false // Only include external links, setting to 'false' will also include internal links. Mailto and Tel links are always included, anchor links are always excluded  
            );
            break;
    }

    if (listOfLinks !== "" && listOfLinks !== null) {
        
        // Define the printed links section which lists the URLs of the selected links
        // Change this HTML structure if necessary.   
        const printedLinksSection = document.createElement('div');
        printedLinksSection.id = 'js-printready-link-urls';
        printedLinksSection.className = 'print-only';

        const heading = document.createElement('h2');
        heading.textContent = 'Index of page links';

        printedLinksSection.appendChild(heading);
        printedLinksSection.appendChild(listOfLinks);

        // Define the target element to insert the printed links section after.
        // You can change this to suit your site. 
        let renderTarget = '.main-content';
        
        // OPTIONAL – Use a different render target for specific page types if needed. 
        // EXAMPLE: Set the render target based on the (homepage) page type 
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
