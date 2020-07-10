import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import { HeartRateSensor } from "heart-rate";
import { today as td } from 'user-activity';
import { me as appbit } from "appbit";

import {battery} from "power";

// Update the clock every minute
clock.granularity = "seconds";

// Get a handle on the <text> element
const hrLabel = document.getElementById("hrLabel");
const minLabel = document.getElementById("minLabel");
const secLabel = document.getElementById("secLabel");

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const footStepLabel = document.getElementById("footStepLabel");
  footStepLabel.text = `${td.adjusted.steps}`;
  const caloriesLabel = document.getElementById("caloriesLabel");
  caloriesLabel.text = `${td.adjusted.calories}`;
  console.log(td.adjusted.calories);
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  let hours = hours;
  let mins = util.zeroPad(today.getMinutes());
  let sec = util.zeroPad(today.getSeconds());
  
  hrLabel.text = `${hours}`;
  minLabel.text = `${mins}`;
  secLabel.text = `${sec}`;
  
  const myMonth = document.getElementById("myMonth");
  const myDay = document.getElementById("myDay");

  let monthnum = today.getMonth();
  let day = today.getDate();
  var month = new Array();
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";  
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";
  let monthname = month[monthnum];
    myMonth.text = `${monthname}`;
    myDay.text = `${day}`; 
  
  const batteryLabel = document.getElementById("batteryLabel");
  batteryLabel.text = Math.floor(battery.chargeLevel)+"%";
}

let marquee = document.getElementById("marquee");
marquee.text = "Don't Worry Be Happy ! ! ! Laugh all time ! ! !";

setTimeout(function() {
  marquee.state = "enabled";
});

if (appbit.permissions.granted("access_activity")) {
  const heartRateLabel = document.getElementById("heartRateLabel");

  if (HeartRateSensor) {
    const hrm = new HeartRateSensor({ frequency: 1 });
    hrm.addEventListener("reading", () => {
      //console.log(`Current heart rate: ${hrm.heartRate}`);
      heartRateLabel.text = `${hrm.heartRate}`;
    });
    hrm.start();
  }

}




