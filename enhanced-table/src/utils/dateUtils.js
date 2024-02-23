export const convertDate = (dateToBeConverted) => {
var monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var month = dateToBeConverted.getMonth(); 
var day = dateToBeConverted.getDate();
var year = dateToBeConverted.getFullYear(); 


var monthStr = monthNames[month];
var dayStr = String(day);
var yearStr = String(year); 

var formattedDate = monthStr + " " + dayStr + ", " + yearStr;

return formattedDate;
};
