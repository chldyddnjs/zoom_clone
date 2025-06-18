import React, {Component} from "react";
import { Form,Button } from "react-bootstrap";
import AuthService from "../services/auth.service";

type Props = {}
type State = {
    messages:string[];
    input:string;
    user:string;
}

export default class ChatBox extends Component<Props,State> {
    constructor(props:Props) {
        super(props);
        
        this.state = {
            messages:[],
            input:"",
            user:""
        }
    }
    
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
    
        if (!currentUser) this.setState({ user: "unknown" });
        this.setState({ user:currentUser.username})
      }

    handleSend = () => {
        const {input,user} = this.state;

        if (input.trim()) {
            this.setState((prevState) => ({
                messages:[...prevState.messages,user+':'+input],
                input:""
            }));
        }
    };

    render(): React.ReactNode {
        return (
            <div className="border rouned p-3" style={{height:"400px"}}>
                <div className="overflow-auto mb-2" style={{height:"300px"}}>
                    {this.state.messages.map((msg,idx) => (
                        <div key={idx} className="text-secondary">{msg}</div>
                    ))}
                </div>
                
                <Form.Control
                    type="text"
                    value={this.state.input}
                    onChange={(e) => this.setState({input:e.target.value})}
                    onKeyDown={(e) => e.key === "Enter" && this.handleSend()}
                />

                <Button className="mt-2 w-100" onClick={this.handleSend}>
                    전송
                </Button>
            </div>            
        )
    }
}