# elite-schedule
This is made as part of a pluralsight course by Steve Michelotti. The major difference in the course and this project  is the router based navigation instead of Navcontroller among other differences between Ionic 2 (in the course) and Ionic 6 here.

What is elite schedule app

This is a menu based application to follow teams and tournaments. The home page contains the list of teams followed.
1. I can click a button to find tournaments. The tournaments are fetched from the backend and listed on the screen. 
2. I can click on one tournament to look at the teams in that tournament. The teams are arranged by the division, and I can search teams as well.
3. Clicking on a team leads to details of the team - matches with other teams with date and time, scores, win-loss indicator, the coach and I can filter teams by date
4. I can follow/unfollow a team and I get a toast/notification that states the action taken. Any teams followed/unfollowed are listed on the home page for quick navigation.
5. Clicking on an item in the team details takes me to the particular game played. it lists the home and away teams and the scores of each team. It has the location of the venue
6. Clicking on the location takes me to the google maps and marks the location on the map
7. All pages have a back button and the team details has an additional home button as well.


What did I learn in this course
1. Why Ionic
2. Setting up an Ionic project
3. Navigation - When the course was made it used NavController. I used the recommended router based navigation
4. The backend used was Firebase. I uploaded a json file that was provided by the course. RxJS and Lodash were used in processing data.
5. Got to know about the different ionic components(cards,badges, grids, list dividers, etc). I looked up the current ionic documentation to implement various functionalities. For example, using async await way of Loading
   controller, ToastController, Refresher, that was different from Ionic 2
6. Worked with local storage and Google Maps.

Todo: 
1. Styling of home page
2. Geolocation
3. Child route navigation for Teams and Standings
4. Add items in menu to navigate directly

PLEASE NOTE : You need an API key for AgmCoreModule. I have put 'YOUR KEY' in the app.module.ts page while checking in.

For more info, you can take a look at the project.


  
