import React from 'react'
import axios from 'axios';
import swal from 'sweetalert'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import {Modal, ModalBody} from 'reactstrap'


class ProductManagement extends React.Component{

    state = {
        data: null,
        category: null,
        showModal: false,
        updatedata: false
    }

    componentDidMount(){
        this.getData()
        this.getDataCategory()
    }


    getData = () => {
        axios.get('http://localhost:5000/products')
        .then((res) => {
            this.setState({data: res.data.data})
        })
        .catch((err) => {
            alert(err.response.data.message)
        })
    }

    getDataCategory = () => {
        axios.get('http://localhost:5000/category-product')
        .then((res) => {
            this.setState({category: res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onSubmitData = () => {

        let dataToSend = {
            name: this.name.value,
            brand: this.brand.value,
            category: this.category.value,
            stock: this.stock.value,
            price: this.price.value,
            discount: this.discount.value,
            weight: this.weight.value,
            image1: this.image1.value,
            image2: this.image2.value,
            image3: this.image3.value
        }

        axios.post('http://localhost:5000/post-data-product', dataToSend)
        .then((res) => {
            swal({
                title: res.data.message,
                icon: "success",
                button: "Ok",
            })
            this.setState({showModal: false})
            this.getData()
            // alert(res.data.message)
            // window.location = '/'
        })
        .catch((err) => {
            swal({
                title: err.response.data.message,
                icon: "warning",
                button: "Ok",
            })
            // alert(err.response.data.message)
        })
    }

    onDeleteData = (idProduct) => {
        // console.log(idProduct)
        axios.delete(`http://localhost:5000/product/${idProduct}`)
        .then((res) => {
            swal({
                title: res.data.message,
                icon: "success",
                button: "Ok",
            })
            this.getData()
        })
        .catch((err) => {
            swal({
                title: err.response.data.message,
                icon: "warning",
                button: "Ok",
            })
        })
    }

    onTriggerUpdate = () => {
        this.setState({updatedata: true})
    }

    onUpdateData = (idProduct) => {

        let dataToUpdate = {
            name: this.refs.EditName.value,
            brand: this.refs.EditBrand.value,
            category: this.refs.EditCategory.value,
            stock: this.refs.EditStock.value,
            price: this.refs.EditPrice.value,
            discount: this.refs.EditDiscount.value,
            weight: this.refs.EditWeight.value
        }

        axios.patch(`http://localhost:5000/product/${idProduct}`, dataToUpdate)
        .then((res) => {
            swal({
                title: res.data.message,
                icon: "success",
                button: "Ok",
            })
            this.setState({updatedata: false})
            this.getData()
        })
        .catch((err) => {
            swal({
                title: err.response.data.message,
                icon: "warning",
                button: "Ok",
            })
        })
    }

    render(){
        if(this.state.data === null || this.state.category === null){
            return(
                <div className="container">
                    Loading . . .
                </div>
            )
        }

        return(
            <div className="container">
                <table className="table mt-3 mb-5">
                    <thead style={{color:'white',backgroundColor:'#536162'}}>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Price</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((value, index) => {
                                return(
                                    <tr>
                                        <th scope="row">{value.id}</th>
                                        <td>{value.name}</td>
                                        <td>{value.brand}</td>
                                        <td>{value.category}</td>
                                        <td>{value.stock}</td>
                                        <td>{value.price}</td>
                                        <td>{value.discount}</td>
                                        <td>{value.weight}</td>
                                        <td>
                                            <div key={index}>
                                            <Link to={`/product-management-detail/${value.id}`}>
                                                <FontAwesomeIcon icon={faSearch} className='funniture-font-size-22' />
                                            </Link>
                                            <span>
                                                <FontAwesomeIcon icon={faTrash} className='funniture-font-size-22 mx-3' onClick={()=>this.onDeleteData(`${value.id}`)}/>
                                            </span>
                                            <span>
                                                <FontAwesomeIcon icon={faEdit} className='funniture-font-size-22' onClick={()=>this.onTriggerUpdate(`${value.id}`)}/>
                                            </span>
                                            </div>
                                            <div>
                                                {
                                                    this.state.updatedata?
                                                    <div>
                                                        <h3>Update Product</h3>
                                                        <div><input type='text' placeholder="Enter new name" ref="EditName" className="form-control my-3" style={{width:'400px'}}/></div>
                                                        <div><input type='text' placeholder="Enter new Brand" ref="EditBrand" className="form-control my-3" style={{width:'400px'}}/></div>
                                                        <div><input type='text' placeholder="Enter new category" ref="EditCategory" className="form-control my-3" style={{width:'400px'}}/></div>
                                                        <div><input type='text' placeholder="Enter new stock" ref="EditStock" className="form-control my-3" style={{width:'400px'}}/></div>
                                                        <div><input type='text' placeholder="Enter new price" ref="EditPrice" className="form-control my-3" style={{width:'400px'}}/></div>
                                                        <div><input type='text' placeholder="Enter new discount" ref="EditDiscount" className="form-control my-3" style={{width:'400px'}}/></div>
                                                        <div><input type='text' placeholder="Enter new weight" ref="EditWeight" className="form-control my-3" style={{width:'400px'}}/></div>
                                                        <input type='button' value='Update' className="btn btn-dark my-2 mb-5" onClick={()=>this.onUpdateData(`${value.id}`)}/>
                                                    </div>
                                                    :
                                                    null
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                        <div className='mt-3'>
                            <input type='button' value='Add Data' onClick={() => this.setState({showModal: true})} className='btn btn-dark'/>
                        </div>
                </table>

                <Modal toggle={() => this.setState({showModal: false})} isOpen={this.state.showModal}>
                    <ModalBody style={{backgroundColor:'#dddddd'}}>
                        <div className='mt-3'>
                            <h2 style={{textAlign:'center'}}>
                                Add Data
                            </h2>
                        </div>
                        <div>
                            <input type='text' ref={(e) => this.name = e} placeholder='Name of The Product' className='form form-control mb-3' />
                        </div>
                        <div>
                            <input type='text' ref={(e) => this.brand = e} placeholder='Brand of The Product' className='form form-control mb-3' />
                        </div>
                        <div>
                            <select ref={(e) => this.category = e} className="form-control mb-3">
                                {
                                    this.state.category.map((value, index) => {
                                        return(
                                            <option key={index} value={value.id}>{value.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <input type='text' ref={(e) => this.stock = e} placeholder='Stock Product' className='form form-control mb-3' />
                        </div>
                        <div>
                            <input type='text' ref={(e) => this.price = e} placeholder='Price Product' className='form form-control mb-3' />
                        </div>
                        <div>
                            <input type='text' ref={(e) => this.discount = e} placeholder='Discount Product' className='form form-control mb-3' />
                        </div>
                        <div>
                            <input type='text' ref={(e) => this.weight = e} placeholder='Weight Product' className='form form-control mb-3' />
                        </div>
                        <div>
                            <h5>Image URL</h5>
                            <input type='text' ref={(e) => this.image1 = e} placeholder='Image 1' className='form form-control mb-3' />
                            <input type='text' ref={(e) => this.image2 = e} placeholder='Image 2' className='form form-control mb-3' />
                            <input type='text' ref={(e) => this.image3 = e} placeholder='Image 3' className='form form-control mb-3' />
                        </div>
                        <div>
                            <input type='button' onClick={() => this.onSubmitData()} value='Submit Data' className='btn btn-secondary w-100 mb-3' />
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default ProductManagement