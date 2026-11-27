import type { Prisma } from '@excellense/db/prisma';
import { genUuid } from '../../helper/generateUuid';

// ─── Contact ──────────────────────────────────────────────────────────────────

export const contactSeedData: Record<string, Prisma.ContactCreateManyInput> = {
  contact1: {
    id: genUuid('contact1'),
    name: 'Amira Ben Salem',
    email: 'amira.bensalem@edutech-tn.org',
    organization: 'EduTech Tunisia',
    subject: 'Group Delegation Registration Inquiry',
    message:
      'Hello, we would like to register a delegation of 12 school principals for the upcoming summit. Could you share group pricing details?',
  },
  contact2: {
    id: genUuid('contact2'),
    name: 'Karim Mansouri',
    email: 'k.mansouri@avenir-academy.tn',
    organization: 'Avenir International Academy',
    subject: 'Keynote Speaker Schedule',
    message:
      'Could you confirm the exact timing for the AI in K-12 Education keynote session on Day 1?',
  },
  contact3: {
    id: genUuid('contact3'),
    name: 'Nadia Trabelsi',
    email: 'nadia.trabelsi@gmail.com',
    organization: null,
    subject: 'Press & Media Accreditation',
    message:
      'I am an education journalist covering innovation in North Africa and would like to request media accreditation for the summit.',
  },
  contact4: {
    id: genUuid('contact4'),
    name: 'Youssef Gharbi',
    email: 'y.gharbi@smartcampus.io',
    organization: 'SmartCampus Solutions',
    subject: 'Workshop Hosting Proposal',
    message:
      'We are interested in hosting a practical hands-on workshop on adaptive learning platforms during Day 2.',
  },
  contact5: {
    id: genUuid('contact5'),
    name: 'Salma Chaabane',
    email: 'salma.chaabane@lycee-carthage.tn',
    organization: 'Lycée Moderne de Carthage',
    subject: 'Certificate of Attendance',
    message:
      'Will participants receive an official certificate of attendance after completing the leadership workshops?',
  },
  contact6: {
    id: genUuid('contact6'),
    name: 'Tarek Belhaj',
    email: 't.belhaj@supcom-edu.tn',
    organization: 'SupCom Innovation Hub',
    subject: 'University Partnership Opportunities',
    message:
      'We would like to explore an academic partnership for our engineering students to volunteer and attend technical sessions.',
  },
  contact7: {
    id: genUuid('contact7'),
    name: 'Claire Moreau',
    email: 'claire.moreau@edumedia-france.fr',
    organization: 'EduMedia France',
    subject: 'Press Interview Request',
    message: 'Could we schedule a 15-minute interview with the summit organizers on Day 1 morning?',
  },
  contact8: {
    id: genUuid('contact8'),
    name: 'Hichem Kammoun',
    email: 'hichem@sfax-stem.org',
    organization: 'Sfax STEM Club',
    subject: 'Student Robotics Showcase',
    message:
      'Our high school robotics team won the national championship and would love a small demo corner to showcase their project.',
  },
  contact9: {
    id: genUuid('contact9'),
    name: 'Meryem El Fassi',
    email: 'm.elfassi@atlas-schools.ma',
    organization: 'Atlas Private Schools Network',
    subject: 'Early Bird Ticket Extension',
    message:
      'Our finance department is finalizing the purchase order for 8 delegates. Can we lock in the early bird rate until Friday?',
  },
  contact10: {
    id: genUuid('contact10'),
    name: 'Omar Bouzid',
    email: 'omar.bouzid@outlook.com',
    organization: null,
    subject: 'Accessibility & Interpretation Services',
    message:
      'Will simultaneous Arabic-French-English translation be available for the plenary sessions?',
  },
  contact11: {
    id: genUuid('contact11'),
    name: 'Sonia Ben Youssef',
    email: 'sonia@montessori-tunis.tn',
    organization: 'École Montessori de Tunis',
    subject: 'Early Childhood Track Details',
    message:
      'Could you share the list of speakers and topics for the early childhood education track?',
  },
  contact12: {
    id: genUuid('contact12'),
    name: 'David Lindqvist',
    email: 'd.lindqvist@nordiclearn.se',
    organization: 'NordicLearn AB',
    subject: 'International Delegation Visa Letter',
    message:
      'We are flying in three product directors from Stockholm. Who should we contact for official invitation letters?',
  },
  contact13: {
    id: genUuid('contact13'),
    name: 'Fatma Zohra Khelil',
    email: 'fz.khelil@univ-alger.dz',
    organization: 'Université d’Alger',
    subject: 'Research Paper Poster Session',
    message:
      'Is there still space to submit a poster on blended learning outcomes in Maghreb universities?',
  },
  contact14: {
    id: genUuid('contact14'),
    name: 'Nizar Jemaa',
    email: 'nizar.jemaa@digitalskills.tn',
    organization: 'DigitalSkills Tunisia',
    subject: 'Career Fair & Networking Lounge',
    message:
      'We would like to know if there is a dedicated networking lounge for EdTech startups and school recruiters.',
  },
  contact15: {
    id: genUuid('contact15'),
    name: 'Elena Rossi',
    email: 'elena.rossi@med-edtech.it',
    organization: 'MedEdTech Consortium',
    subject: 'Panel Moderation Inquiry',
    message:
      'I am reaching out to offer my availability as a moderator for the Mediterranean EdTech collaboration roundtable.',
  },
  contact16: {
    id: genUuid('contact16'),
    name: 'Walid Ayadi',
    email: 'walid.ayadi@gmail.com',
    organization: null,
    subject: 'Volunteer Applications',
    message:
      'I am a master’s student in educational technology and would like to apply to join the event organizing volunteers.',
  },
  contact17: {
    id: genUuid('contact17'),
    name: 'Imen Dridi',
    email: 'i.dridi@bizerte-lycee.tn',
    organization: 'Lycée Pilote de Bizerte',
    subject: 'Public School Educator Discount',
    message: 'Do you offer subsidized passes or special rates for public high school teachers?',
  },
  contact18: {
    id: genUuid('contact18'),
    name: 'Jean-Luc Mercier',
    email: 'jl.mercier@francophonie-edu.org',
    organization: 'Réseau Francophonie Éducation',
    subject: 'Official Institutional Support',
    message:
      'We would like to discuss listing our organization as an institutional partner for the summit.',
  },
  contact19: {
    id: genUuid('contact19'),
    name: 'Rym Chebbi',
    email: 'rym@carthage-labs.com',
    organization: 'Carthage Learning Labs',
    subject: 'Invoice & Tax Documentation',
    message:
      'Could you resend the pro-forma invoice with our company tax ID included for our accounting team?',
  },
  contact20: {
    id: genUuid('contact20'),
    name: 'Kamel Sassi',
    email: 'kamel.sassi@smartk12.tn',
    organization: 'SmartK12',
    subject: 'Sponsorship & Exhibition Combined Package',
    message:
      'We submitted an exhibitor form yesterday and would now like to upgrade to a combined silver sponsorship package.',
  },
};
