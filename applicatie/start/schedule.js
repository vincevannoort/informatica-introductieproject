// import schedule from 'node-schedule'
var schedule = require('node-schedule')

schedule.scheduleJob('0 * * * *', function(){
  console.log('Should every hour, will be used to update statistics')
})
