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
            <div className="container my-4">

                <div className="ratio ratio-16x9 border border-secondary rounded shadow-sm">
                    <video 
                        // controls 
                        ref={this.props.videoRef} 
                        autoPlay
                        playsInline
                        className="w-100 h-100 rounded"
                    />
                </div>
             </div>
        
        )
    }
}