import React,{Component} from 'react';
import { database } from '../config/base';

export default class InfoCompany extends Component{
    constructor(props){
        super(props);
        this.state = {
            company:[]
        }
        console.log(this.props.match.params.id)
    }
    componentWillMount(){
        console.log("Fdsafdsafdsa");
    }
    componentDidMount(){
        /* console.log(this.props.match.params.company) */
        const company = [];
        database.child(this.props.match.params.iddd).on((res)=>{
            company.push(...res.val())
        })
        this.setState({
            company
        })
    }
    render(){
        let {company} = this.state;       
        console.log(this.props);
    
    return (
        
        <div class="alert alert-primary" role="alert">
        A simple primary alert—check it out!
      </div>
      
    )
  }   
}