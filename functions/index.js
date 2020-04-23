const functions = require('firebase-functions');
const admin = require("firebase-admin");
const shortid = require('shortid');
admin.initializeApp();

exports.addQueue = functions.https.onCall((data, context) => {
    /**var business_associated = data.business_associated;
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
    }) */
  return "OK"
})

exports.fetchQueues = functions.https.onCall((data, context) => {
    
    return "OK"
})

exports.joinQueue = functions.https.onCall((data, context) => {
    
    return "OK"
})

exports.loginUser = functions.https.onCall((data, context) => {
    
    var ref = admin.database().ref('/user');
    return ref.once('value').then(function(snapshot){
        var email = snapshot.val().email;
        var password = snapshot.val().password;
        var is_admin=snapshot.val().is_admin;
        
    }).then(() => {
          if(is_admin && admin.auth().getUserByEmail(email))
                console.log("Sigin like admin")
           else if(admin.auth().getUserByEmail(email)){
                console.log("Sigin like user")
           }
           return {data, email: email};
    }).catch((error) => {
        throw new functions.https.HttpsError(error)
    })
    
   
})

exports.registerUser = functions.https.onCall((data, context) => {
    //From client
    var email = data.email;
    var is_admin = data.is_admin;
    var name_lastname = data.name_lastname;
    var password = data.password;
    var profile_picture =profile_picture;
    var username = data.username;

    var ref = admin.database().ref('/user');
    /*var file = ($("my_file"))[0].files[0];
    
    var store = firebase.storage().ref('/user/profile_picture');
    var uploadPhoto = store.put(file).then((snapshot)=>{
        console.log("Upload Image");
    }).catch((error)=>{
        console.log("Error");
    })
    var downloadURL = uploadPhoto.snapshot.downloadURL;*/
    return ref.push({
            email:email,
            is_admin:is_admin,
            name_lastname:name_lastname,
            password:password,
            profile_picture: profile_picture,
            username:username
        }).then(() => {
                if(is_admin){
                    console.log("Now, you´re registered such as admin")
                    return{data,is_admin:is_admin,email:email}
                }
                else{
                    if(email!=admin.auth().getUserByEmail(snapshot.val().email)){
                        console.log("Now, you´re registered");
                        return{data,email:email}
                    }
                }
            }
        ).catch((error) => {
            throw new functions.https.HttpsError(error)
    })
})


