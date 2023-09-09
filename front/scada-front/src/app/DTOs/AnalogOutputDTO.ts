export interface AnalogOutputDTO {
    Name: string;
    Description: string;
    Address: string;
    InitialValue: number;
    LowLimit: number;
    HighLimit: number;
    Unit: string
  }

export function createAnalogOutputDTO(Name: string, Description: string, Address: string, InitialValue: number, LowLimit: number, HighLimit: number, Unit: string): AnalogOutputDTO {
    return {Name, Description, Address, InitialValue, LowLimit, HighLimit, Unit};
  }

export interface AnalogOutputIdDTO {
    Id: number;
    Name: string;
    Description: string;
    Address: string;
    InitialValue: number;
    LowLimit: number;
    HighLimit: number;
    Unit: string
  }

export function createAnalogOutputIdDTO(Id: number, Name: string, Description: string, Address: string, InitialValue: number, LowLimit: number, HighLimit: number, Unit: string): AnalogOutputIdDTO {
    return {Id, Name, Description, Address, InitialValue, LowLimit, HighLimit, Unit};
  }