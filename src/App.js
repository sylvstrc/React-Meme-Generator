import React, {useState, useEffect} from 'react';
import {Meme} from './components/Meme.js';

function App() {
  const [templates, setTemplates] = useState([]);
  const [template, setTemplate] = useState(null);
  const [text0, setText0] = useState('');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');
  const [meme, setMeme] = useState(null);
  const [boxCount, setBoxCount] = useState(0);

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes').then(x =>
        x.json().then(response => setTemplates(response.data.memes))
    );
  },[]);


  // hey there
  if (meme) {
    return (
        <div style={{ textAlign: "center" }}>
          <img src={meme} alt="custom meme" />
        </div>
    );
  }

  return(
      <div style={ { textAlign: "center"}}>
        {template && (
            <form
                onSubmit={async e => {
                  e.preventDefault();
                  let url = new URL('https://api.imgflip.com/caption_image?');
                  url.searchParams.append('template_id', template.id);
                  url.searchParams.append('text0', text0);
                  url.searchParams.append('text1', text1);
                  url.searchParams.append('username', 'memegen115');
                  url.searchParams.append('password', 'memegen115');

                  let boxesParam = '';
                  if (boxCount > 2) {
                    let labels = [text0, text1, text2, text3, text4];
                    boxesParam = labels.map(function(el, idx) {
                      return 'boxes[' + idx + '][text]'+'='+el;
                    }).join('&');
                  }
                  url = url.toString()+ '&'+ boxesParam;
                  console.log(url);
                  const response = await fetch(url);
                  const json = await response.json();
                  setMeme(json.data.url);
            }}
            >
              <img
                  style={{maxHeight: 500, maxWidth: 500}}
                  key={template.id}
                  src={template.url}
                  alt={template.name}/>
              <div id={"parent"}
                   style={{ textAlign: "center" }}>
                <input
                    class={"child"}
                    placeholder="Text One"
                    value={text0}
                    onChange={e => setText0(e.target.value)}
                />
                <input
                    class={"child"}
                    placeholder="Text Two"
                    value={text1}
                    onChange={e => setText1(e.target.value)}
                    hidden={boxCount < 2}
                />
                <input
                    class={"child"}
                    placeholder="Text Three"
                    value={text2}
                    onChange={e => setText2(e.target.value)}
                    hidden={(boxCount < 3)}
                />
                <input
                    class={"child"}
                    placeholder="Text Four"
                    value={text3}
                    onChange={e => setText3(e.target.value)}
                    hidden={(boxCount < 4)}
                />
                <input
                    class={"child"}
                    placeholder="Text Five"
                    value={text4}
                    onChange={e => setText4(e.target.value)}
                    hidden={(boxCount < 5)}
                />
                <button type="submit"
                        class={"child"}>Create Meme!</button>
              </div>
            </form>
        )}
        {!template &&
        (
            <>
              <h1>Meme generator</h1>
              <h2>Click a Meme to Begin</h2>
              {templates.map(template => {
      return (
          <Meme
              template={template}
              onClick={() => {
                setTemplate(template);
                setBoxCount(template["box_count"]);
              }}
          />
      );
    })}</>)}
      </div>

  );
}
export default App;
