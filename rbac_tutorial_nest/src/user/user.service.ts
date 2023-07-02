import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/auth/enums';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getMe(userId: number) {
    return await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        createdAt: true,
        username: true,
        fullname: true,
        departmentsLink: {
          include: {
            department: true,
          },
        },
      },
    });
  }

  async promoteUserToManager(employeeId: number) {
    const departmentLink =
      await this.prismaService.userDepartmentLink.findFirst({
        where: { userId: employeeId },
      });

    if (!departmentLink) {
      throw new NotFoundException('Department link not found');
    }

    const result = await this.prismaService.userDepartmentLink.update({
      where: {
        id: departmentLink.id,
      },
      data: {
        role: Role.MANAGER,
      },
    });
    return result;
  }

  async demoteManagerToEmployee(managerId: number) {
    const departmentLink =
      await this.prismaService.userDepartmentLink.findFirst({
        where: { userId: managerId },
      });

    if (!departmentLink) {
      throw new NotFoundException('Department link not found');
    }

    const result = await this.prismaService.userDepartmentLink.update({
      where: {
        id: departmentLink.id,
      },
      data: {
        role: Role.USER,
      },
    });

    return result;
  }
}
