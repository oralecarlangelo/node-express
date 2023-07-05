import { Router, Request, Response } from 'express';
const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    // Fetch users from your database here
    const users: any = [];

    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err?.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    // Create a new user in your database here
    const newUser = req.body;

    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
