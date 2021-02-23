var dateFormat = require('dateformat');
const cron = require("node-cron");
const colors = require("colors");

cron.schedule('* * * * * *', () => {
    var day=dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    console.log('1- running a task every second: ', day.green);
});

/*

 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *

*/