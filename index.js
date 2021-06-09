const express = require('express');
const Firestore = require('@google-cloud/firestore')
const db = new Firestore();
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;

//CHECKING
app.listen(port, () => {
    console.log('Blood Donor REST API listening on port', port);
});
app.get('/', async (req, res) => {
    res.json({status : 'Blood Donor ready to use.'});
})

//GET ALL DATA
app.get('/organizations/', async (req, res) => {
    const snapshot = await db.collection('organizations').get()
    res.json(snapshot.docs.map(doc => doc.data()));
})

//GET ORGANIZATION DATA WITH SPECIFIED CODE
app.get('/organizations/:code', async (req, res) => {
    const code = req.params.code;
    const query = db.collection('organizations').where('code', '==', code);
    const querySnapshot = await query.get();
    res.json(querySnapshot.docs.map(doc => doc.data()));
})

//GET ALL DATA WITH SPECIFIED BLOOD TYPE
app.get('/organizations/blood-type/:blood', async (req, res) => {
    const blood = req.params.blood;
    const supply = Number(req.query.excludeSupply);
    const query = db.collection('organizations').where('bloodType', '==', blood).where('supply', '!=', supply);
    const querySnapshot= await query.get();
    res.json(querySnapshot.docs.map(doc => doc.data()));
})

//GET ORGANIZATION DATA WITH SPECIFIED BLOOD TYPE
app.get('/organizations/:code/:blood', async (req, res) => {
    const code = req.params.code;
    const blood = req.params.blood;
    const query = db.collection('organizations').where('code', '==', code).where('bloodType', '==', blood);
    const querySnapshot = await query.get();
    res.json(querySnapshot.docs.map(doc => doc.data()));
})

//CREATE ORGANIZATION DATA
app.post('/organizations/', async (req, res) => {
    const data = {
        code: req.body.code,
        organizationName: req.body.organizationName,
        subDistrict: req.body.subDistrict,
        contact: req.body.contact,
        bloodType: req.body.bloodType,
        supply: req.body.supply
    };
    await db.collection('organizations').doc().set(data);
    res.json({status: 'Success', data: { organization: data}});
})

//DELETE ORGANIZATION DATA (ALL)
app.delete('/organizations/:code', async (req, res) => {
    const code = req.params.code;
    const delete_doc = db.collection('organizations').where('code', '==', code).get();
    delete_doc.then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
            doc.ref.delete();
        });
    });
    res.json({status: 'Successfully deleted', code});
})

//DELETE ORGANIZATION DATA (BLOOD SPECIFIED)
app.delete('/organizations/:code/:blood', async (req, res) => {
    const code = req.params.code;
    const blood = req.params.blood;
    const delete_doc = db.collection('organizations').where('code', '==', code).where('bloodType', '==', blood).get();
    delete_doc.then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
            doc.ref.delete();
        });
    });
    res.json({status: 'Successfully deleted', code, blood});
})

//UPDATE ORGANIZATION DATA
app.put('/organizations/:code/:blood', async (req, res) => {
    const data = {
        code: req.body.code,
        organizationName: req.body.organizationName,
        subDistrict: req.body.subDistrict,
        contact: req.body.contact,
        bloodType: req.body.bloodType,
        supply: req.body.supply
    };
    const code = req.params.code;
    const blood = req.params.blood;
    const update_doc = db.collection('organizations').where('code', '==', code).where('bloodType', '==', blood).get();
    update_doc.then(function(querySnapshot) {
        querySnapshot.forEach(function(doc){
            doc.ref.update(data);
        });
    });
    res.json({status: 'Successfully updated', data: {organization: data}});
})
