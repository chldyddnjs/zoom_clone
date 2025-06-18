import {Component,createRef} from "react";
import { Container,Row,Col } from "react-bootstrap";
import VidieoPlayer from "./VideoPlayer.component";
import ControlBar from "./ControlBar.component";
import ChatBox from "./ChatBox.component";
type Props = {}
type State = {
    stream: MediaStream|null;
    micOn: boolean;
    camOn: boolean;
    constraints:{
        audio:boolean,
        video:{
            width:{min:number,ideal:number,max:number}
            height:{min:number,ideal:number,max:number}
            frameRate:{ideal:number,max:number}
        }
    };
}

export class MeetingRoom extends Component<Props, State> {
    videoRef = createRef<HTMLVideoElement>();
    constructor(props: Props) {
        super(props);
        
        this.state = {
            stream: null,
            micOn: true,
            camOn: true,
            constraints:{
                audio: true,
                video: { 
                    width: { min: 1024, ideal: 1280, max: 1920 },
                    height: { min: 576, ideal: 720, max: 1080 },
                    frameRate: { ideal: 10, max: 15 }},
                }
        };
    }
    
    async componentDidMount() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(this.state.constraints);
            
            this.setState({ stream });
            if (this.videoRef.current) {
                this.videoRef.current.srcObject = stream;
            }
        } catch (error) {
            console.error("Error accessing media devices.", error);
        }
    }
    
    toggleMic = () => {
        const {stream,micOn} = this.state
        if (stream) {
            stream.getAudioTracks().forEach((track) => {
                track.enabled = !micOn;
            });
            this.setState({micOn:!micOn});
        }
    }

    toggleCamera = () => {
        const {stream,camOn} = this.state;
        if (stream) {
            stream.getVideoTracks().forEach((track => {
                track.enabled = !camOn;
            }));
            this.setState({camOn:!camOn});
        }
    }

    shareScreen = async () => {
        try{
            const displayStream = await navigator.mediaDevices.getDisplayMedia();
            console.log("화면 공유 시작됨", displayStream)
        } catch(err) {
            console.error("화면 공유 실패",err)
        }
    };

    render() {
        const {stream,micOn,camOn} = this.state;

        return(
                
            <Container fluid className="p-3">
                <Row>
                    <Col md={8} className="p-3">
                        <VidieoPlayer stream={stream} videoRef={this.videoRef}/>
                        <ControlBar
                            onToggleMic={this.toggleMic}
                            onToggleCamera={this.toggleCamera}
                            onShareScreen={this.shareScreen}
                            micOn={micOn}
                            camOn={camOn}
                            />
                    </Col>
        
                    <Col md={4}>
                        <ChatBox/>
                    </Col>
                
                </Row>
            </Container>
            
        )
    }

}

export default MeetingRoom