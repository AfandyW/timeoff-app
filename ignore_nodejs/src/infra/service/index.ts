import { PositionService } from "./position.service";
import { EmployeeService } from "./employee.service";
import { UserService } from "./user.service";
import { TimeOffBalanceService } from "./timeoff-balance.service";
import { TimeOffService } from "./timeoff.service"
import { AuthService } from "./auth.service"

export const positionService = new PositionService()
export const employeeService = new EmployeeService()
export const userService = new UserService()
export const timeoffBalanceService = new TimeOffBalanceService()
export const timeOffService = new TimeOffService()
export const authService = new AuthService()