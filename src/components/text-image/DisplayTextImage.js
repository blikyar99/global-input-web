import React, {Component} from 'react'
import {
  Link
} from 'react-router-dom'


import {styles} from "./styles";
import {TextButton} from "../index";
import DisplayContent from "./DisplayContent";



export  default class DisplayTextImage extends Component {

  renderButton(){
      if(this.props.buttonLabel){
        return(

          <div style={styles.buttonContainer}>
                <TextButton label={this.props.buttonLabel} onPress={this.props.buttonOnPress} link={this.props.buttonLink}
                  href={this.props.buttonHRef}/>
          </div>
        );
      }
      else{
        return null;
      }
  }

  renderTextContent(){
    var containerClass="col-md-12";
    if(this.props.image){
        containerClass="col-md-6";
    }
    return(
        <div className={containerClass}>
          <div style={styles.sectionHeading}>
                  {this.props.title}
          </div>
          <DisplayContent content={this.props.content}/>
          {this.props.children}
          {this.renderButton()}
        </div>
     );

  }
  renderImage(){
    if(this.props.image){
        return(
          <div className="col-md-6">
              <img src={this.props.image} className="img-responsive"/>
          </div>
        );
    }
  }
  render() {
          if(this.props.reverse){
            return (
                          <div className="row top-margin-md" >
                              {this.renderImage()}
                              {this.renderTextContent()}
                          </div>
                    );
          }
          else{
            return (
                          <div className="row top-margin-md" >
                            {this.renderTextContent()}
                            {this.renderImage()}
                          </div>
                    );
          }

    }

}
