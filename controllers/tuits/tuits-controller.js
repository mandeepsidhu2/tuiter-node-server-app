import posts from "./tuits.js";
let tuits = posts;

//curl -X POST -H "Content-Type: application/json" -d '{ "topic": "Mars", "username": "SpaceX", "handle": "@spacex", "time": "2h", "image": "spacex.png", "title": "CyberTrucks driving up Olympus Mons", "tuit": "Picked up the Curiosity rover on my CyberTruck bed this morning. Driving up Olympus Mons this afternoon." }' http://localhost:4000/api/tuits
const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime()+'';
    newTuit.likes = 0;
    newTuit.liked = false;
    newTuit.dislikes=0
    newTuit.replies=0
    newTuit.retuits=0
    tuits.push(newTuit);
   
    res.json(newTuit);
  }
  
//curl -X GET  http://localhost:4000/api/tuits
const findTuits  = (req, res) => {   res.json(tuits);}

// curl -X PUT -H "Content-Type: application/json" -d '{"likes": 3456, "liked": true, "replies": 456, "retuits": 567}' http://localhost:4000/api/tuits/123

const updateTuit = (req, res) => {
    const tuitdId = req.params.tid;
    const updates = req.body;
    const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)
    tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
    res.json(tuits[tuitIndex]);
  }
  

//curl -X DELETE http://localhost:4000/api/tuits/234
const deleteTuit = (req, res) => {
    const tuitdIdToDelete = req.params.tid;
    tuits = tuits.filter((t) =>
      t._id !== tuitdIdToDelete);
    res.sendStatus(200);
  }
  


export default (app) => {
 app.post('/api/tuits', createTuit);
 app.get('/api/tuits', findTuits);
 app.put('/api/tuits/:tid', updateTuit);
 app.delete('/api/tuits/:tid', deleteTuit);
}
