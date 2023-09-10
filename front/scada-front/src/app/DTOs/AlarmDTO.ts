export interface AlarmDTO {
    Type: string;
    Priority: string;
    TagId: number;
    Limit: number;
  }

export function createAlarmDTO(Type: string, Priority: string, TagId: number, Limit: number): AlarmDTO {
    return {Type, Priority, TagId, Limit};
  }

export interface AlarmIdDTO {
    Id: number;
    Type: string;
    Priority: string;
    TagId: number;
    Limit: number;
  }

export function createAlarmIdDTO(Id: number, Type: string, Priority: string, TagId: number, Limit: number): AlarmIdDTO {
    return {Id, Type, Priority, TagId, Limit};
  }