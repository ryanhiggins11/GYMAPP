import React, { Component } from 'react';
import '../../index.css';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import { BookingItem } from '../PersonalTrainer';

// Here is the admin page of our application
// It is only accessible by users registered as admins
// You can see the users of our app here
// and view th personal training sessions booked

class AdminPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            users: [], // users structured as an array
            bookings: [], // bookings structured as an array
        };
    }

    componentDidMount(){
        this.setState({ loading: true });

        // Firebase API used to list users
        this.props.firebase.users().on('value', snapshot => {
            const usersObject = snapshot.val();

            // convert users from snapshot to a list of items
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));

            this.setState({
                users: usersList,
                loading: false,
            });
        });

        // Firebase API used to list bookings
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
        this.props.firebase.users().off();

        this.props.firebase.bookings().off();
    }

    // allow admin to remove a booking
    onRemoveBooking = uid => {
        this.props.firebase.booking(uid).remove();
    }

    render() {
        const { users, bookings, loading } = this.state;

        return (
            <div id="outer">
                <div id="inner">
                    <h1>Admin Page</h1>

                    <h2>Users</h2>

                    {loading && <div>Loading...</div>}

                    <UserList users={users} />

                    <h2>Personal Training Sessions booked by users</h2>

                    {loading && <div>Loading...</div>}
            
                    {bookings ? (
                        <BookingList bookings={bookings}
                        onRemoveBooking = {this.onRemoveBooking} />
                    ) : (
                        <div>There are no bookings...</div> // if there are no bookings
                    )}
                </div>
            </div>
        );
    }
}

// display user details
const UserList = ({ users }) => (
    <div id="usersList">
        <ul>
            {users.map(user => (
                <li key={user.uid}>
                    <span>
                        <strong>Username:</strong> {user.username}
                    </span>
                    <span>
                        <strong>, E-Mail:</strong> {user.email}
                    </span>
                    <br />
                    <br />
                </li>
            ))}
            <br />
        </ul>
    </div>
);

// display booking details
const BookingList = ({ bookings, onRemoveBooking }) => (
    <ul>
        {bookings.map(booking => (
            <BookingItem key={booking.uid} booking={booking}
            onRemoveBooking={onRemoveBooking} />
        ))}
    </ul>
)

const condition = authUser =>
    authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(
    withAuthorization(condition), 
    withFirebase,
)(AdminPage);
