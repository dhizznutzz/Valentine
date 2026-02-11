const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");

let noClicks = 0;

function showMessage(text, celebrate = false) {
  message.textContent = text;
  message.classList.remove("hidden", "celebrate", "visible");

  if (celebrate) {
    message.classList.add("celebrate");
  }

  // force reflow so the transition retriggers
  void message.offsetWidth;
  message.classList.add("visible");
}

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "floating-heart";
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  document.body.appendChild(heart);

  heart.addEventListener(
    "animationend",
    () => {
      heart.remove();
    },
    { once: true }
  );
}

yesBtn.addEventListener("click", (e) => {
  showMessage("Yay! You just made my whole day. 💘", true);

  // burst of hearts
  const rect = yesBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 7; i++) {
    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = (Math.random() - 0.5) * 30;
    createHeart(centerX + offsetX, centerY + offsetY);
  }
});

noBtn.addEventListener("mouseenter", () => {
  noClicks++;

  if (noClicks === 1) {
    showMessage("Are you suuuure? I think you meant to press Yes. 😏");
  } else if (noClicks === 2) {
    showMessage("Hmm, this button seems shy. Maybe try the other one? 💗");
  } else if (noClicks >= 3) {
    showMessage("Okay, okay, I get it... but I’m still choosing you. 💌");
  }

  const card = noBtn.closest(".card");
  const bounds = card.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const padding = 16;
  const maxX = bounds.width - btnRect.width - padding;
  const maxY = bounds.height - btnRect.height - 80; // keep within the bottom

  let randomX = Math.random() * maxX;
  let randomY = Math.random() * maxY;

  // prevent it from going too close to the yes button horizontally
  const yesRect = yesBtn.getBoundingClientRect();
  const relativeYesX = yesRect.left - bounds.left;

  if (Math.abs(randomX - relativeYesX) < 60) {
    randomX = (randomX + bounds.width / 2) % maxX;
  }

  noBtn.style.position = "absolute";
  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY + 10}px`;
});

noBtn.addEventListener("click", () => {
  // In case someone actually manages to click it on mobile
  showMessage("You tapped No, but my heart definitely heard Yes. 💞");
});

