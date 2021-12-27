import { PositionService } from "./position.service";
import { EmployeeService } from "./employee.service";
import { UserService } from "./user.service";
import { TimeOffBalanceService } from "./timeoff-balance";

export const positionService = new PositionService()
export const employeeService = new EmployeeService()
export const userService = new UserService()
export const timeoffBalanceService = new TimeOffBalanceService()