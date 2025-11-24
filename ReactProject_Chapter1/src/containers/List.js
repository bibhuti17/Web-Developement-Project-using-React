import React, { Component } from "react"
import Card from "../components/card/Card";

class List extends Component {

    constructor() {
        super();
        this.state = {
            data: [],
            loading: true,
        };
    }
    async componentDidMount() {
        const movies = await fetch('/data.json');
        const moviesJSON = await movies.json();

        if (moviesJSON) {
            this.setState({
                data: moviesJSON,
                loading: false,
            });
        }
    }


    render() {
        const { data, loading } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                {data.map((movie) => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </div>
        );
    }
}

export default List