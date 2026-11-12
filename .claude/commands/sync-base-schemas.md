Complete/edit the Zod schema files in `packages/contracts/src/base/` so there is one per model in the Prisma schema (`packages/db/prisma/schema/`, including `actors/` and `enums.prisma`).

Rules:

1. Import all enums from `packages/contracts/src/base/enums/`. Don't define enums inline.
2. Use the helpers in `packages/contracts/src/base/shared/` (e.g. `zodString`, `zodNullableString`) instead of writing new ones.
3. Every file must end with `.base-schema.ts`.
4. If a schema has no matching model, list it and ask before deleting.
