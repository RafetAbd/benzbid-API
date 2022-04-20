import { RequestHandler } from "express"
import { User } from "../../db"

// @route PUT api/users/:id, update a user info
export const updateUser: RequestHandler = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).send("User not found");
        }
        const updatedUser = await user.update(req.body);
        res.send(updatedUser);
    } catch (err) {
        next(err);
    }
}