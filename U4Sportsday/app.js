// Opening Ceremony
function OpeningCeremony(score, callback) {
  console.log("Starting Opening Ceremony...");
  let ceremonyInterval = setInterval(() => {
    console.log("...Ceremony in progress...");
  }, 1000);

  setTimeout(() => {
    clearInterval(ceremonyInterval);
    console.log("Opening Ceremony Finished!");
    console.log("Previous Score:", score);
    // Initialize scores
    score.red = 0;
    score.blue = 0;
    score.green = 0;
    score.yellow = 0;
    console.log("Updated Score:", score);
    callback(score, Race100M);
  }, 3000);
}

// Race 100M
function Race100M(score, callback) {
  setTimeout(() => {
    console.log("Race 100M Starts!");
    console.log("Previous Score:", score);
    // Simulate random times
    let times = {
      red: Math.floor(Math.random() * 6) + 10,
      blue: Math.floor(Math.random() * 6) + 10,
      green: Math.floor(Math.random() * 6) + 10,
      yellow: Math.floor(Math.random() * 6) + 10,
    };
    console.log("Random Times:", times);

    // Sort by fastest
    let sorted = Object.keys(times).sort((a, b) => times[a] - times[b]);
    score[sorted[0]] += 50;
    score[sorted[1]] += 25;
    score[sorted[2]] += 10;
    score[sorted[3]] += 5;

    console.log("Updated Score:", score);
    callback(score, LongJump);
  }, 3000);
}

// Long Jump
function LongJump(score, callback) {
  setTimeout(() => {
    console.log("Long Jump Event!");
    console.log("Previous Score:", score);
    // Random color
    let colors = ["red", "blue", "green", "yellow"];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    score[randomColor] += 150;
    console.log(`${randomColor} got 150 points!`);
    console.log("Updated Score:", score);
    callback(score, HighJump);
  }, 2000);
}

// High Jump
function HighJump(score, callback) {
  console.log("High Jump Event!");
  console.log("Previous Score:", score);
  let userColor = prompt("Which color scored the highest jump? (red/blue/green/yellow)");
  if (userColor && score.hasOwnProperty(userColor)) {
    score[userColor] += 100;
    console.log(`${userColor} got 100 points!`);
  } else {
    console.log("Event was cancelled or invalid input.");
  }
  console.log("Updated Score:", score);
  AwardCeremony(score);
}

// Award Ceremony
function AwardCeremony(score) {
  console.log("Award Ceremony!");
  console.log("Final Scores:", score);
  let results = Object.entries(score).sort((a, b) => b[1] - a[1]);
  console.log(`${results[0][0]} came first with ${results[0][1]} points.`);
  console.log(`${results[1][0]} came second with ${results[1][1]} points.`);
  console.log(`${results[2][0]} came third with ${results[2][1]} points.`);
  console.log(`${results[3][0]} came fourth with ${results[3][1]} points.`);
}

// Link everything to button
document.getElementById("startBtn").addEventListener("click", () => {
  let initialScore = {};
  OpeningCeremony(initialScore, (score, next) => {
    next(score, (score, nxt) => {
      nxt(score, (score, nxt2) => {
        nxt2(score);
      });
    });
  });
});