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
  const size = window.parseInt(window.getComputedStyle(moonMask).getPropertyValue("--size"));
  moonMask.style.right = `${size * proportion}em`;

  const audio = document.querySelector("#background-audio");
  const muteButton = document.querySelector("#mute-button");
  // Force initial muted state - Firefox remembers checkbox state otherwise
  muteButton.checked = true;
  muteButton.addEventListener("input", inputEvent => {
    inputEvent.preventDefault();
    audio.muted = inputEvent.target.checked;
  });
  // Using the <audio> "loop" attribute results in a conspicuous gap between
  // loops. To make the background noise as unobtrusive as possible, extra
  // massaging to do a gap-less loop.
  audio.addEventListener("timeupdate", () => {
    const proportionPlayed = audio.currentTime / audio.duration;
    if (proportionPlayed > .95) {
      audio.currentTime = 0;
      audio.play();
    }
  });
});
