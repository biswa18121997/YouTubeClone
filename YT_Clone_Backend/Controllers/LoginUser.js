import mongoose from "mongoose";
import { UserModel } from "../SchemaModels/UserModel.js";
import {ProfileModel} from '../SchemaModels/ProfileModel.js'

export default async function LoginUser(req, res) {
    try {
        let {email} = req.body;
        let findProfile = await ProfileModel.findOne({email});
        !findProfile ? res.status(201).json({
            message : "User Has no records to show . continue browsing to expand your profile activity"})
        :res.status(201).json({findProfile});
    } catch (error) {
        res.status(400).json({
            message : 'Somthing went wrong ..Please try again..'
        })
    }
}

