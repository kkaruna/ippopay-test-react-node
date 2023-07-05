const app = require('express')();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cors = require('cors');

app.use(cors());

const StudentDbAccessor = require('./dbAccessor/student');

require('./db');

app.listen(3001, () => {
  console.log(`Server Started at ${3001}`);
});

app.post('/insertUserDetails', async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;

    let details = {
      email: email,
      name: name,
    };

    let insert = await new StudentDbAccessor().insertStudent(details);
    res.send({ ...insert, status: true });
  } catch (err) {
    res.send({ status: false });
  }
});

app.get('/getDetails', async (req, res) => {
  try {
    let response = await new StudentDbAccessor().getStudent();
    res.send({ response });
  } catch (err) {
    res.send({ status: false });
  }
});
