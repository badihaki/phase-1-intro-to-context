// Your code here
function createEmployeeRecord(employeeArray){
    const employee = {};
    employee[`firstName`] = employeeArray[0];
    employee[`familyName`] = employeeArray[1];
    employee[`title`] = employeeArray[2];
    employee[`payPerHour`] = employeeArray[3];
    employee[`timeInEvents`] = [];
    employee[`timeOutEvents`] = [];

    return employee;
}

function createEmployeeRecords(employees){
    let employeeRecords = [];
    for(let employee of employees){
        employeeRecords.push(createEmployeeRecord(employee));
    }
    return employeeRecords;
}

function createTimeInEvent(employeeRecord, date){
    const day = [...date];
    day.splice(10);
    const hour = [...date];
    hour.splice(0,11);
    const timeInEvent = {
        type : 'TimeIn',
        hour : Number(hour.join('')),
        date : day.join('')
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, date){
    const day = [...date];
    day.splice(10);
    const hour = [...date];
    hour.splice(0,11);
    const timeOutEvent = {
        type : 'TimeOut',
        hour : Number(hour.join('')),
        date : day.join('')
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date){
    // Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    /*
        take day of 'date', and find that day in the employeeRecord.timeInEvents
            put the hour in const hourIn
        take day of 'date' and find that day in employeeRecord.timeOutEvents
            put the hour in const hourOut
        return hourIn - hourOut
    */
   /*
   const hourIn = ()=>{
       for(const day of employeeRecord.timeInEvents)
       if(day === date) return employeeRecord[`timeInEvents`][day][`hour`];
   }
   console.log(hourIn);
   const hourOut = ()=>{
    for(const day of employeeRecord.timeOutEvents)
    if(day === date) return employeeRecord[`timeOutEvents`][day][`hour`];
   }
   const hourIn = employeeRecord[`timeInEvents`][date][`hour`];
   const hourOut = employeeRecord[`timeOutEvents`][date][`hour`];
   */
  const hourIn = employeeRecord.timeInEvents.find(event=>{
    if(event.date === date){
        //console.log(Number(event.hour));
        //console.log(`in hour ^^^`)
        return Number(event.hour);
    }
    });
  const hourOut = employeeRecord.timeOutEvents.find(event=>{
    if(event.date === date){
        //console.log(Number(event.hour));
        //console.log(`out hour ^^^`)
        return Number(event.hour);
    }
    });
    //console.log(`in hour(${hourIn}) - out hour(${hourOut})`)
   const workHour = (hourOut.hour - hourIn.hour) * .01;
   return workHour;
}

function wagesEarnedOnDate(employeeRecord, date){
    // console.log(employeeRecord.payPerHour);
    let payOwed = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return payOwed;
}

function allWagesFor(employeeRecord){
    // add up all pay of each date in employeeRecord
    // then use reduce() to find the final value
    const daysPay = [];
    for(let record of employeeRecord.timeInEvents){
        daysPay.push(wagesEarnedOnDate(employeeRecord, record.date));
    }
    return daysPay.reduce(
        (accumulation,value)=>{
            return accumulation + value;
        }
    )
}

function calculatePayroll(employeeRecords){
    // we're using reduce again
    let moneyOwed = []
    for(let employee of employeeRecords){
        // allWagesFor(employee);
        moneyOwed.push(allWagesFor(employee));
    }
    return moneyOwed.reduce(
        (accumulation, value)=>{
            return accumulation + value;
        }
    )
}

function testCase(){
    /*
    const cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27]);
    createTimeInEvent(cRecord, "0044-03-14 0900");
    createTimeOutEvent(cRecord, "0044-03-14 1100");

    createTimeInEvent(cRecord, "0044-03-15 0900");
    createTimeOutEvent(cRecord, "0044-03-15 2100")
    return cRecord;
    */
    let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
    let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

    createTimeInEvent(sRecord, "2019-01-01 0900")
    createTimeOutEvent(sRecord, "2019-01-01 1300")
    createTimeInEvent(sRecord, "2019-01-02 1000")
    createTimeOutEvent(sRecord, "2019-01-02 1300")

    createTimeInEvent(rRecord, "2019-01-11 0900")
    createTimeOutEvent(rRecord, "2019-01-11 1300")
    createTimeInEvent(rRecord, "2019-01-12 1000")
    createTimeOutEvent(rRecord, "2019-01-12 1300")

    return [rRecord,sRecord];
}
console.log(calculatePayroll(testCase()));