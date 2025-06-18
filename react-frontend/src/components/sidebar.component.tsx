import {Component} from "react";
import {NavLink } from "react-router-dom";


type Props = {};
type State = {};

const categories = [
    { id: "meeting-room", label: "회의" },
    { id: "recoding", label: "녹화" },
    { id: "note", label: "노트" },
    { id: "document", label: "문서" },
];

export default class Sidebar extends Component<Props,State>{
    constructor(props:Props){
        super(props)
        this.handleCategorySelect = this.handleCategorySelect.bind(this);
    }

    handleCategorySelect = (category: string) => {
        console.log("선택된 카테고리:", category);
  };

    render(){
        return (
        <nav id="siderbarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <h2>카테고리</h2>
                <ul className="nav flex-column">
                        
                    {categories.map((category) => (
                        <li
                        className="nav-item"
                        key={category.id}
                        onClick={() => this.handleCategorySelect?.(category.id)}
                        >
                        <NavLink className="nav-link active" aria-current="page" to={"/"+category.id}>{category.label}</NavLink>
                    </li>
                    ))}
                </ul>
            </div>
        </nav>
        
        );
    };
}
