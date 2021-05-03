/* Hello and welcome to my project-calendar code! 

In this code, I have created a calendar (year-based) that the user can interact with by flipping through the months, selecting a day and adding/removing events from the chosen day.
Feel free to have a look around here!

Kind regards,
Lukas de Ruiter */


const date = new Date(); // This is the current date. It is used in the later functions to determine which year it is and how many days each month should have.
let chosenDayArray = []; // This array stores all the unique dayObjects. Each time the user adds or subtracts something, this array is pushed to the localStorage
let _theDayUserClicked = ""; // This variable is used to determine which day the user is viewing;
let dayEventWillBeAddedTo; //id of the day the user clicked


/* we use this function to check if there is any previous activity by the user. If this is true, then we use the localstorage array! */
function getLocalStorage(){
    if("calenderEvents" in localStorage){
        let alreadyMadeEvents = JSON.parse(localStorage.getItem("calenderEvents"));
        chosenDayArray = alreadyMadeEvents;
    }
    else{
        console.log("No localStorage detected");
    }
}


/* This long function is used 3 times: when opening the calendar and when going to the next or previous month. Here we determine how many days the chosen month has and create
a number of divs based on that */
const renderCalenderPerMonth = function(){
    date.setDate(1);

const month = date.getMonth();

const monthDays = document.querySelector(".days");

const firstDayIndex = date.getDay();
const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
const nextDays = 7 - lastDayIndex - 1;
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

const allTheMonthsArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

document.getElementById('currentMonthID').innerHTML = `${allTheMonthsArray[month]}`;
document.getElementById('currentDayID').innerHTML = new Date().toDateString();

let days = "";

for(let i = firstDayIndex; i > 0; i--){
    days += `<div class="prev-days">${prevLastDay - i + 1}</div>`;
}

for(let i = 1; i <= lastDay; i++){
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
        days += `<div class="today monthDays" id="${i}">${i}</div>`;
    }
    else{
    days += `<div class="monthDays" id="${i}">${i}</div>`;
    
    }
}

for(let i = 1; i <= nextDays; i++){
    days += `<div class="next-days">${i}</div>`;
    monthDays.innerHTML = days;
}

for(let x = 0; x < chosenDayArray.length; x++){
    if(chosenDayArray[x].month == date.getMonth() && chosenDayArray[x].amountOfEvents >= 1){
        document.getElementById(`${chosenDayArray[x].theDay}`).style.color = "green";
    }}


document.querySelectorAll('.monthDays').forEach(function(theDayUserClicked){
    theDayUserClicked.addEventListener('click', function(){
        resetDays();
        function resetDays(){
            let days = document.querySelectorAll('.monthDays');
            for(let i = 0; i < days.length; i++){
                days[i].style.border = "";
            }
        }
        theDayUserClicked.style.border = "3px solid var(--calenderRed)";
        dayEventWillBeAddedTo = theDayUserClicked.id;

        yourDay(theDayUserClicked.id);
    });
});

}

function removeAllText(textContainer){
    while(textContainer.firstChild){
        textContainer.removeChild(textContainer.firstChild);
    }
}

/* Here we set the month when swapping through them and redo the previous function! */
document.getElementById('leftBtnID').addEventListener('click', function(){
    date.setMonth(date.getMonth() - 1);
    renderCalenderPerMonth();
});

/* Here we set the month when swapping through them and redo the previous function! */
document.getElementById('rightBtnID').addEventListener('click', function(){
    date.setMonth(date.getMonth() + 1);
    renderCalenderPerMonth();
});




/* Here I create an array of unique objects, equal to 365 days of the year. This is used to store events and gets pushed to the localStorage later on. */
function makeUniqueDays(){
    let yourYear = new Date();

    yourYear.setMonth(0);
    let lastDay = new Date(yourYear.getFullYear(), yourYear.getMonth() + 1, 0).getDate();
for(let i = 0; i <= 11; i ++){ 
    yourYear.setMonth(i);
    lastDay = new Date(yourYear.getFullYear(), yourYear.getMonth() + 1, 0).getDate();
    for(let j = 1; j <= lastDay; j++){
    let day = {
        month: i,
        theDay: j,
        title: [],
        time: [],
        description: [],
        amountOfEvents: 0,
    }
    chosenDayArray.push(day);
}
}
}

/* Here we invoke the main functions. First, we make the ObjectArray, then we see it this should be overwritten by the localstorage, lastly we create the calendar day divs*/
makeUniqueDays();
getLocalStorage();
renderCalenderPerMonth();

/* The user get to add new events here, that are stored in the ObjectArray ChosenDayArray */
document.getElementById('addNewEventID').addEventListener('click', function(){
    if(_theDayUserClicked == ""){
        alert("Please select a day first!");
    }
    else{
    addNewEventID.style.display = "none";
    document.getElementById('userInputContainerID').style.display = "flex";
    }
})
/* part 2 of making an event */
document.getElementById('eventSubmit').addEventListener('click', function(){
    if(document.getElementById('eventTitle').value == "" || document.getElementById('eventTime').value == "" || document.getElementById('eventDescription').value == ""){
        alert("Please fill in all options!");
    }
    else{
    document.getElementById('userInputContainerID').style.display = "none";
    document.getElementById('addNewEventID').style.display = "flex";
    chosenDayArray[_theDayUserClicked].title.push(document.getElementById('eventTitle').value);
    chosenDayArray[_theDayUserClicked].time.push(document.getElementById('eventTime').value);
    chosenDayArray[_theDayUserClicked].description.push(document.getElementById('eventDescription').value);
    chosenDayArray[_theDayUserClicked].amountOfEvents += 1;
    if(chosenDayArray[_theDayUserClicked].amountOfEvents >= 1){
        document.getElementById(`${chosenDayArray[_theDayUserClicked].theDay}`).style.color = "green";
    }
    yourDay(dayEventWillBeAddedTo);
    document.getElementById('eventTitle').value = "";
    document.getElementById('eventTime').value = "";
    document.getElementById('eventDescription').value = "";
    localStorage.setItem('calenderEvents', JSON.stringify(chosenDayArray));
}
})

/* Here we check what day the user clicked and then browse through the ObjectArray to match it with one of the days saved. Then, we .innerHTML the keyvalues of that day on the
right side of the calendar */
function yourDay(theDayYouNeed){
    for(let i = 0; i < chosenDayArray.length; i++){
        if(chosenDayArray[i].month == date.getMonth() && chosenDayArray[i].theDay == theDayYouNeed){
            _theDayUserClicked = i;
            removeAllText(document.getElementById('theDayUserClickedTextContainerID'));
            console.log(chosenDayArray[i]);
            for(let j = 0; j < chosenDayArray[i].title.length; j++){
                let _eventContainer = document.createElement("div");
                let _eventTitle = document.createElement("h2");
                let _eventTime = document.createElement("h3");
                let _eventDescription = document.createElement("p");
                let _removeEventBtn = document.createElement("button");
                _eventContainer.classList.add("containers");
                _removeEventBtn.classList.add("deleteBtn");
                _eventTitle.classList.add("titles");
                _eventTime.classList.add("times");
                _eventDescription.classList.add("descriptions");
                _removeEventBtn.innerHTML = "Delete event";
                _eventTitle.innerHTML = `${chosenDayArray[i].title[j]}`;
                _eventTime.innerHTML = `${chosenDayArray[i].time[j]}`;
                _eventDescription.innerHTML = `${chosenDayArray[i].description[j]}`;
                _removeEventBtn.addEventListener('click', function(){
                    if(confirm("Would you like to delete this event from your calendar?")){
                    _eventTitle.remove();
                    _eventTime.remove();
                    _eventDescription.remove();
                    _removeEventBtn.remove();
                    _eventContainer.remove();
                    chosenDayArray[i].title.splice([j], 1);
                    chosenDayArray[i].time.splice([j], 1);
                    chosenDayArray[i].description.splice([j], 1);
                    chosenDayArray[i].amountOfEvents -= 1;
                    localStorage.setItem('calenderEvents', JSON.stringify(chosenDayArray));
                    for(let x = 0; x < chosenDayArray.length; x++){
                        if(chosenDayArray[x].month == date.getMonth() && chosenDayArray[x].amountOfEvents == 0){
                            document.getElementById(`${chosenDayArray[x].theDay}`).style.color = "white";
                        }}}
                })
                document.getElementById('theDayUserClickedTextContainerID').appendChild(_eventContainer);
                _eventContainer.appendChild(_eventTitle);
                _eventContainer.appendChild(_eventTime);
                _eventContainer.appendChild(_eventDescription);
                _eventContainer.appendChild(_removeEventBtn);
            } 
        }
        else{
            console.log('no match');
        }
    }
}

/* These are the selectors for the differents colors that can be chosen by the user */
document.getElementById("redID").addEventListener('click', function(){
    document.documentElement.style.setProperty('--calenderRed', 'rgb(138, 39, 39)');
})

document.getElementById("blueID").addEventListener('click', function(){
    document.documentElement.style.setProperty('--calenderRed', 'rgb(39, 79, 138)');
})

document.getElementById("purpleID").addEventListener('click', function(){
    document.documentElement.style.setProperty('--calenderRed', 'rgb(98, 39, 138)');
})

document.getElementById("yellowID").addEventListener('click', function(){
    document.documentElement.style.setProperty('--calenderRed', 'rgb(138, 128, 39)');
})

document.getElementById("orangeID").addEventListener('click', function(){
    document.documentElement.style.setProperty('--calenderRed', 'rgb(138, 84, 39)');
})

document.getElementById("tealID").addEventListener('click', function(){
    document.documentElement.style.setProperty('--calenderRed', 'rgb(39, 131, 138)');
})