const html = document.documentElement;
const canvas = document.getElementById("reprezent-logo");
const context = canvas.getContext("2d");

const frameCount = 51;
const currentFrame = index => (
  `Logo_sequence/${index.toString().padStart(4, '0')}.png`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
resizeCanvas(); // Call the function to resize the canvas initially
window.addEventListener('resize', resizeCanvas); // Call the function when the window is resized

// Function to resize the canvas based on device type
function resizeCanvas() {
  const isMobile = window.innerWidth <= 850; // Set your mobile breakpoint here
  canvas.width = isMobile ? 660 : 660; // Set canvas width based on device type
  canvas.height = isMobile ? 372 : 372; // Set canvas height based on device type
  img.onload = function () {
    context.drawImage(img, 0, 0);
  };
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {
  const scrollTop = html.scrollTop;
  const divLogo = document.querySelector('.logo-container');
  const maxScrollTop = divLogo.offsetHeight - img.height;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages();
