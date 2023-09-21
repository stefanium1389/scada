export interface AnalogValueDTO {
    Value: number;
  }

export function createAnalogValueDTO(Value: number): AnalogValueDTO {
    return {Value};
  }

  export interface DigitalValueDTO {
    Value: boolean;
  }

export function createDigitalValueDTO(Value: boolean): DigitalValueDTO {
    return {Value};
  }