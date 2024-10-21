export function initializePrintButton(buttonSelector) {
  console.log("🚀 ~ initializePrintButton ~");
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

  return `<p><b>${name}</b></p>
          <p><b>Page title:</b> ${pageTitle}</p>
          <p><b>Printed:</b> ${currentDate}</p>
          <p><b>Printed from:</b> ${webpageUrl}</p>`;
}

export function generatePrintableLinkList(linksSelector = null, excludeLinksSelector = null) {
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
    const formattedLink = handleLink(linkElement, baseUrl);
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
  linkElement.insertAdjacentHTML('afterend', ` <sup class="js-print-only js-footnote-number">[Link: ${refNum}]</sup>`);

  // TODO: add ability to change where reference is appended? e.g when the link text is in a decendent of the actual link?  
}

function handleLink(linkElement, baseUrl) {
  const href = linkElement.href;

  if (!href || href.startsWith("#") || href === baseUrl) return null;

  const handlers = {
    'http': handleExternalLink,
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
