![WanShowBingo white Logo](https://wanshow.bingo/resources/images/wanshowbingo-w.png) ![WanShowBingo black Logo](https://wanshow.bingo/resources/images/wanshowbingo-b.png)

# WanShowBingo
The source code for the wan show bingo client & server. https://www.wanshow.bingo/

## Client
The client works by picking random squares from an array.

As of right now, there is no right squares / wrong squares logic, but I want to add a way to moderate that in the (nearterm) future. That would involve tracking each game from the server side.

## Server
Currently the Server Side is a Socket.io server which tracks current connections (Limit 1 Per IP to prevent abuse) with plans to add an Account Authentication System in the future and track users Stats & Display a Leaderboard. (Current ideas to prevent cheating is to check against other user's cards and the timestamps of which the tile was clicked. Others is to have Community Moderators who partake in watching wan show validate which tiles can be checked by users to validate winning cards.)

## Discord
Join our discord @ https://discord.gg/pWS5mw7jFz

## Roadmap
The current ideas/trajectory are as follows

~~1. Re-implement websocket functions to detect current amount of live viewers and analytics for tiles being selected.
1. Check selected tiles against other users selected tiles to detect cheaters
2. Introduce Account System & Discord Account Linking for Roles/Ranking in Discord Server (Possibly use Discord as the sole solution to login with SSO?)
3. Introduce Site Leaderboard (https://leaderboards.wanshow.bingo/ ?) to display top site users.
4. Add Functionality to export Bingo Card as png/jpg to share - Social Media share options?

## Originally by OSTycoon
This repository is forked, and was originally created and maintained by @OSTycoon but https://www.wanshowbingo.com/ has since gone offline.
