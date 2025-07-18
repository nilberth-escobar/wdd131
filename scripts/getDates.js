// JavaScript to set dynamic dates in the footer
        document.addEventListener('DOMContentLoaded', (event) => {
            // Set the current year
            const yearSpan = document.getElementById('currentyear');
            const currentYear = new Date().getFullYear();
            yearSpan.textContent = currentYear;

            // Set the last modified date
            const lastModifiedParagraph = document.getElementById('lastModified');
            const lastModifiedDate = document.lastModified;
            lastModifiedParagraph.textContent = `Last Modification: ${lastModifiedDate}`;
        });