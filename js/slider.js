// Selecting elements
let slider = document.querySelector('.slider .list'); // Selects the slider list element
let items = document.querySelectorAll('.slider .list .item'); // Selects all items within the slider
let next = document.getElementById('next'); // Selects the next button element
let prev = document.getElementById('prev'); // Selects the previous button element
let dots = document.querySelectorAll('.slider .dots li'); // Selects all dot indicators

// Initializing variables
let lengthItems = items.length - 1; // Calculates the length of items
let active = 0; // Tracks the active item index

// Click event handler for next button
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0; // Increment active index, looping back to 0 if at the end
    reloadSlider(); // Reload the slider with the new active item
}

// Click event handler for previous button
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems; // Decrement active index, looping to the last item if at the beginning
    reloadSlider(); // Reload the slider with the new active item
}

// Automatically switch slides every 3 seconds
let refreshInterval = setInterval(()=> {next.click()}, 3000);

// Function to reload the slider with the updated active item
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px'; // Adjust slider position based on the active item's position

    // Update dot indicators
    let last_active_dot = document.querySelector('.slider .dots li.active'); // Finds the previously active dot
    last_active_dot.classList.remove('active'); // Removes active class from previously active dot
    dots[active].classList.add('active'); // Adds active class to the current dot

    // Reset auto-switch interval
    clearInterval(refreshInterval); // Clear the previous interval
    refreshInterval = setInterval(()=> {next.click()}, 3000); // Set a new interval to automatically switch slides
}

// Reload the slider when the window is resized
window.onresize = function(event) {
    reloadSlider();
};
