import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/common/prisma.service";
import * as bcrypt from 'bcrypt';
import { User } from "generated/prisma";
import { Contact } from "@prisma/client";

@Injectable()
export class TestService {
    constructor(private prismaService: PrismaService) { }

    async deleteAddress() {
        const contact = await this.prismaService.contact.findFirst({
            where: { username: 'test' },
            select: { id: true },
        });

        if (contact) {
            await this.prismaService.address.deleteMany({
                where: { contact_id: contact.id },
            });
        }
    }

    async deleteContact() {
        await this.prismaService.contact.deleteMany({
            where: {
                username: 'test'
            },
        })
    }

    async deleteUser() {
        await this.prismaService.user.deleteMany({
            where: {
                username: 'test'
            }
        })
    }

    async deleteAllTestData() {
        await this.deleteAddress();
        await this.deleteContact();
        await this.deleteUser();
    }

    async getUser(): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                username: 'test'
            }
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async createUser() {
        await this.prismaService.user.create({
            data: {
                username: 'test',
                name: 'test',
                password: await bcrypt.hash('test', 10),
                token: 'test'
            }
        })
    }

    async getContact(): Promise<Contact> {
        const contact = await this.prismaService.contact.findFirst({
            where: {
                username: 'test'
            }
        })

        if (!contact) {
            throw new Error(`Contact not found`)
        }

        return contact
    }

    async createContact() {
        await this.prismaService.contact.create({
            data: {
                first_name: 'test',
                last_name: 'test',
                email: 'test@gmail.com',
                phone: '0000',
                username: 'test'
            }
        })
    }
}