// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Data ---
    // Replace with your actual paper data. Use consistent lowercase for filter values.
    const papers = [
        { year: "2022", subject: "accounting", medium: "english", title: "GCE A/L Accounting 2022", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        { year: "2022", subject: "economics", medium: "english", title: "GCE A/L Economics 2022", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        { year: "2022", subject: "accounting", medium: "sinhala", title: "GCE A/L ගිණුම්කරණය 2022", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        { year: "2021", subject: "ict", medium: "english", title: "GCE A/L ICT 2021", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        { year: "2021", subject: "bs", medium: "tamil", title: "GCE A/L வணிகக் கல்வி 2021", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        { year: "2021", subject: "economics", medium: "sinhala", title: "GCE A/L ආර්ථික විද්‍යාව 2021", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        { year: "2020", subject: "accounting", medium: "english", title: "GCE A/L Accounting 2020", paperLink: "https://drive.google.com/file/d/1VUGE26jnTojIjBsuZc0Coq7uSdmYa2KV/view?usp=sharing", markingSchemeLink: "https://drive.google.com/file/d/1VUGE26jnTojIjBsuZc0Coq7uSdmYa2KV/view?usp=sharing", previewLink: "https://drive.google.com/file/d/1VUGE26jnTojIjBsuZc0Coq7uSdmYa2KV/view?usp=sharing" },
        { year: "2020", subject: "ict", medium: "english", title: "GCE A/L ICT 2020", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        { year: "2020", subject: "bs", medium: "sinhala", title: "GCE A/L ව්‍යාපාර අධ්‍යයනය 2020", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        { year: "2019", subject: "economics", medium: "tamil", title: "GCE A/L பொருளியல் 2019", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        { year: "2019", subject: "ict", medium: "sinhala", title: "GCE A/L තොරතුරු තාක්ෂණය 2019", paperLink: "#", markingSchemeLink: "#", previewLink: "#" },
        // Add many more papers here...
    ];

    // --- DOM Elements ---
    const yearFilter = document.getElementById('year-filter');
    const subjectFilter = document.getElementById('subject-filter');
    const mediumFilter = document.getElementById('medium-filter');
    const papersGrid = document.getElementById('papers-grid');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    const loadingIndicator = document.getElementById('loading-indicator');
    const noResultsMessage = document.querySelector('.no-results-message');
    const copyrightYearSpan = document.getElementById('copyright-year');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavUl = document.querySelector('.main-nav ul');


    // --- Functions ---

    // Populate filter dropdowns dynamically
    function populateFilters() {
        const years = [...new Set(papers.map(p => p.year))].sort((a, b) => b - a); // Sort descending
        const subjects = [...new Set(papers.map(p => p.subject))].sort();
        const mediums = [...new Set(papers.map(p => p.medium))].sort();

        populateSelect(yearFilter, years);
        populateSelect(subjectFilter, subjects);
        populateSelect(mediumFilter, mediums);
    }

    // Helper to populate a select element
    function populateSelect(selectElement, options) {
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            // Capitalize first letter for display
            opt.textContent = option.charAt(0).toUpperCase() + option.slice(1);
            selectElement.appendChild(opt);
        });
    }

    // Create HTML for a single paper card
    function createPaperCard(paper) {
        // Basic placeholder links if none provided
        const pLink = paper.paperLink && paper.paperLink !== '#' ? paper.paperLink : 'javascript:void(0);';
        const mLink = paper.markingSchemeLink && paper.markingSchemeLink !== '#' ? paper.markingSchemeLink : 'javascript:void(0);';
        const preview = paper.previewLink && paper.previewLink !== '#' ? paper.previewLink : 'javascript:void(0);';

        const card = document.createElement('div');
        card.classList.add('paper-card');
        card.innerHTML = `
            <h3>${paper.title}</h3>
            <div class="meta">
                <span class="year"><i class="fas fa-calendar-alt"></i> ${paper.year}</span>
                <span class="subject"><i class="fas fa-book"></i> ${paper.subject}</span>
                <span class="medium"><i class="fas fa-language"></i> ${paper.medium}</span>
            </div>
            <div class="actions">
                <a href="${pLink}" target="_blank" class="download-link" ${pLink === 'javascript:void(0);' ? 'style="opacity:0.5; cursor:not-allowed;"' : ''}>
                    <i class="fas fa-download"></i> Paper
                </a>
                <a href="${mLink}" target="_blank" class="marking-scheme-link" ${mLink === 'javascript:void(0);' ? 'style="opacity:0.5; cursor:not-allowed;"' : ''}>
                    <i class="fas fa-check-circle"></i> Marking
                </a>
                <a href="${preview}" target="_blank" class="preview-link" ${preview === 'javascript:void(0);' ? 'style="opacity:0.5; cursor:not-allowed;"' : ''}>
                     <i class="fas fa-eye"></i> Preview
                 </a>
            </div>
        `;
        return card;
    }

    // Display papers based on current filters
    function displayPapers() {
        // Show loading indicator
        loadingIndicator.style.display = 'block';
        papersGrid.innerHTML = ''; // Clear previous results
        noResultsMessage?.remove(); // Remove 'no results' message if it exists

        const selectedYear = yearFilter.value;
        const selectedSubject = subjectFilter.value;
        const selectedMedium = mediumFilter.value;

        // Simulate network delay/processing time
        setTimeout(() => {
            const filteredPapers = papers.filter(paper => {
                return (
                    (selectedYear === "" || paper.year === selectedYear) &&
                    (selectedSubject === "" || paper.subject === selectedSubject) &&
                    (selectedMedium === "" || paper.medium === selectedMedium)
                );
            });

            loadingIndicator.style.display = 'none'; // Hide loading indicator

            if (filteredPapers.length > 0) {
                filteredPapers.forEach(paper => {
                    papersGrid.appendChild(createPaperCard(paper));
                });
            } else {
                papersGrid.innerHTML = '<p class="no-results-message"><i class="fas fa-exclamation-circle"></i> No papers found matching your criteria. Try adjusting the filters.</p>';
            }
        }, 500); // 500ms delay simulation
    }

    // Reset all filters to default
    function resetFilters() {
        yearFilter.value = "";
        subjectFilter.value = "";
        mediumFilter.value = "";
        displayPapers(); // Display all papers (or initial state)
    }

    // Set current year in footer
    function setCopyrightYear() {
        if (copyrightYearSpan) {
            copyrightYearSpan.textContent = new Date().getFullYear();
        }
    }

    // Toggle mobile navigation
    function toggleMobileNav() {
         mainNavUl?.classList.toggle('active');
         // Optional: Change icon on toggle
         const icon = navToggle.querySelector('i');
         if (icon) {
             icon.classList.toggle('fa-bars');
             icon.classList.toggle('fa-times'); // Change to X icon when open
         }
    }

    // --- Event Listeners ---
    applyFiltersBtn.addEventListener('click', displayPapers);
    resetFiltersBtn.addEventListener('click', resetFilters);
    navToggle.addEventListener('click', toggleMobileNav);

    // --- Initial Setup ---
    populateFilters();
    setCopyrightYear();
    // Optionally, display all papers initially or wait for filter application
    // displayPapers(); // Uncomment this if you want to show all papers on load
});// --- Add these inside the 'DOMContentLoaded' listener ---

// --- Feedback Form Elements ---
const feedbackForm = document.getElementById('feedback-form');
const feedbackStatus = document.getElementById('feedback-status');
const feedbackName = document.getElementById('feedback-name');
const feedbackEmail = document.getElementById('feedback-email');
const feedbackType = document.getElementById('feedback-type');
const feedbackMessage = document.getElementById('feedback-message');


// --- Feedback Form Functions ---

function handleFeedbackSubmit(event) {
    event.preventDefault(); // Prevent default page reload

    // Basic validation check (though 'required' helps)
    if (!feedbackType.value || !feedbackMessage.value.trim()) {
        showFeedbackStatus("Please fill in all required fields.", "error");
        return;
    }

    const formData = {
        name: feedbackName.value.trim(),
        email: feedbackEmail.value.trim(),
        type: feedbackType.value,
        message: feedbackMessage.value.trim(),
        submittedAt: new Date().toISOString()
    };

    // Show sending status
    showFeedbackStatus("Sending your feedback...", "sending"); // You might want a specific 'sending' style

    // ** SIMULATE SUBMISSION **
    // In a real application, you would send `formData` to your server here using fetch()
    console.log("Feedback Submitted (Simulated):", formData);

    setTimeout(() => {
        // Simulate success
        showFeedbackStatus("Thank you for your feedback! We appreciate your input.", "success");
        feedbackForm.reset(); // Clear the form fields

        // Optional: Hide the success message after a few seconds
        setTimeout(() => {
            feedbackStatus.style.display = 'none';
            feedbackStatus.className = 'form-message'; // Reset classes
        }, 5000); // Hide after 5 seconds

    }, 1500); // Simulate 1.5 second network delay
}

function showFeedbackStatus(message, type = "info") { // type can be 'success', 'error', 'sending', 'info'
    if (feedbackStatus) {
        feedbackStatus.textContent = message;
        feedbackStatus.className = 'form-message'; // Reset classes first
        if (type === 'success' || type === 'error') {
             feedbackStatus.classList.add(type);
        }
         // Add specific class for 'sending' if needed, e.g., feedbackStatus.classList.add('sending');
        feedbackStatus.style.display = 'block';
    } else {
        console.warn("Feedback status element not found!");
    }
}

// --- Add Feedback Form Event Listener ---
if (feedbackForm) {
    feedbackForm.addEventListener('submit', handleFeedbackSubmit);
} else {
    console.warn("Feedback form element not found!");
}

// --- End of added code for feedback form ---