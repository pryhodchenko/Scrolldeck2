function initializeLogoAnimation(containerSelector, canvasId, imageFolder, frameCount, canvasWidth, canvasHeight) {
  const html = document.documentElement;
  const canvas = document.getElementById(canvasId);
  const context = canvas.getContext("2d");

  const currentFrame = index => (
    `${imageFolder}/${index.toString().padStart(4, '0')}.png`
  );

  const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
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
    canvas.width = isMobile ? canvasWidth : canvasWidth; // Set canvas width based on device type
    canvas.height = isMobile ? canvasHeight : canvasHeight; // Set canvas height based on device type
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

    // Calculate the position of the current block relative to the viewport
    const divLogo = document.querySelector(containerSelector);
    const blockTop = divLogo.getBoundingClientRect().top + scrollTop;
    const blockBottom = blockTop + divLogo.offsetHeight;

    if (scrollTop >= blockTop && scrollTop <= blockBottom) {
      // The user is within the current block's viewport
      const scrollFraction = (scrollTop - blockTop) / (blockBottom - blockTop);
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount)
      );

      requestAnimationFrame(() => updateImage(frameIndex + 1));
    } else if (scrollTop > blockBottom) {
      // The user has scrolled past the current block, stop the animation
      requestAnimationFrame(() => updateImage(frameCount));
    }
  });

  preloadImages();
}

// Call the function to initialize the animation for the first block with custom canvas size
initializeLogoAnimation('.logo-container', 'reprezent-logo', 'Logo_sequence', 51, 660, 372);

// Call the function again for the second block with a different folder, frame count, and canvas size
initializeLogoAnimation('.sequence2-container', 'img_sequence2', 'Frames', 172, 1920, 1080);
