function toggleDarkMode() {
    // Toggle the dark-mode class on the body
    document.body.classList.toggle('dark-mode');

    // Get the button element
    var button = document.getElementsByClassName('dark-mode-toggle-button')[0];

    // Change background color and icon color based on dark mode status
    if (document.body.classList.contains('dark-mode')) {
        document.body.style.backgroundColor = 'black'; // Set body background to black
        button.querySelector('i').style.color = 'white'; // Change icon color to white
        button.style.backgroundColor = 'black'; // Change button background to black
        document.getElementById('welcomeMessage').style.color = 'white';
    } else {
        document.body.style.backgroundColor = ''; // Reset body background to default
        button.querySelector('i').style.color = ''; // Reset icon color to default
        button.style.backgroundColor = ''; // Reset button background to default
        document.getElementById('welcomeMessage').style.color = 'black';
    }
}


// Function to fetch username from cookies
function getCookieValue(cookieName) {
  const allCookies = document.cookie.split(';');
  for (let i = 0; i < allCookies.length; i++) {
    const currentCookie = allCookies[i].trim();
    if (currentCookie.startsWith(cookieName + '=')) {
      return currentCookie.substring(cookieName.length + 1);
    }
  }
  return null;
}

function getAlphabets(str) {
  return str.match(/[a-zA-Z\s]+/g).join(''); // Extracts only alphabet characters
}
// Set username from cookie in the welcome message
function displayUsername() {
  let username = getCookieValue("username") || "Guest";
  username = decodeURIComponent(username);
  username = getAlphabets(username);// Changed to 'guestName'

  document.getElementById("welcomeMessage").textContent = `Welcome, ${username}`;
}


// Carousel slider functionality
let currentIndex = 0;
const images = document.getElementById('carouselImages');
const totalImages = images.children.length;

function slideCarousel() {
  currentIndex = (currentIndex + 1) % totalImages;
  images.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(slideCarousel, 3000); // Slide every 3 seconds

// Call displayUsername when the page loads
window.onload = displayUsername(); // Ensure username is displayed on page load