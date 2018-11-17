const { test: Test, student: Student } = require("../db/db").models;
const router = require('express').Router();

// get all tests
router.get('/', async (req, res, next) => {
    const allTests = await Test.findAll();
    res.json(allTests);
})

// get one test
router.get('/:id', async (req, res, next) => {
    const test = await Test.findById(req.params.id);
    res.json(test);
})

//
router.post('/student/:studentId', async (req, res, next) => {
    const newTest = await Test.create(req.body);
    const student = await Student.findById(req.params.studentId);
    newTest.setStudent(student);
    res.status(201).json(newTest);
})

// delete a test
router.delete('/:id', async (req, res, next) => {
    const test = await Test.findById(req.params.id);
    await test.destroy();
    res.sendStatus(204);
})

module.exports = router;
