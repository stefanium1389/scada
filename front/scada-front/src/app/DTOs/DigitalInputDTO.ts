export interface DigitalInputDTO {
    Name: string;
    Description: string;
    Function: string;
    Address: string;
    ScanTime: number;
    IsScanning: boolean;
  }
  
  export function createDigitalInputDTO(Name: string, Description: string, Function: string, Address: string, ScanTime: number, IsScanning: boolean): DigitalInputDTO {
    return {Name, Description, Function, Address, ScanTime, IsScanning};
  }
  
  export interface DigitalInputIdDTO {
    Id: number;
    Name: string;
    Description: string;
    Function: string;
    Address: string;
    ScanTime: number;
    IsScanning: boolean;
  }
  
  export function createDigitalInputIdDTO(Id: number, Name: string, Description: string, Function: string, Address: string, ScanTime: number, IsScanning: boolean): DigitalInputIdDTO {
    return {Id, Name, Description, Function, Address, ScanTime, IsScanning};
  }