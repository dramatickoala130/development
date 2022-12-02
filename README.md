# Development

### Link to Deployed Website
https://dramatickoala130.github.io/development/

### Goal and Value of the Application
Yoga Poses is an application for users who are interested in yoga. Whether you are a a beginner or have been practicing for years, this website has a library of different poses. You can filter the poses out based on their type, ex. whether you are standing, sitting, laying on your back, etc. and based on the parts of the body the pose targets such as the arms, back, hips, etc. You can sort the poses by popularity or by level. You are able to select your favorite poses and view the total amount of seconds it takes to hold all of your favorites combined. This will allow you to plan out your session.

### Usability Principles Considered
Usability was definitely a factor when designing this application. To maintain a sleek design and limit the amount of words on the screen, I was mindfull of using terms that are well known so users would understand the puropse of the filter category or the sorting category. It has an intuitive layout with the main part of the application taking up the middle and right side of the screen with a stationay left navigation bar.

### Organization of Components
There is one componenet in my program and it is for each of the poses displayed in the application. Each pose had the exa t same format with name, type, level, benefits, etc. and it was more efficient to create that template and then in App to pass in all the information from the json to populate the screen with the cards of poses. 

### How Data is Passed Down Through Components
When the page is loaded, the json containing all the data for each of the poses is iterated through. The information of each pose is passed into the Pose componenet, I like to think of it as a template, and then generated based on the corresponding values.

### How the User Triggers State Changes
I used 5 state changes. The first one being setType, depending on the filter category the user selects, this state will represent that category. For setTotalSeconds, when a user selects an item to be their favorite, the seconds for that item is added to this state to keep track of the total seconds in favorites. For setNames, this state keeps track of all the names of the poses selected as favorites. For setSelected, this state helps keep track the state of the radio buttons used for sorting. For setTypesList, this state keeps track of the list of filters that are on to accurately display the poses to the user.

### Note About Sorting Functionality
On lines 110-111, I commented out the sode that would satifsy the sorting feature of the application. I tested it without the filtering and was able to get it to work with the radio buttons, however, combining the filtering functionality and the sorting breaks the application, so I have removed it altogether.