import React, { Component } from 'react';
import { render } from 'react-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import '../../index.css';

// The Classes page for our gym application
// Here the user can view the class available at the gym
// via a Calendar

// set up the localizer by providing the moment Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

export default class Classes extends Component {
  constructor(props){
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      popoverOpen: true
    };
  
    const now = new Date();
    // different classes available (inc title, date)
    // could implement recurrenceRule to have classes automatically updated
    const events = [
      {
        id: 1,
        title: 'Weightlifting Session',
        start: new Date(2020, 1, 3, 19, 30, 0),
        end: new Date(2020, 1, 3, 20, 30, 0),
        recurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=3'
      },
      {
        id: 2,
        title: 'Cardio Session',
        start: new Date(2020, 1, 4, 19, 30, 0),
        end: new Date(2020, 1, 4, 20, 30, 0),
        recurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=3'
      },
      {
        id: 3,
        title: 'Spinning Session',
        start: new Date(2020, 1, 5, 19, 30, 0),
        end: new Date(2020, 1, 5, 20, 30, 0),
        recurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=3'
      },
      {
        id: 4,
        title: 'Weightlifting Session',
        start: new Date(2020, 1, 6, 19, 30, 0),
        end: new Date(2020, 1, 6, 20, 30, 0),
        description: 'This is a test description of an event',
      },
      {
        id: 5,
        title: 'Cardio Session',
        start: new Date(2020, 1, 7, 19, 30, 0),
        end: new Date(2020, 1, 7, 20, 30, 0),
      },
      {
        id: 6,
        title: 'Spinning Session',
        start: new Date(2020, 1, 10, 19, 30, 0),
        end: new Date(2020, 1, 10, 20, 30, 0),
        description: 'This is a test description of an event',
      },
      {
        id: 7,
        title: 'Weightlifting Session',
        start: new Date(2020, 1, 11, 19, 30, 0),
        end: new Date(2020, 1, 11, 20, 30, 0),
        description: 'This is a test description of an event',
      },
      {
        id: 8,
        title: 'Cardio Session',
        start: new Date(2020, 1, 12, 19, 30, 0),
        end: new Date(2020, 1, 12, 20, 30, 0),
      },
      {
        id: 9,
        title: 'Spinning Session',
        start: new Date(2020, 1, 13, 19, 30, 0),
        end: new Date(2020, 1, 13, 20, 30, 0),
      },
      {
        id: 10,
        title: 'Weightlifting Session',
        start: new Date(2020, 1, 14, 19, 30, 0),
        end: new Date(2020, 1, 14, 20, 30, 0),
      },
      {
        id: 11,
        title: 'Cardio Session',
        start: new Date(2020, 1, 17, 19, 30, 0),
        end: new Date(2020, 1, 17, 20, 30, 0),
      },
      {
        id: 12,
        title: 'Spinning Session',
        start: new Date(2020, 1, 18, 19, 30, 0),
        end: new Date(2020, 1, 18, 20, 30, 0),
      },
      {
        id: 13,
        title: 'Weightlifting Session',
        start: new Date(2020, 1, 19, 19, 30, 0),
        end: new Date(2020, 1, 19, 20, 30, 0),
      },
      {
        id: 14,
        title: 'Cardio Session',
        start: new Date(2020, 1, 20, 19, 30, 0),
        end: new Date(2020, 1, 20, 20, 30, 0),
      },
      {
        id: 15,
        title: 'Spinning Session',
        start: new Date(2020, 1, 21, 19, 30, 0),
        end: new Date(2020, 1, 21, 20, 30, 0),
      },
      {
        id: 16,
        title: 'Weightlifting Session',
        start: new Date(2020, 1, 24, 19, 30, 0),
        end: new Date(2020, 1, 24, 20, 30, 0),
      },
      {
        id: 17,
        title: 'Cardio Session',
        start: new Date(2020, 1, 25, 19, 30, 0),
        end: new Date(2020, 1, 25, 20, 30, 0),
      },
      {
        id: 18,
        title: 'Spinning Session',
        start: new Date(2020, 1, 26, 19, 30, 0),
        end: new Date(2020, 1, 26, 20, 30, 0),
      },
      {
        id: 19,
        title: 'Weightlifting Session',
        start: new Date(2020, 1, 27, 19, 30, 0),
        end: new Date(2020, 1, 27, 20, 30, 0),
      },
      {
        id: 20,
        title: 'Cardio Session',
        start: new Date(2020, 1, 28, 19, 30, 0),
        end: new Date(2020, 1, 28, 20, 30, 0),
      },
      {
        id: 21,
        title: 'Spinning Session',
        start: new Date(2020, 2, 2, 19, 30, 0),
        end: new Date(2020, 2, 2, 20, 30, 0),
      },
      {
        id: 22,
        title: 'Weightlifting Session',
        start: new Date(2020, 1, 19, 19, 30, 0),
        end: new Date(2020, 1, 19, 20, 30, 0),
      },
      {
        id: 23,
        title: 'Cardio Session',
        start: new Date(2020, 2, 3, 19, 30, 0),
        end: new Date(2020, 2, 3, 20, 30, 0),
      },
      {
        id: 24,
        title: 'Spinning Session',
        start: new Date(2020, 2, 4, 19, 30, 0),
        end: new Date(2020, 2, 4, 20, 30, 0),
      },
      {
        id: 25,
        title: 'Weightlifting Session',
        start: new Date(2020, 2, 5, 19, 30, 0),
        end: new Date(2020, 2, 5, 20, 30, 0),
      },
      {
        id: 26,
        title: 'Cardio Session',
        start: new Date(2020, 2, 6, 19, 30, 0),
        end: new Date(2020, 2, 6, 20, 30, 0),
      },
      {
        id: 27,
        title: 'Spinning Session',
        start: new Date(2020, 2, 9, 19, 30, 0),
        end: new Date(2020, 2, 9, 20, 30, 0),
      },
      {
        id: 28,
        title: 'Weightlifting Session',
        start: new Date(2020, 2, 10, 19, 30, 0),
        end: new Date(2020, 2, 10, 20, 30, 0),
      },
      {
        id: 29,
        title: 'Cardio Session',
        start: new Date(2020, 2, 11, 19, 30, 0),
        end: new Date(2020, 2, 11, 20, 30, 0),
      },
      {
        id: 30,
        title: 'Spinning Session',
        start: new Date(2020, 2, 12, 19, 30, 0),
        end: new Date(2020, 2, 12, 20, 30, 0),
      },
      {
        id: 31,
        title: 'Weightlifting Session',
        start: new Date(2020, 2, 13, 19, 30, 0),
        end: new Date(2020, 2, 13, 20, 30, 0),
      },
      {
        id: 32,
        title: 'Cardio Session',
        start: new Date(2020, 2, 16, 19, 30, 0),
        end: new Date(2020, 2, 16, 20, 30, 0),
      },
      {
        id: 33,
        title: 'Spinning Session',
        start: new Date(2020, 2, 17, 19, 30, 0),
        end: new Date(2020, 2, 17, 20, 30, 0),
      },
      {
        id: 34,
        title: 'Weightlifting Session',
        start: new Date(2020, 2, 18, 19, 30, 0),
        end: new Date(2020, 2, 18, 20, 30, 0),
      },
      {
        id: 35,
        title: 'Cardio Session',
        start: new Date(2020, 2, 19, 19, 30, 0),
        end: new Date(2020, 2, 19, 20, 30, 0),
      },
      {
        id: 36,
        title: 'Spinning Session',
        start: new Date(2020, 2, 20, 19, 30, 0),
        end: new Date(2020, 2, 20, 20, 30, 0),
      },
      {
        id: 37,
        title: 'Weightlifting Session',
        start: new Date(2020, 2, 23, 19, 30, 0),
        end: new Date(2020, 2, 23, 20, 30, 0),
      },
      {
        id: 38,
        title: 'Weightlifting Session',
        start: new Date(2020, 2, 24, 19, 30, 0),
        end: new Date(2020, 2, 24, 20, 30, 0),
      },
      {
        id: 39,
        title: 'Cardio Session',
        start: new Date(2020, 2, 25, 19, 30, 0),
        end: new Date(2020, 2, 25, 20, 30, 0),
      },
      {
        id: 40,
        title: 'Spinning Session',
        start: new Date(2020, 2, 26, 19, 30, 0),
        end: new Date(2020, 2, 26, 20, 30, 0),
      },
      {
        id: 41,
        title: 'Weightlifting Session',
        start: new Date(2020, 2, 27, 19, 30, 0),
        end: new Date(2020, 2, 27, 20, 30, 0),
      },
      {
        id: 41,
        title: 'Weightlifting Session',
        start: new Date(2020, 2, 30, 19, 30, 0),
        end: new Date(2020, 2, 30, 20, 30, 0),
      },
      {
        id: 41,
        title: 'Weightlifting Session',
        start: new Date(2020, 2, 31, 19, 30, 0),
        end: new Date(2020, 2, 31, 20, 30, 0),
      },
      {
        id: 42,
        title: 'Cardio Session',
        start: new Date(2020, 3, 1, 19, 30, 0),
        end: new Date(2020, 3, 1, 20, 30, 0),
      },
      {
        id: 43,
        title: 'Spinning Session',
        start: new Date(2020, 3, 2, 19, 30, 0),
        end: new Date(2020, 3, 2, 20, 30, 0),
      },
      {
        id: 44,
        title: 'Spinning Session',
        start: new Date(2020, 3, 3, 19, 30, 0),
        end: new Date(2020, 3, 3, 20, 30, 0),
      },
      {
        id: 45,
        title: 'Spinning Session',
        start: new Date(2020, 3, 6, 19, 30, 0),
        end: new Date(2020, 3, 6, 20, 30, 0),
      },
      {
        id: 46,
        title: 'Weightlifting Session',
        start: new Date(2020, 3, 7, 19, 30, 0),
        end: new Date(2020, 3, 7, 20, 30, 0),
      },
      {
        id: 47,
        title: 'Cardio Session',
        start: new Date(2020, 3, 8, 19, 30, 0),
        end: new Date(2020, 3, 8, 20, 30, 0),
      },
      {
        id: 48,
        title: 'Spinning Session',
        start: new Date(2020, 3, 9, 19, 30, 0),
        end: new Date(2020, 3, 9, 20, 30, 0),
      },
      {
        id: 49,
        title: 'Weightlifting Session',
        start: new Date(2020, 3, 10, 19, 30, 0),
        end: new Date(2020, 3, 10, 20, 30, 0),
      },
      {
        id: 50,
        title: 'Cardio Session',
        start: new Date(2020, 3, 13, 19, 30, 0),
        end: new Date(2020, 3, 13, 20, 30, 0),
      },
      {
        id: 51,
        title: 'Spinning Session',
        start: new Date(2020, 3, 14, 19, 30, 0),
        end: new Date(2020, 3, 14, 20, 30, 0),
      },
      {
        id: 52,
        title: 'Weightlifting Session',
        start: new Date(2020, 3, 15, 19, 30, 0),
        end: new Date(2020, 3, 15, 20, 30, 0),
      },
      {
        id: 54,
        title: 'Cardio Session',
        start: new Date(2020, 3, 16, 19, 30, 0),
        end: new Date(2020, 3, 16, 20, 30, 0),
      },
      {
        id: 55,
        title: 'Spinning Session',
        start: new Date(2020, 3, 17, 19, 30, 0),
        end: new Date(2020, 3, 17, 20, 30, 0),
      },
      {
        id: 56,
        title: 'Weightlifting Session',
        start: new Date(2020, 3, 20, 19, 30, 0),
        end: new Date(2020, 3, 20, 20, 30, 0),
      },
      {
        id: 57,
        title: 'Cardio Session',
        start: new Date(2020, 3, 21, 19, 30, 0),
        end: new Date(2020, 3, 21, 20, 30, 0),
      },
      {
        id: 58,
        title: 'Spinning Session',
        start: new Date(2020, 3, 22, 19, 30, 0),
        end: new Date(2020, 3, 22, 20, 30, 0),
      },
      {
        id: 59,
        title: 'Weightlifting Session',
        start: new Date(2020, 3, 23, 19, 30, 0),
        end: new Date(2020, 3, 23, 20, 30, 0),
      },
      {
        id: 60,
        title: 'Cardio Session',
        start: new Date(2020, 3, 24, 19, 30, 0),
        end: new Date(2020, 3, 24, 20, 30, 0),
      },
      {
        id: 61,
        title: 'Spinning Session',
        start: new Date(2020, 3, 27, 19, 30, 0),
        end: new Date(2020, 3, 27, 20, 30, 0),
      },
      {
        id: 62,
        title: 'Weightlifting Session',
        start: new Date(2020, 3, 28, 19, 30, 0),
        end: new Date(2020, 3, 28, 20, 30, 0),
      },
      {
        id: 63,
        title: 'Cardio Session',
        start: new Date(2020, 3, 29, 19, 30, 0),
        end: new Date(2020, 3, 29, 20, 30, 0),
      },
      {
        id: 64,
        title: 'Spinning Session',
        start: new Date(2020, 3, 30, 19, 30, 0),
        end: new Date(2020, 3, 30, 20, 30, 0),
      },
      {
        id: 65,
        title: 'Weightlifting Session',
        start: new Date(2020, 3, 31, 19, 30, 0),
        end: new Date(2020, 3, 31, 20, 30, 0),
      },
      {
        id: 66,
        title: 'Cardio Session',
        start: new Date(2020, 4, 4, 19, 30, 0),
        end: new Date(2020, 4, 4, 20, 30, 0),
      },
      {
        id: 67,
        title: 'Spinning Session',
        start: new Date(2020, 4, 5, 19, 30, 0),
        end: new Date(2020, 4, 5, 20, 30, 0),
      },
      {
        id: 68,
        title: 'Weightlifting Session',
        start: new Date(2020, 4, 6, 19, 30, 0),
        end: new Date(2020, 4, 6, 20, 30, 0),
      },
      {
        id: 69,
        title: 'Cardio Session',
        start: new Date(2020, 4, 7, 19, 30, 0),
        end: new Date(2020, 4, 7, 20, 30, 0),
      },      {
        id: 70,
        title: 'Spinning Session',
        start: new Date(2020, 4, 8, 19, 30, 0),
        end: new Date(2020, 4, 8, 20, 30, 0),
      },
      {
        id: 71,
        title: 'Weightlifting Session',
        start: new Date(2020, 4, 11, 19, 30, 0),
        end: new Date(2020, 4,  11, 20, 30, 0),
      },
      {
        id: 72,
        title: 'Cardio Session',
        start: new Date(2020, 4, 12, 19, 30, 0),
        end: new Date(2020, 4, 12, 20, 30, 0),
      },
      {
        id: 73,
        title: 'Spinning Session',
        start: new Date(2020, 4, 13, 19, 30, 0),
        end: new Date(2020, 4, 13, 20, 30, 0),
      },
      {
        id: 74,
        title: 'Weightlifting Session',
        start: new Date(2020, 4, 14, 19, 30, 0),
        end: new Date(2020, 4, 14, 20, 30, 0),
      },
      {
        id: 75,
        title: 'Cardio Session',
        start: new Date(2020, 4, 15, 19, 30, 0),
        end: new Date(2020, 4, 15, 20, 30, 0),
      },
      {
        id: 76,
        title: 'Spinning Session',
        start: new Date(2020, 4, 18, 19, 30, 0),
        end: new Date(2020, 4, 18, 20, 30, 0),
      },
      {
        id: 77,
        title: 'Weightlifting Session',
        start: new Date(2020, 4, 19, 19, 30, 0),
        end: new Date(2020, 4, 19, 20, 30, 0),
      },
      {
        id: 78,
        title: 'Cardio Session',
        start: new Date(2020, 4, 20, 19, 30, 0),
        end: new Date(2020, 4, 20, 20, 30, 0),
      },
      {
        id: 79,
        title: 'Spinning Session',
        start: new Date(2020, 4, 21, 19, 30, 0),
        end: new Date(2020, 4, 21, 20, 30, 0),
      },
      {
        id: 80,
        title: 'Weightlifting Session',
        start: new Date(2020, 4, 22, 19, 30, 0),
        end: new Date(2020, 4, 22, 20, 30, 0),
      },
      {
        id: 81,
        title: 'Cardio Session',
        start: new Date(2020, 4, 25, 19, 30, 0),
        end: new Date(2020, 4, 25, 20, 30, 0),
      },
      {
        id: 82,
        title: 'Spinning Session',
        start: new Date(2020, 4, 26, 19, 30, 0),
        end: new Date(2020, 4, 26, 20, 30, 0),
      },
      {
        id: 83,
        title: 'Weightlifting Session',
        start: new Date(2020, 4, 27, 19, 30, 0),
        end: new Date(2020, 4, 27, 20, 30, 0),
      },
      {
        id: 84,
        title: 'Cardio Session',
        start: new Date(2020, 4, 28, 19, 30, 0),
        end: new Date(2020, 4, 28, 20, 30, 0),
      },
      {
        id: 85,
        title: 'Spinning Session',
        start: new Date(2020, 4, 29, 19, 30, 0),
        end: new Date(2020, 4, 29, 20, 30, 0),
      },
    ]

    this.state = {
      name: 'React',
      events
    };
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return(
      <div id="outer">
        <div id="calendar">
          <h1>Our Classes</h1>
          {/* outputs calendar */}
          <Calendar localizer={localizer}
            events={this.state.events}
            startAccessor="start"
            endAccessor="end"
            recurrenceAccessor= "recurrenceRule"
            defaultDate={moment().toDate()}
            onEventClick={(target, eventData, day) => alert(this.state.events)}
            />
        </div>
      </div>
    );
  }
}

render(<Classes />, document.getElementById('root'));
