export default class PortCall {
  date: string;
  lastState: string;
  vesselName: string;
  constructor(date, lastState, vesselName) {
    this.date = new Date(date);
	  this.lastState = lastState;
    this.vesselName = vesselName;
  }

  getLastState(){
    console.log(this.lastState);
    return this.lastState;
  }

  getDate(){
	  return this.date;
  }

  getVesselName(){
    return this.vesselName;
  }

}
