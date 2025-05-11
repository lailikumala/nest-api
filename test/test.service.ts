import { PrismaService } from '../src/common/prisma.service';
import { HttpException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Address, Contact, User } from '@prisma/client';

@Injectable()
export class TestService {
    constructor(private prismaService: PrismaService) { }

    async deleteAllTestData() {
        await this.deleteAddress();
        await this.deleteContact();
        await this.deleteUser();
    }

    async deleteUser() {
        await this.prismaService.user.deleteMany({
            where: {
                username: 'test',
            },
        });
    }

    async deleteContact() {
        const contact = await this.prismaService.contact.deleteMany({
            where: {
                username: 'test',
            },
        });

        if(!contact) {
            throw new HttpException(`contact not found`, 404);
        }

        return contact;
    }

    async getUser(): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                username: 'test',
            },
        });

        if(!user) {
            throw new HttpException(`user not found`, 404);
        }

        return user
    }

    async createUser() {
        await this.prismaService.user.create({
            data: {
                username: 'test',
                name: 'test',
                password: await bcrypt.hash('test', 10),
                token: 'test',
            },
        });
    }

    async getContact(): Promise<Contact> {
        const contact = await this.prismaService.contact.findFirst({
            where: {
                username: 'test',
            },
        });

        if(!contact) {
            throw new HttpException(`contact not found`, 404);
        }

        return contact;
    }

    async createContact() {
        await this.prismaService.contact.create({
            data: {
                first_name: 'test',
                last_name: 'test',
                email: 'test@gmail.com',
                phone: '0000',
                username: 'test',
            },
        });
    }

    async deleteAddress() {
        await this.prismaService.address.deleteMany({
            where: {
                contact: {
                    username: 'test',
                },
            },
        });
    }

    async createAddress() {
        const contact = await this.getContact();
        await this.prismaService.address.create({
            data: {
                contact_id: contact.id,
                street: 'street',
                city: 'city',
                province: 'province',
                country: 'country',
                postal_code: '3333',
            },
        });
    }

    async getAddress(): Promise<Address> {
        const address= await this.prismaService.address.findFirst({
            where: {
                contact: {
                    username: 'test',
                },
            },
        });

        if(!address) {
            throw new HttpException(`address\ not found`, 404);
        }

        return address;
    }
}