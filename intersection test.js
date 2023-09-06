const element = document.querySelector('.test');
const element1 = document.querySelector('.title');
let isAnimating = false;

const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    element.style.transition = 'opacity 1s, transform 1.4s'; // Set transition for entrance
    element.style.opacity = 1;
    element.style.transform = 'scale(1)';

    if (!isAnimating) {
      element1.style.transition = 'opacity 1.2s, transform 2s'; // Set transition for delayed entrance
      setTimeout(() => {
        element1.style.opacity = 1;
        element1.style.transform = 'scale(1)';
        isAnimating = true;
      }, 300); // Delay in milliseconds betwenn element and element1 (1 second)
    }
  } else {
    element.style.transition = 'opacity 0.5s, transform 0.5s'; // Set transition for exit
    element1.style.transition = 'opacity 0.5s, transform 0.5s'; // Set transition for exit

    element.style.opacity = 0;
    element1.style.opacity = 0;
    element.style.transform = 'scale(0.9)';
    element1.style.transform = 'scale(0.9)';
    isAnimating = false;
  }
}, {
  threshold: 0.2 // Adjust this value as needed
});

observer.observe(element);
observer.observe(element1);
