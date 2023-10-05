document.addEventListener('DOMContentLoaded', function () {
    var themeSelector = document.getElementById('themeSelector');
    var originalStylesheet = document.getElementById('original-stylesheet');
    var breadStylesheet = document.getElementById('bread-stylesheet'); 
    var expoStylesheet = document.getElementById('expo-stylesheet'); 
    var afterdarkStylesheet = document.getElementById('afterdark-stylesheet'); 
    var liteStylesheet = document.getElementById('lite-stylesheet'); 
    var darkStylesheet = document.getElementById('dark-stylesheet'); 

  themeSelector.addEventListener('change', function () {
    var selectedTheme = themeSelector.value;
    if (selectedTheme === 'original') {
      originalStylesheet.disabled = false;
      expoStylesheet.disabled = true;
      breadStylesheet.disabled = true;
    } else if (selectedTheme === 'bread') {
      originalStylesheet.disabled = true;
      expoStylesheet.disabled = true;
      breadStylesheet.disabled = false;
    } else if (selectedTheme === 'ltx23') {
      originalStylesheet.disabled = true;
      expoStylesheet.disabled = false;
      breadStylesheet.disabled = true;
    }
  });
});