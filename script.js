/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Toggle Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update Play Button Icon
function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

// Skip Forward / Backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Handle Volume & Playback Rate
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update Progress Bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Click Progress Bar to Seek
function scrub(e) {
  const scrubTime =
    (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Event Listeners

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button =>
  button.addEventListener('click', skip)
);

ranges.forEach(range =>
  range.addEventListener('change', handleRangeUpdate)
);

ranges.forEach(range =>
  range.addEventListener('mousemove', handleRangeUpdate)
);

progress.addEventListener('click', scrub);
