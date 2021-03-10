const express = require('express');
const chirpsStore = require('../utils/chirpstore');

const router = express.Router();

// GET http://localhost:3000/api/chirps/123
router.get('/:id', (req, res) =>  {
    const id = req.params.id;
    const chirp = chirpsStore.GetChirp(id);
    res.json(chirp);  
});

// GET http://localhost:3000/api/chirps/
router.get('/', (req, res) =>  {
    const chirps = chirpsStore.GetChirps();
    res.json(chirps);        
});

// POST http://localhost:3000/api/chirps/
// { user: string, message: string}
router.post('/', (req, res) => {
    // save chirp
    const newChirp = req.body;
    chirpsStore.CreateChirp(newChirp);
    res.json({ msg: 'new chirp added'});    
});

// PUT http://localhost:3000/api/chirps/123
// { user: string, message: string}
router.put('/:id', (req, res) => {
    // update chirp
    const id = req.params.id;
    const editedChirp = req.body;
    chirpsStore.UpdateChirp(id, editedChirp);
    res.json({ msg: `chirp id ${id} edited`, test: editedChirp});     
});

// DELETE http://localhost:3000/api/chirps/123
router.delete('/:id', (req, res) => {
    // delete chirp
    const id = req.params.id;
    chirpsStore.DeleteChirp(id);
    res.json({ msg: `chirp id ${id} deleted`});    
})

module.exports = router;
