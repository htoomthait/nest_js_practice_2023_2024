import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prismaSerivce: PrismaService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prismaSerivce.user.findUnique({
      where: {
        username: username,
      },
      include: {
        departmentsLink: {
          select: {
            role: true,
          },
        },
      },
    });

    if (!user) return null;

    const pwValid = await argon.verify(user.password, password);
    if (!pwValid) return null;

    return user;
  }
}
