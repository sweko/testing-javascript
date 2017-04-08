import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
const router = express.Router();
const data = path.join(__dirname, '../../data');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// router.get('/hugo', (req, res) => {
//   const hugo = path.join(data, "hugo.json");
//   fs.readFile(hugo, (_ data))
//   res.send('api works');
// });


module.exports = router;