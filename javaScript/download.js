function handle(){
    let key = 
    const jsonData = {};
    for(var name of storageName){
        console.log("name: " + name);
        if(localStorage.getItem(name) != null){
            jsonData[name] = localStorage.getItem(name);
            console.log(jsonData[name]);
        }
        else {
            console.log("no item");
        }
    }

    const blob = new Blob([JSON.stringify(jsonData, null, '')], {type: 'application/json'});

    console.log(blob);

    document.getElementById("download").href = window.URL.createObjectURL(blob);
}