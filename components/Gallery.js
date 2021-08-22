import styles from '../styles/Home.module.css'
import gallery from '../styles/Gallery.module.css'
import React from 'react';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
       // this.state = {
        this.photo  = ["https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=802&q=80",
                "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1518568740560-333139a27e72?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
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
                    return <div className={[gallery.frame]}>
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
            return (
                <div className={styles.grid}>
                <a className={styles.card}>
                    <img src={this.photo[i]}/>
                </a>
            </div> );
        }
    }
}

export default Gallery;
