document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const dropdown = document.querySelector('.dropdown');
    const dropdownItems = dropdown.querySelectorAll('li');
    dropdownItems.forEach(function(item) {
        item.style.display = 'block';
    });
    dropdown.style.display = 'block';
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
    searchInput.focus();
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchInput.isSameNode(event.target)) {
            searchInput.focus(); 
        }
    });
});
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