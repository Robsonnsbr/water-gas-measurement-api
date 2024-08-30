import { Router } from 'express';
import {
  uploadImage,
  confirmMeasure,
  listMeasures
} from '../controllers/measureController';

const router = Router();

router.post('/upload', uploadImage);
router.patch('/confirm', confirmMeasure);
router.get('/:customer_code/list', listMeasures);
router.get('', (req, res) => {
  res.json({ msg: 'API OK' });
});

export default router;
