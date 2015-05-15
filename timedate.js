/**
 * Created by tyr on 28.04.2015.
 */
var timeStr, dateStr;
function clock(){
    now= new Date();

    hours= now.getHours();
    minutes= now.getMinutes();
    seconds= now.getSeconds();
    timeStr= ((hours < 10) ? "0" : "") + hours;

    timeStr+= ((minutes < 10) ? ":0" : ":") + minutes;
    timeStr+= ((seconds < 10) ? ":0" : ":") + seconds;
    document.clock.time.value = timeStr;

    date= now.getDate();
    month= now.getMonth()+1;
    year= now.getFullYear();
    dateStr= ((date < 10) ? "0" : "") + date;
    dateStr+= "." + ((month < 10) ? "0" : "") + month;
    dateStr+= "." + year;
    document.clock.date.value = dateStr;

    Timer= setTimeout("clock()",1000);
}