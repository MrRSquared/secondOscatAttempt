
/**
 * Use this file to define custom functions and blocks.
 * Read more at https://makecode.microbit.org/blocks/custom
 */


let mode = 0;
let previousMode = 1;
let RobotTimer = 0; //Main robot timer
let RobotTimer_PERIOD = 20; // Fire every .20 seconds
let ElapsedTimer = 0;
let ElapsedTimerController = 0;
let Radio = false;
let RobotInit: (params: any) => void
//let RobotPeriodic2: (params: any) => void
let RobotPeriodic: (params: any) => void
let AutoInit: (params: any) => void
let AutoPeriodic: (params: any) => void
let TeleInit: (params: any) => void
let TelePeriodic: (params: any) => void
let DisInit: (params: any) => void
let DisPeriodic: (params: any) => void
let RadioChannel = 1;
let IntroString = "G'Day";
let init = true;
let xAxis = 0;
let yAxis = 0;
let driverType = 0;

    
    //Enums
    enum RobotControl {
     /**
     * Runs when the robot boots up
     * Put all of your startup code here
     */
    //% block="robotInit()"
    RobotInit,
    /**
     * Runs periodically regardless of mode
     * Put periodic tasks here that run regardless of mode
     */ 
    //% block="robotPeriodic()"
    RobotPeriodic

}

/**
     * The user selects the 4-way dc motor.
     */
   enum MyMotors {
        Motor1,
        Motor2,
        Motor3,
        Motor4

    }

enum Methods{
    X,
    Y
}
enum DriverType{
    DfDriver, //This is the driver we use for our Vex Robots
    MaqueenPlus,
    Rover
}

enum RobotMode {
     /**
     * Runs initially in teleop (Driver Control) mode
     */
    //% block="teleopInit()"
    TeleInit,
    /**
     * Runs periodically during telep (driver control) mode
     */ 
    //% block="teleopPeriodic()"
    TelePeriodic,
    /**
     * Runs initially in autonomous mode
     */
    //% block="autoInit()"
    AutoInit,
    /**
     * Runs periodically in autonomous mode
     */
    //% block="autoPeriodic()"
    AutoPeriodic,
    /**
     * Runs periodically when the robot is disabled
     */
    //% block="disabledInit()"
    DisInit,
    /**
     * Runs periodically when the robot is disabled
     */
    //% block="disabledPeriodic()"
    DisPeriodic
}

/** * Custom blocks */ //% weight=100 color=#d42926 icon="\uf1b0"
//% groups="['Robot Modes', 'Joystick', 'Motors', Other]"
namespace Oscats {
        /**
     * Look at our docs for a full guide, but these blocks are an attempt at 
     * Using the Micro:Bit and MakeCode library to create an 
     * FRC-Like robot. This has been tested on the Frrenove and DF RObots, but should
     * work on any Micro:Bit compatible robot.
     */

    //Define our export blocks
    //% block="robot mode:$arg"
    //% weight=100
    //% group="Robot Modes"
        export function on(arg: RobotControl, a: () => void): void {
            //Set the mode of the dropped block
            switch(arg){
                case 0:
                    RobotInit = a;
                break;
                case 1: 
                    RobotPeriodic = a;
                break;
            }
        }
        //% block ="get %arg axis"
    //% weight = 97
    //% group="Joystick"
    export function getAxis(arg:Methods){
        let axisOutput = 0;
        if (arg == 0){
            axisOutput = xAxis;
        } else if (arg == 1){
            axisOutput = yAxis;
        }
        return axisOutput;

    }
    //% block
    //% group="Motors"
    export function setDriverType(driver:DriverType){
        driverType = driver;
    }
    //% block
    //% group="Motors"
    export function setMotor(myMotor:MyMotors, input:number){
        let convertedInput = Oscats.convertMotor(Math.abs(input),255);
        if (driverType == 0){

            let motorChoice = Oscats.getMotor(myMotor);

            if (input > 0){
            motor.MotorRun(motorChoice, motor.Dir.CW, Math.abs(convertedInput))
            } else if (input < 0){
                motor.MotorRun(motorChoice, motor.Dir.CCW, Math.abs(convertedInput))
            } else
            motor.MotorRun(motorChoice, motor.Dir.CW, 0)
        }
        if (driverType == 1){
            let motorChoice = Motors.M1;
            switch(myMotor){
                case 0:
                    motorChoice = Motors.M1;
                    break;
                case 1:
                    motorChoice = Motors.M2;
                    break;  
            }
            if (input > 0){
                DFRobotMaqueenPlus.mototRun(motorChoice, Dir.CW, convertedInput)
            } else if (input < 0){
                DFRobotMaqueenPlus.mototRun(motorChoice, Dir.CCW, convertedInput)
            } else
            DFRobotMaqueenPlus.mototRun(motorChoice, Dir.CCW, 0)
        }
    }
    //% block
    //% group="Motors"
    export function arcadeDrive(leftMotor:MyMotors,rightMotor:MyMotors, speed:number, turnRate:number){

        let leftMotorChoice = Oscats.getMotor(leftMotor);
        let rightMotorChoice = Oscats.getMotor(rightMotor);
        let m_speed = speed;
        let m_turn = turnRate;

        
        if (input > 0){
            motor.MotorRun(motorChoice, motor.Dir.CW, Math.abs(convertedInput))
            
            motor.MotorRun(motorChoice, motor.Dir.CW, 0)
  driv = left +right


    }

    

    //% block="drive Mode:$arg"
    //% weight=98
    //% group="Robot Modes"
        export function driveMode(arg: RobotMode, a: () => void): void {
            //Set the mode of the dropped block
            switch(arg){
                case 0:
                    TeleInit = a;
                break;
                case 1: //Auto
                    TelePeriodic = a;
                break;
                case 2: //Auto
                     //AutoInit = a;
                break; 
                case 3: //Auto
                    AutoPeriodic = a;
                break;  
                case 4: //Auto
                   // DisInit = a;
                break; 
                case 3: //Auto
                    DisPeriodic = a;
                break;
            } 
        }
        //% block = "Set Radio"
        //% weight = 80
        //% group="Other"
        export function setRadio(){
            Radio = true;
            radio.setGroup(RadioChannel);
            radio.sendString(IntroString);
        }
        //% block="getRobotMode()"
        //% group="Other"
        export function getRobotMode() {
            let currentRobotMode = "disabled";
            switch(mode){
                case 0:
                currentRobotMode = "disabled";
                break;
                case 1:
                currentRobotMode = "Teleop";
                break;
                case 2:
                currentRobotMode = "Autonomous";
                break;
            }
            return currentRobotMode;
        }

     /**
     * Use this method to set the channel of the robot to match the remote.
     */               
    //% block="Set Channel"
    //% group="Other"
        export function setChannel(channel: number) {
            radio.setGroup(channel)
    }

    //% block = "Convert %input %scale"
    //% weight = 96
    //% group="Other"
    export function convert(input:number, scale:number){
        let convertedNumber = 0
        convertedNumber = ((input-(-1))/1)*scale;
        return convertedNumber;
    }

    export function convertMotor(input:number, scale:number){
        let convertedNumber = 0
        convertedNumber = (input)*scale;
        return convertedNumber;
    }
    export function getMotor(myMotor:MyMotors){
                let motorChoice = motor.Motors.M1;
            switch(myMotor){
                case 0:
                    motorChoice = motor.Motors.M1;
                    break;
                case 1:
                    motorChoice = motor.Motors.M2;
                    break;
                case 2:
                    motorChoice = motor.Motors.M3;
                    break;
                case 3:
                    motorChoice = motor.Motors.M4;
                    break;
                    return motorChoice
            }
    } 

    export function getSign(input:number){
        let direction = motor.Dir.CW;
        switch(Sign(input)){
            case 1:
            motor.Dir.CW;
            break;
            case -1:
            motor.Dir.CCW;
            break;
        }
    }


        //% block="getTimer"
        //% group="Other"
        export function getTimer() {
            ElapsedTimer = input.runningTime() - ElapsedTimerController;
            return ElapsedTimer;                 
        }

        //% block="resetTimer"
        //% group="Other"
        export function resetTimer() {
            ElapsedTimerController = input.runningTime();                 
        }
        
    if (RobotInit!=null){
    RobotInit(null) //Fire the code
}  
 
}

//Setup the Override Buttons
    /**
     * The library hard-wires the A and B buttons to the robot mode, 
     * but use this method to control it another way. 
     * Set the input (integer) to...
     *  0 (disabled),
     *  1 (Teleoperated), Order
     *  2 (Autonomous) to control the robot functions.
     */

input.onButtonPressed(Button.A, function () {//Trigger Tele
    if (mode == 0){
        mode = 1;
    } else {
        mode =0;
    }
    if (Radio == true){
        radio.sendValue("mode", mode)  
    }
})
if (RobotPeriodic!=null){
    RobotPeriodic(null) //Fire the code
}

input.onButtonPressed(Button.B, function () {//Trigger Auto
    if (mode == 0){
        mode = 2;
    } else {
        mode =0;
    }
    if (Radio == true){
        radio.sendValue("mode", mode)  
    }
})
//joystick logic
radio.onReceivedValue(function (name, value: number) {
    if (name == "mode"){mode = value;}
    if (name == "xAxis"){xAxis = value;}
    if (name == "yAxis"){yAxis = value;}  
})

    /**
     * This is our main loop that runs the robot code.
     * It uses two simple switch statements and a timer to control the robot.
     * Anything put in the robot mode loops above, will run during the chosen mode. 
     */

basic.forever(function () { //Let's keep a forever loop running inside our custom namespace. You could probably at a basic.pause at the bottom of the loop to slow down how fast it runs.
//if this is our first run, run init.
if ((init == true) && (RobotInit!=null)){
    RobotInit(null) //Fire the code
}

    //let nextEvent2Time = 0
    if (input.runningTime() > RobotTimer) {
        if (mode!=previousMode){//Trigger Init Functions
        switch(mode){
            case 1: //Tele
                if (TeleInit!=null){
                    basic.showString("T");
                    TeleInit(null) //Fire the code
                }
                basic.showString("T");
            break;
            case 2: //Auto
                if (AutoInit!=null){
                    basic.showString("A");
                    AutoInit(null) //Fire the code
                }
                basic.showString("A");
            break;  //Disabled
            default:
                if (DisInit!=null){
                    DisInit(null) //Fire the code
                    motor.motorStopAll()
                }
                basic.showString("D");
                motor.motorStopAll()
        }   
        }
        //Run Robot Init...
 
        if (RobotPeriodic!=null){
        RobotPeriodic(null) //Fire the code
        }
        switch(mode){
            case 1: //Tele
                if (TelePeriodic!=null){
                    TelePeriodic(null) //Fire the code
                    basic.showString("T");
                } else{
                    basic.showString("T");  
                }
            break;
            case 2: //Auto
                if (AutoPeriodic!=null){
                    basic.showString("A");
                    AutoPeriodic(null) //Fire the code
                } else{
                    basic.showString("A");  
                }
            break;  //Disabled
            default:
                if (DisPeriodic!=null){
                    DisPeriodic(null) //Fire the code
                } else{
                    basic.showString("D");
                    motor.motorStopAll();  
                } 
        }
        init = false;
        previousMode = mode;
        RobotTimer = input.runningTime() + RobotTimer_PERIOD //Set the next timer event
    }
    })  
      
