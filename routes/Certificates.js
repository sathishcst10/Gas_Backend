const express = require("express");
const router = express.Router();

const {
    getCertificateByID,
    getAllCertificates,
    getCertificate,
    deleteCertificate,
    createCertificate,
    getCertificateUserSearch
} = require("../controllers/Certificate");

const {getUserById} = require("../controllers/User");

//params
router.param("userId", getUserById);
router.param("certificateId", getCertificateByID);

const {
    isAuthenticate,
    isSigned,
    isAdmin
} = require("../controllers/Auth");


//Create Certificates
router.post("/certificate/create/:userId",
    isSigned,
    isAuthenticate,
    isAdmin,
    createCertificate
    
);

//Search Certificate
router.post("/certificate/search",
    getCertificateUserSearch    
);

//Read
router.get("/certificate/:certificateId", getCertificateByID);
router.get("/certificates", getAllCertificates);

//Delete

router.delete("/certificate/:certificateId", 
    isSigned,
    isAuthenticate,
    isAdmin,
    deleteCertificate   
);



module.exports = router;