document.addEventListener('DOMContentLoaded', function () {
  var themeSelector = document.getElementById('themeSelector');
  var originalStylesheet = document.getElementById('original-stylesheet');
  var breadStylesheet = document.getElementById('bread-stylesheet');
  var expoStylesheet = document.getElementById('expo-stylesheet');

  // Function to set theme based on the value
  function setTheme(theme) {
    if (theme === 'original') {
      originalStylesheet.disabled = false;
      expoStylesheet.disabled = true;
      breadStylesheet.disabled = true;
    } else if (theme === 'bread') {
      originalStylesheet.disabled = true;
      expoStylesheet.disabled = true;
      breadStylesheet.disabled = false;
    } else if (theme === 'ltx23') {
      originalStylesheet.disabled = true;
      expoStylesheet.disabled = false;
      breadStylesheet.disabled = true;
    }
  }

  // Get the theme parameter from the URL
  var urlParams = new URLSearchParams(window.location.search);
  var themeParam = urlParams.get('theme');

  // If there's a theme parameter in the URL, set the theme
  if (themeParam) {
    setTheme(themeParam);
    themeSelector.value = themeParam;  // Update the theme selector dropdown
  }

  // Also set the theme when the user changes the selection in the theme selector dropdown
  themeSelector.addEventListener('change', function () {
    setTheme(themeSelector.value);
  });
});
