import prisma from '@/db';
import { PageMapper } from '@/mapper/page.mapper';
import type { CreateSponsorEnquiryReq } from '@excellense/contracts/schemas/sponsor-enquiry/create-sponsor-enquiry.req';
import type { SponsorEnquiryQueryParamsTypes } from '@excellense/contracts/schemas/sponsor-enquiry/get-sponsor-enquiries-query-params.req';
import type { Prisma } from '@excellense/db/prisma';
import { SponsorEnquiryMapper } from './sponsor-enquiry.mapper';

class SponsorEnquiryService {
  listAll = async (query: SponsorEnquiryQueryParamsTypes['Query']) => {
    const skip = (query.page - 1) * query.size;
    const take = query.size;

    const where: Prisma.SponsorEnquiryWhereInput = {};

    if (query.search && query.search.trim().length > 0) {
      const searchValue = query.search.trim();
      where.OR = [
        { organizationName: { contains: searchValue, mode: 'insensitive' } },
        { contactNameAndRole: { contains: searchValue, mode: 'insensitive' } },
        { workEmail: { contains: searchValue, mode: 'insensitive' } },
        { sector: { contains: searchValue, mode: 'insensitive' } },
        { country: { contains: searchValue, mode: 'insensitive' } },
      ];
    }

    const orderBy: Prisma.SponsorEnquiryOrderByWithRelationInput = {
      [query.sortBy]: query.order,
    };

    const [content, totalElements] = await Promise.all([
      prisma.sponsorEnquiry.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      prisma.sponsorEnquiry.count({ where }),
    ]);

    const data = content.map(SponsorEnquiryMapper.toRes);

    return PageMapper.toPageRes({
      query,
      totalElements,
      data,
    });
  };

  create = async (input: CreateSponsorEnquiryReq) => {
    const enquiry = await prisma.sponsorEnquiry.create({
      data: input,
    });

    return SponsorEnquiryMapper.toRes(enquiry);
  };
}

export const sponsorEnquiryService = new SponsorEnquiryService();
