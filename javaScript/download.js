async function handle(){
    let keys = ['telFam', 'telAtten','bloodType','height','weight',
    'medi1','medi2','medi3',
    'anam','anam2','anam3',
    'txtName', 'userID', 'userPass',
    'appointments', 'results'];

    const jsonData = {};
    for(var key of keys){
        console.log("name: " + name);
        jsonData[key] = await getData(key);
        console.log(jsonData[key]);
    }

    // $("#indexedDBhyouji").text(jsonData);
    
    console.dir(JSON.stringify(jsonData, null, ''));

    const blob = new Blob([JSON.stringify(jsonData, null, '')], {type: 'application/json'});

    console.log(blob);

    document.getElementById("download").href = window.URL.createObjectURL(blob);
}