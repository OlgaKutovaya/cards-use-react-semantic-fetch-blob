import React, {Component} from 'react';

const Photos = props => {
    return (
        <div className='img-card'>
            <p className='img-card-text'>{props.title}</p>
            <img src={props.url} className="img-photo" alt="interesting img"/>
            <button className="btn-del btn-del-photo"
                    onClick={() => {
                        props.deletePhoto(props.id)
                    }}>
                delete
            </button>
            <button className="btn-save"
                    onClick={() => {
                        props.savePhoto(props.url)
                    }}>
                save
            </button>
        </div>
    )
};

class ContainerPhotos extends Component {

    state = {
        photos: []
    };

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/photos')
            .then(async data => {
                data = await data.json();
                data = data.splice(1, 12);
                this.setState({photos: data});
            });
    }

    deletePhotoHandler = (index, event) => {
        const photos = [...this.state.photos];
        photos.splice(index, 1);
        this.setState({photos: photos})
    };

    savePhotoHandler = (url, event) => {
        fetch('https://cors-anywhere.herokuapp.com/' + url, {method: 'GET'}).then(async data => {
            const blobData = await data.blob();
            this.showImg(blobData);
        })
    };

    showImg = (blobData) => {
        let newBlob = new Blob([blobData], {type: "image/png"});
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(newBlob);
            return;
        }
        const data = window.URL.createObjectURL(newBlob);
        let link = document.createElement('a');
        link.href = data;
        link.download = "image.png";
        link.click();
        setTimeout(function () {
            window.URL.revokeObjectURL(data);
        }, 100);
    };

    render() {
        const photos = this.state.photos.map((photo, index) => {
            return (
                <Photos key={photo.id}
                        url={photo.url}
                        title={photo.title}
                        deletePhoto={this.deletePhotoHandler.bind(this, index)}
                        savePhoto={this.savePhotoHandler.bind(this, photo.url)}
                />
            )
        });

        return (
            <div className="wrapper-photos">
                {photos}
            </div>
        )
    }
}

export default ContainerPhotos;

