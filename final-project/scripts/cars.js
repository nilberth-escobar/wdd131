
(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        // --- 1. Data: Array of Objects ---
        
        const vehicles = [
            { id: 1, name: 'Mercedes-Benz S-Class', category: 'Luxury', price: 159, image: './images/pexels-mikebirdy-26691312.jpg' },
            { id: 2, name: 'BMW 3 Series', category: 'Luxury', price: 89, image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=1964' },
            { id: 3, name: 'Lamborghini Huracan', category: 'Sports', price: 399, image: './images/pexels-nicholas-espinosa-249812770-15063615.jpg' },
            { id: 4, name: 'Porsche 911', category: 'Sports', price: 249, image: './images/porsche-5449102_1280.jpg' },
            { id: 5, name: 'Toyota Camry', category: 'Economy', price: 45, image: './images/toyota_camry.jpg' },
            { id: 6, name: 'Honda Civic', category: 'Economy', price: 39, image: './images/honda_civic.jpg' },
            { id: 7, name: 'Ford Explorer', category: 'SUV', price: 79, image: './images/ford_explorer-suv.jpg' },
            { id: 8, name: 'Chevrolet Tahoe', category: 'SUV', price: 65, image: './images/chevrolette_tahoe.jpg' },
        ];

        // --- 2. DOM Selections ---
        
        const vehicleListingsContainer = document.getElementById('vehicle-listings');
        const rentalForm = document.getElementById('rental-form');
        const selectedVehicleInput = document.getElementById('selected-vehicle');
        const formMessageContainer = document.getElementById('form-message');

        /**
         * Displays vehicle listings on the page.
         */
        function displayVehicles() {
            if (!vehicleListingsContainer) return;

            vehicleListingsContainer.innerHTML = ''; // DOM Modification
            // Array Method: forEach
            vehicles.forEach(vehicle => {
                // Template Literals used exclusively for this string building.
                const cardHTML = `
                    <article class="vehicle-card" data-id="${vehicle.id}">
                        <img src="${vehicle.image}" alt="${vehicle.name}" loading="lazy">
                        <div class="vehicle-info">
                            <span class="vehicle-category">${vehicle.category.toUpperCase()}</span>
                            <h3>${vehicle.name}</h3>
                            <p class="vehicle-price">$${vehicle.price} <span>/ day</span></p>
                            <button class="btn btn-secondary select-vehicle-btn">Select Car</button>
                        </div>
                    </article>
                `;
                vehicleListingsContainer.insertAdjacentHTML('beforeend', cardHTML); // DOM Modification
            });
        }

        /**
         * Handles the selection of a vehicle from the fleet.
         * @param {Event} event - The click event from the button.
         */
        function handleVehicleSelection(event) {
            // Conditional Branching
            if (!event.target.classList.contains('select-vehicle-btn')) return;

            const card = event.target.closest('.vehicle-card');
            const vehicleId = parseInt(card.dataset.id);
            
            // Array Method: find
            const selectedCar = vehicles.find(v => v.id === vehicleId);

            if (selectedCar) {
                // DOM Modification
                selectedVehicleInput.value = `${selectedCar.name} - $${selectedCar.price}/day`;
                document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth' });
            }
        }

        /**
         * Handles the rental form submission, including validation.
         * @param {Event} event - The submit event from the form.
         */
        function handleFormSubmit(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(rentalForm);
            const bookingDetails = Object.fromEntries(formData.entries());
            
            // Conditional Branching for validation
            if (!bookingDetails.selectedVehicle) {
                displayFormMessage('Please select a vehicle from the fleet above.', 'error');
                return;
            }
            if (!bookingDetails.terms) {
                displayFormMessage('You must agree to the Terms and Conditions.', 'error');
                return;
            }

            // Using localStorage to save booking details. 
            try {
                localStorage.setItem('lastBookingDetails', JSON.stringify(bookingDetails));
                const successMessage = `Thank you, ${bookingDetails.fullName}! Your booking for the ${bookingDetails.selectedVehicle.split(' -')[0]} is confirmed.`;
                displayFormMessage(successMessage, 'success');
                rentalForm.reset();
                selectedVehicleInput.value = ''; // Clear the readonly field specifically
            } catch (e) {
                console.error('Could not save to localStorage.', e);
                displayFormMessage('There was an error saving your booking. Please try again.', 'error');
            }
        }
        
        /**
         * Displays a status message for the booking form.
         * @param {string} message - The message text.
         * @param {string} type - 'success' or 'error'.
         */
        function displayFormMessage(message, type) {
            if (!formMessageContainer) return;
            formMessageContainer.textContent = message;
            formMessageContainer.className = `form-status-message ${type}`;
            
            setTimeout(() => {
                formMessageContainer.textContent = '';
                formMessageContainer.className = 'form-status-message';
            }, 5000);
        }
        
        /**
         * Pre-fills some form fields with data from localStorage on page load.
         */
        function loadDataFromStorage() {
            const savedData = localStorage.getItem('lastBookingDetails');
            // Conditional Branching
            if (savedData) {
                const bookingDetails = JSON.parse(savedData);
                // DOM Modification
                document.getElementById('full-name').value = bookingDetails.fullName || '';
                document.getElementById('email').value = bookingDetails.email || '';
                document.getElementById('phone').value = bookingDetails.phone || '';
            }
        }

        // --- 3. Event Listeners ---
        
        if (vehicleListingsContainer) {
            vehicleListingsContainer.addEventListener('click', handleVehicleSelection);
        }

        if (rentalForm) {
            rentalForm.addEventListener('submit', handleFormSubmit);
        }

        // --- 4. Initial Execution ---
        displayVehicles();
        loadDataFromStorage();
    });
})();