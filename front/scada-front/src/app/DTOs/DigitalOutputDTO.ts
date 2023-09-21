export interface DigitalOutputDTO {
    Name: string;
    Description: string;
    Address: string;
    InitialValue: boolean;
  }

export function createDigitalOutputDTO(Name: string, Description: string, Address: string, InitialValue: boolean): DigitalOutputDTO {
    return {Name, Description, Address, InitialValue};
  }

export interface DigitalOutputIdDTO {
    Id: number;
    Name: string;
    Description: string;
    Address: string;
    InitialValue: boolean;
    CurrentValue: boolean;
    LastChanged: string
  }

export function createDigitalOutputIdDTO(Id: number, Name: string, Description: string, Address: string, InitialValue: boolean, CurrentValue: boolean, LastChanged: string): DigitalOutputIdDTO {
    return {Id, Name, Description, Address, InitialValue, CurrentValue, LastChanged};
  }