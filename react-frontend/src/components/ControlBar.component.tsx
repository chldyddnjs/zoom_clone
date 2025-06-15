import { Component } from "react";

type Props = {
  onToggleMic: () => void;
  onToggleCamera: () => void;
  onShareScreen: () => void;
  micOn: boolean;
  camOn: boolean;
};

export default class ControlBar extends Component<Props> {
    constructor(props:Props){
        super(props)
    }
    render() {
    const { onToggleMic, onToggleCamera, onShareScreen, micOn, camOn } = this.props;

    return (
      <div className="flex justify-center gap-4 p-4 bg-gray-800 text-white">
        <button onClick={onToggleMic}>
          {micOn ? "🔊 마이크 켬" : "🔇 마이크 끔"}
        </button>
        <button onClick={onToggleCamera}>
          {camOn ? "🎥 카메라 켬" : "📷 카메라 끔"}
        </button>
        <button onClick={onShareScreen}>🖥️ 화면 공유</button>
      </div>
    );
  }
}
