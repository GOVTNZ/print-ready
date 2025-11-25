// Importing functions from the 'printready-base' file
import { showAgency, initializePrintButton, showPageInformation, generateListOfPageLinks } from './printready-base.js';

// Initialize the DOMContentLoaded event listener to ensure the script runs after the page is fully loaded (optional)
document.addEventListener('DOMContentLoaded', () => {

    // Initialize print button if it exists on the page. This is for progressive enhancement and assumes the button is rendered with the 'hidden' html attribute.  
    const printButtonSelector = "#print-page-button"; // Selector for print button - update if your print button has a different HTML ID or class. 
    initializePrintButton(printButtonSelector);

    // Insert printable page information at the top of the document (optional, can use a logo instead, see README.md for more details)
    // You can choose to display a print friendly version of your organisations logo instead.
    const agencyName = "PrintReady Example Site"; // Replace with the name of your site when printing.
    const agencyComponent = showAgency(agencyName); 

    if( agencyComponent !== null ) {
        document.body.prepend(showAgency(agencyName));
    } 
   
    // Insert printable page information at the bottom of the document (optional, see README.md for more details)
    document.body.appendChild(showPageInformation());
  
    // Initialize a variable for the list of links
    const includeSelectors = '.main-content a'; // CSS selectors used to define the **initial collection** of links.
    const excludeSelectors = '.sidenav a'; // CSS selectors used to **exclude** links ONLY from the **initial collection** above. Value can be "null" or ''. 
    const onlyShowExternalLinks = false; // If true, restricts the final list to external links only

    const listOfLinks = generateListOfPageLinks( includeSelectors, excludeSelectors, onlyShowExternalLinks);

    if (listOfLinks !== "" && listOfLinks !== null) {
        // Define the printed links section which lists the URLs of the selected links
        // You can change this HTML structure if necessery.   
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
        
        // OPTIONAL – Specify different render target for specific page types in a conditional statement (e.g. if/else or switch)

        // Insert the printed links section after the renderTarget if it exists.
        if (renderTarget !== '' && document.querySelector(renderTarget) !== null) {
            const renderTargetNode = document.querySelector(renderTarget);
            renderTargetNode.parentNode.insertBefore(printedLinksSection, renderTargetNode.nextSibling);
        } else {
            console.warn('No render target found for the printed links section.');
        }

    }
});
