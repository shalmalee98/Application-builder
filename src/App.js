import React, { createRef } from "react";
import Application from "./container/application/application";
import SideNav from "./container/side-nav/side-nav";
import Header from "./container/header/header";
import ActionBar from "./container/action-bar/action-bar";
import LandingPage from "./container/landing-page/landing-page";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import { save_file } from "./services/services";

export default class AppBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonForm: {},
      appComponent: [],
      componentID: 0,
      appName: "",
      open: false,
      saved: false,
      openActionBar: false,
      openSideNav: false,
      ActiobarData: {},
      componentBorder: null,
      formdata: {
        id: "form_1",
        type: "Form",
        label: "Form",
        colour: "White",
        width: 800,
        height: 500,
      },
    };

    this.setJsonForm = this.setJsonForm.bind(this);
    this.setSaved = this.setSaved.bind(this);
    this.setFormdata = this.setFormdata.bind(this);
    this.setComponentBorder = this.setComponentBorder.bind(this);
    this.setAppComponent = this.setAppComponent.bind(this);
    this.setComponentID = this.setComponentID.bind(this);
    this.setAppName = this.setAppName.bind(this);
    this.setOpen = this.setOpen.bind(this);
    this.setOpenSideNav = this.setOpenSideNav.bind(this);
    this.setOpenActionBar = this.setOpenActionBar.bind(this);
    this.setActionbarData = this.setActionbarData.bind(this);

    this.appContainer = createRef();
  }
  setFormdata(d) {
    this.setState({
      formdata: d,
    });
  }
  setSaved(d) {
    this.setState({
      saved: d,
    });
  }
  setComponentBorder(d) {
    this.setState({
      componentBorder: d,
    });
  }
  setJsonForm(d) {
    this.setState({
      jsonForm: d,
    });
  }

  setAppComponent(d) {
    this.setState({
      appComponent: d,
    });
  }

  setComponentID(d) {
    this.setState({
      componentID: d,
    });
  }
  setAppName(d) {
    this.setState({
      appName: d,
    });
  }
  setOpen(d) {
    this.setState({
      open: d,
    });
  }

  setOpenSideNav(d) {
    this.setState({
      openSideNav: d,
    });
  }

  setOpenActionBar(d) {
    this.setState({
      openActionBar: d,
    });
  }

  setActionbarData(d) {
    this.setState({
      ActionbarData: d,
    });
  }

  handleComponentDelete = (compID) => {
    let tmpcomp = [...this.state.appComponent];
    tmpcomp.map((component, index) => {
      if (compID === component.id) {
        tmpcomp.splice(index, 1);
        this.setAppComponent(tmpcomp);
      }
      return null;
    });
  };

  addComponentToForm = (data) => {
    this.setComponentID(this.state.componentID + 1);
    data.id = "comp_" + this.state.componentID;

    let tmpcomp = [...this.state.appComponent, data];
    this.setAppComponent(tmpcomp);
  };

  updateAppComponent = (data) => {
    let tmpcomp = [...this.state.appComponent];
    tmpcomp.map((comp, index) => {
      if (data.id === comp.id) {
        comp = Object.assign(comp, data);
        return comp;
      } else {
        return comp;
      }
    });
    this.setAppComponent(tmpcomp);
  };

  saveApp = () => {
    const htmldata = this.getFormHTMLData(
      this.state.formdata.width,
      this.state.formdata.height
    );
    console.log(htmldata);
    let form = {
      name: this.state.appName,
      width: this.state.formdata.width,
      height: this.state.formdata.height,
      componentID: this.state.componentID,
      style: {
        "background-color": this.state.formdata.colour,
        margin: "10px",
      },
      components: this.state.appComponent,
    };
    this.setJsonForm(form);
    const app = {
      name: this.state.appName,
      path:
        "C://Users//sshenolikar//Desktop//React App//applicationbuilder//build//Projects//",
      Pages: [
        {
          type: "Json",
          content: form,
        },
        {
          type: "HTML",
          content: htmldata,
        },
      ],
    };
    this.setSaved(true);
    save_file(app);
  };

  onComponentSelect = (data) => {
    this.setActionbarData(data);
    this.setOpenActionBar(true);
  };

  openApplication = () => {
    this.setOpen(true);
    this.setActionbarData(this.state.formdata);
  };

  createScriptForEvents = () => {
    const componentList = Object.assign(this.state.appComponent);
    let output = "";

    for (let i = 0; i < componentList.length; i++) {
      const comp = componentList[i];
      if (comp.script !== undefined && comp.script.length > 0) {
        // eslint-disable-next-line no-loop-func
        comp.script.forEach((element, index) => {
          const { event, code, id } = element;
          if(!code.includes("//Add Code")) {
            output += `\n\n document.getElementById('${id}').addEventListener("${event}", function(){
              ${code}
            }); \n\n`;
          }
          else if (code.includes("//Add Code")) {
            let arr = comp.script.splice(index, 1);
          } 
        });
      }
    }
    return output;
  };

  responsiveComponent = (formWidth, formHeight) => {
    return `
      function makeComponentResponsive(){
        var height = ${formHeight};
        var width = ${formWidth};
        var rootElement = document.querySelector('body');
        var componentList = rootElement.querySelectorAll('.react-draggable ,react-draggable-dragged');
        i=0;
        for(var t=componentList.length;i<t;i+=1){
          var computedStyle = window.getComputedStyle(componentList[i],null);
          var l = computedStyle.getPropertyValue('transform')||
                computedStyle.getPropertyValue('-moz-transform')||
                computedStyle.getPropertyValue('-webkit-transform')||
                computedStyle.getPropertyValue('-ms-transform')||
                computedStyle.getPropertyValue('-o-transform');
                var a = l.split(',');
                var w = a[4].trim();
                var h = a[5].replace(')','');
                var pw = w/width*100;
                var ph = h/height*100;
                var newX = pw/100*window.innerWidth;
                var newY = ph/100*window.innerHeight;
                componentList[i].style.transform='translate('+ newX +'px, '+ newY +'px)';
            }

            var removeItemList = rootElement.querySelectorAll('.remove-from-html');
            for(var r=0; r < removeItemList.length;r++){
              removeItemList[r].parentNode.removeChild(removeItemList[r]);
            }
            
            var myClass = 'rotating-border';
            var removeClassElement = rootElement.querySelectorAll('.rotating-border');
            var reg = new RegExp('(^| )'+myClass+'($| )','g');
            // remove class from all chosen removeClassElement
            for (var i=0; i<removeClassElement.length; i++) {
              removeClassElement[i].className = removeClassElement[i].className.replace(reg,' ');
            }

          }
      window.onload = makeComponentResponsive;
      `;
  };

  getStyleOFApplication = () => {
    const data = document.getElementsByTagName("style");
    let output = "";

    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      output = output + "\n" + element.innerText;
    }
    return output;
  };

  getFormHTMLData = (w, h) => {
    const headerScript = this.responsiveComponent(w, h);
    const componentScript = this.createScriptForEvents();
    const style = this.getStyleOFApplication();
    console.log(headerScript);
    // const formHtml = this.appContainer.current.innerHTML;
    const formHtml = document.getElementById("form-content").innerHTML;
    return `<!DOCTYPE html>
            <html>
              <head> 
              <style type="text/css">
                ${style}
              </style>
                <script> ${headerScript}</script>
              </head>
                <body>
                  <div style="background-color: ${this.state.formdata.colour}; height: 100%; width: 100%; position: absolute;">
                  ${formHtml}
                    </div> 
                  <script> ${componentScript} </script>
              </body> 
            </html>`;
  };

  renderSideNav = () => {
    return (
      <div className="side-nav-container">
        <SideNav
          handleComponentClick={this.addComponentToForm}
          openSideNav={this.state.openSideNav}
          setOpenSideNav={this.setOpenSideNav}
        />
      </div>
    );
  };

  renderActionBar = () => {
    return (
      <div className="action-bar-container">
        <ActionBar
          handleComponentDelete={this.handleComponentDelete}
          formdata={this.state.formdata}
          setFormdata={this.setFormdata}
          openActionBar={this.state.openActionBar}
          setOpenActionBar={this.setOpenActionBar}
          ActionbarData={this.state.ActionbarData}
          setActionbarData={this.setActionbarData}
          updateAppComponent={this.updateAppComponent}
          appComponent={this.state.appComponent}
        />
      </div>
    );
  };

  calculateWidthForApplication = () => {
    let width = 155;
    if (this.state.openSideNav) {
      width += 120;
    }
    if (this.state.openActionBar) {
      width += 190;
    }
    return width;
  };

  renderApplication = () => {
    const appWidth = this.calculateWidthForApplication();
    return (
      <div
        className="application-container"
        style={{ width: `calc(100% - ${appWidth}px)` }}
        ref={this.appContainer}
      >
        <Application
          appComponent={this.state.appComponent}
          openActionBar={this.state.openActionBar}
          setOpenActionBar={this.setOpenActionBar}
          setAppComponent={this.setAppComponent}
          updateAppComponent={this.updateAppComponent}
          onComponentSelect={this.onComponentSelect}
          setActionbarData={this.setActionbarData}
          componentBorder={this.state.componentBorder}
          setComponentBorder={this.setComponentBorder}
          formdata={this.state.formdata}
          setFormdata={this.setFormdata}
        />
      </div>
    );
  };

  renderHeader = () => {
    let startbuttons = true;
    if (this.state.saved === true) {
      startbuttons = false;
    }
    return (
      <Header
        open={this.state.open}
        saveApp={this.saveApp}
        appName={this.state.appName}
        startbuttons={startbuttons}
        saved={this.state.saved}
        setSaved={this.setSaved}
      />
    );
  };

  renderLandingPage = () => {
    let startAppButton = true;
    if (this.state.appName === "") {
      startAppButton = true;
    } else {
      startAppButton = false;
    }
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <div className="form">
          <LandingPage
            setJsonForm={this.setJsonForm}
            setAppName={this.setAppName}
            setComponentID={this.setComponentID}
            openApplication={this.openApplication}
            setAppComponent={this.setAppComponent}
            startAppButton={startAppButton}
            setFormdata={this.setFormdata}
            appName={this.state.appName}
          />
        </div>
      </Grid>
    );
  };

  renderBody = () => {
    if (this.state.open) {
      return (
        <React.Fragment>
          {this.renderSideNav()}
          {this.renderApplication()}
          {this.renderActionBar()}
        </React.Fragment>
      );
    } else {
      return this.renderLandingPage();
    }
  };

  render() {
    return (
      <React.Fragment>
        <Grid container direction="column" style={{ height: "100%" }}>
          <Grid
            container
            item
            xs={12}
            style={{ height: 64, flexBasis: "auto" }}
          >
            {this.renderHeader()}
          </Grid>
          <Grid
            container
            item
            xs={12}
            direction="row"
            style={{
              height: "calc(100% - 130px)",
              flexBasis: "auto",
              width: "100%",
            }}
          >
            {this.renderBody()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
