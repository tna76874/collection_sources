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
 
document.addEventListener("DOMContentLoaded", () => {
    filterTable();

    const tableBody = document.getElementById("tableBody");
    tableBody.addEventListener("click", (event) => {
        if (event.target.tagName === "STRONG") {
            const description = event.target.parentElement.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
            if (confirm("Es wird keine Gewähr für den Inhalt der Quelle übernommen. Die folgenden fachlichen Hinweise zu der Quelle werden zur Kenntnis genommen:\n\n" + description)) {
                window.location.href = event.target.parentElement.href;
            }
        }
    });
});
