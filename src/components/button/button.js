import React, { useEffect, useRef } from "react";

function Button() {
  const buttonRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.click();
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("You have a new message!", {
        body: "Hello",
      });

      notification.addEventListener("click", function (event) {
        window.open("https://www.google.com", "_blank");
      });
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification("You have a new message!");

          notification.addEventListener("click", function (event) {
            window.open("https://www.google.com", "_blank");
          });
        }
      });
    }
  };

  return (
    <button ref={buttonRef} onClick={handleClick}>
      Click here for push test!<br></br>I will auto press after 5 seconds
    </button>
  );
}

export default Button;
