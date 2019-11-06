$(function () {
    var keys = ['telFam', 'telAtten', 'bloodType', 'height', 'weight',
        'medi1', 'medi2', 'medi3',
        'anam', 'anam2', 'anam3',
        'txtName'];

    for (var i = 0; i < keys.length; i++) {
        var value = load(keys[i]);
        if(value) $("#" + keys[i]).text(value);
    }
});