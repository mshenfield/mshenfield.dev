function fullnessOfMoon() {
  const recentFullMoonMs = 1605413220000;
  const cycleMs = 2551390000;
  const nowMs = Date.now();
  const elapsedMs = nowMs - recentFullMoonMs;
  const proportionOfCycle = (elapsedMs % cycleMs) / cycleMs;
  if (proportionOfCycle >= .5) {
    return 1 - proportionOfCycle;
  } else {
    return proportionOfCycle;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const proportion = fullnessOfMoon();
  const moonMask = document.querySelector(".moon-mask");
  const size = window.parseInt(window.getComputedStyle(moonMask).getPropertyValue("--moon-size"));
  moonMask.style.right = `${size * proportion}em`;
});
