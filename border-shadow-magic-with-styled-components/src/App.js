import React, { Component } from 'react';
import BorderMagic from './components/someTrack/borderMagic'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BorderMagic
          normalSize={1}
          isDuble={false}
          isDubleTwo={false}
          borderStyle={'0px solid #000'}
          imageUrl={'https://s3a.bytecdn.cn/aweme/resource/web/static/image/index/logo_efcda07.png'}
        />
      </div>
    );
  }
}

export default App;
