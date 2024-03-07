import { useEffect, useRef } from 'react';

function getRandomSpeed() {
  return Math.random() * 0.5 + 0.2; // Generate a random speed between 0.2 and 0.7
}

function getRandomPosition(max) {
  return Math.random() * max;
}

function Animate() {
  const boxRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const circle3Ref = useRef(null);

  useEffect(() => {
    const boxWidth = boxRef.current.clientWidth;
    const boxHeight = boxRef.current.clientHeight;

    const circles = [
      {
        ref: circle1Ref,
        speedX: getRandomSpeed(),
        speedY: getRandomSpeed(),
        posX: getRandomPosition(boxWidth - 100),
        posY: getRandomPosition(boxHeight - 100),
        size: 30
      },
      {
        ref: circle2Ref,
        speedX: getRandomSpeed(),
        speedY: getRandomSpeed(),
        posX: getRandomPosition(boxWidth - 100),
        posY: getRandomPosition(boxHeight - 100),
        size: 50
      },
      {
        ref: circle3Ref,
        speedX: getRandomSpeed(),
        speedY: getRandomSpeed(),
        posX: getRandomPosition(boxWidth - 100),
        posY: getRandomPosition(boxHeight - 100),
        size: 70
      }
    ];

    const animate = () => {
      circles.forEach(circle => {
        circle.posX += circle.speedX;
        circle.posY += circle.speedY;

        // Bounce off walls
        if (circle.posX > boxWidth - circle.size || circle.posX < 0) {
          circle.speedX *= -1;
        }
        if (circle.posY > boxHeight - circle.size || circle.posY < 0) {
          circle.speedY *= -1;
        }

        // Check collision with other circles
        circles.forEach(otherCircle => {
          if (circle !== otherCircle) {
            const dx = circle.posX - otherCircle.posX;
            const dy = circle.posY - otherCircle.posY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < (circle.size + otherCircle.size) / 2) {
              // Collision occurred, reverse direction
              const tempSpeedX = circle.speedX;
              const tempSpeedY = circle.speedY;
              circle.speedX = otherCircle.speedX;
              circle.speedY = otherCircle.speedY;
              otherCircle.speedX = tempSpeedX;
              otherCircle.speedY = tempSpeedY;
            }
          }
        });

        circle.ref.current.style.left = circle.posX + 'px';
        circle.ref.current.style.top = circle.posY + 'px';
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animate);
  }, []);

  return (
    <div className="container relative w-full h-screen">
      <div
        ref={boxRef}
        className="box w-full h-screen relative mx-auto">
        <div
          ref={circle1Ref}
          className="circle bg-yellow-500 w-8 h-8 rounded-full absolute"></div>
        <div
          ref={circle2Ref}
          className="circle bg-blue-500 w-10 h-10 rounded-full absolute"></div>
        <div
          ref={circle3Ref}
          className="circle bg-red-500 w-12 h-12 rounded-full absolute"></div>
      </div>
    </div>
  );
}

export default Animate;
