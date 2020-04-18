import React from 'react';
import moment from 'moment';
import './calendar.css';

const weekdayshort = moment.weekdaysShort();

let weekdayshortname = weekdayshort.map(day => {
    return (
      <th key={day} className="week-day">
       {day}
      </th>
    );
 });

export default class Calendar extends React.Component {
    render() {
        return (
            <div className='calendar-container'>
                <h2>Calendar</h2>
                <div className='row'>
                    {weekdayshortname}
                </div>
            </div>
        );
    }
}