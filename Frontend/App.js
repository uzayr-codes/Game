let correctNumber;
const BASE_URL = "https://gamebackend-iota.vercel.app";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`${BASE_URL}/get-numbers`);
    const data = await response.json();

    localStorage.setItem("randomNumbers", JSON.stringify(data));
    correctNumber = data[Math.floor(Math.random() * data.length)];
    console.log("Correct number:", correctNumber); // debug only
    const input = document.getElementById("guessInput");
    const button = document.getElementById("guessBtn");

    button.addEventListener("click", handleGuess);
    input.addEventListener("keypress", (event) => {
      if (event.key === "Enter") handleGuess();
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

function handleGuess() {
  const userGuess = parseInt(document.getElementById("guessInput").value);
  const feedback = document.getElementById("feedback");

  if (isNaN(userGuess)) {
    feedback.textContent = "⚠️ Please enter a valid number!";
    feedback.className = "text-yellow-500 mt-4 text-lg";
    return;
  }

  const diff = Math.abs(userGuess - correctNumber);
  feedback.classList.remove("text-green-500", "text-red-500", "text-yellow-500");

  if (userGuess === correctNumber) {
    feedback.textContent = "🎉 Correct! You nailed it!";
    feedback.className = "text-green-500 mt-4 text-lg";
  } else if (userGuess < correctNumber) {
    feedback.textContent = diff <= 3 ? "🔥 A little higher!" : "🥶 Way too low!";
    feedback.className = "text-red-500 mt-4 text-lg";
  } else {
    feedback.textContent = diff <= 3 ? "🌡️ A little lower!" : "☀️ Way too high!";
    feedback.className = "text-red-500 mt-4 text-lg";
  }
}
