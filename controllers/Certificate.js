const { json } = require("body-parser");
const Certificate = require("../models/Certificates");

exports.getCertificateByID = (req,res, next, id)=>{
    Certificate.findById(id).exec((err, _certificate)=>{
        if(err){
            return res.status(400).json({
                error : "Certificate not found in DB"
            });
        }

        req.certificate = _certificate;
        next();
    });
}

exports.getCertificate = (req,res)=>{
        return res.json(req.certificate);
}

exports.getCertificateUserSearch = (req,res)=>{
    let _companyName = req.body.CompanyName || [].flat();
    let _certificateNo = req.body.CertificateNo || [].flat();

    let query = {
        companyName:  _companyName,
        certificateNo: _certificateNo
    };

    Certificate.find(query).exec((err,results)=>{
        if(err){
            return res.status(400).json({
                error : `No Certificates Found ${err}`
            });

        }
        if(results == ''){
            res.json({
                message : "Check your details"
            })
        }else{
            res.json(results);
        }
        
    })

}


exports.createCertificate = (req, res)=>{
    const certificate = new Certificate(req.body);
    certificate.save((err, _certificate)=>{
        if(err){
            return res.status(400).json({
                error : `Unable to save certificate in DB ${err}`
            });

        }
        res.json(_certificate);
    })
}

exports.getAllCertificates = (req,res)=>{
    Certificate.find().exec((err,_certificates)=>{
        if(err){
            return res.status(400).json({
                error : "No Certificates found in DB"
            });
        }
        res.json(_certificates);
    });
}



exports.deleteCertificate = (req,res)=>{
    const certificate = req.certificate;
    Certificate.remove((err, _certificate)=>{
        if(err){
            return res.status(400).json({
                error : "Failed to delete this certificate"
            });
        }

        res.json({
            message : "Successfully deleted."
        });
    });
}