export interface RTUDTO {
    Address: string;
    MinValue: number;
    MaxValue: number;
    GenerateTime: number;
  }

export function createRTUDTO( Address: string, MinValue: number, MaxValue: number, GenerateTime: number): RTUDTO {
    return {Address, MinValue, MaxValue, GenerateTime};
  }

export interface RTUIdDTO {
    Id: number;
    Address: string;
    MinValue: number;
    MaxValue: number;
    GenerateTime: number;
  }

export function createRTUIdDTO(Id: number, Address: string, MinValue: number, MaxValue: number, GenerateTime: number): RTUIdDTO {
    return {Id, Address, MinValue, MaxValue, GenerateTime};
  }