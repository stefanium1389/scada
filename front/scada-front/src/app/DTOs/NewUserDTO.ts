export interface NewUserDTO {
    Username: string;
    Password: string;
  }

export function createNewUserDTO(Username: string, Password: string): NewUserDTO {
    return {Username, Password};
  }