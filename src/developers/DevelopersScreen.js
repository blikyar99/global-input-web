import React, {Component} from 'react'
import {images,pagelinks} from "../configs";
import {styles} from "./styles";
import {DisplayTextImage,BookMark,DisplayStaticContent} from "../components";
import {PageWithHeader,blockTextConfig,applicationPathConfig} from "../page-templates";

import DisplaySampleCode1 from "./DisplaySampleCode1";
import DisplaySampleCode2 from "./DisplaySampleCode2";
import DisplaySampleCode3 from "./DisplaySampleCode3";
import DisplaySampleCode4 from "./DisplaySampleCode4";

export  default class DevelopersScreen extends Component {

    constructor(props){
      super(props);
      this.onWindowResize=this.onWindowResize.bind(this);
    }
     componentDidMount() {
         window.addEventListener("resize", this.onWindowResize);
         this.processQueryParameters(this.props);
     }
     getQueryParam(query,variable) {
            if(!query){
              return null;
            }
            query=query.substring(1);
            var vars = query.split('&');
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                if (decodeURIComponent(pair[0]) === variable) {
                    return decodeURIComponent(pair[1]);
                }
            }
  }
     processQueryParameters(props){
            if(props && props.location && props.location.search){
                    var scrollTo=this.getQueryParam(props.location.search, "scrollTo");
                    setTimeout(function(){
                          var elmnt = document.getElementById(scrollTo);
                          elmnt.scrollIntoView()
                    },200);
            }
     }

     componentWillUnmount() {
         window.removeEventListener("resize", this.onWindowResize);
     }
     onWindowResize(){
       this.forceUpdate();
     }


render() {



    return (

      <PageWithHeader  scrollingText={blockTextConfig.developers.home.scrollingText}  selected={blockTextConfig.developers.home.menu}
        install={applicationPathConfig.home.install}
        aboutText={applicationPathConfig.home.aboutText}
        appSubtitle={blockTextConfig.developers.home.appSubtitle}>
         <div style={styles.content}>

           <BookMark bookmark={pagelinks.platform.platform.bookmark}/>
           <div style={styles.itemSection}>

                 <DisplayTextImage title={blockTextConfig.developers.home.platform.title}
                    content={blockTextConfig.developers.home.platform.content}/>
           </div>

           <BookMark bookmark={blockTextConfig.developers.jslibrary.menu.bookmark}/>
           <div style={styles.itemSection}>

                 <DisplayTextImage title={blockTextConfig.developers.jslibrary.title}>
                    <DisplayStaticContent content={blockTextConfig.developers.jslibrary.content}
                      sampleCode1={<DisplaySampleCode1/>}  sampleCode2={<DisplaySampleCode2/>}
                      sampleCode3={<DisplaySampleCode3/>}
                      sampleCode4={<DisplaySampleCode4/>}/>


                </DisplayTextImage>



           </div>

           <div style={styles.itemSection}>
                <BookMark bookmark={blockTextConfig.developers.websocketServer.menu.bookmark}/>
                 <DisplayTextImage title={blockTextConfig.developers.websocketServer.title} reverse={true}
                    content={blockTextConfig.developers.websocketServer.content}/>
           </div>


           <BookMark bookmark={blockTextConfig.developers.home.howItWorks.bookmark}/>
           <div style={styles.itemSection}>

                 <DisplayTextImage title={blockTextConfig.developers.home.howItWorks.title}
                    content={blockTextConfig.developers.home.howItWorks.content}/>
           </div>


         </div>
      </PageWithHeader>
            );
  }
}
