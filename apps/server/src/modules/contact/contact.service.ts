import prisma from '@/db';
import { PageMapper } from '@/mapper/page.mapper';
import type { CreateContactReq } from '@excellense/contracts/schemas/contact/create-contact.req';
import type { ContactQueryParamsTypes } from '@excellense/contracts/schemas/contact/get-contacts-query-params.req';
import type { Prisma } from '@excellense/db/prisma';
import { ContactMapper } from './contact.mapper';

class ContactService {
  listAll = async (query: ContactQueryParamsTypes['Query']) => {
    const skip = (query.page - 1) * query.size;
    const take = query.size;

    const where: Prisma.ContactWhereInput = {};

    if (query.search && query.search.trim().length > 0) {
      const searchValue = query.search.trim();
      where.OR = [
        { name: { contains: searchValue, mode: 'insensitive' } },
        { email: { contains: searchValue, mode: 'insensitive' } },
        { organization: { contains: searchValue, mode: 'insensitive' } },
        { subject: { contains: searchValue, mode: 'insensitive' } },
      ];
    }

    const orderBy: Prisma.ContactOrderByWithRelationInput = {
      [query.sortBy]: query.order,
    };

    const [content, totalElements] = await Promise.all([
      prisma.contact.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      prisma.contact.count({ where }),
    ]);

    const data = content.map(ContactMapper.toRes);

    return PageMapper.toPageRes({
      query,
      totalElements,
      data,
    });
  };

  create = async (input: CreateContactReq) => {
    const contact = await prisma.contact.create({
      data: input,
    });

    return ContactMapper.toRes(contact);
  };
}

export const contactService = new ContactService();
