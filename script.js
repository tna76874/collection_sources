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
    const table = document.getElementById("materialTable");
    const tbody = document.getElementById("tableBody");
    const rows = tbody.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
      const fach = rows[i].getElementsByTagName("TD")[1].innerText.toLowerCase();
      const klasse = rows[i].getElementsByTagName("TD")[2].innerText.toLowerCase();
      let display = true;
      if (params['fach'] && !fach.includes(params['fach'].toLowerCase())) {
        display = false;
      }
      if (params['klasse'] && !klasse.includes(params['klasse'].toLowerCase())) {
        display = false;
      }
      rows[i].style.display = display ? "" : "none";
    }
  }

  function sortTable(n) {
    const table = document.getElementById("materialTable");
    let switching = true;
    let dir = "asc";
    let switchcount = 0;
    while (switching) {
      switching = false;
      const rows = table.rows;
      for (let i = 1; i < (rows.length - 1); i++) {
        let shouldSwitch = false;
        const x = rows[i].getElementsByTagName("TD")[n];
        const y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir === "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount === 0 && dir === "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    filterTable();
  });