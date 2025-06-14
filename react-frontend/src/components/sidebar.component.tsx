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
        <aside>
          <h2>카테고리</h2>
          <ul className="nav_links">
                
            {categories.map((category) => (
            <li
                key={category.id}
                onClick={() => this.handleCategorySelect?.(category.id)}
            >
                <NavLink to={"/"+category.id}>{category.label}</NavLink>
            </li>
            ))}
          </ul>
        </aside>
        );
    };
}
