const net = require('net');
const Tello = require('tello-drone');

class DroneConnection {
    constructor() {
        this.drone = new Tello();
        const drone = new Tello({
            host: "127.0.0.1",        
            port: "8888",             
            statePort: "8890",        
            skipOK: false,            
      })
        this.message="";
        this.speed=50;
    }

    connect() {
        this.drone.on("connection", () => {
            console.log("Connected to drone");
            this.drone.send("takeoff")
                .then(() => this.drone.send("flip", { value: "f" }))
                .then(() => this.drone.send("land"))
                .catch(error => {
                    console.log(error)
                    this.drone.send("land")
                });
        });
        this.drone.on("state", state => {
            console.log("Recieved State > ", state);
        });
        this.drone.on("send", (err, length) => {
            if (err) console.log(err);
            console.log(`Sent command is ${length} long`);
        });
        this.drone.on("message", message => {
            this.message=message;
            console.log("Recieved Message > ", message);
            this.handleInput(message);
        });
    }
    async handleInput(message) {
        switch (message) {
            case "takeoff":
                console.log("Detected takeoff command.");
                try {
                    await this.drone.takeoff;
                } catch (err) {
                    console.log(err);
                }
                break;
            case "land":
                console.log("Detected land command.");
                try {
                    await this.drone.land;
                } catch (err) {
                    console.log(err);
                }
                break;
            case "moveForward":
                console.log("Movement command toForward");
                setTimeout(() => {
                this.LFEngine(50)
                this.RFEngine(50)  
                this.RBEngine(60)
                this.LBEngine(60)
                }, 1000);
                this.LFEngine(50)
                this.RFEngine(50)  
                this.RBEngine(50)
                this.LBEngine(50)
//The speed of the right front engine and the left front engine will decrease.
                break;
            case "moveLeft":
                console.log("Movement command toLeft");
                setTimeout(() => {
                    this.LFEngine(60)
                    this.RFEngine(50)  
                    this.RBEngine(60)
                    this.LBEngine(50)
                    }, 1000);
                    this.LFEngine(50)
                    this.RFEngine(50)  
                    this.RBEngine(50)
                    this.LBEngine(50)
//The speed of the right front and left rear engines will decrease,
//and the speed of the left front and right rear engines should increase in order not to lose altitude.
                break;
            case "moveRight":
                console.log("Movement command toRight");               
                 setTimeout(() => {
                    this.LFEngine(50)
                    this.RFEngine(60)  
                    this.RBEngine(50)
                    this.LBEngine(60)
                    }, 1000);
                    this.LFEngine(50)
                    this.RFEngine(50)  
                    this.RBEngine(50)
                    this.LBEngine(50)
//sol ön ve sağ arka motorların hızı azalacak irtifa kaybetmemesi için sağ ön ve sol arka motorların hızı artmalı   
                break;
            case "moveBack":
                console.log("Movement command toBack");
                setTimeout(() => {
                    this.LFEngine(50)
                    this.RFEngine(60)  
                    this.RBEngine(50)
                    this.LBEngine(60)
                    }, 2000);
                    this.LFEngine(50)
                    this.RFEngine(50)  
                    this.RBEngine(50)
                    this.LBEngine(50)
 //left veya right yapma değerlerini iki katı olarak uygularsam hallolur                   
                break;
        }
    }
    async LFEngine(speed){
        drone.send("speed", { value: speed })
    .then(() => console.log("Speed set to 50"))
    .catch(err => console.log(err));
       
    }
    async RFEngine(speed){
        drone.send("speed", { value: speed })
    .then(() => console.log("Speed set to 50"))
    .catch(err => console.log(err));
    }
    async LBEngine(speed){
        drone.send("speed", { value: speed })
    .then(() => console.log("Speed set to 50"))
    .catch(err => console.log(err));
    }
    async RBEngine(speed){
        drone.send("speed", { value: speed })
    .then(() => console.log("Speed set to 50"))
    .catch(err => console.log(err));
    }
}

module.exports = DroneConnection;
const drone = new DroneConnection();
drone.connect();
    
