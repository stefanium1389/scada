export interface ChangeValueDTO {
    Value: number;
  }

export function createChangeValueDTO(Value: number): ChangeValueDTO {
    return {Value};
  }