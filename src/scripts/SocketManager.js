import io from 'socket.io-client';

export default class SocketManager {
    constructor(oScene,) {
        this.oScene = oScene;
        this.sRootUrl = 'http://192.168.11.56:3040';
        this.iBoardId = '6744369aac1a00c98ab71c6e';
        this.sAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ3MDk4OWM2MTYyYWM4NDQwNTRiOWEiLCJpYXQiOjE3MzI3MDg3NDV9.YvsQ1eV84jPuCTFYmnA691VVaUPSAK5L6o9_ghk9npM';

        this.socket = io(this.sRootUrl, {
            transports: ["websocket", "polling"],
            query: {
                authorization: this.sAuthToken,
            },
        })
        this.socket.on("connect", () => {
            this.sRootSocket = this.socket.id;
            console.log("Connected to Socket :: ", this.socket.id);
        });
        this.socket.on("disconnect", () => {
            console.log("Disconnected from Socket");
        });
        this.socket.on("reconnect", () => {
            console.log("Reconnected to Socket");
        });
        this.socket.on("connect_error", (error) => {
            console.error("Error while connecting to the server:", error);
        });
        this.socket.on(this.iBoardId, (data) => {
            try {
                this.onReceive(data);
            } catch (error) {
                console.error(error);
            }
        });
        this.socket.emit("reqJoinBoard", { iBoardId: this.iBoardId }, (data) => {
            this.onReqJoinBoard(data);
        });

        // For Requesting Socket Emits
        this.emit = (sEventName, oData = {}, callback) => {
            console.log(`%c ${sEventName}`, 'color: #64C3EB', oData);
            this.socket.emit(this.iBoardId, { sEventName, oData }, (error, response) => {
                console.log('%c' + sEventName + ' callback', 'color: #CE375C', error, response);
                if (error && (error.code || error.message)) {
                    console.log(error.code, error.message);
                }
            });
        };
    }


    onReqJoinBoard(data) {
        console.log('onReqJoinBoard', data);
        this.oScene.totalBalance_txt.setText(Number(data.player.nChips).toFixed(2));
        this.oScene.betButton_1.textContent = data.player.eState === 'waiting' ? 'Play in next bet' : `Bet \n ${data.player.nBetAmount} \n INR`;
    }


    onReceive(data) {
        console.log("onReceive", data)
        switch (data.sEventName) {
            case 'resInitialCrashValue':
                this.oScene.nGamePlayTime = data.oData.nGamePlayTime
                this.oScene.nMultiplyMoneyValue = data.oData.nMultiplyMoneyValue
                this.oScene.betButton_1.textContent = 'Play in next bet';
                this.oScene.betButton_1.enabled = true;
                this.oScene.moveAirplane(this.oScene.initialY, this.oScene.targetX, this.oScene.targetY, this.oScene.duration, 0);
                this.oScene.setTimer(data.oData.nGamePlayTime, this.oScene.nMultiplier, this.oScene.initialX, this.oScene.initialY, data.oData.nMultiplyMoneyValue);
                break;
            case 'resUpdatedCrashValue':
                console.log("resUpdatedCrashValue", data)
                if (data.oData.nGamePlayTime && data.oData.nMultiplyMoneyValue) {
                    // Clear existing intervals
                    clearInterval(this.oScene.timeIntervel);
                    clearInterval(this.oScene.multiplierIntervel);
                    // Reset timer with new values
                    this.oScene.setTimer(
                        data.oData.nGamePlayTime,
                        this.oScene.nMultiplier,
                        this.oScene.initialX,
                        this.oScene.initialY,
                        data.oData.nMultiplyMoneyValue
                    );
                }
                break;
            case 'resBet':
                this.oScene.betButton_1.style.backgroundColor = '#808080';
                break;
            case 'resCashOut':
                console.log("resCashOut", data.oData.nCashOutAtValue)
                this.oScene.cashOut_txt.setVisible(true);
                this.oScene.cashOut_txt.setText(`Cash Out at ${data.oData.nCashOutAtValue}X`);
                break;
            case 'assignBetTimeout':
                // console.log("assignBetTimeout", data.oData.timeoutDuration)
                this.oScene.cashOut_txt.setVisible(false);
                this.oScene.betButton_1.textContent = `Bet`;
                this.oScene.setBetStartCountdown(data.oData.timeoutDuration);
                break;
            case 'resPlayerData':
                if (data.oData.eState === 'playing') {
                    console.log("resPlayerData", data.oData.eState)
                    this.oScene.betButton_1.enabled = true;
                    this.oScene.betButton_1.textContent = 'Cash Out';
                }
                if (data.oData.nChips) {
                    this.oScene.totalBalance_txt.setText(Number(data.oData.nChips).toFixed(2));
                }
                break;
            default:
                // console.log('Unknown event received:', data.sEventName, data);
                break;
        }
    }

    handlePlaceBet(amount) {
        this.socket.emit(this.iBoardId, { sEventName: 'reqBet', oData: { nBetAmount: +amount } }, response => {
            console.log("reqBet", response)
        });
    }
    handleCashOut() {
        this.socket.emit(this.iBoardId, {
            sEventName: 'reqCashOut',
            oData: {
                nCashOutAtValue: parseFloat(this.oScene.multiplier_txt.text)
            }
        }, response => {
            console.log("reqCashOut", response);
        });
    }
}