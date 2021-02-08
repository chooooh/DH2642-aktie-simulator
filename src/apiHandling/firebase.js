
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { 
    loadAndStorePortfolio,
    setFetchUserStocksLock,
    changedBalance,
    stockSold,
    stockBought,
    foundUsers,
    searchingForUsersRequest,
} from "../redux/actions/userActions";

const firebaseConfig = {
    apiKey: "AIzaSyB6EKRGHHI45Lq4HrveeV-vosN6Ao79HS0",
    authDomain: "stock-simulator-2fcd3.firebaseapp.com",
    databaseURL: "https://stock-simulator-2fcd3.firebaseio.com",
    projectId: "stock-simulator-2fcd3",
    storageBucket: "stock-simulator-2fcd3.appspot.com",
    messagingSenderId: "473362426799",
    appId: "1:473362426799:web:02fc35225542587174dd5a",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const auth = firebase.auth;
export const db = firebase.database();

// https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0
function hashCode(s) {
    let h;
    for(let i = 0; i < s.length; i++) 
          h = Math.imul(31, h) + s.charCodeAt(i) | 0;
    return h;
}

export const createNewUser = (email) => {
    db.ref("user/" + hashCode(email)).set({
        balance: 10000,
        email
    });
}

const modifyBalance = (email, price, quantity, dispatch) => {
    const ref = db.ref("user/").child(hashCode(email)).child('balance');
    ref.once("value", (snapshot) => {
        let newBalance = parseInt(snapshot.val()) + parseInt((price * quantity));
        let updates = {};
        updates["/" + hashCode(email) + '/balance/'] = newBalance
        db.ref("user/").update(updates);
        dispatch(changedBalance(newBalance)); 
    });
}

export const writeStockToDB = (email, stock, date, price, quantity, dispatch) => {
    db.ref("user/" + hashCode(email) + "/userStock").push({
        stock,
        date,
        price,
        quantity,
    });
   
    const ref = db.ref("user/" + hashCode(email) + "/userStock");
    ref.once("value").then((snapshot) => {
        let id = null;
        snapshot.forEach(function(childSnapshot){
            id = childSnapshot.key 
        });
        dispatch(stockBought(stock, date, price, quantity, id));
    })
    //dispatch(setFetchUserStocksLock(false));
    const negativePrice = parseInt(price) * (-1);
    modifyBalance(email, negativePrice, quantity, dispatch);
};

export const readUserFromDB = (email, dispatch) => {
    let ref = db.ref("user/" + hashCode(email) + "/userStock");
    
    let boughtStocks = [];
    ref.once("value").then((snapshot) => { 
        snapshot.forEach( (childSnapshot) => {
            let stock = [];                        
            childSnapshot.forEach((childChildSnapshot) => {
                stock = [...stock, childChildSnapshot.val()];
            });
            boughtStocks = [...boughtStocks, [...stock, childSnapshot.key]];
        });
        dispatch(loadAndStorePortfolio(boughtStocks, email));
        dispatch(setFetchUserStocksLock(false));
    });

    ref = db.ref("user/").child(hashCode(email)).child('balance');
    ref.once("value").then((snapshot) => {
        dispatch(changedBalance(snapshot.val()));
    });
};

export const loadBalanceFromDB = (email, dispatch) => {
    const ref = db.ref("user/").child(hashCode(email)).child('balance');
    ref.once("value").then((snapshot) => {
        dispatch(changedBalance(snapshot.val()));
    });
};

export const readUsersInDB = async (userInput, dispatch) => {
    dispatch(searchingForUsersRequest());
    let results = [];
    const snapshot = await db.ref("user/").once("value");
    
    snapshot.forEach(childsnap => {
        const email = childsnap.child('email').val();
        if(email.substring(0, userInput.length) === userInput)
            results = [...results, email];
    });
    dispatch(foundUsers(results));
}

export const removeStockFromDB = (email, id, quantity, price, dispatch) => {
    let ref = db.ref("user/" + hashCode(email) + "/userStock");
    ref.child(id).remove();
    
    modifyBalance(email, price, quantity, dispatch);
    dispatch(stockSold(id));
}