function getQueryParams() {
    const params = {};
    window.location.search.substring(1).split('&').forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });
    return params;
}
  
function filterTable() {
    const params = getQueryParams();
    const tbody = document.getElementById("tableBody");
    const rows = tbody.getElementsByTagName("tr");
    const filterById = params['id'];
    
    if (filterById) {
        // Hide all rows initially
        for (let i = 0; i < rows.length; i++) {
            rows[i].style.display = "none";
        }
        // Show only the row with the matching data-id
        for (let i = 0; i < rows.length; i++) {
            const rowId = rows[i].getAttribute('data-id');
            if (rowId === filterById) {
                rows[i].style.display = "";
                break;
            }
        }
    } else {
        // Filter by other parameters (fach, klasse, bereich)
        for (let i = 0; i < rows.length; i++) {
            const fach = rows[i].getElementsByTagName("TD")[1].innerText.toLowerCase();
            const klasse = rows[i].getElementsByTagName("TD")[2].innerText.toLowerCase();
            const bereich = rows[i].getElementsByTagName("TD")[3].innerText.toLowerCase();
            
            let display = true;

            if (params['fach'] && !fach.includes(params['fach'].toLowerCase())) {
                display = false;
            }
            if (params['klasse'] && !klasse.includes(params['klasse'].toLowerCase())) {
                display = false;
            }
            if (params['bereich'] && !bereich.includes(params['bereich'].toLowerCase())) {
                display = false;
            }

            rows[i].style.display = display ? "" : "none";
        }
    }

    // check for direct source redirect
    const acceptedParam = params['accepted'];
    if (acceptedParam === 'True' && filterById) {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowId = row.getAttribute('data-id');
            if (rowId === filterById) {
                const sourceLink = row.querySelector('.source-link a');
                if (sourceLink) {
                    window.location.href = sourceLink.getAttribute('href');
                }
                break;
            }
        }
    }
}


function sortTable(column, ascending) {
    const tbody = document.getElementById("tableBody");
    const rows = Array.from(tbody.getElementsByTagName("tr"));
    rows.sort((a, b) => {
        const aText = a.querySelector(`td:nth-child(${column + 1})`).innerText;
        const bText = b.querySelector(`td:nth-child(${column + 1})`).innerText;
        if (ascending) {
            return aText.localeCompare(bText, 'de', { numeric: true });
        } else {
            return bText.localeCompare(aText, 'de', { numeric: true });
        }
    });
    rows.forEach(row => tbody.appendChild(row));
}

function sortMultiLevel() {
    const tbody = document.getElementById("tableBody");
    const rows = Array.from(tbody.getElementsByTagName("tr"));
    rows.sort((a, b) => {
        const fachA = a.querySelector('td:nth-child(2)').innerText;
        const fachB = b.querySelector('td:nth-child(2)').innerText;
        const klasseA = a.querySelector('td:nth-child(3)').innerText;
        const klasseB = b.querySelector('td:nth-child(3)').innerText;
        const bereichA = a.querySelector('td:nth-child(4)').innerText;
        const bereichB = b.querySelector('td:nth-child(4)').innerText;
        const themaA = a.querySelector('td:nth-child(1)').innerText;
        const themaB = b.querySelector('td:nth-child(1)').innerText;

        if (fachA !== fachB) {
            return fachA.localeCompare(fachB, 'de', { numeric: true });
        } else if (klasseA !== klasseB) {
            return klasseA.localeCompare(klasseB, 'de', { numeric: true });
        } else if (bereichA !== bereichB) {
            return bereichA.localeCompare(bereichB, 'de', { numeric: true });
        } else {
            return themaA.localeCompare(themaB, 'de', { numeric: true });
        }
    });
    rows.forEach(row => tbody.appendChild(row));
}

function adjustBodyPadding() {
    // Get the header and footer elements
    var header = document.querySelector('.header');
    var footer = document.querySelector('.footer');
    
    // Get the heights of the header and footer
    var headerHeight = header.offsetHeight + 10;
    var footerHeight = footer.offsetHeight + 5;
    
    // Calculate the total height needed for padding
    var totalHeight = headerHeight + footerHeight;
    
    // Set the body padding-top to the total height
    document.body.style.paddingTop = headerHeight + 'px';
    
    // Set the body padding-bottom to the footer height
    document.body.style.paddingBottom = footerHeight + 'px';
}

function setupInfoPopup() {
    const infoIcons = document.querySelectorAll('.info-icon');
    const infoPopup = document.createElement('div');
    infoPopup.className = 'info-popup';
    document.body.appendChild(infoPopup);

    infoIcons.forEach(icon => {
        icon.addEventListener('mouseenter', event => {
            const reviewedFrom = icon.getAttribute('data-reviewed-from');
            const reviewedOn = icon.getAttribute('data-reviewed-on');
            infoPopup.innerHTML = `<p>Reviewed from: ${reviewedFrom}</p><p>Reviewed on: ${reviewedOn}</p>`;
            const rect = icon.getBoundingClientRect();
            infoPopup.style.top = `${rect.bottom + window.scrollY + 5}px`;
            infoPopup.style.left = `${rect.left + window.scrollX}px`;
            infoPopup.style.display = 'block';
        });

        icon.addEventListener('mouseleave', () => {
            infoPopup.style.display = 'none';
        });

        icon.addEventListener('click', event => {
            event.stopPropagation();
        });
    });
}

function hrefDisclaimer() {
    const tableBody = document.getElementById("tableBody");
    tableBody.addEventListener("click", (event) => {
        if (event.target.tagName === "STRONG") {
            const description = event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
            if (confirm(description)) {
                window.location.href = event.target.parentElement.href;
            }
            event.preventDefault();
        }
    });
}

function tableSorter() {
    const sortableHeaders = document.querySelectorAll("th.sortable");
    sortableHeaders.forEach((header, index) => {
        let ascending = true;
        header.addEventListener("click", () => {
            sortTable(index, ascending);
            ascending = !ascending;
        });
    });
}

function disclaimerPopup() {
    const disclaimer = document.getElementById('disclaimer');
    const acceptDisclaimer = document.getElementById('acceptDisclaimer');
    const declineDisclaimer = document.getElementById('declineDisclaimer');

    if (sessionStorage.getItem('disclaimerAccepted') !== 'true') {
        disclaimer.style.display = 'block';
    } else {
        disclaimer.style.display = 'none';
    }

    acceptDisclaimer.addEventListener('click', () => {
        sessionStorage.setItem('disclaimerAccepted', 'true');
        disclaimer.style.display = 'none';
        });

    declineDisclaimer.addEventListener('click', () => {
        window.location.href = 'https://google.de';
    });
}

function copyIframeToClipboard(sid) {
    var iframeCode = "<iframe id='ivplayer' width='640' height='360' src='" + window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/?id=' + sid + "&accepted=True' style='border:none;'></iframe>";
    navigator.clipboard.writeText(iframeCode);
  }

document.addEventListener("DOMContentLoaded", () => {
    // filter table according to args
    filterTable();

    // sort the table
    sortMultiLevel();

    // ensure header and footer spacings
    adjustBodyPadding();

    // ensure hints on href clicks
    hrefDisclaimer()

    // activate sorting on table heading clicks
    tableSorter()

    // info icon popups
    setupInfoPopup()

    // initial disclaimer popup
    disclaimerPopup()

    // set current year
    document.getElementById("currentYear").textContent = new Date().getFullYear();
});
