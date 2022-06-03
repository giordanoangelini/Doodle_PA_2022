const Model = require('./model');

function createEvent (event){
    try {
        Model.Event.create(event).then(() => {
            console.log("Done");
        });
    } catch (error) {
        console.error(error);
    }
}

exports.createEvent = createEvent
    