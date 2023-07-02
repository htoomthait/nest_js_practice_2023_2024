import { ForbiddenException, Injectable } from '@nestjs/common';
import { Role } from 'src/auth/enums';
import { PrismaService } from '../prisma/prisma.service';

const employeeDataServiceCommonSelect = {
  id: true,
  username: true,
  fullname: true,
  departmentsLink: {
    select: {
      role: true,
      department: true,
      jobTitle: true,
    },
  },
  contactInfo: true,
  salary: true,
};

@Injectable()
export class EmployeeDataService {
  constructor(private prismaService: PrismaService) {}

  getAllEmployees() {
    const employees = this.prismaService.user.findMany({
      where: {
        departmentsLink: {
          every: {
            role: {
              not: Role.ADMIN,
            },
          },
        },
      },
      select: employeeDataServiceCommonSelect,
    });

    return employees;
  }

  async getManagedEmployees(managerId: number) {
    const departments = await this.prismaService.user.findFirst({
      where: {
        id: managerId,
      },
      select: {
        departmentsLink: {
          select: {
            role: true,
            jobTitle: true,
            department: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const sections = departments?.departmentsLink.map(
      (dep) => dep.department.name,
    );

    const employees = await this.prismaService.user.findMany({
      where: {
        departmentsLink: {
          every: {
            role: Role.USER,
            department: {
              name: {
                in: sections,
              },
            },
          },
        },
      },
      select: employeeDataServiceCommonSelect,
    });

    return employees;
  }

  async getEmployeeById(employeeId: number) {
    const employee = await this.prismaService.user.findUnique({
      where: {
        id: employeeId,
      },
      select: employeeDataServiceCommonSelect,
    });

    return employee;
  }

  async getEmployeesBySector(userId: number, role: Role, sector: string) {
    if (role === Role.ADMIN) {
      return await this.prismaService.user.findMany({
        where: {
          departmentsLink: {
            every: {
              role: Role.USER,
              department: {
                name: {
                  contains: sector,
                },
              },
            },
          },
        },
        select: employeeDataServiceCommonSelect,
      });
    }

    // check if user has access  to the department
    const department = await this.prismaService.department.findFirst({
      where: {
        name: {
          contains: sector,
        },
        usersLink: {
          some: {
            role: Role.MANAGER,
            userId: userId,
          },
        },
      },
    });

    if (!department) {
      throw new ForbiddenException('You do not have access to this department');
    }

    return await this.prismaService.user.findMany({
      where: {
        departmentsLink: {
          every: {
            role: Role.USER,
            department: {
              name: {
                contains: sector,
              },
            },
          },
        },
      },
      select: employeeDataServiceCommonSelect,
    });
  }
}
