const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    const original = request.query.text;
    let base = admin.database().ref('/sub_categories');
    let list = admin.database().ref('/list');
    
    // base.orderByChild('title').on('value', (data) => {
    //     console.log(typeof data.val(), data.val(), data.val()[0]);
    // })
    console.log(request.query.text)

//     base.orderByChild('title').equalTo(request.query.text).on('value', (snapshot) => {
//         console.log(snapshot.val());

//     },
//     (err) => console.log(err, "ERRROE"))


//     response.send("STRING");

// });
list.orderByChild('tags').on('value', (snapshot) => {
    let arr = [];
        snapshot.forEach((item) => {
            // console.log(item.val().tags)
            // console.log( Array.isArray(item.val().tags))
            if(typeof item.val().tags !== "undefined") {
                if(item.val().tags.indexOf(request.query.text) !== -1) {
                    arr.push(item.key)
                }
                
            }
        })
        // console.log("SNP", snapshot.val());
        console.log(arr)
        // return arr;

    },
    (err) => console.log(err, "ERRROE"))


    response.send("STRING");

});
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
// exports.addMessage = functions.https.onRequest((req, res) => {
//     // Grab the text parameter.
//     const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     admin.database().ref('/sub_categories').push({title: title}).then(snapshot => {
//       // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//       res.redirect(303, snapshot.ref);
//     });
//   });

// exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
//   .onWrite(event => {
//     // Grab the current value of what was written to the Realtime Database.
//     const original = event.data.val();
//     console.log('Uppercasing', event.params.pushId, original);
//     const uppercase = original.toUpperCase();
//     // You must return a Promise when performing asynchronous tasks inside a Functions such as
//     // writing to the Firebase Realtime Database.
//     // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
//     return event.data.ref.parent.child('uppercase').set(uppercase);
//   });

exports.filterTag = functions.database.ref('/list')
  .onWrite(event => {
    // Grab the current value of what was written to the Realtime Database.
    const collectionRef = event.data.ref.parent;
    const original = event.data.val();

    console.log('S', original, event);
    // const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return null;
  });