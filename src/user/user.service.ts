import { HttpException, Inject, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { PrismaService } from "src/common/prisma.service";
import { ValidationService } from "src/common/validation.service";
import { LoginUaserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse } from "src/model/user.model";
import {Logger} from "winston";
import { UserValidation } from "./user.validation";
import * as bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import { User } from "@prisma/client";

@Injectable()
export class UserService {
    // melakukan validasi terlebih dahulu
    constructor(
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
        private prismaService: PrismaService
    ) {

    }

    async register(request: RegisterUserRequest) : Promise<UserResponse> {
        this.logger.debug(`register new user ${JSON.stringify(request)}`);
        const registerRequest: RegisterUserRequest = this.validationService.validate(UserValidation.REGISTER, request);
        
        // cek di db dulu apakah username tsb sudah ada di db
        const totalUserWithSameUsername = await this.prismaService.user.count({
            where: {
                username: registerRequest.username, 
            }
        });

        if(totalUserWithSameUsername != 0) {
            throw new HttpException('username already exists', 400);
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        const user = await this.prismaService.user.create({
            data: registerRequest
        });

        return {
            username: user.username,
            name: user.name
        }
    }

    async login(request: LoginUaserRequest): Promise<UserResponse> {
        this.logger.debug(`Userservice.login(${JSON.stringify(request)})`);
        const loginRequest: LoginUaserRequest = this.validationService.validate(
            UserValidation.LOGIN, 
            request
        );

        let user = await this.prismaService.user.findUnique({
            where: {
                username: loginRequest.username
            }
        });

        if(!user) {
            throw new HttpException(`Username or password is invalid`, 401);
        }

        const isPasswordValid = await bcrypt.compare(
            loginRequest.password, 
            user.password
        );

        if(!isPasswordValid) {
            throw new HttpException(`Username or password is invalid`, 401);
        }

        user = await this.prismaService.user.update({
            where: {
                username: loginRequest.username
            },
            data: {
                token: uuid()
            }
        });

        return {
            username: user.username,
            name: user.name,
            token: user.token,
        }
    }

    async get(user: User) : Promise<UserResponse> {
        return {
            username: user.username,
            name: user.name
        }
    }

    async update(user: User, request: UpdateUserRequest) : Promise<UserResponse> {
        this.logger.debug(`UserService.update(${JSON.stringify(user)}, ${JSON.stringify(request)})`)

        const updateRequest: UpdateUserRequest = this.validationService.validate(
            UserValidation.UPDATE, 
            request
        );

        if(updateRequest.name) {
            user.name = updateRequest.name;
        }

        if(updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10);
        }

        const result = await this.prismaService.user.update({
            where: {
                username: user.username
            },
            data: user
        });

        return {
            name: result.name,
            username: result.username
        }
        
    }

    async logout(user: User) : Promise<UserResponse> {
        const result = await this.prismaService.user.update({
            where: {
                username: user.username
            },
            data: {
                token: null
            }
        });

        return {
            username: result.username,
            name: result.name
        }
    }

}