// Add this function before the drawing code
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
    this.beginPath();
    this.moveTo(x + radius, y);
    this.lineTo(x + width - radius, y);
    this.quadraticCurveTo(x + width, y, x + width, y + radius);
    this.lineTo(x + width, y + height - radius);
    this.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    this.lineTo(x + radius, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - radius);
    this.lineTo(x, y + radius);
    this.quadraticCurveTo(x, y, x + radius, y);
    this.closePath();
  };
  
  // JavaScript code to draw on the canvas
  const customCanvas = document.getElementById('custom-canvas');
  const customContext = customCanvas.getContext('2d');
  
  // Set canvas size to cover the entire screen
  customCanvas.width = window.innerWidth;
  customCanvas.height = window.innerHeight;
  
  // Draw the background rectangle
  customContext.fillStyle = 'blue'; // Set the desired background color
  customContext.fillRect(0, 0, customCanvas.width, customCanvas.height);
  
  // Draw the first rounded rectangle
  customContext.fillStyle = 'red'; // Set the desired color
  customContext.roundRect(50, 50, customCanvas.width - 100, customCanvas.height - 100, 15);
  customContext.fill();
  
  // Draw the second rounded rectangle
  customContext.fillStyle = 'green'; // Set the desired color
  customContext.roundRect(100, 100, customCanvas.width - 200, customCanvas.height - 200, 15);
  customContext.fill();
  