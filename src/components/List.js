import React,{Component} from 'react';
import { database } from '../config/base';
import {InfoCompany} from './InfoCompany';
import {Link } from 'react-router-dom';


export default class List extends Component{
    constructor(props){
        super(props);
        this.state = {
            companies:[],
            companyLoading:true
        }
    }
    componentDidMount(){
        database.on('value',(res)=>{
            const items = [];
            let adr_address = [];
            res.forEach(r=>{                
                items.push({...r.val(),key:r.key})                

            })
            console.log(items);
            this.setState({
                companies:items,
                companyLoading:false
            })             
        }) 
        
        
    }
    deleteCompany=(key)=>{
        database.child(key).remove().then((res)=>{
            console.log("Registro apagado com sucesso!");
        }).catch((err)=>{
            console.log(err);
        }) 
        
    }
    
    render(){
        
        const {companies,companyLoading} = this.state;        
        let companyList;        
        if(companyLoading){
            
            companyList = <div className="alert alert-info">Loading...</div>
        }
        else if(companies.length){
            
            companyList = <div>
      
          <table className="table">
            <thead className="thead-light">
              <tr>               
                <th scope="col">Empresa</th>
                <th scope="col">Endereço</th>
                <th scope="col">Telefone</th>     
                <th scope="col">Banner</th>
                <th scope="col">Editar </th>
                <th scope="col">Ação</th>
                <th scope="col">Adicionar Imagem</th>
              </tr>
            </thead>
            <tbody >
            
                {companies.map(company=>(
                    <tr key = {company.key}> 
                    <td scope="col">{company.result.name}</td>
                    <td scope="col">{company.result.formatted_address ? company.result.formatted_address : company.result.adr_address  } </td>
                    <td scope="col">{company.result.formatted_phone_number}</td>                                                  
                    <td scope="col">{company.result.banner ? "Sim" : "Não"}</td>                    
                    <td scope="col">
                    <Link to ={`/company/${company.key}`} className="btn btn-primary">Editar</Link>                    
                    </td>                    
                    <td scope="col">
                     <a href="javascript:;" className="btn btn-danger" onClick={()=>this.deleteCompany(company.key)}>Excluir</a>                                                              
                     </td>                    
                     <td>   
                     <a target="_blank" href={company.result.downloadUrl ? company.result.downloadUrl : ''} className="btn btn-success">Ver Imagem</a>                                                              
                     </td>
                  </tr>
                ))}
            </tbody>
          </table>
            </div>
        }
        else{
            companyList = <div className="alert alert-info">Sem registros</div>;
        }
        return companyList;
    }
}
