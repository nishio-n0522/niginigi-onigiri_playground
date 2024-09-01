import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  status: a.enum(["Pending", "Processing", "Completed"]),

  ExperimentalData: a
    .model({
      experimentName: a.string().required(),
      audioFileName: a.string().required(),
      owner: a.string().required(),
      experimentOrderDate: a.string().required(),
      s3FileName: a.string().required(),
      status: a.ref("status").required(),
      userConsentConfirmation: a.boolean(),
      experimentCompletedDate: a.string(),
      experimentResult: a.json().array(),
    })
    .identifier(["owner", "experimentName"])
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});
