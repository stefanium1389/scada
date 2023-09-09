export interface AnalogInputDTO {
    Name: string;
    Description: string;
    Function: string;
    Address: string;
    ScanTime: number;
    IsScanning: boolean;
    LowLimit: number;
    HighLimit: number;
    Unit: string
  }

export function createAnalogInputDTO(Name: string, Description: string, Function: string, Address: string, ScanTime: number, IsScanning: boolean, LowLimit: number, HighLimit: number, Unit: string): AnalogInputDTO {
    return {Name, Description, Function, Address, ScanTime, IsScanning, LowLimit, HighLimit, Unit};
  }

export interface AnalogInputIdDTO {
    Id: number;
    Name: string;
    Description: string;
    Function: string;
    Address: string;
    ScanTime: number;
    IsScanning: boolean;
    LowLimit: number;
    HighLimit: number;
    Unit: string
  }

export function createAnalogInputIdDTO(Id: number, Name: string, Description: string, Function: string, Address: string, ScanTime: number, IsScanning: boolean, LowLimit: number, HighLimit: number, Unit: string): AnalogInputIdDTO {
    return {Id, Name, Description, Function, Address, ScanTime, IsScanning, LowLimit, HighLimit, Unit};
  }