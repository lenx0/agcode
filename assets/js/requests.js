function execRequest(site, rest){

    const myRequest = new Request(site, {method: rest});

    fetch(myRequest)
        .then(res=>{return res.json()})
        .then(json=>{
            
            var product = json.product;
            console.log(product);

            const content = product
                .map(item => itemProductAgCode(item))
                .join("\n");

            listQrCode.innerHTML = content;
            
            console.log(listQrCode.innerHTML);
        });
}