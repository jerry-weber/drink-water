const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");

function highlightCups(idx) {
  const isFull = smallCups[idx].classList.contains("full");
  const nextCupFull =
    smallCups[idx].nextElementSibling?.classList.contains("full");

  if ((idx === 7 && isFull) || (isFull && !nextCupFull)) idx--;

  smallCups.forEach((cup, idx2) => {
    idx2 <= idx ? cup.classList.add("full") : cup.classList.remove("full");
  });

  updateBigCup();

  if (
    document.querySelectorAll(".cup-small.full").length === smallCups.length
  ) {
    // All glasses are full, reload the page after a short delay
    setTimeout(() => {
      location.reload();
    }, 1200); // Adjust the delay time as needed
  }
}

function updateBigCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }

  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
  }
}
function setUpEventListeners() {
  smallCups.forEach((cup, idx) => {
    cup.addEventListener("click", () => highlightCups(idx));
  });
}

updateBigCup();
setUpEventListeners();
