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
    

list.orderByChild('tags').on('value', (snapshot) => {
        let sur = ' '
        snapshot.forEach((item) => {
            if(typeof item.val().tags !== "undefined") {
                if(request.query.text.indexOf(',') === -1) {
                    console.log(item.val())
                    if(item.val().tags.indexOf(request.query.text) !== -1) {
                        sur += JSON.stringify(item.val()) + ','
                    }
                } else {
                    let spli = request.query.text.split(','); 
                    spli.forEach(subitem => {
                        if(item.val().tags.indexOf(subitem) !== -1) {
                            sur += JSON.stringify(item.val()) + ','
                        } 
                    })
                }
                
            }
        })

       response.send(sur)
       return sur;
    },
    (err) => console.log(err, "ERRROE"))

});

