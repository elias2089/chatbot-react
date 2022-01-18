import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as ecs_patterns from "aws-cdk-lib/aws-ecs-patterns";

export class ChatBotCdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // Network to run everything in
    const vpc = ec2.Vpc.fromLookup(this, "default-vpc", { isDefault: true });
    const cluster = new ecs.Cluster(this, "ClusterChatBot", { vpc });

    // Create a load-balanced Fargate service and make it public
    new ecs_patterns.ApplicationLoadBalancedFargateService(
      this,
      "FargateServiceChatBot",
      {
        cluster: cluster, // Required
        cpu: 512, // Default is 256
        taskImageOptions: {
          image: ecs.ContainerImage.fromAsset("../"),
          containerPort: 4001,
        },
        memoryLimitMiB: 1024, // Default is 512
      }
    );
  }
}
