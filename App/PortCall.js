export default class PortCall {
  date: string;
  stateType: string;
  constructor(date, stateType) {
      this.date = new Date(date);
	  this.stateType = stateType;
  }
  
  getDate(){
	  return this.date;
  }
  
}