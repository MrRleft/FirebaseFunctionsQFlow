const functions = require('firebase-functions');
const admin = require("firebase-admin");
const shortid = require('shortid');
admin.initializeApp();

exports.addQueue = functions.https.onCall((data, context) => {
    var business_associated = data.business_associated;
    var capacity = data.capacity;
    var date_created = data.date_created;
    var ate_finished = data.date_finished;
    var description = data.description;
    var is_locked = data.is_locked;
    var name = data.is_locked;
    var join_id = shortid.generate(); 
    return admin.database().ref('/queue').push({
        business_associated: business_associated,
        capacity: capacity,
        date_created: date_created,
        date_finished: date_finished,
        description: description,
        is_locked: is_locked,
        name: is_locked,
        join_id: join_id 
    }).then(() => {
        console.log("New Queue added")
        return {data, join_id: join_id};
    }).catch((error) => {
        throw new functions.https.HttpsError(error)
    })
})

exports.fetchQueues = functions.https.onCall((data, context) => {
    
    return "OK"
})

exports.joinQueue = functions.https.onCall((data, context) => {
    
    return "OK"
})

exports.loginUser = functions.https.onCall((data, context) => {
    
    return "OK"
})

exports.registerUser = functions.https.onCall((data, context) => {
    
    return "OK"
})


