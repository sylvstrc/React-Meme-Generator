import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
 import M from 'materialize-css'


export default class CreatePage extends Component {

    constructor(props){
        super(props)
        console.log(this.props)
        this.state = {
            inputs: [],
            finishedMeme: null
        }
    }

    componentDidMount(){
        let options ={}
        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems, options);
    }
    
    generateInputs(){
        let inputBoxes = [];
        for (let i = 0; i < this.props.meme.boxCount; i++){
            inputBoxes.push(
            <div class='inputs'>
                <input placeholder='Overlay Text' id={'text-'+i} type="text" class="validate" onChange={event => this.updateInputs(event)}></input>
                <label for={'text-'+i}>{"Text Input "+(i+1)}</label>
            </div>
            )
        }
        return inputBoxes;
    }

    updateInputs(event){
        let inputs = this.state.inputs;
        const index = event.target.id.substring(5,6);
        inputs[index] = event.target.value;
        this.setState({inputs: inputs});
    }

    onSubmit(event){
        event.preventDefault();
        let url = this.generateURL()
        fetch(url).then(response => response.json()).then((json) => {
            this.setState({finsihedMeme: json.data})
            console.log(json.data)
        })       
    }

    async generateURL(){
        let url = new URL('https://api.imgflip.com/caption_image?');
        url.searchParams.append('template_id', this.props.meme.id);
        url.searchParams.append('username', 'memegen115');
        url.searchParams.append('password', 'memegen115');
        let boxesParam = '';
        let inputs = this.state.inputs;
        boxesParam = inputs.map((el, idx) => {
            return 'boxes[' + idx + '][text]'+'='+el;
        }).join('&');
        url += '&'+ boxesParam;
        const response = await fetch(url);
        const json = await response.json();
        if (json.success === false){
            alert(json.error_message);
        } else {
            console.log(json);
            this.setState({finishedMeme: json.data});
        }
    }


   download(){
       let url = this.state.finishedMeme.url; 
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function(){
            var urlCreator = window.URL || window.webkitURL;
            var url = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = url;
            tag.download = 'meme.jpg';
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        }
        xhr.send();
   }

    startDownload(url){
        window.location.href = url;
    }

    render() {
        if (!this.state.finishedMeme) {
            return (
                <div class='create-page container'>
                    <div class='row'>
                        <div class='col s6 card-wrapper'>
                            <div class="card">
                                <div class="card-image waves-effect waves-block waves-light">
                                <img class="activator" src={this.props.meme.url}></img>
                                </div>
                                <div class="card-content">
                                <p class="card-title grey-text text-darken-4">{this.props.meme.name}</p>
                                <p><a class='popularity'>Rank #{parseInt(this.props.meme.rank) + 1} in popularity</a></p>
                                </div>
                            </div>
                        </div>
                        <form class='textbox input-field col s4' onSubmit={(event => this.onSubmit(event))}>
                            {this.generateInputs()}
                            <button class="btn waves-effect waves-light" type="submit">Submit
                                <i class="material-icons right">send</i>
                            </button>
                        </form>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div class='finished-meme'>
                    <img src={this.state.finishedMeme.url}></img>
                    <div class='row'>
                            <CopyToClipboard text={this.state.finishedMeme.url}
                                onCopy={() => this.setState({copied: true})}>
                                <button class="btn waves-effect waves-light">Share
                                    <i class="material-icons right">share</i>
                                </button>
                            </CopyToClipboard>
                            <button class="btn waves-effect waves-light" onClick={() => this.download()}>Download
                                <i class="material-icons right">cloud_download</i>
                            </button>
                    </div>
                    {this.state.copied ? <p>Link Copied!</p> : null}
                </div>
            );
        }
    }
}
