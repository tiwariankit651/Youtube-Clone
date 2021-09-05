import React from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoList, VideoDetail } from './components';

import youtube from './api/youtube';

class App extends React.Component {

    state = {

        videos: [],
        selectedVideo: null,
    }

    componentDidMount(){
        this.handleSubmit('Apna College');
    }
    onVideoSelect = (video) => {
        this.setState({ selectedVideo: video });

    }

    handleSubmit = async (searchTerm) => {
        const response = await youtube.get('search',
            {
                params: {
                    part: 'snippet',
                    maxResults: 5,
                    key: 'AIzaSyC5YD64k7syPT0hoxENTL2ylL85b_MzHuU',
                    q: searchTerm,
                }
            });

        //console.log(response);

        this.setState({ videos: response.data.items, selectedVideo: response.data.items[0] });
    }

    render() {
        const { selectedVideo, videos } = this.state;

        return (
            <Grid justify="center" container spacing={10}>

                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>

                            {/*Search bar*/}
                            <SearchBar onFormSubmit={this.handleSubmit} />

                        </Grid>
                        <Grid item xs={8}>
                            {/*Video Detail*/}
                            <VideoDetail video={selectedVideo} />

                        </Grid>
                        <Grid item xs={4}>
                            {/*Video List*/}
                            <VideoList videos={videos} onVideoSelect={this.onVideoSelect} />
                        </Grid>

                    </Grid>


                </Grid>



            </Grid>
        )
    }
}
export default App;