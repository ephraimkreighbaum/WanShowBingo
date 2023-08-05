<?php
$content = file_get_contents('https://whenplane.com/?');
$doc = new DOMDocument();
@$doc->loadHTML($content);
$divs = $doc->getElementsByTagName('div');
foreach ($divs as $div) {
  if ($div->getAttribute('class') === 'card p-4 inline-block countdown-box text-left svelte-1xheok0') {
    echo '<style>';
    echo '.countdown-box.svelte-1xheok0 { min-width: 23em; margin: 0 auto; font-family: "Dosis", sans-serif; background-color: #b03a06; padding: 15px 10px; text-align: center; color: white; font-size: 14pt; border-radius: 20px; box-shadow: 10px 10px 12px -15px black; }';
    echo '.card { border-radius: 24px; background-color: rgb(var(--color-surface-100)); }';
    echo '.text-left { text-align: left; }';
    echo '.p-4 { padding: 1rem; }';
    echo '.inline-block { display: inline-block; }';
    echo '</style>';
    echo '<a href="https://whenplane.com/" style="text-decoration: none; color: inherit;">';
    echo $div->ownerDocument->saveHTML($div);
    echo '</a>';
    echo'<p>Timer courtesy of <a href="https://whenplane.com/" target="_blank">WhenPlane.com</a></p>';
    break;
  }
}
?>
