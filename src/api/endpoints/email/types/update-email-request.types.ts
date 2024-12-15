export interface EmailUpdateInterface {
  resourceId: string;
  content?: string;
  emailAddress?: string;
  subject?: string;
  scheduledSendTime?: string;
}
