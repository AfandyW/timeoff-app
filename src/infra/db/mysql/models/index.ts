import { Sequelize } from "sequelize";
import UserFactory, {TUser} from "./users";
import PositionFactory, {TPosition} from "./positions"
import EmployeeFactory, { TEmployee } from "./employees";
import TimeBalanceFactory, { TTimeBalance } from "./time-balance";
import TimeOffFactory, { TTimeOff } from "./time-off";

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../database')[env];

type TModel = {
    sequelize: Sequelize,
    Sequelize: typeof Sequelize;
    User: TUser,
    Position: TPosition,
    Employee: TEmployee,
    TimeBalance: TTimeBalance,
    TimeOff: TTimeOff,
}

const sequelize = new Sequelize(config);

const db:TModel = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    User: UserFactory(sequelize),
    Position: PositionFactory(sequelize),
    Employee: EmployeeFactory(sequelize),
    TimeBalance: TimeBalanceFactory(sequelize),
    TimeOff: TimeOffFactory(sequelize),
}

export default db