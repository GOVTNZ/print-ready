/**
 * Initializes a print button that triggers the print dialog when clicked.
 * @param {string} buttonSelector - The CSS selector for the print button.
 */
export function initializePrintButton(buttonSelector) {
  const printButton = document.querySelector(buttonSelector);

  if (printButton) {

    if (typeof window.print === 'function') {
      printButton.addEventListener('click', (event) => {
        window.print();
        event.preventDefault();
      });
      printButton.hidden = false;
    } else {
      console.error('window.print is not available in this environment.');
    }

  } else {
    console.warn('Print button not found');
  }
}


/**
 * Creates and returns a DOM element representing agency information for printing.
 * @param {string} agency - The name to be displayed in the printable information.
 * @returns {HTMLElement} - A DOM element containing the agency information.
 */
export function showAgency(agency) {
  const container = document.createElement('div');
  container.className = 'printready-agency print-only';

  const paragraph = document.createElement('p');
  paragraph.className = 'print-info-agency';

  const bold = document.createElement('b');
  bold.textContent = agency;

  paragraph.appendChild(bold);
  container.appendChild(paragraph);

  return container;
}


/**
 * Creates and returns a DOM element containing printable page information.
 * Uses the document's <title> tag for the page title.
 * @returns {HTMLElement} - A DOM element with page title, current date, and page URL for printing.
 */
export function showPageInformation() {
  const webpageUrl = window.location.href;
  const pageTitle = document.title || 'Untitled Page';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const currentDate = new Date().toLocaleDateString('en-GB', options);

  if (pageTitle === 'Untitled Page') {
    console.warn('No page title found');
  }

  const container = document.createElement('div');
  container.className = 'printready-page-info print-only';

  const titlePara = document.createElement('p');
  titlePara.className = 'print-info-title';
  titlePara.innerHTML = `<b>Page title:</b> ${pageTitle}`;

  const datePara = document.createElement('p');
  datePara.className = 'print-info-date';
  datePara.innerHTML = `<b>Printed:</b> ${currentDate}`;

  const urlPara = document.createElement('p');
  urlPara.className = 'print-info-url';
  urlPara.innerHTML = `<b>Printed from:</b> ${webpageUrl}`;

  container.appendChild(titlePara);
  container.appendChild(datePara);
  container.appendChild(urlPara);

  return container;
}


/**
 * Generates a list of printable links.
 * @param {string} [linksSelector=null] - The CSS selector for the links to be included.
 * @param {string} [excludeLinksSelector=null] - The CSS selector for the links to be excluded.
 * @param {boolean} [externalOnly=false] - Whether to  only include external links.
 * @returns {string} - The HTML string with the list of printable links.
 */
export function generateListOfPageLinks(
  linksSelector = null,
  excludeLinksSelector = null,
  externalOnly = false
) {
  if (!linksSelector) {
    console.warn('No links selector provided');
    return null;
  }

  const baseUrl = window.location.origin + '/';
  let selectedLinks = document.querySelectorAll(linksSelector);

  if (excludeLinksSelector) {
    selectedLinks = Array.from(selectedLinks).filter(link => !link.matches(excludeLinksSelector));
  }

  if (!selectedLinks.length) {
    return null;
  }

  const linksToPrint = [];
  let referenceNumber = 1;

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
  const ol = document.createElement('ol');
  ol.className = 'js-printready-links-list';

  linksToPrint.forEach(link => {
    const li = document.createElement('li');
    li.textContent = link;
    ol.appendChild(li);
  });

  return ol;
}



/**
 * Adds a reference number to the link element for printing.
 * @param {Element} linkElement - The link element to which the reference number will be added.
 * @param {number} refNum - The reference number to be added.
 */
function addReferenceToLink(linkElement, refNum) {
  linkElement.classList.add('js-hasPrintLinkRef');

  const sup = document.createElement('sup');
  sup.className = 'print-only js-printready-link-reference';
  sup.textContent = `[Link: ${refNum}]`;

  linkElement.insertAdjacentElement('afterend', sup);
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
