import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

function MovingCar() {
  const controls = useAnimation();
  const [direction, setDirection] = useState(0); // To store the current direction of the car

  const carWidth = 64; // Car width in pixels (adjust based on your SVG size)
  const carHeight = 32; // Car height in pixels (adjust based on your SVG size)

  useEffect(() => {
    const animateCar = () => {
      // Calculate the bounds of the screen considering the car's size
      const maxX = (window.innerWidth)*0.6 - carWidth;  // Maximum X position (left)
      const maxY = window.innerHeight*0.6 - carHeight;  // Maximum Y position (top)

      // Generate random positions for the car to move to, keeping it within bounds
      const randomX = Math.random() * maxX; // Random X position within screen bounds
      const randomY = Math.random() * maxY; // Random Y position within screen bounds

      // Calculate the angle between the current and target positions for car rotation
      const deltaX = randomX - window.innerWidth / 2;
      const deltaY = randomY - window.innerHeight / 2;
      const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convert to degrees

      // Update the direction state to control the rotation of the car
      setDirection(angle);

      // Animate the car to the random position with slow movement and smooth transition
      controls.start({
        x: randomX,
        y: randomY,
        rotate: angle,  // Apply the rotation based on the calculated angle
        transition: {
          type: "spring",
          stiffness: 30,  // Reduced stiffness for smoother motion
          damping: 15,    // Reduced damping for slower deceleration
          duration: 5,   // Slow down by setting duration to 10 seconds
        },
      });
    };

    // Start the animation
    animateCar();

    // Set interval for continuous random movement of the car
    const interval = setInterval(() => {
      animateCar(); // Trigger the car movement at random intervals
    }, 2000); // Move every 10 seconds to a new random position

    return () => clearInterval(interval);
  }, [controls]);

  return (
    <motion.img
      src="/Hatchback.svg"  // Path to your SVG in the public folder
      alt="Car"
      animate={controls}
      style={{ transformOrigin: "center" }}  // Ensures the rotation happens around the center of the car
      className="absolute w-16 h-auto z-10"
    />
  );
}

export default MovingCar;
