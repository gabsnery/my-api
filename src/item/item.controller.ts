import { Request, Response, NextFunction } from "express";
import express from "express";
import mock_items from "../_mocks/items";
import IItem from "./imterfaces/item.interface";

const router = express.Router();

let dynamicItems = [...mock_items];

async function getItems(req: Request, res: Response, next: NextFunction) {
  const items = dynamicItems;
  res.json(items);
}

async function getItem(req: Request, res: Response, next: NextFunction) {
  const itemId = +req.params.id;

  const itemIndex = dynamicItems.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) {
    res.status(404).json({ message: `Item with ID ${itemId} not found` });
  } else {
    res.status(201).json(dynamicItems[itemIndex]);
  }
}

async function addItem(req: Request, res: Response, next: NextFunction) {
  const body = req.body as Omit<IItem, "id">;
  const newItem = { id: dynamicItems[dynamicItems.length - 1].id + 1, ...body };
  dynamicItems.push({ ...newItem });
  res.status(201).json(newItem);
}

async function removeItem(req: Request, res: Response, next: NextFunction) {
  const itemId = +req.params.id;
  const itemIndex = dynamicItems.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) {
    res.status(404).json({ message: `Item with ID ${itemId} not found` });
  } else {
    dynamicItems = dynamicItems.filter((item) => item.id !== itemId);
    res.status(204).send();
  }
}

router.get("/", getItems);
router.get("/:id", getItem);
router.delete("/:id", removeItem);
router.post("/", addItem);

export default router;
