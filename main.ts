Oscats.on(RobotControl.RobotInit, function () {
    radio.setGroup(1)
    Oscats.setDriverType(DriverType.DfDriver)
})
Oscats.driveMode(RobotMode.TelePeriodic, function () {
    Oscats.setMotor(MyMotors.Motor1, Oscats.getAxis(Methods.X))
    Oscats.setMotor(MyMotors.Motor2, Oscats.getAxis(Methods.Y))
})
Oscats.driveMode(RobotMode.AutoPeriodic, function () {
    Oscats.setMotor(MyMotors.Motor1, 0)
    Oscats.setMotor(MyMotors.Motor2, 0)
})
