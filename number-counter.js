var expyears = { years: 0 };
var scrolling = false; // Flag to prevent multiple scroll events from firing
var countingStarted = false; // Flag to track whether counting has started

// Define the position of the block where you want to start counting
var startCountingPosition = 1800; // Adjust this value as needed

const scanning = anime({
  targets: expyears,
  autoplay: false,
  duration: 1400,
  easing: 'linear',
  round: 1,
  update: function() {
    var years = document.querySelector('.count1');
    years.innerHTML = expyears.years;

    // Check if the counter reaches 10
    if (expyears.years === 10) {
       // Gradually fade out the text
       fadeElementOut('.years_text', 10); // Adjust the duration as needed
    } else {
       // Gradually fade in the text
       fadeElementIn('.years_text', 0); // Adjust the duration as needed
   
    }
  }
});

// Function to handle scroll events
function handleScroll(event) {
  if (!scrolling) {
    scrolling = true;

    // Check if the user has reached the block where counting should start
    if (window.scrollY >= startCountingPosition) {
      countingStarted = true;
    }

    if (countingStarted) {
      // Determine the scroll direction
      if (event.deltaY > 0) {
        // Scrolling down
        expyears.years += 1; // You can adjust the increment as needed
      } else {
        // Scrolling up
        expyears.years -= 1; // You can adjust the decrement as needed
      }

      // Ensure the counter doesn't go below 0 or above 10
      expyears.years = Math.min(10, Math.max(0, expyears.years));

      // Trigger the animation update with the new value
      scanning.restart();
    }

    // Delay to prevent rapid scrolling
    setTimeout(function() {
      scrolling = false;
    }, 150); // Adjust the delay time as needed
  }
}

// Add a scroll event listener to the document
document.addEventListener('wheel', handleScroll);

// Function to gradually fade in an element
function fadeElementIn(selector, duration) {
  var element = document.querySelector(selector);
  var startOpacity = parseFloat(element.style.opacity) || 0;
  var startTime = null;

  function animate(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    var progress = (timestamp - startTime) / duration;
    var currentOpacity = startOpacity + progress;

    element.style.opacity = Math.min(1, currentOpacity);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}


// Function to gradually fade out an element
function fadeElementOut(selector, duration) {
  var element = document.querySelector(selector);
  var startOpacity = parseFloat(element.style.opacity) || 1;
  var startTime = null;

  function animate(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    var progress = (timestamp - startTime) / duration;
    var currentOpacity = startOpacity - progress;

    element.style.opacity = Math.max(0, currentOpacity);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}
