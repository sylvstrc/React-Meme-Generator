import React, { Component } from 'react'
import Gallery from "react-photo-gallery";
import CreatePage from '../createpage/createpage'

export default class Landing extends Component {

    constructor(props){
        super(props);
        this.state={
            photos: null,
            meme: null
        };
    }

    onClick = (event) => {
        let meme = event.target;
        let altSplit = meme.alt.split(' ');
        this.setState({meme: {
            id: meme.id,
            url: meme.src,
            width: meme.width,
            height: meme.height,
            name: meme.name,
            boxCount: altSplit[0],
            rank: altSplit[1]
        }})
    }

    sortPhotos = () => {
        console.log(this.state.photos)
        let photos2 = [...this.state.photos].sort((a,b) => parseInt(a.alt.substring(2)) > parseInt(b.alt.substring(2)) ? 1 : -1);
        this.setState({photos: photos2});
    }


    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes').then(response =>
            response.json().then(parsedResponse => {
                let memes = parsedResponse.data.memes;
                let photos = memes.map((meme, index) => {
                    return {
                        id: meme.id,
                        src: meme.url,
                        width: meme.width,
                        height: meme.height,
                        name: meme.name,
                        alt: +meme.box_count+' '+index 
                    }
            });
                photos.sort(() => {
                    return .5 - Math.random();
                });
                this.setState({photos: photos});
            }));}


    render() {
        if (!this.state.photos) {
            return(
                <div>No templates available</div>
            );
        }
        if (this.state.meme){
            return <CreatePage meme={this.state.meme}/>
        }
        return (
            <div class='landing container'>
                <div class='header'>
                    <div>
                        <h5 class='left'>Select a template to begin</h5>
                    </div>
                    <button class="btn waves-effect waves-light" onClick={this.sortPhotos}>Most Popular
                        <i class="material-icons right">swap_vert</i>
                    </button>
                </div>
                <br></br>
                <br></br>
                <Gallery photos={this.state.photos} onClick={this.onClick} direction={"column"} />;
            </div>
        );
    }
}
