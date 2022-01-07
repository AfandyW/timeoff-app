import { PositionRepo } from "./positions";
import { EmployeeRepository } from "./employees";
import { UserRepository } from "./user";
import { TimeOffBalanceRepository } from "./timeoff-balance";
import { TimeOffRepository } from "./timeoff";

export const positionRepo = new PositionRepo();
export const employeeRepo = new EmployeeRepository();
export const userRepo = new UserRepository();
export const timeOffBalanceRepo = new TimeOffBalanceRepository();
export const timeOffRepo = new TimeOffRepository();