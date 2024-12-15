import { ProspectEmailTriggerEnum } from "../enums/prospect-email-trigger.enum";

export interface TriggerRepository {
  date: string;
  type: ProspectEmailTriggerEnum;
  delta?: DeltaRepository;
}

export interface DeltaRepository {
  field: string;
  prevValue: string;
  newValue: string;
}
