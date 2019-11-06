$(function() {
    var keys = ['telFam', 'telAtten','bloodType','height','weight',
    'medi1','medi2','medi3',
    'anam','anam2','anam3',
    'txtName'];
    var loadArray = [];
    for(var i = 0; i < keys.length; i++) {
        loadArray.push(load(keys[i]));
    }

    Promise.all(loadArray).then(values => {
        for(var i = 0; i < values.length; i++) {
            $("#" + key[i]).text(values[i]);
        }
    }).catch(errs => console.error(errs));
});