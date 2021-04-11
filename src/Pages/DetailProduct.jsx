import axios from 'axios';
import React from 'react';
import swal from 'sweetalert'
import { connect } from 'react-redux'

import checkUserLogin from './../Support/Functions/CheckUserLogin'

// ACTION REDUX
import { getDataCart } from './../Redux/Actions/CartAction'

class DetailProduct extends React.Component{

    state = {
        dataDetailProduct: null,
        isUserLogin: null,
        mainImage: null
    }

    componentDidMount(){
        this.onCheckUserLogin()
        this.getDataProduct()
    }

    getDataProduct = () => {
        let idProduct = this.props.location.pathname.split('/')[2]

        axios.get(`http://localhost:2000/products/${idProduct}`)
        .then((res) => {
            this.setState({dataDetailProduct: res.data})
            this.setState({mainImage: res.data.image1})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onCheckUserLogin = () => {
        let id = localStorage.getItem('id')

        if(id){
            this.setState({isUserLogin: true})
        }else{
            this.setState({isUserLogin: false})
        }
    }


    addToCart = () => {

        // APABILA TIDAK PAKAI REDUX TAPI PAKE CARA WINDOW LOCATION 

        // let idProduct = this.props.location.pathname.split('/')[2]
        // let idUser = localStorage.getItem('id')

        // let dataToSend = {
        //     idProduct: idProduct,
        //     idUser: idUser,
        //     quantity: 1
        // }

        // // Saya cek terlebih dahulu apakah product ini ada didalam data carts
        // axios.get(`http://localhost:2000/carts?idProduct=${idProduct}`)
        // .then((res) => {
        //     if(res.data.length === 0){ // Apabila datanya belum ada didalam data carts
        //         axios.post('http://localhost:2000/carts', dataToSend)
        //         .then((res) => {
        //             console.log(res)
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        //     }else{ // Apabila datanya udah ada didalam data carts
        //         let quantityOnDB = res.data[0].quantity
        //         let idCart = res.data[0].id
                
        //         axios.patch(`http://localhost:2000/carts/${idCart}`, {quantity: quantityOnDB + 1})
        //         .then((res) => {
        //             console.log(res)

        //              let urlAddress = this.props.location.pathname
        //              window.location = urlAddress
        //         })
        //         .catch((err) => {
        //             console.log(err)
        //         })
        //     }
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        let idProduct = this.props.location.pathname.split('/')[2]
        let idUser = localStorage.getItem('id')
        let quantity = 1

        this.props.getDataCart(idProduct, idUser, quantity)
        
    }

    alert = () => {
        swal({
            title: "Anda Belum Login!",
            icon: "warning",
            button: "Ok",
        })
    }

    render(){
        if(this.state.dataDetailProduct === null){
            return(
                <div>
                    Loading
                </div>
            )
        }
        return(
            <div className= "container">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="row my-3">
                            <div className='col-12'>
                                <img src={this.state.mainImage} className="img-fluid" alt=""/>
                            </div>

                            <div className="col-3">
                                <img src={this.state.dataDetailProduct.image1} className={this.state.mainImage === this.state.dataDetailProduct.image1? 'img-fluid furniture-img-thumb border border-primary' : 'img-fluid furniture-img-thumb'} alt="img-1" onClick={()=>{this.setState({mainImage:this.state.dataDetailProduct.image1 })}}/>
                            </div>
                            <div className="col-3">
                                <img src={this.state.dataDetailProduct.image2} className={this.state.mainImage === this.state.dataDetailProduct.image2? 'img-fluid furniture-img-thumb border border-primary' : 'img-fluid furniture-img-thumb'} alt="img-2" onClick={()=>{this.setState({mainImage:this.state.dataDetailProduct.image2 })}}/>
                            </div>
                            <div className="col-3">
                                <img src={this.state.dataDetailProduct.image3} className={this.state.mainImage === this.state.dataDetailProduct.image3? 'img-fluid furniture-img-thumb border border-primary' : 'img-fluid furniture-img-thumb'} alt="img-3" onClick={()=>{this.setState({mainImage:this.state.dataDetailProduct.image3 })}}/>
                            </div>
                        </div>
                        

                    </div>

                    <div className="col-12 col-md-6">
                        <div className="mt-5">
                            <h1>
                                {this.state.dataDetailProduct.name}
                            </h1>
                            <p>
                                Sold : 
                            </p>
                            <h5>
                                Rp.{(this.state.dataDetailProduct.price - (this.state.dataDetailProduct.price * (this.state.dataDetailProduct.diskon / 100))).toLocaleString()} <br/>
                                From Rp.<del>{(this.state.dataDetailProduct.price.toLocaleString())}</del>
                            </h5>
                            <hr/>
                        </div>

                        <div>
                            <p>
                                {/* Stock : {this.state.dataDetailProduct.stock} Unit */}
                                {
                                    this.state.dataDetailProduct.stock<20?
                                    <div>
                                    Stock : {this.state.dataDetailProduct.stock} Unit (stock kurang dari 20)
                                    </div>
                                    :
                                    <div>
                                    Stock : {this.state.dataDetailProduct.stock} Unit
                                    </div>
                                }
                            </p>

                            <p>
                                Weight: {this.state.dataDetailProduct.weight} Kg
                            </p>
                            <hr/>
                        </div>

                        <div>
                            <h5>
                                Category :
                            </h5>
                            <p>
                                {this.state.dataDetailProduct.category}
                            </p>
                            <h5>
                                Brand :
                            </h5>
                            <p>
                                {this.state.dataDetailProduct.brand}
                            </p>
                            <h5>Description</h5>
                            <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            </p>
                        </div>

                        <div className="mt-5 mb-3 d-flex justify-content-center">
                        {
                                this.state.isUserLogin?
                                    <button type="button" class="w-100 btn btn-primary" onClick={this.addToCart}>Add To Cart</button>
                                :
                                    // <div class="alert alert-warning" role="alert">
                                    //     Login Terlebih Dahulu Untuk Mendapatkan Product Kedalam Cart!
                                    // </div>
                                    <div>
                                        <button type="button" class="w-100 btn btn-warning" onClick={this.alert}>Add To Cart</button>
                                    </div>
                            }
                        </div>


                    </div>

                </div>
            </div>
        )
    }
}

const mapDispatchToProps = {getDataCart}

export default connect('', mapDispatchToProps)(DetailProduct)