$(function() {
    var keys = ['telFam', 'telAtten','bloodType','height','weight',
    'medi1','medi2','medi3',
    'anam','anam2','anam3',
    'txtName'];
    // var loadArray = [];
    for(var i = 0; i < keys.length; i++) {
        load(keys[i]).then(value => {
            $("#" + keys[i]).text(value);
        }).catch(err => console.error(err));
    }

    // Promise.all(loadArray).then(values => {
    //     for(var i = 0; i < values.length; i++) {
    //         $("#" + key[i]).text(values[i]);
    //     }
    // }).catch(errs => console.error(errs));
});