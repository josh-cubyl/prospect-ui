import { ProspectRepository } from "./prospect.repository";
import { TriggerRepository } from "./trigger.repository";

export interface EmailRepository {
  resourceId: string;
  createdAt: string;
  updatedAt: string;
  emailAddress: string;
  scheduledSendTime: string;
  subject: string;
  linkedinUrl: string;
  originalContent: string;
  content: string;
  isApproved: boolean;
  isDenied: boolean;
  prospect: ProspectRepository;
  trigger: TriggerRepository;
}
