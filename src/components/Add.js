import React, { Component } from 'react';

import { database,configStorage } from '../config/base';
import { storage } from 'firebase';

export default class Add extends Component{
  constructor(props){
      super(props);
      this.onSave = this.onSave.bind(this);
  }
            state = {                        
                 name:'',
                 adr_address:'',               
                 formatted_phone_number:'',
                 banner:false,     
                 socialNet:'',
                 imgBanner:'',
                 uploadLoading:false,
                 uploadValue:'',
                 downloadUrl:'',
                 
             }      
    fileChangeHandler= (event)=>{
        const file = event.target.files[0];        
         this.setState({
            
            'imgBanner':file,
            'banner':true ? file : false

        })             
    }
    onSave=(e)=>{
        e.preventDefault();
        this.saveImage();
     /*    setTimeout(function(){},2000);
        this.onSaveValues(); */
    }
    onSaveOnlyValues= async ()=>{
        const {name,adr_address,banner,socialNet,
            downloadUrl,formatted_phone_number} = this.state;
            const data = {
                result:{
                    name:name,
                    adr_address:adr_address,
                    downloadUrl:downloadUrl,
                    banner:false,
                    socialNet:socialNet,
                    formatted_phone_number:formatted_phone_number
                }
            }
        const save = await database.push(data);
        this.onClearFields();

    }
    onChangeValues=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
        
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
        document.getElementById("imgBanner").value = '';
    }
    validateFields=()=>{
        const {name,adr_address
            ,formatted_phone_number} = this.state;
            return true ? !name.trim() ||
            !adr_address.trim() ||
             !formatted_phone_number.trim() : false;
    }
    componentWillMount(){
        database.onDisconnect();
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
                             formatted_phone_number,socialNet} = this.state;
                             const data = {
                                 result:{
                                     name:name,adr_address:adr_address,
                                     downloadUrl:url,
                                     formatted_phone_number:formatted_phone_number,
                                     banner:true,
                                     socialNet:socialNet
                                 }
                             }
                         const save = database.push(data);
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
            <input  type="file" id="imgBanner" accept="image/*"
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
           <button type="reset"  style={{margin:'6px'}}onClick={this.onClearFields} className="btn btn-danger">Limpar</button>
           <a href="/list"  style={{margin:'6px'}} className="btn btn-success">Cancelar</a>
           </div>
           
            </form>
            
        )
    }
    


}
