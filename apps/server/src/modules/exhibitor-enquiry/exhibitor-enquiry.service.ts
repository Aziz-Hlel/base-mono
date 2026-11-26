import prisma from '@/db';
import { PageMapper } from '@/mapper/page.mapper';
import type { CreateExhibitorEnquiryReq } from '@excellense/contracts/schemas/exhibitor-enquiry/create-exhibitor-enquiry.req';
import type { ExhibitorEnquiryQueryParamsTypes } from '@excellense/contracts/schemas/exhibitor-enquiry/get-exhibitor-enquiries-query-params.req';
import type { Prisma } from '@excellense/db/prisma';
import { ExhibitorEnquiryMapper } from './exhibitor-enquiry.mapper';

class ExhibitorEnquiryService {
  listAll = async (query: ExhibitorEnquiryQueryParamsTypes['Query']) => {
    const skip = (query.page - 1) * query.size;
    const take = query.size;

    const where: Prisma.ExhibitorEnquiryWhereInput = {};

    if (query.search && query.search.trim().length > 0) {
      const searchValue = query.search.trim();
      where.OR = [
        { companyName: { contains: searchValue, mode: 'insensitive' } },
        { contactPerson: { contains: searchValue, mode: 'insensitive' } },
        { email: { contains: searchValue, mode: 'insensitive' } },
        { sector: { contains: searchValue, mode: 'insensitive' } },
        { country: { contains: searchValue, mode: 'insensitive' } },
      ];
    }

    const orderBy: Prisma.ExhibitorEnquiryOrderByWithRelationInput = {
      [query.sortBy]: query.order,
    };

    const [content, totalElements] = await Promise.all([
      prisma.exhibitorEnquiry.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      prisma.exhibitorEnquiry.count({ where }),
    ]);

    const data = content.map(ExhibitorEnquiryMapper.toRes);

    return PageMapper.toPageRes({
      query,
      totalElements,
      data,
    });
  };

  create = async (input: CreateExhibitorEnquiryReq) => {
    const enquiry = await prisma.exhibitorEnquiry.create({
      data: input,
    });

    return ExhibitorEnquiryMapper.toRes(enquiry);
  };
}

export const exhibitorEnquiryService = new ExhibitorEnquiryService();
