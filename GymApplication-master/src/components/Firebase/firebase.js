import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Web Apps Firebase config
const config = {
    apiKey: "AIzaSyBgLyUASIbynGA2HvqDXiOfWdu6LVDkVM0",
    authDomain: "gymapplication-d20e1.firebaseapp.com",
    databaseURL: "https://gymapplication-d20e1.firebaseio.com",
    projectId: "gymapplication-d20e1",
    storageBucket: "gymapplication-d20e1.appspot.com",
    messagingSenderId: "867778489736",
};

class Firebase {
    constructor() {
        // initialize firebase with the configuration above
        app.initializeApp(config);

        // implement authentication
        this.auth = app.auth();

        // implement database
        this.db = app.database();
    }

    // -- Auth API -- 
    // sign up function
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    
    // sign in function
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    // sign out function
    doSignOut = () => 
        this.auth.signOut();

    // password reset function
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    // password update function
    doPasswordUpdate = password => 
        this.auth.currentUser.updatePassword(password);

    // create a booking function
    doCreateBooking = email => this.auth.createBooking(email);

    // -- Merge Auth and DB User API --
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if(authUser) {
                this.user(authUser.uid)
                .once('value')
                .then(snapshot => {
                    const dbUser = snapshot.val();

                    // default empty roles
                    if(!dbUser.roles) {
                        dbUser.roles = {};
                    }

                    // merge auth and db user
                    authUser = {
                        uid: authUser.uid,
                        email: authUser.email,
                        ...dbUser,
                    };

                    next(authUser);
                });
            }
            else {
                fallback();
            }
        });

    // -- User API --
    // gets a reference to a user by uid
    user = uid => this.db.ref(`users/${uid}`);

    // gets a reference to all users
    users = () => this.db.ref('users');

    // -- Booking API --
    // gets a reference to a booking by uid
    booking = uid => this.db.ref(`bookings/${uid}`);

    // gets a reference to all bookings
    bookings = () => this.db.ref('bookings');
    
}

export default Firebase;