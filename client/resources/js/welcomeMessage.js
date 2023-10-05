window.onload = function() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      var viewport = document.querySelector('meta[name="viewport"]');
      if (window.innerWidth / window.innerHeight > 1) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.1, maximum-scale=0.1, user-scalable=0');
      } else {
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.6, maximum-scale=0.6, user-scalable=0');
      }
    }
  
    Swal.fire({
      title: 'Welcome to WAN Show Bingo!',
      text: 'This is a randomly generated bingo card dedicated to the LTT Podcast called WAN Show, work-in-progress and not affiliated with Linus Media Group. Overhaul underway.',
      imageUrl: 'https://wanshow.bingo/resources/images/wanshowbingo-b.png',
      imageAlt: 'WAN Show Bingo logo',
      showCancelButton: true,
      confirmButtonText: 'Blog (Latest Updates)',
      cancelButtonText: 'Feedback',
      showCloseButton: true,
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = 'https://blog.bksn.pro/category/wan/';
      } else if (result.isDismissed && result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = 'https://feedback.bksn.pro/index.php?r=survey/index&sid=579673&lang=en';
      }
    });
  }