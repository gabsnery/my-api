
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import mock_items from '../_mocks/items';
const database = require('../config/database');

const router = express.Router();



async function getItems(req: Request, res: Response, next: NextFunction) {

    const items = mock_items
    res.json(items);
}


async function getItem(req: Request, res: Response, next: NextFunction) {

    const items = mock_items
    res.json(items);
}

async function addItem(req: Request, res: Response, next: NextFunction) {

    const items = mock_items
    res.json(items);
}

async function removeItem(req: Request, res: Response, next: NextFunction) {

    const items = mock_items
    res.json(items);
}



router.get('/', getItems);



export default router;
