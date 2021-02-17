Oscats.on(RobotControl.RobotInit, function () {
    Oscats.setDriverType(DriverType.DfDriver)
})
Oscats.driveMode(RobotMode.TeleInit, function () {
    Oscats.setMotor(MyMotors.Motor1, Oscats.getAxis(Methods.X))
    Oscats.setMotor(MyMotors.Motor2, Oscats.getAxis(Methods.Y))
})
