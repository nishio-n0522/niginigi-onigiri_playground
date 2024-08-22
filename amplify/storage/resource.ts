import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "userDataBucket",
  access: (allow) => ({
    "speech-to-text/{entity_id}/*": [
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
  }),
});
