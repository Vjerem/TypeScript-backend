import { Request, Response } from "express";
import { IWilder,Wilder as WilderModel} from '../models/Wilder';


module.exports = {
  create: async (req: Request, res: Response) => {
    await WilderModel.init();
    const wilder: IWilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.json({ success: true, result });
  },

  read: async (req: Request, res: Response) => {
    const result :IWilder[]= await WilderModel.find();
    res.json({ success: true, result });
  },

  update: async (req: Request, res: Response) => {
    const result = await WilderModel.findByIdAndUpdate(req.params.id, req.body);
    res.json({ success: true, result });
  },

  delete: async (req: Request, res: Response) => {
    const result = await WilderModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, result });
  },
};
