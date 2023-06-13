// import posts from "./tuits.js";
// let tuits = posts;

// //curl -X POST -H "Content-Type: application/json" -d '{ "topic": "Mars", "username": "SpaceX", "handle": "@spacex", "time": "2h", "image": "spacex.png", "title": "CyberTrucks driving up Olympus Mons", "tuit": "Picked up the Curiosity rover on my CyberTruck bed this morning. Driving up Olympus Mons this afternoon." }' http://localhost:4000/api/tuits
// const createTuit = (req, res) => {
//     const newTuit = req.body;
//     newTuit._id = (new Date()).getTime()+'';
//     newTuit.likes = 0;
//     newTuit.liked = false;
//     newTuit.dislikes=0
//     newTuit.disliked=false
//     newTuit.replies=0
//     newTuit.retuits=0
//     newTuit.handle="@nasa"
//     newTuit.image="https://www.nasa.gov/sites/default/files/thumbnails/image/s75-31690.jpeg"
//     tuits.push(newTuit);
   
//     res.json(newTuit);
//   }
  
// //curl -X GET  http://localhost:4000/api/tuits
// const findTuits  = (req, res) => {   res.json(tuits);}

// // curl -X PUT -H "Content-Type: application/json" -d '{"likes": 3456, "liked": true, "replies": 456, "retuits": 567}' http://localhost:4000/api/tuits/123

// const updateTuit = (req, res) => {
//     const tuitdId = req.params.tid;
//     const updates = req.body;
//     const tuitIndex = tuits.findIndex((t) => t._id === tuitdId)
//     tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
//     res.json(tuits[tuitIndex]);
//   }
  

// //curl -X DELETE http://localhost:4000/api/tuits/234
// const deleteTuit = (req, res) => {
//     const tuitdIdToDelete = req.params.tid;
//     tuits = tuits.filter((t) =>
//       t._id !== tuitdIdToDelete);
//     res.sendStatus(200);
//   }
  

import * as tuitsDao from './tuits-dao.js'

const findTuits = async (req, res) => {
   const tuits = await tuitsDao.findTuits()
   res.json(tuits);
}

const createTuit = async (req, res) => {
  const newTuit = req.body;
  newTuit.likes = 0;
  newTuit.liked = false;
  const insertedTuit = await tuitsDao.createTuit(newTuit);
  res.json(insertedTuit);
}

const deleteTuit = async (req, res) => {
  const tuitdIdToDelete = req.params.tid;
  const status = await tuitsDao.deleteTuit(tuitdIdToDelete);
  res.json(status);
}


const updateTuit = async (req, res) => {
  const tuitdIdToUpdate = req.params.tid;
  const updates = req.body;
  const status = await tuitsDao
                       .updateTuit(tuitdIdToUpdate, updates);
  res.json(status);
}


export default (app) => {
  app.post('/api/tuits', createTuit);
  app.get('/api/tuits', findTuits);
  app.put('/api/tuits/:tid', updateTuit);
  app.delete('/api/tuits/:tid', deleteTuit);
 }