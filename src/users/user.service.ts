import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('Users') private userModel: Model<User>) {}

    async findOne(username: string): Promise<User> {
        return await this.userModel.findOne({username})
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return await newUser.save()
    }
}