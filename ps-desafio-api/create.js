import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  console.log("EVENT: \n", event);
  const data = JSON.parse(event.body);
  console.log("\n DATA: \n", data);
  const params = {
    // env var
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      purchaseId: uuid.v1(),
      name: data.name,
      email: data.email,
      minions: data.minions,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
