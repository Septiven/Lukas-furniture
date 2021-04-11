import axios from 'axios'
import React from 'react'

class ProductManagementDetail extends React.Component{

    state = {
        data: null
    }

    componentDidMount(){
        this.getDetailProduct()
    }

    getDetailProduct = () => {
        let idProduct = this.props.location.pathname.split('/')[2]

        axios.get(`http://localhost:5000/product/${idProduct}`)
        .then((res) => {
            console.log(res.data)

            if(typeof(res.data) === 'string'){
                alert(res.data)
            }else{
                this.setState({data: res.data})
            }
            
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(this.state.data === null){
            return(
                <div>
                    Loading . . .
                </div>
            )
        }
        return(
            <div className= "container my-5">
                <div className="col-12 col-md-6">
                    <div className='mt-5 mt-md-0'>
                        <h1>
                            {this.state.data[0].name}
                        </h1>
                        <p>
                            Sold : 0 Products
                        </p>
                        <h3>
                            Rp.{this.state.data[0].price.toLocaleString()}
                        </h3>
                        <hr/>
                    </div>
                    <div className='mt-4'>
                        <p className='font-weight-bold' style={{lineHeight: '0px'}}>
                            Stock
                        </p>
                        <p>
                            {this.state.data[0].stock} Item
                        </p>
                        <p className='font-weight-bold' style={{lineHeight: '0px'}}>
                            Weight
                        </p>
                        <p>
                            {this.state.data[0].weight} Gram
                        </p>
                        <hr/>
                    </div>
                    <div>
                        <p className='font-weight-bold' style={{lineHeight: '0px'}}>
                            Description
                        </p>
                        <p style={{textAlign: 'justify'}}>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero ut perferendis ducimus doloribus maiores voluptatem ea similique perspiciatis, sunt ad iusto fugiat, veritatis possimus unde, minus omnis quia quae vel.
                        </p>
                    </div>
                </div>

            </div>
        )
    }
}

export default ProductManagementDetail