const Student = require('../Schema/student');

class StudentDbAccessor {
  async insertStudent(payload) {
    let checkExist = await Student.find({ email: payload.email }).select('email name');
    if (checkExist.length === 0) {
      const response = await Student.insertMany([payload]);
      let result = response.map((val) => {
        let res = {
          name: val.name,
          email: val.email,
          newlyInserted: true,
        };
        return res;
      });

      return result[0];
    } else {
      return { name: checkExist[0].name, email: checkExist[0].email, newlyInserted: false };
    }
  }

  async getStudent() {
    let response = await Student.find({ email: { $ne: null } }).select('email name');
    return response;
  }
}

module.exports = StudentDbAccessor;
