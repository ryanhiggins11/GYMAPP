import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withAuthorization, AuthUserContext } from '../Session';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, muiTheme } from 'material-ui/styles';
import '../../index.css';

// Here the user can book a personal training session

// personal trainer page
const PersonalTrainerPage = () => (
    <MuiThemeProvider>
    <div id="outer">
        <div id="inner">
            <h1>Book a Personal Training Session here!</h1>
            <Bookings />
        </div>
    </div>
    </MuiThemeProvider>
)

// layout of form to create booking
class PersonalTrainerBase extends Component {

    constructor(props) {
        super(props);

        // resets state after booking
        this.state = {
            personalTrainer: '',
            time: '',
            date: '',
            loading: false,
            bookings: [],
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        // Firebase API used to create a booking
        this.props.firebase.bookings().on('value', snapshot => {
            const bookingObject = snapshot.val();

            if(bookingObject) {
                // convert bookings from snapshot to a list of items
                const bookingList = Object.keys(bookingObject).map(key => ({
                    ...bookingObject[key],
                    uid: key,
                }))

                this.setState({ bookings: bookingList, loading: false });
            }
            else {
                this.setState({ bookings: null, loading: false });
            }
        });
    }

    // remover listeners here to avoid memeory leaks
    componentWillUnmount() {
        this.props.firebase.bookings().off();
    }

    // update the personalTrainer selected by the user in the local state
    onPersonalTrainerChange = event => {
        
        this.setState({ personalTrainer: event.target.value });
    };

    // update the time selected by the user in the local state
    onTimeChange = event => {
        this.setState({ time: event.target.value });
    };

    // update the date selected by the user in the local state
    onDateChange = event => {
        this.setState({ date: event.target.value });
    }

    onCreateBooking = (event, authUser) => {
        // alert telling the user details of their booking
        alert("You have booked " + this.state.personalTrainer + " at " + this.state.time + " on the " + this.state.date + "!");
        
        // push method creates a new booking
        this.props.firebase.bookings().push({
            personalTrainer: this.state.personalTrainer,
            time: this.state.time,
            date: this.state.date,
            email: authUser.email,
        });

        this.setState({ personalTrainer: '', time: '', date: '' });
        
        event.preventDefault();
    };

    // allow admin to remove a booking
    onRemoveBooking = uid => {
        this.props.firebase.booking(uid).remove();
    }

    render(){
        const {
            personalTrainer, time, date, bookings, loading
        } = this.state;

        return (
            // associates user to the booking they made
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {/* inputs for user to book a personal trainer */}
                        <Form onSubmit={event => this.onCreateBooking(event, authUser)}>
                            {/* Pick a personal trainer */}
                            <FormGroup > 
                                <Label for="personalTrainer">Pick a Personal Trainer: </Label>
                                <Input type="select" name="personalTrainer" id="personalTrainer"
                                    value={personalTrainer} 
                                    onChange={this.onPersonalTrainerChange} 
                                    required>
                                        <option value=""> Select a P.T </option>
                                        <option>John - Cardio</option>
                                        <option>Mary - Weight Lifting</option>
                                </Input>
                            </FormGroup >
                            <br />
                            {/* Pick a time */}
                            <FormGroup>
                                <Label for="time">Choose a Time: </Label>
                                <Input type="select" name="time" id="time"
                                    value={time} 
                                    onChange={this.onTimeChange} 
                                    required>
                                        <option value=""> Select a time </option>
                                        <option>8:00am - 9:00am</option>
                                        <option>9:00am - 10:00am</option>
                                        <option>10:00am - 11:00am</option>
                                        <option>11:00am - 12:00pm</option>
                                        <option>12:00pm - 13:00pm</option>
                                        <option>12:00pm - 13:00pm</option>
                                        <option>13:00pm - 14:00pm</option>
                                        <option>14:00pm - 15:00pm</option>
                                        <option>15:00pm - 16:00pm</option>
                                        <option>16:00pm - 17:00pm</option>
                                        <option>17:00pm - 18:00pm</option>
                                        <option>18:00pm - 19:00pm</option>
                                        <option>19:00pm - 20:00pm</option>
                                </Input>
                            </FormGroup>
                            <br />
                            {/* Pick a date */}
                            <FormGroup>
                                <Label for="date">Choose a Date: </Label>
                                <Input type="date" name="date" id="date"
                                    min="<?php echo $today; ?>"
                                    value={date} 
                                    onChange={this.onDateChange} 
                                    required>
                                </Input>
                            </FormGroup>
                            <br />
                                <Button type="submit" variant="contained" size="lg">Book Personal Trainer</Button>
                        </Form>
                    </div>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

// display booking details (called in admin/index.js)
const BookingItem = ({ booking, onRemoveBooking }) => (
    <div id="bookingsList">
        <ul>
            <li>
                <span>
                    <strong>Email: </strong> {booking.email}
                </span>
                <br />
                <span>
                    <strong>Personal Trainer: </strong> {booking.personalTrainer}
                </span>
                <br />
                <span>
                    <strong>Time: </strong> {booking.time} 
                </span>
                <br />
                <span>
                    <strong>Date: </strong> {booking.date}
                </span>
                <br />
                <Button type="button" variant="contained" color="secondary" size="small" onClick={() => onRemoveBooking(booking.uid)}>
                    Delete Booking
                </Button>
                <br />
                <br />
            </li>
        </ul>
    </div>
);

const Bookings = withFirebase(PersonalTrainerBase);

const condition = authUser => !!authUser;

export default compose(
    withAuthorization(condition),
)(PersonalTrainerPage);

export { BookingItem };
