document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const dropdown = document.querySelector('.dropdown');
    const dropdownItems = dropdown.querySelectorAll('li');

    // Hide dropdown by default
    dropdown.style.display = 'none';

    // Filter dropdown items based on input
    searchInput.addEventListener('input', function() {
        const filter = searchInput.value.toLowerCase();
        let hasVisibleItems = false;

        dropdownItems.forEach(function(item) {
            const text = item.textContent.toLowerCase();
            if (text.includes(filter)) {
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

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.querySelector('.search-input');

    // Focus the input when the page loads
    searchInput.focus();

    // Add an event listener to the document
    document.addEventListener('click', function(event) {
        // Check if the clicked element is not the input or its parent
        if (!searchInput.contains(event.target) && !searchInput.isSameNode(event.target)) {
            searchInput.focus(); // Refocus the input
        }
    });
});
