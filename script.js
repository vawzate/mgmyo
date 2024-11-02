const itemsPerPage = 1000n;
const totalItems = BigInt("0xfffffffffffffffff") + 1n; // 16^17
let currentPage = 1n;

function padHex(num) {
    return '0'.repeat(47) + num.toString(16).padStart(17, '0');
}

function displayPage(page) {
    const start = (page - 1n) * itemsPerPage;
    const end = start + itemsPerPage > totalItems ? totalItems : start + itemsPerPage;
    let output = '';
    for (let i = start; i < end; i++) {
        output += `${i.toString()}: ${padHex(i)}<br>`;
    }
    document.getElementById('output').innerHTML = output;
    updatePageInfo();
}

function updatePageInfo() {
    const totalPages = (totalItems + itemsPerPage - 1n) / itemsPerPage;
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}

function nextPage() {
    const totalPages = (totalItems + itemsPerPage - 1n) / itemsPerPage;
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
    }
}

function prevPage() {
    if (currentPage > 1n) {
        currentPage--;
        displayPage(currentPage);
    }
}

function findNumber() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    let decimal;
    
    try {
        if (searchInput.startsWith('0x')) {
            decimal = BigInt('0x' + searchInput.substring(2));
        } else if (/^[0-9a-f]+$/.test(searchInput)) {
            decimal = BigInt('0x' + searchInput);
        } else if (/^\d+$/.test(searchInput)) {
            decimal = BigInt(searchInput);
        } else {
            throw new Error('Invalid input');
        }

        if (decimal >= totalItems) {
            alert("Address is out of range");
            return;
        }

        currentPage = (decimal / itemsPerPage) + 1n;
        displayPage(currentPage);
        alert(`Found at page ${currentPage}`);
    } catch (e) {
        alert("Please enter a valid hexadecimal or decimal number");
    }
}

// Initial display
displayPage(currentPage);
