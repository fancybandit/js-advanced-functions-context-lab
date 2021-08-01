function createEmployeeRecord(employeeInfo) {
    return {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(employeesInfo) {
    return employeesInfo.map(e => createEmployeeRecord(e));
};

function createTimeInEvent(dateStamp) {
    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    };
    this.timeInEvents.push(timeInEvent);
    return this;
};

function createTimeOutEvent(dateStamp) {
    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
};

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(e => e.date === date).hour;
    const timeOut = this.timeOutEvents.find(e => e.date === date).hour;
    return (timeOut - timeIn) / 100;
};

function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
};

function findEmployeeByFirstName(employeesRecords, firstName) {
    return employeesRecords.find(e => e.firstName === firstName);
};

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function(total, e) {
        const dates = e.timeInEvents.map(e => e.date);
        const wage = dates.reduce(function(total, date) {
            return wagesEarnedOnDate.call(e, date) + total;
        }, 0);

        return wage + total;
    }, 0);
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}