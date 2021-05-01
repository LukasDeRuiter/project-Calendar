const date = new Date();
let chosenDayArray = [];
let _theDayUserClicked = "";
let dayEventWillBeAddedTo;


function getLocalStorage(){
    if("calenderEvents" in localStorage){
        let alreadyMadeEvents = JSON.parse(localStorage.getItem("calenderEvents"));
        chosenDayArray = alreadyMadeEvents;
    }
    else{
        console.log("No localStorage detected");
    }
}


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


document.getElementById("test").addEventListener('click', function(){
    let alreadyMadeEvents = JSON.parse(localStorage.getItem("calenderEvents"));
    chosenDayArray = alreadyMadeEvents;
})


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
        theDayUserClicked.style.border = "3px solid red";
        dayEventWillBeAddedTo = theDayUserClicked.id;
        console.log(dayEventWillBeAddedTo);

        yourDay(theDayUserClicked.id);
        //document.getElementById('').innerHTML = `${}`;
        //document.getElementById('').innerHTML = `${}`;
    });
});

}

function removeAllText(textContainer){
    while(textContainer.firstChild){
        textContainer.removeChild(textContainer.firstChild);
    }
}

document.getElementById('leftBtnID').addEventListener('click', function(){
    date.setMonth(date.getMonth() - 1);
    renderCalenderPerMonth();
});

document.getElementById('rightBtnID').addEventListener('click', function(){
    date.setMonth(date.getMonth() + 1);
    renderCalenderPerMonth();
});





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

makeUniqueDays();
getLocalStorage();
renderCalenderPerMonth();


document.getElementById('addNewEventID').addEventListener('click', function(){
    addNewEventID.style.display = "none";
    document.getElementById('userInputContainerID').style.display = "flex";
})

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
            console.log('damn');
        }
    }
}