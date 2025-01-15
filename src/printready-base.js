// Open inline accordions when printing
export function openDetailsElementsForPrinting( detailsSelector ) {

  let closedDetailsElements;

  window.addEventListener('beforeprint', () => {
    closedDetailsElements = document.querySelectorAll(`${detailsSelector}:not([open])`);
  
    if (closedDetailsElements.length !== 0) {
      closedDetailsElements.forEach(detailsElement => {
        detailsElement.setAttribute('open', '');
      });
    }
  });
  
  window.addEventListener('afterprint', () => {
    if (closedDetailsElements) {
      closedDetailsElements.forEach(detailsElement => {
        detailsElement.removeAttribute('open');
      });
    }
  });
}
  
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

function outputPrintedLinks(linksToPrint) {
  return linksToPrint.map(link => `<li>${link}</li>`).join('');
}

function addReferenceToLink(linkElement, refNum) {
  linkElement.classList.add('js-hasPrintLinkRef');
  linkElement.insertAdjacentHTML('afterend', ` <sup class="js-print-only js-printready-link-reference">[Link: ${refNum}]</sup>`);
}

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
    '/': handleInternalLink,
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

function handleExternalLink(href) {
  return href;
}

function handleInternalLink(href) {
  console.log('in handleInternalLink')
  return null; // Modify if internal links need handling later
}

function handleTelLink(href) {
  const phoneNumber = href.replace('tel:', '').trim();
  return `Phone number: ${phoneNumber}`;
}

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
