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
    "Linus ignores luke to change the topic",
    "CHAT NO",
    "Linus Facepalms",
    "Intro/Outro run accidentally",
    "The microphone gets hit",
    "'Wow, I feel old...'",
    "Camera Not Focused",
    "Luke was Wrong",
    "Linus Was Wrong",
    "Colton Quit / Fired joke",
    "Linus Drops Something",
    "Squarespace!",
    "Floatplane Preview!",
    "Nvidia News!",
    "AMD News!",
    "Intel News!",
    "Apple News!",
    "New Sponsor!",
    "Luke talks about ChatGPT",
    "No Audio!",
    "Audio Clipping!",
    "Literally one super topic until sponsor spot",
    "Linus leaves the other host alone",
    "News comes from the forums! Heck yeah!",
    "Video output not connected to laptop",
    "Console Topic for the peasantry",
    "Luke Laughs REALLY hard about something",
    "Luke 'Thats Hilarious!'",
    "Linus has 2 phones on his person",
    "Someone messes with the set",
    "Linus: 'We've got a great show for you today!'",
    "Audio suddenly too quiet/loud",
    "No actual news before sponsor spot",
    "Linus doesn't censor while swearing",
    "Motion-Sickness Camera",
    "Super-Zoomed Camera",
    "Hello Dan",
    "LTT Store Plug",
    "LTT Water Bottle",
    "Banana For Scale",
    "Linus Hot Take",
    "Linus Roasts a Company",
    "Linus' parenting stories",
    "Mispronunciation of a word/phrase",
    "Rapid-fire sponsor reads",
    "Stream Dies",
    "Costumes!",
    "Late Stream",
    "4+ Hour WAN Show (What a Champ!)",
    "Luke laughs uncomfortably loud", // Linus S. Suggestion July 27 2023 - https://linustechtips.com/topic/1522268-ltx-bingo-suggestions/#comment-16052355
    "Linus leaks a product early", // @gierra on Discord July 27/28 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134312910307475586 
    "Luke talks about AI", // @gierra on Discord July 27/28 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134312910307475586
    "Luke teases a new floatplane feature", // @gierra on Discord July 27/28 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134312910307475586
    "Accidentally shared confidential info", //@malakx on Discord July 28, 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134358985328295988
    "Dan ignores Linus", // @flockedsox on Discord July 28, 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134574909000011786
    "Hit me Dan", // @DekZek on Discord July 28, 2023 - https://discord.com/channels/375436620578684930/408086218518167552/1134579447144652861
    "Not my problem anymore, talk to the new ceo.", // the99er Suggestion July 28, 2023 https://linustechtips.com/topic/1522268-ltx-bingo-suggestions/#comment-16052283
    "Linus: it's not my fault", // the99er Suggestion July 28, 2023 https://linustechtips.com/topic/1522268-ltx-bingo-suggestions/#comment-16052283
    "Sponsored by Dbrand!",
    "Sponsored by SquareSpace!",
    "Live Tech Product Unboxing"
  ];
  let spaces = [];
  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      spaces[i] = "***Free Space*** \n\n Late";
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
