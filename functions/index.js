const functions = require('firebase-functions');
const admin = require("firebase-admin");
const shortid = require('shortid');
admin.initializeApp();

exports.addQueue = functions.https.onCall((data, context) => {
    
    return admin.database().ref("/queue").push({
        business_associated: data.business_associated,
        capacity: data.capacity,
        date_created: data.date_created,
        date_finished: data.date_finished,
        description: data.description,
        is_locked: data.is_locked,
        name: data.is_locked,
        join_id: shortid.generate() 
    }).then(() => {
        console.log("New Queue added")
        return {data, join_id: shortid.generate};
    }).catch((error) => {
        throw new functions.https.HttpsError(error)
    })
})

exports.fetchQueues = functions.https.onCall((data, context) => {
    
    return "OK"
})

