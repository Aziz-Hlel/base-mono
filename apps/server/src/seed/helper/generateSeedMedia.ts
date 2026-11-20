// !
// import { faker } from '@faker-js/faker';
// import { MediaStatus } from '@repo/db/prisma/enums';
// import { MediaCreateInput } from '@repo/db/prisma/models';

// export type SeedMedia = {
//   baseName: string;
//   key: string;
//   fileType: string;
//   mimeType: string;
//   fileSize: number;
//   status: MediaStatus;
// };

// export const generateFakeMediaInstance = (): MediaCreateInput => {
//   return {
//     baseName: faker.lorem.slug(),
//     key: faker.image.avatar(),
//     mimeType: 'image/png',
//     fileSize: 1024 * 500,
//     status: MediaStatus.CONFIRMED,
//     type: 'IMAGE',
//   };
// };

// const generateSeedMedia = (props: { prefix: string; baseName: string } | { key: string }): SeedMedia => {
//   if ('key' in props) {
//     const { key } = props;
//     return {
//       baseName: key,
//       key,
//       fileType: key.split('.')[1] ?? 'png',
//       mimeType: key.split('.')[1] ?? 'png',
//       fileSize: 1024 * 500,
//       status: MediaStatus.CONFIRMED,
//     };
//   }

//   const { prefix: unsanitzedPrefix, baseName } = props;

//   let prefix = unsanitzedPrefix;
//   if (unsanitzedPrefix.endsWith('/')) prefix = unsanitzedPrefix.slice(0, -1);
//   if (unsanitzedPrefix.startsWith('/')) prefix = unsanitzedPrefix.slice(1);

//   return {
//     baseName,
//     key: `${prefix}/${baseName}`,
//     fileType: baseName.split('.')[1] ?? 'png',
//     mimeType: baseName.split('.')[1] ?? 'png',
//     fileSize: 1024 * 500,
//     status: MediaStatus.CONFIRMED,
//   };
// };

// export const h1 = generateSeedMedia({ prefix: 'homework1', baseName: 'homework1.jpg' });
// export const h2 = generateSeedMedia({ prefix: 'homework2', baseName: 'homework2.jpg' });
// export const h3 = generateSeedMedia({ prefix: 'homework3', baseName: 'homework3.jpg' });
// export const h4 = generateSeedMedia({ prefix: 'homework4', baseName: 'homework4.jpg' });

// export default generateSeedMedia;
