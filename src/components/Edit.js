import React, { Component } from 'react';

import { database,configStorage } from '../config/base';
import { storage } from 'firebase';
import { categories } from '../config/categories';

export default class Edit extends Component{
  constructor(props){
      super(props);
      this.onSave = this.onSave.bind(this);
  }
    componentWillMount(){
        database.onDisconnect();
    }
        state = {       
                id:'',                 
                name:'',
                adr_address:'',               
                formatted_phone_number:'',
                banner:false,     
                socialNet:'',
                imgBanner:'',
                uploadLoading:false,
                uploadValue:'',
                downloadUrl:'',
                category:''
                
            }      
    fileChangeHandler= (event)=>{
        const file = event.target.files[0];        
         this.setState({
            'imgBanner':file,
            'banner':true ? file : false
        })             
    }
    
    componentDidMount(){
        const {key} = this.props.match.params;        
        database.child(key).on('value',(data)=>{  
            console.log(data.val());
             this.setState({
                id:key,                 
                name:data.val().result.name,
                formatted_phone_number:data.val().result.formatted_phone_number,
                adr_address:data.val().result.formatted_address ? data.val().result.formatted_address : data.val().result.adr_address,              
                banner:data.val().result.banner,     
                socialNet:data.val().result.socialNet ? data.val().result.socialNet : '',
                downloadUrl:data.val().result.downloadUrl ? data.val().result.downloadUrl : '',
                category:data.val().result.category ? data.val().result.category : '',
                
            }) 
        })
    }
    onSave=(e)=>{
        e.preventDefault();
        this.saveImage();
    }
    onSaveOnlyValues= async ()=>{
        const {name,adr_address,banner,
            downloadUrl,formatted_phone_number,category} = this.state;
            const data = {
                result:{
                    name:name,adr_address:adr_address,
                    downloadUrl:downloadUrl,
                    banner:false,
                    category:category,
                    formatted_phone_number:formatted_phone_number
                }
            }
        const save = await database.child(this.state.id).update(data);
        database.child(this.state.id).push();
        this.onClearFields();
    }
    onChangeValues=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
        
    }
    selectChange=(event)=>{
        this.setState({
            category:event.target.value
        })
        console.log(this.state);
    }
    onClearFields=()=>{
        this.setState({
            name:'',
            adr_address:'',               
            formatted_phone_number:'',
            banner:'',     
            socialNet:'',
            imgBanner:'',
            uploadLoading:'',
            uploadValue:'',
            downloadUrl:'',
        })
    }
    validateFields=()=>{
        const {name,adr_address
            ,formatted_phone_number} = this.state;
             return true ? !name.trim() ||
            !adr_address.trim() ||
             !formatted_phone_number.trim() : false;
    }
     saveImage(){
         if(!this.state.imgBanner){
             this.onSaveOnlyValues();
         }
         else{
             let oldfile = this.state.imgBanner.name.split('.');       
             let newfile = new Date().getTime()+ '.'+oldfile[1];       
             let storageRef = configStorage.child(newfile);      
                 const uploadTask =  storageRef.put(this.state.imgBanner);
                 uploadTask.on('state_changed',(snapshot)=>{
                     this.setState({
                         uploadLoading:true,
                         uploadValue:(uploadTask.snapshot.bytesTransferred/uploadTask.snapshot.totalBytes)*100
                     })
                 },(error)=>{
     
                 },()=>{
                     storageRef.getDownloadURL().then(url=>{
                         this.setState({
                             downloadUrl:url,
                             uploadLoading:false,
                             uploadValue:100
                         });
                         const {name,adr_address,banner,
                             formatted_phone_number,socialNet,category} = this.state;
                             const data = {
                                 result:{
                                     name:name,adr_address:adr_address,
                                     downloadUrl:url,
                                     formatted_phone_number:formatted_phone_number,
                                     banner:true,
                                     socialNet:socialNet,
                                     category:category
                                 }
                             }
                         const save = database.child(this.state.id).update(data);
                         this.onClearFields();
                        
                     })
                 })
                 
         }
    }

    render(){
      
        return (
            
            <form>
            <div className="form-group">
            <label htmlFor="name">Nome</label>                    
            <input required  ref="name" value={this.state.name} 
             onChange = {(name)=>this.onChangeValues(name)} type="text" className="form-control" id="name" placeholder="Nome da empresa"/>
            </div>
            <div className="form-group">
            <label  htmlFor="imgBanner">Banner</label>
            <input  type="file" accept="image/*"
            onChange={(event)=> { 
                this.fileChangeHandler(event)                 
           }}
              className="form-control" />
            </div>                
            <div className="alert alert-danger" style={{display:this.state.uploadLoading ? 'block' : 'none'}}>
                Enviando arquivo {this.state.uploadValue}%
            </div>
            
            <div className="form-group">
            <label htmlFor="formatted_phone_number">Celular</label>
            <input required  ref="formatted_phone_number"
             value={this.state.formatted_phone_number} 
             onChange = {(formatted_phone_number)=>this.onChangeValues(formatted_phone_number)} type="tel" className="form-control" id="formatted_phone_number" placeholder="Celular"/>
            </div>
            <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <select className="form-control" name="category" value = {this.state.category} onChange={this.selectChange}>
               {categories.map((e,key)=>{
                   var selected = (e.category===this.state.category) ? 'selected' : 'false';                  
                   return <option key={key}  selected = {selected}  value = {e.category}>{e.category}</option>
               })} 
            </select>
            
            </div>
            
            <div className="form-group">
            <label htmlFor="adr_address">Endereço</label>
            <input required  ref="adr_address" 
            onChange = {(adr_address)=>this.onChangeValues(adr_address)}
             type="text" className="form-control" 
             id="adr_address" name="adr_address" 
             value={this.state.adr_address}/>
            </div>
            <div className="form-group">
            <label  htmlFor="socialNet">Rede social</label>
            <input required  ref="socialNet" type="text" 
            onChange = {(socialNet)=>this.onChangeValues(socialNet)}
            className="form-control" id="socialNet"
            value={this.state.socialNet}/>
            </div>
           <div className="form-group" >           
           <button type="submit" style={{margin:'6px'}} disabled={this.validateFields()} onClick={this.onSave} className="btn btn-primary">Enviar</button>
           <button type="reset"  style={{margin:'6px'}} onClick={this.onClearFields} className="btn btn-danger">Limpar</button>
           <a href="/list"  style={{margin:'6px'}} className="btn btn-success">Cancelar</a>
           </div>
           
            </form>
            
        )
    }
    


}
