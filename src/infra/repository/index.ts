import { PositionRepo } from "./positions";
import { EmployeeRepository } from "./employees";
import { UserRepository } from "./user";

export const positionRepo = new PositionRepo();
export const employeeRepo = new EmployeeRepository();
export const userRepo = new UserRepository();