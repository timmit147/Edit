document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const dropdown = document.querySelector('.dropdown');
    const dropdownItems = dropdown.querySelectorAll('li');

    // Show all items by default on page load
    dropdownItems.forEach(function(item) {
        item.style.display = 'block';
    });

    // Show the dropdown initially
    dropdown.style.display = 'block';

    // Filter dropdown items based on input
    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        let hasVisibleItems = false;

        dropdownItems.forEach(function(item) {
            const text = item.textContent.toLowerCase();
            if (filter === '' || text.includes(filter)) {
                item.style.display = 'block';
                hasVisibleItems = true;
            } else {
                item.style.display = 'none';
            }
        });

        dropdown.style.display = hasVisibleItems ? 'block' : 'none';
    });

    // Navigate to the selected page on click
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const url = item.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });
    });
});

// Focus the input when the page loads
document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('.search-input');

    searchInput.focus();

    // Add an event listener to the document
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchInput.isSameNode(event.target)) {
            searchInput.focus(); // Refocus the input
        }
    });
});

// Handle enter key press to navigate to the URL
document.addEventListener('DOMContentLoaded', () => {
    const dropdownItems = document.querySelectorAll('.dropdown li');

    dropdownItems.forEach(item => {
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                window.location.href = item.getAttribute('data-url');
            }
        });
    });
});
