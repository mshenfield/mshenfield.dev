/* Place stars throughout an evenly spaced grid
 *
 * Used to generate the stars and then manually add them to the page.
 */
function generateStars(logOnly) {
  // Spread stars evenly over a 2000x2000 grid. The absolute measurements mean
  // they don't move around when the screen is resized, and the grid helps
  // them be spread evenly.
  const starContainer = document.querySelector(".star-container");
  const starScape = { width: 2000, height: 2000, rows: 10, columns: 10 };
  const colWidth = starScape.width / starScape.columns;
  const rowHeight = starScape.height / starScape.rows;
  for (var x = 0; x < starScape.columns ; x++) {
    for (var y = 0; y < starScape.rows; y++) {
      // Salt the x,y coords so they range within their column.
      const xOffset = x * colWidth + Math.random() * colWidth;
      const yOffset = y * rowHeight + Math.random() * rowHeight;
      if (logOnly) {
        console.log(`<div class="star" style="top: ${yOffset}px; left: ${xOffset}px;"></div>`);
        continue;
      }
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${xOffset}px`;
      star.style.top = `${yOffset}px`;
      starContainer.appendChild(star);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.querySelector("#background-audio");
  // For mobile browsers, the `autoplay` attribute isn't honored, even if initially muted.
  // Track whether the audio is actually playing so we can manually trigger a `play()` if needed.
  // https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide
  var isPlaying = false;
  audio.addEventListener("play", () => isPlaying = true);

  const soundToggleButton = document.querySelector("#sound-toggle-button");
  // Force initial muted state - Firefox remembers checkbox state otherwise
  soundToggleButton.checked = true;
  soundToggleButton.addEventListener("input", inputEvent => {
    inputEvent.preventDefault();
    audio.muted = inputEvent.target.checked;
    // Manually play if not already.
    if (!audio.muted && !isPlaying) {
      audio.play();
      isPlaying = true;
    }
  });

  // Using the <audio> "loop" attribute results in a conspicuous gap between
  // loops. To make the background noise as unobtrusive as possible, do extra
  // massaging for a gap-less loop.
  audio.addEventListener("timeupdate", () => {
    const proportionPlayed = audio.currentTime / audio.duration;
    if (proportionPlayed > .95) {
      audio.currentTime = 0;
      audio.play();
    }
  });
});
