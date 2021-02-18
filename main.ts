Oscats.on(RobotControl.RobotInit, function () {
    radio.setGroup(1)
    Oscats.setDriverType(DriverType.DfDriver)
})
Oscats.driveMode(RobotMode.TelePeriodic, function () {
    Oscats.arcadeDrive(
    MyMotors.Motor1,
    MyMotors.Motor2,
    Oscats.getAxis(Methods.Y),
    Oscats.getAxis(Methods.X)
    )
})
Oscats.driveMode(RobotMode.AutoInit, function () {
    Oscats.setMotor(MyMotors.Motor1, 0.2)
})
