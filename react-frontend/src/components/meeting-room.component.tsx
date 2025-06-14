import {Component,createRef} from "react";
import VidieoPlayer from "./VideoPlayer.component";
import ControlBar from "./ControlBar.component";

type Props = {}
type State = {
    stream: MediaStream|null;
    micOn: boolean;
    camOn: boolean;
}

export class MeetingRoom extends Component<Props, State> {
    videoRef = createRef<HTMLVideoElement>();
    constructor(props: Props) {
        super(props);
        
        this.state = {
            stream: null,
            micOn: false,
            camOn: false
        };
    }
    
    async componentDidMount() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true
            });
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
            <div>
                <div>
                    <VidieoPlayer stream={stream} videoRef={this.videoRef}/>
                </div>
                <div>
                    <ControlBar
                        onToggleMic={this.toggleMic}
                        onToggleCamera={this.toggleCamera}
                        onShareScreen={this.shareScreen}
                        micOn={micOn}
                        camOn={camOn}
                    />
                </div>
            </div>
            
        )
    }

}

export default MeetingRoom