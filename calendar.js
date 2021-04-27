const date = new Date();

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
    console.log(chosenDayArray);
})


let days = "";

for(let i = firstDayIndex; i > 0; i--){
    days += `<div class="prev-days">${prevLastDay - i + 1}</div>`;
}

for(let i = 1; i <= lastDay; i++){
    if(i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
        days += `<div class="today monthDays" id="day${i}">${i}</div>`;
    }
    else{
    days += `<div class="monthDays" id="day${i}">${i}</div>`;
    }
}

for(let i = 1; i <= nextDays; i++){
    days += `<div class="next-days">${i}</div>`;
    monthDays.innerHTML = days;
}

document.querySelectorAll('.monthDays').forEach(function(theDayUserClicked){
    theDayUserClicked.addEventListener('click', function(){
        console.log(theDayUserClicked.id);
        console.log(date.getMonth());
    });
});

}

document.getElementById('leftBtnID').addEventListener('click', function(){
    date.setMonth(date.getMonth() - 1);
    renderCalenderPerMonth();
});

document.getElementById('rightBtnID').addEventListener('click', function(){
    date.setMonth(date.getMonth() + 1);
    renderCalenderPerMonth();
});

renderCalenderPerMonth();

let chosenDayArray = [];


function makeUniqueDays(){
    let yourYear = new Date();
    console.log(yourYear.getFullYear());

    yourYear.setMonth(0);
    let lastDay = new Date(yourYear.getFullYear(), yourYear.getMonth() + 1, 0).getDate();
    //let lastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
for(let i = 0; i <= 11; i ++){ 
    yourYear.setMonth(i);
    lastDay = new Date(yourYear.getFullYear(), yourYear.getMonth() + 1, 0).getDate();
    for(let j = 1; j <= lastDay; j++){
    let day = {
        month: i,
        day: j,
        title: "",
        time: "",
        description: '',
    }
    chosenDayArray.push(day);
}


console.log(lastDay);
}
}

makeUniqueDays();

