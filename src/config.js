export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-1",
    BUCKET: "dlp-notes-app-uploads"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://kcif0tk0e9.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_XYoo8NVQe",
    APP_CLIENT_ID: "5837j58f57qs2qf7r5nrq46mf3",
    IDENTITY_POOL_ID: "us-east-2:965bf91d-d03d-4938-8d13-3a70a398edb4"
  }
};
