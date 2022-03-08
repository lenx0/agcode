const qr = require("qrcode");

module.exports = {

    getUrlReq : function(req) {

        const ref = `${(req.params.ref ? req.params.ref : req.query.ref)}`;
    
        if (ref !== 'undefined') {
            const url = process.env.URL_AGCODE_REF.replace('{ref}', ref);
            return url;
        }
    
        const url = `${(req.params.url ? req.params.url : req.query.url)}`;
        return url;
    },

    getQrCode : async function(req, res) {
        
        const url = this.getUrlReq(req);

        if (url){
            const data = await qr.toDataURL(url);
            //res.json({data});
            
            const dataStr = `${data}`;
            res.send(dataStr);
        }
    },

    genQrCode : function(req, res, render) {

        const url = this.getUrlReq(req);

        // If the input is null return "Empty Data" error
        if (url.length === 0) res.send("Empty Data!");
        
        // Let us convert the input stored in the url and return it as a representation of the QR Code image contained in the Data URI(Uniform Resource Identifier)
        // It shall be returned as a png image format
        // In case of an error, it will save the error inside the "err" variable and display it
        
        qr.toDataURL(url, (err, src) => {
            if (err) res.send("Error occured");
          
            // Let us return the QR code image as our response and set it to be the source used in the webpage
            res.render(render, { src });
        });  
    }
}