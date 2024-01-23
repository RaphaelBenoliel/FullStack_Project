const getStudents = (req, res) => {
    res.send("student get");
  };
  
  const postStudents = (req, res) => {
    res.send("student post");
  };
  
  const putStudents = (req, res) => {
    res.send("student put");
  };
  
  const deleteStudents = (req, res) => {
    res.send("student delete");
  };
  
  module.exports = { getStudents, postStudents, putStudents, deleteStudents };