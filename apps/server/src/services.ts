import { createPrismaClient } from "@base-monorepo-v2/db";

import { ENV } from "./env.server";

export const db = createPrismaClient(ENV);
