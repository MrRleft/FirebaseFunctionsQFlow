const functions = require('firebase-functions');
const admin = require("firebase-admin");
const shortid = require('shortid');
admin.initializeApp();

//var data = require('./Users/victor.gjareno.local/Documents/Android Studio/FirebaseFunctionsQFlow/testData.json');
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

exports.fetchQueues = functions.https.onCall((data, context) => {
    
    return "OK"
})

exports.joinQueue = functions.https.onCall((data, context) => {

    var id_queue = data.id_queue;
    var id_user = data.id_user;
    var is_active = data.is_active;
    var is_admin = data.is_admin;
    var ref = admin.database().ref('/queue_user');
    var check = false;
    ref.orderByChild("id_user").on("child_added", function(snapshot){
        var d = snapshot.val();
        if(d.id_user === id_user)
        {
            check = true;
        }
    });
    if(check === false){
        return r.push({
            id_queue: id_queue,
            id_user: id_user,
            is_active: is_active,
            is_admin: is_admin
        }).then(() => {
            console.log("New user added to queue")
            return {data, join_id: join_id};
        }).catch((error) => {
            throw new functions.https.HttpsError(error)
        })
    }   
    
})

exports.loginUser = functions.https.onCall((data, context) => {
    
    return "OK"
})

exports.registerUser = functions.https.onCall((data, context) => {
    
    return "OK"
})


