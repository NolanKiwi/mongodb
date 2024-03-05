let currentPage = 1;
let currentStorePage = 1;
let currentCustomerPage = 1;
let customerLimit = document.getElementById('limitSelect').value; // Get the initial limit value


document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    currentPage = 1; // Reset to first page for new search
    fetchTransactions();
});

document.getElementById('searchStoresForm').addEventListener('submit', function(event) {
    event.preventDefault();
    currentStorePage = 1; // Reset to first page for new search
    fetchStores();
});


function fetchTransactions() {
    const customerId = document.getElementById('customerId').value;
    // Construct the URL with query parameters for pagination and search
    const url = `http://172.233.84.249:5002/transactions?customer_id=${customerId}&page=${currentPage}&limit=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear previous rows
            data.forEach(transaction => {
                const row = tableBody.insertRow();
                // Adjust these lines to match the structure of your transaction objects
                row.insertCell(0).innerHTML = transaction._id;
                row.insertCell(1).innerHTML = transaction.customer_id;
                row.insertCell(2).innerHTML = transaction.total_amount;
                // Add more cells as needed
            });
        })
        .catch(error => console.error('Error:', error));
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchTransactions();
    }
}

function nextPage() {
    // Increment currentPage. You might want to limit this based on total available pages
    currentPage++;
    fetchTransactions();
}

// Update current page display
function updateCurrentPageDisplay() {
    document.getElementById('currentPage').innerText = currentPage;
}

function fetchStores() {
    const url = `http://172.233.84.249:5002/stores?page=${currentStorePage}&limit=10`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('storesTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear previous rows
            data.forEach(store => {
                const row = tableBody.insertRow();
                // Adjust these lines to match the structure of your store objects
                row.insertCell(0).innerHTML = store._id;
                row.insertCell(1).innerHTML = store.name;
                row.insertCell(2).innerHTML = store.location;
                row.insertCell(3).innerHTML = store.category;
            });
            updateCurrentStorePageDisplay();
        })
        .catch(error => console.error('Error:', error));
}

function previousPageStores() {
    if (currentStorePage > 1) {
        currentStorePage--;
        fetchStores();
    }
}

function nextPageStores() {
    currentStorePage++;
    fetchStores();
}

function updateCurrentStorePageDisplay() {
    document.getElementById('currentStorePage').innerText = currentStorePage;
}


document.getElementById('fetchCustomersForm').addEventListener('submit', function(event) {
    event.preventDefault();
    currentCustomerPage = 1; // Reset to first page for new search
    fetchCustomers();
});

document.getElementById('limitSelect').addEventListener('change', function() {
    customerLimit = this.value; // Update the limit when selection changes
    currentCustomerPage = 1; // Reset to first page due to limit change
    fetchCustomers();
});

function fetchCustomers() {
    const url = `http://172.233.84.249:5002/customers?page=${currentCustomerPage}&limit=${customerLimit}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('customersTable').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // Clear previous rows
            data.forEach(customer => {
                const row = tableBody.insertRow();
                row.insertCell(0).innerHTML = customer._id;
                row.insertCell(1).innerHTML = customer.name;
                //row.insertCell(2).innerHTML = customer.email;
                // Add more cells as needed
                
                // Make the email column as e-mail link
                const emailCell = row.insertCell(2);
                emailCell.innerHTML = `<a href="mailto:${customer.email}">${customer.email}</a>`;

            });
            updateCurrentCustomerPageDisplay();
        })
        .catch(error => console.error('Error:', error));
}

function previousPageCustomers() {
    if (currentCustomerPage > 1) {
        currentCustomerPage--;
        fetchCustomers();
    }
}

function nextPageCustomers() {
    currentCustomerPage++;
    fetchCustomers();
}

function updateCurrentCustomerPageDisplay() {
    document.getElementById('currentCustomerPage').innerText = currentCustomerPage;
}