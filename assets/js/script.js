'use strict';

// Element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
};

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
});

// Testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Modal variables
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Modal toggle function
const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
};

// Add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
        modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

        testimonialsModalFunc();
    });
}

// Add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// Custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const normalizeCategory = function (value) {
    return String(value || "").trim().toLowerCase();
};

// Filter function
const filterFunc = function (selectedValue) {
    const category = normalizeCategory(selectedValue);

    for (let i = 0; i < filterItems.length; i++) {
        const itemCategory = normalizeCategory(filterItems[i].dataset.category);

        if (category === "all" || category === itemCategory) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
};

// Category toggle function
const showCategory = function (selectedValue) {
    const category = normalizeCategory(selectedValue) || "applications";

    filterFunc(category);

    for (let i = 0; i < filterBtn.length; i++) {
        const isMatch = normalizeCategory(filterBtn[i].textContent) === category;
        filterBtn[i].classList.toggle("active", isMatch);

        if (isMatch) {
            selectValue.textContent = filterBtn[i].textContent.trim();
            lastClickedBtn = filterBtn[i];
        }
    }

    history.replaceState(null, null, `#${category}`);
};

let lastClickedBtn = filterBtn[1] || filterBtn[0];

// Check if URL has a hash and apply category filter
const checkHashAndApplyCategory = function () {
    const hashCategory = normalizeCategory(window.location.hash.substring(1));
    const validCategories = ["all", "applications", "playground"];

    if (validCategories.includes(hashCategory)) {
        showCategory(hashCategory);
    } else {
        showCategory("applications");
    }
};

checkHashAndApplyCategory();
window.addEventListener("DOMContentLoaded", checkHashAndApplyCategory);
window.addEventListener("hashchange", checkHashAndApplyCategory);

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
        showCategory(this.textContent);
    });
}

select.addEventListener("click", function () {
    elementToggleFunc(this);
});

for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        elementToggleFunc(select);
        showCategory(this.textContent);
    });
}

// Contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Add event to all form input fields
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        // Check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all navigation links
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
        for (let j = 0; j < pages.length; j++) {
            if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
                pages[j].classList.add("active");
                navigationLinks[j].classList.add("active");
                window.scrollTo(0, 0);

                if (pages[j].dataset.page === "project") {
                    checkHashAndApplyCategory();
                }
            } else {
                pages[j].classList.remove("active");
                navigationLinks[j].classList.remove("active");
            }
        }
    });
}
