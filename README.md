![WanShowBingo Logo](/client/images/wanshowbingo-b.png)

# WanShowBingo
The source code for the wan show bingo client. https://www.wanshow.bingo/

## Client
The client works by picking random squares from an array.

As of right now, there is no right squares / wrong squares logic, but I want to add a way to moderate that in the (nearterm) future. That would involve tracking each game from the server side.

## Server
The server side is really just a websocket counter and some data logging to see how many players are online at what times.

## Discord
Join our discord @ https://discord.gg/pWS5mw7jFz

## Roadmap
The current ideas/trajectory are as follows

1. Re-implement websocket functions to detect current amount of live viewers and analytics for tiles being selected.
2. Check selected tiles against other users selected tiles to detect cheaters
3. Introduce Account System & Discord Account Linking for Roles/Ranking in Discord Server
4. Introduce Site Leaderboard (https://leaderboards.wanshow.bingo/ ?) to display top site users.
5. Add Functionality to export Bingo Card as png/jpg to share - Social Media share options?

## Originally by OSTycoon
This repository is forked, and was originally created and maintained by @OSTycoon but https://www.wanshowbingo.com/ has since gone offline.
