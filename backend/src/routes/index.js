import express from 'express';
import bookRouter from "../routes/book.js";
import userRouter from "../routes/user.js";

const router=express.Router();

router.use("/book",bookRouter);
router.use("/user",userRouter);

export default router;

