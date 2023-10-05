$(document).ready(function() {
    function updateTimer(data) {
      var timerHtml = '<a href="https://whenplane.com/" target="_blank" style="text-decoration: none; color: inherit;">';
      timerHtml += '<div class="card p-4 inline-block countdown-box text-left svelte-1xheok0">';
      var now = new Date();
      var wanTime = new Date(data.nextWan);

      if ((data.isLive.twitch.isLive && data.isLive.twitch.isWAN) || (data.isLive.youtube.isLive && data.isLive.youtube.isWAN)) {
        var startedTime = new Date(data.isLive.twitch.started || data.isLive.youtube.started);
        var liveDuration = now - startedTime;
        timerHtml += '<h2>The WAN show has been live for ' + formatDuration(liveDuration) + '</h2>';
        timerHtml += '<p>Started at ' + startedTime.toLocaleTimeString() + '</p>';
      } else if (now < wanTime) {
        var countdownDuration = wanTime - now;
        timerHtml += '<h2>The WAN Show starts in ' + formatDuration(countdownDuration) + '</h2>';
      } else {
        var lateDuration = now - wanTime;
        timerHtml += '<h2>' + (lateDuration > 0 ? 'WAN Show is Late by: ' : 'The WAN Show is offline') + formatDuration(Math.abs(lateDuration)) + '</h2>';
      }

      timerHtml += '<p class="provider-text">Provided by WhenPlane.com</p>';
      timerHtml += '</div></a>';
      $('#wan-show-timer').html(timerHtml);
    }

    function formatDuration(duration) {
      var days = Math.floor(duration / 86400000);
      var hours = Math.floor((duration % 86400000) / 3600000);
      var minutes = Math.floor((duration % 3600000) / 60000);
      var seconds = Math.floor((duration % 60000) / 1000);
      return (days > 0 ? days + 'd ' : '') + hours + 'h ' + minutes + 'm ' + seconds + 's';
    }

    function fetchTimer() {
      $.get('https://socket.wanshow.bingo/whenplane', function(data) {
        updateTimer(data);
      }).fail(function() {
        console.error('An error occurred while fetching the timer.');
      });
    }

    fetchTimer();

    setInterval(fetchTimer, 1000); // Update every second, timer may abruptly change when a new response is received from the server
  });