const express = require("express");
const usersLogic = require("../logics/users-logic");
const cacheModule = require("../logics/cache-module");
const router = express.Router();

//Registration Part 01
router.post("/", async (req, res, next)=>{
    try{
        const userDetails = req.body;
        await usersLogic.registerPart1(userDetails);
        res.json("Registration part 1, was a success!");
        
    }catch(err){
        return next(err);
    }
});

//Registration Part 02
router.post("/register", async (req, res, next)=>{
    try{
        const userDetails = req.body;
        await usersLogic.registerPart2(userDetails);
        res.json("Registration part 2, was a success!");
        
    }catch(err){
        return next(err);
    }
});

//Login
router.post('/login', async (req, res,next) => {
    try {
        const userDetails = req.body;  
        const userDetailsAfterLogin = await usersLogic.login(userDetails);
        userDetailsAfterLogin.userName = req.body.userName
        res.json(userDetailsAfterLogin);     
        
    }catch(err){
        return next(err);
    }
});

//Get one user
router.get('/', async (req, res, next) => {
    const idUserFromCache = cacheModule.extractUserDataFromCache(req)[0].id; 
    try {
        const userDetails = await usersLogic.getOneUserAddress(idUserFromCache);
        res.json(userDetails);
        
    } catch (err) {
        return next(err);
    }
});

//Delete
router.delete('/', async (req, res, next) => {
    try {
        const fromCache = cacheModule.extractUserDataFromCache(req); 
        await usersLogic.deleteUser(fromCache);
        res.json('Deleting User, Was A Success!');

    } catch (err) {
        return next(err);
    }
});

module.exports = router