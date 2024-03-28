import express from "express";
import { getEvents, getEvent, searchEvent } from "../controllers/EventController.js" 

const router = express.Router() 

router.get('/', getEvents)
router.get('/:id', getEvent)
router.get('/search/:searchInput', searchEvent)

export default router