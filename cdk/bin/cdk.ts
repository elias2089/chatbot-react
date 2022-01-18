#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { ChatBotCdkStack } from "../lib/cdk-stack";

const app = new cdk.App();
new ChatBotCdkStack(app, "ChatBotCdkStack", {
  description: "The CDK ChatBot Stack",
  env: {
    // when use a existing vpc hace to confirm enviroments as account and region
    // account id
    account: process.env.CDK_DEFAULT_ACCOUNT,
    // region
    region: process.env.CDK_DEFAULT_REGION,
  },
});
