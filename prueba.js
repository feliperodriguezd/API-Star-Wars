async function prueba(urlLugar){
    var si = false
    while (!si){
        await fetch('https://swapi.dev/api/people/?page='+urlLugar)
            .then(res => res.json())
            .then(data=> {
            if (data.next!=null){
                console.log(urlLugar)
                urlLugar++
            } else {
                si = true;
            }
        })
    }
}

prueba(1)