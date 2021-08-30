import styles from '../styles/Home.module.css'
import gallery from '../styles/Gallery.module.css'
import React from 'react';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
       // this.state = {
        this.photo  = [            "https://mcdn.wallpapersafari.com/medium/45/24/WR46bc.jpg",
                "https://cdn.crispedge.com/f1bd89.png",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"];
       // }
    }
    render() {
        return (
            <div className={ gallery.gallery }>
                { this.photo.map((value, index) => {
                    return <div className={[gallery.frame]} key={index} >
                        <a className={gallery.card}>
                            <img className={gallery.imageFrame} src={this.photo[index]}/>
                        </a>
                    </div>
                })
                }
            </div>
        );
    }
n
    generateFrames() {
        for(let i =0; i < this.photo; i++) {
            console.log('I was triggered during componentDidMount');
            return <div className={[gallery.frame]} key={index} >
                <a className={gallery.card}>
                    <img className={gallery.imageFrame} src={this.photo[index]}/>
                </a>
            </div>;
        }
    }
}

class Frame extends React.Component {

}

export default Gallery;
