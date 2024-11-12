import * as HttpStatusPhrases from "stoker/http-status-phrases";
import createMessageObjectSchema from "stoker/openapi/schemas/create-message-object";

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND);