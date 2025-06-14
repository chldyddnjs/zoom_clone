import {Component,RefObject} from "react";

type Props = {
    stream:MediaStream|null;
    videoRef:RefObject<HTMLVideoElement>
};

export default class VidieoPlayer extends Component<Props> {
    constructor(props:Props){
        super(props)
    }
    
    render(){
        return (
            <video
             ref={this.props.videoRef}
             autoPlay
             playsInline
             className="rouned-lg w-full h-auto"
            />
        
        )
    }
}