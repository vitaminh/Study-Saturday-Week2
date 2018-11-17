const { student: Student } = require("../db/db").models;
const router = require("express").Router();

// get all students
router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.json(allStudents);
  } catch (error) {
    next(error);
  }
});

// get one student
router.get("/:id", async (req, res, next) => {
  try {
    const singleStudent = await Student.findById(req.params.id);
    if (!singleStudent) {
      res.sendStatus(404);
    } else {
      res.json(singleStudent);
    }
  } catch (error) {
    next(error);
  }
});

// create new student
router.post('/', async (req, res, next) => {
    try {
        const student = await Student.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
        res.status(201).json(student);
    } catch (error) {
        next(error);
    }
})

// update instance of student
router.put('/:id', async (req, res, next) => {
    try {
        const studentToUpdate = await Student.findById(req.params.id);
        await studentToUpdate.update(req.body);
        res.status(200).send(studentToUpdate);
    } catch (error) {
        next(error);
    }
})

// delete instance of student
router.delete('/:id', async (req, res, next) => {
    try {
        let studentToDelete = await Student.findById(req.params.id);
        await studentToDelete.destroy();
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
})

module.exports = router;
