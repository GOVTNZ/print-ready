/**
 * Initializes a print button that triggers the print dialog when clicked.
 * @param {string} buttonSelector - The CSS selector for the print button.
 */
export function initializePrintButton(buttonSelector) {
  const printButton = document.querySelector(buttonSelector);

  if (printButton) {
    printButton.addEventListener('click', (event) => {
      window.print();
      event.preventDefault();
    });
    printButton.hidden = false;
  } else {
    console.warn('Print button not found');
  }
}

/**
 * Generates HTML string containing printable page information.
 * @param {string} name - The name to be displayed in the printable information.
 * @param {string} [pageTitleElement='h1'] - The CSS selector for the page title element.
 * @returns {string} - The HTML string with printable page information.
 */
export function generatePrintablePageInformation(name, pageTitleElement = 'h1') {
  const webpageUrl = window.location.href;
  const pageTitle = document.querySelector(pageTitleElement)?.textContent || 'Untitled Page';

  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const currentDate = new Date().toLocaleDateString('en-GB', options);

  return `<p class="print-info-name"><b>${name}</b></p>
          <p class="print-info-title"><b>Page title:</b> ${pageTitle}</p>
          <p class="print-info-date"><b>Printed:</b> ${currentDate}</p>
          <p class="print-info-url"><b>Printed from:</b> ${webpageUrl}</p>`;
}

/**
 * Generates a list of printable links based on the provided selectors.
 * @param {string} [linksSelector=null] - The CSS selector for the links to be included.
 * @param {string} [excludeLinksSelector=null] - The CSS selector for the links to be excluded.
 * @param {boolean} [externalOnly=false] - Whether to include only external links.
 * @returns {string} - The HTML string with the list of printable links.
 */
export function generatePrintableLinkList(linksSelector = null, excludeLinksSelector = null, externalOnly = false) {
  if (!linksSelector) {
    console.warn('No links selector provided');
    return '';
  }

  const baseUrl = window.location.origin + '/';
  let selectedLinks = document.querySelectorAll(linksSelector);

  if (excludeLinksSelector) {
    selectedLinks = Array.from(selectedLinks).filter(link => !link.matches(excludeLinksSelector));
  }

  const linksToPrint = [];
  let referenceNumber = 1;

  if (!selectedLinks.length) {
    return "";
  }

  selectedLinks.forEach((linkElement) => {
    
    const formattedLink = handleLink(linkElement, externalOnly);
    if (formattedLink) {
      addReferenceToLink(linkElement, referenceNumber);
      linksToPrint.push(formattedLink);
      referenceNumber++;
    }
  });

  return outputPrintedLinks(linksToPrint);
}

/**
 * Outputs the list of printable links as HTML string.
 * @param {Array} linksToPrint - The array of links to be printed.
 * @returns {string} - The HTML string with the list of printable links.
 */
function outputPrintedLinks(linksToPrint) {
  return linksToPrint.map(link => `<li>${link}</li>`).join('');
}

/**
 * Adds a reference number to the link element for printing.
 * @param {Element} linkElement - The link element to which the reference number will be added.
 * @param {number} refNum - The reference number to be added.
 */
function addReferenceToLink(linkElement, refNum) {
  linkElement.classList.add('js-hasPrintLinkRef');
  linkElement.insertAdjacentHTML('afterend', ` <sup class="js-print-only js-printready-link-reference">[Link: ${refNum}]</sup>`);
}

/**
 * Handles the link element and returns the formatted link based on its type.
 * @param {Element} linkElement - The link element to be handled.
 * @param {boolean} externalOnly - Whether to include only external links.
 * @returns {string|null} - The formatted link or null if not applicable.
 */
function handleLink(linkElement, externalOnly) {
  const href = linkElement.href; 
  const baseUrl = window.location.origin;

  if (!href || href.startsWith("#")) return null;

  let isExternalOrSpecialLink = null;

  // Check link is not internal
  if ( !href.startsWith(baseUrl) ) { 
    isExternalOrSpecialLink = true; 
  }
  
  if (externalOnly && !isExternalOrSpecialLink) return null;

  const handlers = {
    'http': handleExternalLink, // this also covers 'https'
    'tel:': handleTelLink,
    'mailto:': handleMailtoLink
  };

  for (const key in handlers) {
    if (href.startsWith(key)) {
      return handlers[key](href);
    }
  }

  return null;
}

/**
 * Handles external links (http/https) and returns the link URL.
 * @param {string} href - The URL of the external link.
 * @returns {string} - The URL of the external link.
 */
function handleExternalLink(href) {
  return href;
}

/**
 * Handles telephone links and returns the formatted phone number.
 * @param {string} href - The URL of the telephone link.
 * @returns {string} - The formatted phone number.
 */
function handleTelLink(href) {
  const phoneNumber = href.replace('tel:', '').trim();
  return `Phone number: ${phoneNumber}`;
}

/**
 * Handles mailto links and returns the formatted email address and subject.
 * @param {string} href - The URL of the mailto link.
 * @returns {string} - The formatted email address and subject.
 */
function handleMailtoLink(href) {
  const [email, query] = href.replace('mailto:', '').split('?');
  let output = `Email: ${email}`;

  if (query) {
    const params = new URLSearchParams(query);
    if (params.has('subject')) {
      output += ` - Subject: ${params.get('subject')}`;
    }
  }

  return output;
}
