import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon from 'argon2';

const departments = [
  'E Coin',
  'E Phone',
  'Bank of E Network',
  'Sound & Fury Entertainment',
];

const jobTypes = [
  'Frontend Developer',
  'Backend Developer',
  'Devops',
  'Tech Support',
];

export async function createRandomUser() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    fullname: `${firstName} ${lastName}`,
    username: faker.internet.email(firstName, lastName, 'e-corp.com'),
    role: 'USER',
    password: await argon.hash('pwned'),
    workerRecord: {
      name: `${firstName} ${lastName}`,
      jobTitle: faker.helpers.arrayElement(jobTypes),
      department: faker.helpers.arrayElement(departments),
      salary: faker.random.numeric(6).toString(),
      contactInfo: faker.phone.number('(###) ###-####'),
    },
  };
}

async function main() {
  const prisma = new PrismaClient();

  // clean db
  await prisma.$transaction([
    prisma.userDepartmentLink.deleteMany(),
    prisma.department.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  //create departments
}

main();
