export interface RTUDTO {
    Address: string;
    LowLimit: number;
    HighLimit: number;
  }

export function createRTUDTO( Address: string, LowLimit: number, HighLimit: number): RTUDTO {
    return {Address, LowLimit, HighLimit};
  }

export interface RTUIdDTO {
    Id: number;
    Address: string;
    LowLimit: number;
    HighLimit: number;
  }

export function createRTUIdDTO(Id: number, Address: string, LowLimit: number, HighLimit: number): RTUIdDTO {
    return {Id, Address, LowLimit, HighLimit};
  }