$(function() {

   // Fetch max users from server
  fetch('https://socket.wanshow.bingo/maxUsers', { credentials: 'include' })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const date = new Date(data.date);
    const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    document.getElementById('max-users').textContent = `Max User Count: ${data.maxUsers} Users Online on ${formattedDate}`;
  })
  .catch(error => {
    console.error('Fetch request failed:', error);
  });

  //WEB SOCKETS
     // const socket = io('https://socket.wanshow.bingo');

     // socket.on("updateCount", function (msg) {
     //   document.getElementById('playerCount').innerHTML = msg
     // });
    // const socket = io.connect("https://socket.wanshow.bingo/socket.io/");

     //socket.on("connect", () => {
     //  console.log("Connected to secure websocket server.");
     //});

     //socket.on("message", (data) => {
     //  const parsedData = JSON.parse(data);
     //  $("#liveUserCount").text(`Live players: ${parsedData.liveUsers}`);
     //});
     const socket = io('https://socket.wanshow.bingo:3000');

     socket.on('connect', () => {
       console.log('Connected to the server');
     });

    // socket.on('liveUsers', (data) => {
    //   const liveUsersElement = document.getElementById('live-users');
    //  liveUsersElement.textContent = `Live Bingo Players : ${data.liveUsers}`;
    // });

    socket.on('liveUsers', (data) => {
      const liveUsersElement = document.getElementById('live-users');
      liveUsersElement.classList.add('user-count');
      liveUsersElement.textContent = "Current Live Users: " + data.liveUsers;
    });

     socket.on('disconnect', () => {
       console.log('Disconnected from the server');
     });
  //Populate
  const entries = [
  // Replace previous responses with new ones relavent to LinusTechTips - LTX Expo
  "Luke laughs uncomfortably loudly", // Linus S. Suggestion July 27 2023 - https://linustechtips.com/topic/1522268-ltx-bingo-suggestions/#comment-16052355
  "Linus leaks a product early", // @gierra on Discord July 27/28 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134312910307475586
  "Intro/Outro is accidentally played", 
  "LTX Audience Member",
  "Luke talks about AI", // @gierra on Discord July 27/28 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134312910307475586
  "Luke teases a new floatplane feature", // @gierra on Discord July 27/28 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134312910307475586
  "Accidentally shared confidential info", //@malakx on Discord July 28, 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134358985328295988
  "Dan ignores Linus", // @flockedsox on Discord July 28, 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134574909000011786
  "Hit me Dan", // @DekZek on Discord July 28, 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134579447144652861
  "Guest Appearance on Stage",
  "Motion-Sickness Camera",
  "Super-Zoomed Camera",
  "Camera Not Focused",
  "Hello Dan",
  "LTT Store Plug",
  "LTT Water Bottle",
  "Banana For Scale",
  "Linus Hot Take",
  "Linus Roasts a Company",
  "Linus Roasts a Product",
  "Linus' parenting stories",
  "Mispronunciation of a word/phrase",
  "Rapid-fire sponsor reads",
  "Stream Dies",
  "Linus Facepalms",
  "Audio Clipping!",
  "Linus drops something",
  "The Whale appears",
  "WANShow.bingo is mentioned",
  "Sponsored by Dbrand!",
  "Sponsored by SquareSpace!",
  "Live Tech Product Unboxing",
  "Drop Test! (Intentional/Unintentional)",
  "Technical Difficulities during a presentation",
  "An unexpected product partnership announcement"
  ];
  let spaces = [];
  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      spaces[i] = "***Free Space*** \n\n Late!";
    } else {
      const choice = Math.floor(Math.random() * entries.length);
      spaces[i] = entries[choice];
      entries.splice(choice, 1);
    }
  }
    // Draw the board
    const board = $("#board");
    for (let i = 0; i < spaces.length; i++) {
        const boardTile = document.createElement('div');
        boardTile.classList.add('item');
        const tileText = document.createElement('p');
        tileText.innerText = spaces[i];
        boardTile.appendChild(tileText);
        if (i === 12) {
            boardTile.classList.add('clicked');
        }
        board.append(boardTile);
    }
  //hide / unhide twitch
  $("#hideTwitch").click(function() {
    $("#stream").toggle();
    $("#game").toggleClass("toggledWide");
    if($("#hideTwitch").html() === "Hide Twitch") {
      $(this).html("Show Twitch");
    } else {
      $(this).html("Hide Twitch");
    }
  });

  //Change the Color

  $(".item").click(function() {
    $(this).toggleClass("clicked");
      //Just watching some data for a bit. I'm working on a way to detect actual players from trolls and need some sample data.
      const msg = $(this).children().html() + " : " + $(this).hasClass("clicked");
      socket.emit('dataSend', msg);

    //check for winner! There is probably an algo for this...
      const check = $("#board").children();

      function checkTiles(numbers) {
          let count = 0;
          // ... spreads the numbers from the array to be individual parameters
          numbers.forEach(function (currentNumber) {
              if ($(check[currentNumber]).hasClass("clicked")) {
                  count++;
              }
          });
          if (count === numbers.length) {
            debugger;
              return true;
          }
          return false;
      }

      //ROWS
      if (checkTiles([0, 1, 2, 3, 4])) {
          winner();
      } else if (checkTiles([5, 6, 7, 8, 9])) {
          winner();
      } else if (checkTiles([10, 11, 12, 13, 14])) {
          winner();
      } else if (checkTiles([15, 16, 17, 18, 19])) {
          winner();
      } else if (checkTiles([20, 21, 22, 23, 24])) {
          winner();
      }
      //COLUMNS!
      else if (checkTiles([0, 5, 10, 15, 20])) {
          winner();
      } else if (checkTiles([1, 6, 11, 16, 21])) {
          winner();
      } else if (checkTiles([2, 7, 12, 17, 22])) {
          winner();
      } else if (checkTiles([3, 8, 13, 18, 21])) {
          winner();
      } else if (checkTiles([4, 9, 14, 19, 24])) {
          winner();
      }
      //CRISS CROSS
      else if (checkTiles([0, 6, 12, 18, 24])) {
          winner();
      } else if (checkTiles([4, 8, 12, 16, 20])) {
          winner();
      } else {
          loser();
      }
  });

  function loser() {
    $("#winner").addClass("hidden");
  }

  function winner() {
    Swal.fire({
      icon: 'success',
      title: 'Congratulations!',
      text: 'You Win!',
      confirmButtonText: 'OK'
    });
  }

  // Random background image
  //const randomBackground = () => {
  //  const randomNumber = Math.floor(Math.random() * 3) + 1; // Generate random number between 1 and 3
  //  return `url("images/background${randomNumber}.jpeg")`; // pick background#,jpg based on random number above
  //};

  //$('#back-img').css('background-image', randomBackground());

  //Change the Color
  //$(".item").click(function() {
  //  $(this).toggleClass("clicked");

    // Continuously changing border color of clicked items is handled in style.css
  //});

});
