import React from 'react';
import moment from 'moment';
import './calendar.css';

console.log('Prueba1');

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateObject: moment(),
            allMonths: moment.months(),
            selectedDay: null
        };
        
        this.weekdaysShortName = moment.weekdaysShort()
            .map(day => <th key={day} className="week-day">{day}</th>);
        this.currentDayF = this.currentDayF.bind(this);
        this.month = this.month.bind(this);
        this.year = this.year.bind(this);
        this.firstDayOfMonth = this.firstDayOfMonth.bind(this);
        this.makeBlanks = this.makeBlanks.bind(this);
        this.makeDays = this.makeDays.bind(this);

        this.lastDayOfMonth = moment(this.state.dateObject)
            .endOf("month").format("D");
        
        this.makeTableCalendar = this.makeTableCalendar.bind(this)

    }
    currentDayF = () => parseInt(this.state.dateObject.format("D"));
    month = () => this.state.dateObject.format("MMMM");
    year = () => this.state.dateObject.format("Y");
    firstDayOfMonth = () => moment(this.state.dateObject)
        .startOf("month").format("d");
    makeBlanks = () => {
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
            <td key={'blank'+i} className="calendar-day empty">{""}</td>);}
        return blanks;
    };
    makeDays = () => {
        let daysInMonth = [];
        for (let d = 1; d <= this.lastDayOfMonth; d++) {
            let currentDay = d === this.currentDayF() ? "today" : "";
            daysInMonth.push(
            <td key={'day'+d} className={`calendar-day ${currentDay}`}>{d}</td>)};
        return daysInMonth;
    };
    makeTableCalendar = () => {
        let totalSlots = [...this.makeBlanks(), ...this.makeDays()];
        let rows = [];
        let cells = [];
                
        totalSlots.forEach( (day, i) => {
            if (i % 7 !== 0) {
            cells.push(day); // if index not equal 7 that means not go to next week
            } else {
            rows.push(cells); // when reach next week we contain all td in last week to rows 
            cells = []; // empty container 
            cells.push(day); // in current loop we still push current row to new container
            }
            if (i === totalSlots.length - 1) { // when end loop we add remain date
            rows.push(cells);
            }
        });

        return rows.map((d, i) => <tr key= {'week'+i}>{d}</tr>);
    };

    render() {
        return (
            <div className='calendar-container'>
                <div className="calendar-navi">
                    <h2><span className="calendar-label">
                        {this.month()} </span>  
                        <span className="calendar-label">
                        {this.year()} </span>
                     </h2>
                </div>
                <table style={{width: '100%'}}>
                    <thead className=''>
                        <tr>{this.weekdaysShortName}</tr>
                    </thead>
                    <tbody className=''>{this.makeTableCalendar()}</tbody>
                </table>
            </div>
        );
    }
}