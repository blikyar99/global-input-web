import React from 'react'
import QRCode from "qrcode.react";
import  "./QRCodePrintService.css";


import {GlobalInputComponent,InputCodeRender} from "../global-input-component";

export default class QRCodePrintService extends GlobalInputComponent {
  constructor(props){
    super(props);
    this.state={size:300,level:"Q", content:"", label:"",sender:{}, senders:[]};
  }

    buildInitData(){
        return {
                  action:"input",
                  dataType:"qrcode",
                  form:{
                    "title": "QR Code generator",
                    fields:[{
                              label:"Label",
                              operations:{
                                  onInput:this.setLabel.bind(this)
                              }


                            },{
                               label:"Content",
                               operations:{
                                 onInput:this.setContent.bind(this)
                               }

                            },{
                               label:"Size",
                               operations:{
                                 onInput:this.setSize.bind(this)
                               },
                               value:300,
                               type:"range",
                               minimumValue:100,
                               maximumValue:1000,
                               step:10

                            },{
                              label:"Level",
                              operations:{
                                onInput:this.onLevelItemsSelected.bind(this)
                              },
                              type:"list",
                              selectType:"single",
                              value:"Q",
                              items:[
                                {value:"L", label:"L"},
                                {value:"M", label:"M"},
                                {value:"Q", label:"Q"},
                                {value:"H", label:"H"}
                              ]
                            },{
                               label:"Print",
                               type:"button",
                               operations:{
                                  onInput:this.printQRCode.bind(this)
                               }

                            }]
                        }
                  }
    }

    setSize(size){
      this.setState(Object.assign({},this.state,{size}));
    }
    onLevelItemsSelected(items){
      console.log("********selected item receifed:"+JSON.stringify(items));
        if(!items.length){
          console.log("received selected items length is zero");
          return;
        }
        var selected=items[0].value;
        if(selected=="L"||selected=="M" || selected=="Q" || selected=="H"){
            this.setLevel(selected);
        }
    }

    setLevel(level){
          this.setState(Object.assign({},this.state,{level}));

    }
    setLabel(label){
      this.setState(Object.assign({},this.state,{label}));
    }
    setContent(content){
      this.setState(Object.assign({},this.state,{content}));
    }
    printQRCode(){
        window.print();
    }

    render() {

        var {size,level,content,label}=this.state;
        return(
        <div className="formContainer">
                <div className="adjustableCodeData">
                  <div className="adjustableCodeDataContainer toPrint">

                      <QRCode value={content} level={level} size={size}/>
                      {label}

                  </div>
                  <div className="codedataControllerContainer">
                    <input type="range" min="100" max="1000" step="10" value={size} onChange={evt=>{
                        this.setSize(evt.target.value);
                    }}/>
                    <select value={level} onChange={evt=>{
                      this.setLevel(evt.target.value);
                    }}>
                      <option value="L">L</option>
                      <option value="M">M</option>
                      <option value="Q">Q</option>
                      <option value="H">H</option>
                    </select>
                  </div>
                  <div>
                      Content: <input type="text" onChange={(evt) => {
                            this.setContent(evt.target.value);
                        }} value={this.state.content} size="30"/>
                  </div>
                  <div>
                      Label: <input type="text" onChange={(evt) => {
                            this.setLabel(evt.target.value);
                        }} value={this.state.label} size="30"/>
                  </div>
                  <div>
                      <button onClick={this.printQRCode}>
                      Print
                      </button>

                  </div>

                </div>
                <div className="inputcode">
                  <InputCodeRender connector={this.connector} type="input"  level="Q" size="300" sender={this.state.sender} senders={this.state.senders}/>
                </div>
        </div>

        );
    }
}