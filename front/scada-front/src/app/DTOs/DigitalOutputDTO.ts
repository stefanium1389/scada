export interface DigitalOutputDTO {
    Name: string;
    Description: string;
    Address: string;
    InitialValue: number;
  }

export function createDigitalOutputDTO(Name: string, Description: string, Address: string, InitialValue: number): DigitalOutputDTO {
    return {Name, Description, Address, InitialValue};
  }

export interface DigitalOutputIdDTO {
    Id: number;
    Name: string;
    Description: string;
    Address: string;
    InitialValue: number;
  }

export function createDigitalOutputIdDTO(Id: number, Name: string, Description: string, Address: string, InitialValue: number): DigitalOutputIdDTO {
    return {Id, Name, Description, Address, InitialValue};
  }