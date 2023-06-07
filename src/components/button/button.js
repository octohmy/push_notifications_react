import React, { useEffect, useRef } from "react";
import logoIcon from "./logo2.png";

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

  const createNotification = (title, body) => {
    const options = {
      body: body,
      icon: logoIcon,
      badge: logoIcon,
    };

    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(title, options);

      notification.addEventListener("click", function (event) {
        window.open("https://www.google.com", "_blank");
      });
    } else if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(title, options);

          notification.addEventListener("click", function (event) {
            window.open("https://www.google.com", "_blank");
          });
        }
      });
    }
  };

  const handleClick = () => {
    createNotification("Hello, Bernard! Hurry!", "👾⏰👾\nClick to complete your daily quiz too!!");
  };

  return (
    <button ref={buttonRef} onClick={handleClick}>
      Click here for push test!<br></br>I will auto press after 5 seconds
    </button>
  );
}

export default Button;
