const functions = require('firebase-functions');
const admin = require("firebase-admin");
const shortid = require('shortid');
admin.initializeApp();

exports.addQueue = functions.https.onCall((data, context) => {
    var business_associated = data.business_associated;
    var capacity = data.capacity;
    var date_created = data.date_created;
    var date_finished = data.date_finished;
    var description = data.description;
    var is_locked = data.is_locked;
    var name = data.name;
    var join_id = shortid.generate(); 
    return admin.database().ref('/queue').push({
        business_associated: business_associated,
        capacity: capacity,
        date_created: date_created,
        date_finished: date_finished,
        description: description,
        is_locked: is_locked,
        name: name,
        join_id: join_id 
    }).then(() => {
        console.log("New Queue added")
        return {data, join_id: join_id};
    }).catch((error) => {
        throw new functions.https.HttpsError(error)
    })
})


exports.fetchQueue = functions.https.onCall((data, context) => {
    var queue_id = data.queue_id;
    var is_active = data.is_active;
    
    return firebase.database().ref('/queue' + queue_id + is_active).once('value').then(function(snapshot){
        var business_associated = (snapshot.val() && snapshot.val().business_associated);
        var capacity = (snapshot.val() && snapshot.val().capacity);
        var date_created = (snapshot.val() && snapshot.val().date_created);
        var date_finished = (snapshot.val() && snapshot.val().date_finished);
        var description = (snapshot.val() && snapshot.val().description);
        var is_locked = (snapshot.val() && snapshot.val().is_locked);
        var name = (snapshot.val() && snapshot.val().name);
        var join_id = (snapshot.val() && snapshot.val().join_id);
    }).then(() => {
        console.log("New Queue added")
        return {data, join_id: join_id};
    }).catch((error) => {
        throw new functions.https.HttpsError(error)
    })
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


