import React, {Component} from 'react'

import {
  Link
} from 'react-router-dom'

import {styles} from "./styles";


export  default class TopMenu extends Component {
  constructor(props){
      super(props);
      this.state={menuPressed:false};
      this.mediaQueryChanged=this.mediaQueryChanged.bind(this);
  }
  componentWillMount(){

    styles.addMediaListener(this.mediaQueryChanged);

  }
  componentWillUnmount() {
    styles.removeMediaListener(this.mediaQueryChanged);
  }
  mediaQueryChanged(){
      this.forceUpdate();

  }


  menuPressed(){
      this.setState(Object.assign({},this.state,{menuPressed:!this.state.menuPressed}));
  }
  setMenuPressed(menuPressed){
      this.setState(Object.assign({},this.state,{menuPressed}));
  }
  hideMenu(){
      this.setState(Object.assign({},this.state,{menuPressed:false}));
  }

  renderMenuItem(menu,index){
      var key=index+"_"+menu.label;
      return(<MenuItem  menu={menu} selected={this.props.selected} key={key}/>);
  }

  renderDesktopMenuItems(){
    return(<div style={styles.menuItems}>{this.props.menus.map(this.renderMenuItem.bind(this))}</div>
        );

  }



    renderDesktopSubtitle(){
          if(this.props.appSubtitle){
              return(
                <div style={styles.subtitleDesktopContaier}>{this.props.appSubtitle}</div>
              );
          }
          else{
            return null;
          }

    }
    renderMobileSubtitle(){
          if(this.props.appSubtitle){
              return(
                <div style={styles.subtitleMobileContaier}>{this.props.appSubtitle}</div>
              );
          }
          else{
            return null;
          }

    }

  renderDeskTop(){
    return (
              <div style={styles.topnavContainer}>
                   <div style={styles.topnav}>
                        <img src={this.props.appLogo} style={styles.logo}/>
                        <div style={styles.appTitleContainer}>
                                <div style={styles.appDesktopTitle}>{this.props.appTitle}</div>
                                {this.renderDesktopSubtitle()}
                        </div>
                        {this.renderDesktopMenuItems()}

                   </div>
                </div>
            );
  }

  renderMobile(){

    return(
    <div style={styles.topnavContainer}>
          <div style={styles.topnavmobile}>
                 <img src={this.props.appLogo} style={styles.logo}/>
                 <div style={styles.appTitleContainer}>
                         <div style={styles.appMobileTitle}>{this.props.appTitle}</div>
                         {this.renderMobileSubtitle()}
                 </div>
                 <div style={styles.mobileMenu}>
                    {this.renderMenuItemSymbol()}
                </div>
          </div>
          {this.renderMobileMenuItems()}
    </div>
  );
  }
  renderMenuItemSymbol(){
      if(this.state.menuPressed){
        return(
          <a style={styles.mobileMenuIcon} onClick={()=>{
                this.setMenuPressed(false);
            }}>&#9747;</a>
        );
      }
      else{
        return(
          <a style={styles.mobileMenuIcon} onClick={()=>{
              this.setMenuPressed(true);
            }}>&#9776;</a>
        );
      }

  }
  renderTransparentSection(){
      return(
            <a  onClick={this.hideMenu.bind(this)}>
                <div style={styles.mobileMenuOverlay}>
                </div>
            </a>
      );

  }
  renderMobileMenuItems(){
       if(this.state.menuPressed){
         return(
           <div style={styles.menuItemsMobile}>
               {this.props.menus.map(this.renderMenuItem.bind(this))}
               {this.renderTransparentSection()}

       </div>);
       }
       else{
         return null;
       }

  }
  render() {

      if(styles.isDesktop()){
        return this.renderDeskTop();
      }
      else{
        return this.renderMobile();
      }
  }

}




class MenuItem extends Component{
  constructor(props){
    super(props);
    this.state={hover:false}
  }
  onHover(){
    this.setState({hover: true})
  }
  offHover(){
    this.setState({hover: false})
  }
  render(){

    var link=this.props.menu.link;
    if(!link){
      link="/";
    }
    var linkText=this.props.menu.linkText;
    var isSelected=this.props.selected && this.props.menu.link===this.props.selected.link;



        return(
          <Link to={link} style={styles.menuItem(isSelected, this.state.hover)}
            onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.offHover.bind(this)}>
                {linkText}
          </Link>
        );



  }
}
