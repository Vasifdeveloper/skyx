import { createContactHandler } from "../../../contact/server";

export const runtime = "nodejs";
export const POST = createContactHandler(process.env);
